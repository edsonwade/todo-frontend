import { Task } from "./task.model";

export interface Project {
    id: string;                          // Project ID as string (UUID)
    name: string;
    description: string;
    tasks: []// Array<Task>;            // Task ID as number
}
