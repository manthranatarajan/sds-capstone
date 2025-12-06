export type Priority = 'low' | 'medium' | 'high';
export type Status = 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done';

export interface User {
    id: string;
    name: string;
    avatar: string;
}

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    assigneeId?: string;
    sprintId?: string;
    tags: string[];
    createdAt: string; // ISO date string
    createdBy?: string; // user id who created the ticket
    dueDate?: string; // Date-only string in `YYYY-MM-DD` format
}

export interface Sprint {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    status: 'planned' | 'active' | 'completed';
}

export interface Alert {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    timestamp: string;
}
