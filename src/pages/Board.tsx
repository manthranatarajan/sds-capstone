import React, { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    closestCorners
} from '@dnd-kit/core';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useStore } from '../store/store';
import type { Status, Ticket } from '../types';
import BoardColumn from '../components/board/BoardColumn';
import TicketCard from '../components/board/TicketCard';
import TicketModal from '../components/TicketModal';

const Board: React.FC = () => {
    const { tickets, moveTicket, deleteTicket, searchQuery, users } = useStore();
    const [activeTicket, setActiveTicket] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const columns: { id: Status; title: string }[] = [
        { id: 'backlog', title: 'Backlog' },
        { id: 'todo', title: 'To Do' },
        { id: 'in-progress', title: 'In Progress' },
        { id: 'in-review', title: 'In Review' },
        { id: 'done', title: 'Done' },
    ];

    const normalizedQuery = searchQuery?.trim().toLowerCase() ?? '';
    const filteredTickets = normalizedQuery
        ? tickets.filter((t) => {
              const assigneeName = users.find((u) => u.id === t.assigneeId)?.name ?? '';
              const creatorName = users.find((u) => u.id === (t as any).createdBy)?.name ?? '';
              const hay = `${t.title} ${t.description ?? ''} ${t.tags?.join(' ') ?? ''} ${t.id} ${assigneeName} ${creatorName}`.toLowerCase();
              return hay.includes(normalizedQuery);
          })
        : tickets;

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const ticket = tickets.find((t) => t.id === active.id);
        if (ticket) {
            setActiveTicket(ticket);
        }
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // Find the containers
        const activeTicket = tickets.find(t => t.id === activeId);
        if (!activeTicket) return;

        // If over a column
        if (columns.some(c => c.id === overId)) {
            // We don't need to do anything here for visual updates as the column will handle it
            // But if we wanted to reorder in real-time we would
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveTicket(null);
            return;
        }

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeTicket = tickets.find((t) => t.id === activeId);
        if (!activeTicket) {
            setActiveTicket(null);
            return;
        }

        // Dropped over a column
        if (columns.some((c) => c.id === overId)) {
            if (activeTicket.status !== overId) {
                moveTicket(activeId, overId as Status);
            }
        }
        // Dropped over another ticket
        else {
            const overTicket = tickets.find((t) => t.id === overId);
            if (overTicket && activeTicket.status !== overTicket.status) {
                moveTicket(activeId, overTicket.status);
            }
        }

        setActiveTicket(null);
    };

    const handleEditTicket = (ticket: Ticket) => {
        setEditingTicket(ticket);
        setIsModalOpen(true);
    };

    const handleDeleteTicket = (ticketId: string) => {
        deleteTicket(ticketId);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTicket(null);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
                <div className="flex space-x-2">
                    {/* Filter controls could go here */}
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex-1 flex space-x-4 overflow-x-auto pb-4">
                    {columns.map((column) => (
                        <BoardColumn
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            tickets={filteredTickets.filter((t) => t.status === column.id)}
                            onEditTicket={handleEditTicket}
                            onDeleteTicket={handleDeleteTicket}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {activeTicket ? <TicketCard ticket={activeTicket} /> : null}
                </DragOverlay>
            </DndContext>

            <TicketModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                ticketId={editingTicket?.id}
            />
        </div>
    );
};

export default Board;
