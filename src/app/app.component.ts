import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ProjectTitleComponent } from "./project/project-title/project-title.component";
import { TaskListComponent } from "./project/task-list/task-list.component";
import { ProgressBarComponent } from "./project/progress-bar/progress-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectComponent, ProjectTitleComponent, TaskListComponent, ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-frontend from Vanilson';
}
