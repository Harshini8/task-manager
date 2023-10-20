import flask
import jwt
from pymongo import MongoClient
from flask_cors import CORS
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta

app = flask.Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True, methods=["GET", "POST"],origins=["http://localhost:4200"])

client = MongoClient('mongodb://localhost:27017/')
print(client.list_database_names())
db = client["task-manager"]
print(db.list_collection_names())


@app.route('/home', methods=['GET'])
def home():
    return "<h1>Task Manager</h1><p>This site is a prototype API for Task Manager.</p>"


@app.route('/api/login', methods=['POST'])
def login():
    email = flask.request.json['email']
    password = flask.request.json['password']
    collection = db["users"]
    user = collection.find_one({"email":email})
    if user:
        if bcrypt.check_password_hash(user.get("password"), password):
            token = jwt.encode({
            'public_id': user.get("email"),
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
            },key='secret', algorithm='HS256')
            response={
                "token":token,
                "user_id":str(user.get("_id")),
                "username":user.get("username"),
                "success":True,
                "message":"Login successful"
                }
            return flask.jsonify(response)
        else:
            return flask.jsonify({'success': False, 'message': 'Incorrect Username or Password'})
    else:
        return flask.jsonify({'success': False,'message':"User doesn't exist with this email. Please register with below link"})
    

@app.route('/api/register', methods=['POST'])
def register():
    user_already_exists = False
    username = flask.request.json['username']
    password = flask.request.json['password']
    password = bcrypt.generate_password_hash(password).decode('utf-8')
    email = flask.request.json['email']
    collection = db["users"]
    user=collection.find({"email": email})
    for user in user:
        user_already_exists = True
        break
    if not user_already_exists:
        print("here")
        response = collection.insert_one({"username": username, "password": password, "email": email})
        if response:
            print(response)
            return flask.jsonify({'success': True, 'message': 'User created successfully'})
        else:
            return flask.jsonify({'success': False, 'message': 'User creation failed'})
    else:
        return flask.jsonify({'success': False, 'message': 'User already exists with this email'})

@app.route('/api/getAllUsers', methods=['GET'])
def get_all_users():
    collection = db["users"]
    users = collection.find()
    users_list = []
    if users:
        for user in users:
            users_list.append(user["email"])
        
        return flask.jsonify({'success': True, 'users': users_list})
    else:
        return flask.jsonify({'success': False})
    
@app.route('/api/createTask', methods=['POST'])
def create_task():
    task={}
    task["title"] = flask.request.json['title']
    task["description"] = flask.request.json['description']
    task["status"] = flask.request.json['status']
    task["priority"] = flask.request.json['priority']
    task["dueDate"] = flask.request.json['dueDate']
    task["collaborators"] = flask.request.json['collaborators']
    task["category"] = flask.request.json['category']
    collection = db["tasks"]
    response = collection.insert_one(task)
    if response:
        print(response)
        return flask.jsonify({'success': True})
    else:
        return flask.jsonify({'success': False})
    
@app.route('/api/getAllTasks', methods=['GET'])
def get_all_tasks():
    collection = db["tasks"]
    tasks = collection.find()
    tasks_list = []
    if tasks:
        for task in tasks:
            # print(task)
            task["_id"]=str( task["_id"])
            tasks_list.append(task)
            # print(tasks_list)
        
        return flask.jsonify({'success': True, 'tasks': tasks_list})
    else:
        return flask.jsonify({'success': False})
    
@app.route('/api/deleteTask', methods=['POST'])
def delete_task():
    task_id = flask.request.json['task_id']
    collection = db["tasks"]
    response = collection.delete_one({"_id":ObjectId(task_id)})
    if response:
        print(response)
        return flask.jsonify({'success': True})
    else:
        return flask.jsonify({'success': False})

@app.route('/api/updateTask', methods=['POST'])
def update_task():
    print(flask.request.json)
    task_id = flask.request.json['task_id']
    task={}
    task["title"] = flask.request.json['task']['title']
    task["description"] = flask.request.json['task']['description']
    task["status"] = flask.request.json['task']['status']
    task["priority"] = flask.request.json['task']['priority']
    task["dueDate"] = flask.request.json['task']['dueDate']
    task["collaborators"] = flask.request.json['task']['collaborators']
    task["category"] = flask.request.json['task']['category']
    collection = db["tasks"]
    response = collection.update_one({"_id":ObjectId(task_id)},{"$set":task})
    if response:
        print(response)
        return flask.jsonify({'success': True})
    else:
        return flask.jsonify({'success': False})

@app.route('/api/updateTaskStatus', methods=['POST'])
def update_status():
    task_id = flask.request.json['task_id']
    status = flask.request.json['status']
    collection = db["tasks"]
    response = collection.update_one({"_id":ObjectId(task_id)},{"$set":{"status":status}})
    if response:
        print(response)
        return flask.jsonify({'success': True})
    else:
        return flask.jsonify({'success': False})    
    

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)