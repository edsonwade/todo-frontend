import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  tasks: Task[] = [
    {
      //UUID 
      id: '1',
      name: 'Design wireframe',
      description: 'Create initial design wireframe for the project',
      completed: false,
      createdAt: new Date('2025-02-05'),
      updatedAt: new Date('2025-02-31'),
      project: 1
    },
    {
      id: '2',
      name: 'Develop frontend',
      description: 'Implement login functionality with authentication',
      completed: true,
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-03-04'),
      project: 1
    },
    {
      id: '3',
      name: 'Implement backend',
      description: 'Set up server-side logic and database integration',
      completed: false,
      createdAt: new Date('2025-04-15'),
      updatedAt: new Date('2025-03-04'),
      project: 1
    },
    {
      id: '4',
      name: 'Implement Containerization',
      description: 'Set up server-side logic and database integration',
      completed: true,
      createdAt: new Date('2025-03-14'),
      updatedAt: new Date('2025-03-04'),
      project: 2
    }
  ];

  //GET all tasks
  getTasks(): Promise<Task[]> {
    return new Promise(resolve => {
      resolve(this.tasks);
    });
  }

  //GET task by ID
  getTaskById(id: string): Promise<Task> {
    return new Promise((resolve, reject) => {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        resolve(task);
      } else {
        reject(new Error(`Task with id ${id} not found`));
      }
    });
  }

  //POST create task
  createTask(task: Task): Promise<Task> {
    return new Promise(resolve => {
      this.tasks.push(task);
      resolve(task);
    });
  }

  //PUT update task
  updateTask(newTask: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
      const taskIndex = this.tasks.findIndex(t => t.id === newTask.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = newTask;
        resolve(newTask);
      } else {
        reject(new Error(`Task with id ${newTask.id} not found`));
      }
    });
  }

  //DELETE task
  deleteTask(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        resolve();
      } else {
        reject(new Error(`Task with id ${id} not found`));
      }
    });
  }



}
