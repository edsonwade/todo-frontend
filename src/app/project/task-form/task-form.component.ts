import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import the FormBuilder, FormGroup, and Validators classes from the Angular forms module.
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() closePanel = new EventEmitter<'SUBMIT'>();
  taskForm: FormGroup; // Create a FormGroup object to hold the form data.
  private taskService = inject(TaskService); // Inject the TaskService into the constructor.

  constructor(private fb: FormBuilder) { // Inject the FormBuilder service into the constructor.
    this.taskForm = this.fb.group({ // Create a FormGroup object with the FormBuilder service.
      name: ['', Validators.required], // Create a FormControl object for the task name input field.
      description: [''], // Create a FormControl object for the task description input field.
      createdAt: ['', Validators.required], // Create a FormControl object for the task creation date input field.
      id: ['0'], // Create a FormControl object for the task ID input field.
      project: [0] // Create a FormControl object for the task project input field.
    });
  }

  handleSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        createdAt: new Date(this.taskForm.value.createdAt),
        completed: false,
      }
      this.taskService.createTask(newTask);
      this.closePanel.emit('SUBMIT');

    };
  }
}