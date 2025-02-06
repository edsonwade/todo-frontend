import { Component, inject } from '@angular/core';
import { Task } from '../../task.model';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];

  private taskService = inject(TaskService);

  constructor() {
    // Get all tasks from the TaskService. This is a mock service that returns a promise.
    this.taskService.getTasks()
    .then(tasks => this.tasks = tasks);

  }

  // Was used for testing purposes before the TaskService was implemented
  // tasks: Task[] = [
  //   {
  //     //UUID 
  //     id: '1',
  //     name: 'Design wireframe',
  //     description: 'Create initial design wireframe for the project',
  //     completed: false,
  //     createdAt: new Date('2025-02-05'),
  //     updatedAt: new Date('2025-02-31'),
  //     project: 1
  //   },
  //   {
  //     id: '2',
  //     name: 'Develop frontend',
  //     description: 'Implement login functionality with authentication',
  //     completed: true,
  //     createdAt: new Date('2025-01-10'),
  //     updatedAt: new Date('2025-03-04'),
  //     project: 1
  //   },
  //   {
  //     id: '3',
  //     name: 'Implement backend',
  //     description: 'Set up server-side logic and database integration',
  //     completed: false,
  //     createdAt: new Date('2025-04-15'),
  //     updatedAt: new Date('2025-03-04'),
  //     project: 1
  //   },
  //   {
  //     id: '4',
  //     name: 'Implement Containerization',
  //     description: 'Set up server-side logic and database integration',
  //     completed: true,
  //     createdAt: new Date('2025-03-14'),
  //     updatedAt: new Date('2025-03-04'),
  //     project: 2
  //   }
  // ];

   // Function to handle task deletion was here before the TaskService was implemented to handle task deletion,and update the task list accordingly

   handleCheckbox(id: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    const updatedTask = this.tasks[taskIndex];
    updatedTask.completed = !updatedTask.completed;
    this.taskService.updateTask(updatedTask)
    .then(updatedTask => {
      this.tasks[taskIndex] = updatedTask;
    });
   }



  // // Function to handle checkbox change event and update task status accordingly
  // async handleCheckbox(id: string) {
  //   try {
  //     const taskIndex = this.tasks.findIndex(task => task.id === id);
  //     const updatedTask = this.tasks[taskIndex];
  //     if (taskIndex !== -1 && updatedTask) {
  //       // Toggle the task status
  //       updatedTask.completed = !updatedTask.completed;
  //       // Update the task status
  //       await this.taskService.updateTask(updatedTask);
  //       this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
  //       await this.updateTaskStatus(this.tasks[taskIndex]);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // /**
  //  * Simulate an async update to a server or database
  //  * Updates the status of the given task.
  //  * 
  //  * @param task - The task whose status needs to be updated.
  //  * @returns A promise that resolves after a simulated delay of 1 second.
  //  * 
  //  */
  // private async updateTaskStatus(task: Task): Promise<void> {
  //   // Simulate a delay for the async operation
  //   return new Promise(resolve => setTimeout(resolve, 1000));// 1 second delay
  // }

}
