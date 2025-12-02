import React from 'react';
import { useStore } from '../../store/store';
import { CheckCircle2, Circle, Clock, AlertOctagon } from 'lucide-react';

const TicketSummary: React.FC = () => {
    const { tickets } = useStore();

    const counts = {
        total: tickets.length,
        done: tickets.filter((t) => t.status === 'done').length,
        inProgress: tickets.filter((t) => t.status === 'in-progress' || t.status === 'in-review').length,
        todo: tickets.filter((t) => t.status === 'todo' || t.status === 'backlog').length,
        highPriority: tickets.filter((t) => t.priority === 'high').length,
    };

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <SummaryCard
                label="Total Tickets"
                value={counts.total}
                icon={<Circle className="h-6 w-6 text-indigo-500" />}
                color="bg-indigo-50"
            />
            <SummaryCard
                label="In Progress"
                value={counts.inProgress}
                icon={<Clock className="h-6 w-6 text-blue-500" />}
                color="bg-blue-50"
            />
            <SummaryCard
                label="Completed"
                value={counts.done}
                icon={<CheckCircle2 className="h-6 w-6 text-green-500" />}
                color="bg-green-50"
            />
            <SummaryCard
                label="High Priority"
                value={counts.highPriority}
                icon={<AlertOctagon className="h-6 w-6 text-red-500" />}
                color="bg-red-50"
            />
        </div>
    );
};

const SummaryCard: React.FC<{ label: string; value: number; icon: React.ReactNode; color: string }> = ({
    label,
    value,
    icon,
    color,
}) => {
    return (
        <div className="bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm p-5 flex items-center">
            <div className={`flex-shrink-0 rounded-lg p-3 ${color}`}>{icon}</div>
            <div className="ml-4 w-0 flex-1">
                <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{label}</dt>
                    <dd>
                        <div className="text-2xl font-bold text-gray-900">{value}</div>
                    </dd>
                </dl>
            </div>
        </div>
    );
};

export default TicketSummary;
