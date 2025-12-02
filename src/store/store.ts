import { create } from 'zustand';
import type { Ticket, Sprint, Alert, User } from '../types';
import { addDays, subDays } from 'date-fns';

interface AppState {
    tickets: Ticket[];
    sprints: Sprint[];
    alerts: Alert[];
    users: User[];

    // Actions
    addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt'>) => void;
    updateTicket: (id: string, updates: Partial<Ticket>) => void;
    deleteTicket: (id: string) => void;
    moveTicket: (id: string, status: Ticket['status']) => void;

    addSprint: (sprint: Omit<Sprint, 'id'>) => void;
    updateSprint: (id: string, updates: Partial<Sprint>) => void;

    addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
    clearAlert: (id: string) => void;
}

// Mock Data
const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Alice Johnson', avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson' },
    { id: 'u2', name: 'Bob Smith', avatar: 'https://ui-avatars.com/api/?name=Bob+Smith' },
    { id: 'u3', name: 'Charlie Brown', avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown' },
];

const MOCK_SPRINTS: Sprint[] = [
    {
        id: 's1',
        name: 'Sprint 10',
        startDate: subDays(new Date(), 5).toISOString(),
        endDate: addDays(new Date(), 9).toISOString(),
        status: 'active'
    },
    {
        id: 's2',
        name: 'Sprint 11',
        startDate: addDays(new Date(), 10).toISOString(),
        endDate: addDays(new Date(), 24).toISOString(),
        status: 'planned'
    },
];

const MOCK_TICKETS: Ticket[] = [
    {
        id: 't1',
        title: 'Fix login page crash',
        description: 'The application crashes when clicking the login button on Safari.',
        status: 'in-progress',
        priority: 'high',
        assigneeId: 'u1',
        sprintId: 's1',
        tags: ['bug', 'auth'],
        createdAt: subDays(new Date(), 2).toISOString(),
    },
    {
        id: 't2',
        title: 'Implement dark mode',
        description: 'Add dark mode support across the entire application.',
        status: 'todo',
        priority: 'medium',
        assigneeId: 'u2',
        sprintId: 's1',
        tags: ['feature', 'ui'],
        createdAt: subDays(new Date(), 5).toISOString(),
    },
    {
        id: 't3',
        title: 'Update API documentation',
        description: 'Reflect recent changes in the user endpoints.',
        status: 'done',
        priority: 'low',
        assigneeId: 'u3',
        sprintId: 's1',
        tags: ['docs'],
        createdAt: subDays(new Date(), 10).toISOString(),
    },
    {
        id: 't4',
        title: 'Investigate slow database queries',
        description: 'Querying the orders table is taking > 2s.',
        status: 'backlog',
        priority: 'high',
        tags: ['performance', 'backend'],
        createdAt: subDays(new Date(), 15).toISOString(),
    },
];

const MOCK_ALERTS: Alert[] = [
    {
        id: 'a1',
        title: 'High CPU Usage',
        message: 'Server CPU usage is at 92%.',
        type: 'warning',
        timestamp: new Date().toISOString(),
    },
    {
        id: 'a2',
        title: 'Backup Successful',
        message: 'Daily database backup completed successfully.',
        type: 'success',
        timestamp: subDays(new Date(), 1).toISOString(),
    },
];

export const useStore = create<AppState>((set) => ({
    tickets: MOCK_TICKETS,
    sprints: MOCK_SPRINTS,
    alerts: MOCK_ALERTS,
    users: MOCK_USERS,

    addTicket: (ticket) => set((state) => ({
        tickets: [...state.tickets, { ...ticket, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() }]
    })),

    updateTicket: (id, updates) => set((state) => ({
        tickets: state.tickets.map((t) => (t.id === id ? { ...t, ...updates } : t))
    })),

    deleteTicket: (id) => set((state) => ({
        tickets: state.tickets.filter((t) => t.id !== id)
    })),

    moveTicket: (id, status) => set((state) => ({
        tickets: state.tickets.map((t) => (t.id === id ? { ...t, status } : t))
    })),

    addSprint: (sprint) => set((state) => ({
        sprints: [...state.sprints, { ...sprint, id: Math.random().toString(36).substr(2, 9) }]
    })),

    updateSprint: (id, updates) => set((state) => ({
        sprints: state.sprints.map((s) => (s.id === id ? { ...s, ...updates } : s))
    })),

    addAlert: (alert) => set((state) => ({
        alerts: [
            { ...alert, id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString() },
            ...state.alerts
        ]
    })),

    clearAlert: (id) => set((state) => ({
        alerts: state.alerts.filter((a) => a.id !== id)
    })),
}));
