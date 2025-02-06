export interface Task {
    id: string;               // Task ID as string (UUID)
    name: string;
    description: string;
    completed: boolean;
    createdAt: Date;          // LocalDateTime as Date
    updatedAt: Date;          // LocalDateTime as Date
    project: number;          // Project ID as number
}
