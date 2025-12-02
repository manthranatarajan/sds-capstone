import React, { useMemo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import type { Ticket, Status } from '../../types';
import TicketCard from './TicketCard';

interface BoardColumnProps {
    id: Status;
    title: string;
    tickets: Ticket[];
}

const BoardColumn: React.FC<BoardColumnProps> = ({ id, title, tickets }) => {
    const { setNodeRef } = useDroppable({
        id,
        data: { type: 'Column', status: id },
    });

    const ticketIds = useMemo(() => tickets.map((t) => t.id), [tickets]);

    return (
        <div className="flex flex-col h-full w-80 flex-shrink-0 bg-gray-50 rounded-xl border border-gray-200 max-h-full">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-xl">
                <h3 className="font-semibold text-gray-700 flex items-center">
                    {title}
                    <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                        {tickets.length}
                    </span>
                </h3>
            </div>

            <div ref={setNodeRef} className="flex-1 p-3 overflow-y-auto space-y-3 min-h-[150px]">
                <SortableContext items={ticketIds} strategy={verticalListSortingStrategy}>
                    {tickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </SortableContext>

                {tickets.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                        Drop tickets here
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardColumn;
