import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../../store/store';
import { format, subDays, isSameDay } from 'date-fns';

const TicketsChart: React.FC = () => {
    const { tickets, users, searchQuery } = useStore();

    const normalizedQuery = searchQuery?.trim().toLowerCase() ?? '';
    const filteredTickets = normalizedQuery
        ? tickets.filter((t) => {
              const assigneeName = users.find((u) => u.id === t.assigneeId)?.name ?? '';
              const creatorName = users.find((u) => u.id === (t as any).createdBy)?.name ?? '';
              const hay = `${t.title} ${t.description ?? ''} ${t.tags?.join(' ') ?? ''} ${t.id} ${assigneeName} ${creatorName}`.toLowerCase();
              return hay.includes(normalizedQuery);
          })
        : tickets;

    // Generate last 7 days data based on filtered tickets
    const data = Array.from({ length: 7 }).map((_, i) => {
        const date = subDays(new Date(), 6 - i);
        const count = filteredTickets.filter((t) => isSameDay(new Date(t.createdAt), date)).length;
        return {
            name: format(date, 'EEE'),
            tickets: count,
        };
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">New Tickets (Last 7 Days)</h2>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            allowDecimals={false}
                        />
                        <Tooltip
                            cursor={{ fill: '#F3F4F6' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="tickets" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={32} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TicketsChart;
