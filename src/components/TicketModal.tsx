import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Tag } from 'lucide-react';
import { useStore } from '../store/store';
import type { Priority, Status } from '../types';

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketId?: string;
    initialStatus?: Status;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, ticketId, initialStatus }) => {
    const { tickets, users, sprints, addTicket, updateTicket, currentUserId } = useStore();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<Status>(initialStatus || 'backlog');
    const [priority, setPriority] = useState<Priority>('medium');
    const [assigneeId, setAssigneeId] = useState('');
    const [sprintId, setSprintId] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (ticketId) {
            const ticket = tickets.find((t) => t.id === ticketId);
            if (ticket) {
                setTitle(ticket.title);
                setDescription(ticket.description);
                setStatus(ticket.status);
                setPriority(ticket.priority);
                setAssigneeId(ticket.assigneeId || '');
                setSprintId(ticket.sprintId || '');
                setTags(ticket.tags);
                setDueDate(ticket.dueDate ? ticket.dueDate.split('T')[0] : '');
            }
        } else {
            // Reset form for new ticket, pre-assign to current user
            setTitle('');
            setDescription('');
            setStatus(initialStatus || 'backlog');
            setPriority('medium');
            setAssigneeId(currentUserId);
            setSprintId('');
            setTags([]);
            setDueDate('');
        }
    }, [ticketId, isOpen, tickets, initialStatus, currentUserId]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const ticketData = {
            title,
            description,
            status,
            priority,
            assigneeId: assigneeId || undefined,
            sprintId: sprintId || undefined,
            tags,
            // store date as a date-only string YYYY-MM-DD to avoid timezone shifts
            dueDate: dueDate ? dueDate : undefined,
        };

        if (ticketId) {
            updateTicket(ticketId, ticketData);
        } else {
            addTicket(ticketData);
        }
        onClose();
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {ticketId ? 'Edit Ticket' : 'Create Ticket'}
                            </h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Ticket title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Description..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as Status)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="backlog">Backlog</option>
                                        <option value="todo">To Do</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="in-review">In Review</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value as Priority)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Assignee</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User size={14} className="text-gray-400" />
                                        </div>
                                        <select
                                            value={assigneeId}
                                            onChange={(e) => setAssigneeId(e.target.value)}
                                            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Unassigned</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sprint</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar size={14} className="text-gray-400" />
                                        </div>
                                        <select
                                            value={sprintId}
                                            onChange={(e) => setSprintId(e.target.value)}
                                            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">No Sprint</option>
                                            {sprints.map((sprint) => (
                                                <option key={sprint.id} value={sprint.id}>
                                                    {sprint.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tags</label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <div className="relative flex-grow focus-within:z-10">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Tag size={14} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleAddTag}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                                            placeholder="Add tag (press Enter)"
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1.5 inline-flex items-center justify-center text-indigo-400 hover:text-indigo-600 focus:outline-none"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                >
                                    {ticketId ? 'Save Changes' : 'Create Ticket'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketModal;
