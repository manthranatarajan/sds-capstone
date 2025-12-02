import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Ticket } from '../../types';
import { Calendar, User as UserIcon } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '../../store/store';

interface TicketCardProps {
    ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
    const { users } = useStore();
    const assignee = users.find((u) => u.id === ticket.assigneeId);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: ticket.id, data: { type: 'Ticket', ticket } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const priorityColor = {
        low: 'bg-blue-100 text-blue-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800',
    }[ticket.priority];

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-white p-4 rounded-lg shadow-lg border-2 border-indigo-500 opacity-50 h-[150px]"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group"
        >
            <div className="flex justify-between items-start mb-2">
                <span className={clsx('text-xs font-medium px-2 py-0.5 rounded', priorityColor)}>
                    {ticket.priority}
                </span>
                {ticket.dueDate && (
                    <div className="flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        {new Date(ticket.dueDate).toLocaleDateString()}
                    </div>
                )}
            </div>

            <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{ticket.title}</h3>

            <div className="flex flex-wrap gap-1 mb-3">
                {ticket.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
                <div className="text-xs text-gray-400 font-mono">
                    {ticket.id}
                </div>
                {assignee ? (
                    <img
                        src={assignee.avatar}
                        alt={assignee.name}
                        className="h-6 w-6 rounded-full border border-white shadow-sm"
                        title={assignee.name}
                    />
                ) : (
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400">
                        <UserIcon size={12} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketCard;
