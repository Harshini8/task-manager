export interface Task {
    _id?: string;
    title: string;
    description: string;
    dueDate: Date;
    category: string;
    priority: string;
    collaborators: string[];
    status: string;
  }