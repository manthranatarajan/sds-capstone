import React from 'react';
import { useStore } from '../store/store';
import { Plus, Calendar as CalendarIcon, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import TicketCard from '../components/board/TicketCard';

const Sprints: React.FC = () => {
    const { sprints, tickets } = useStore();
    // const [showCreateModal, setShowCreateModal] = useState(false); // Removed unused

    const activeSprint = sprints.find(s => s.status === 'active');
    const plannedSprints = sprints.filter(s => s.status === 'planned');

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Sprints</h1>
                <button
                    // onClick={() => setShowCreateModal(true)} // Removed unused
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={18} className="mr-2" />
                    Create Sprint
                </button>
            </div>

            {/* Active Sprint */}
            {activeSprint && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-indigo-50/50">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center space-x-3">
                                    <h2 className="text-lg font-bold text-gray-900">{activeSprint.name}</h2>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </div>
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                    <CalendarIcon size={14} className="mr-1.5" />
                                    {format(new Date(activeSprint.startDate), 'MMM d')} - {format(new Date(activeSprint.endDate), 'MMM d, yyyy')}
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="mt-6">
                            <SprintProgress sprintId={activeSprint.id} />
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50">
                        <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Sprint Backlog</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tickets.filter(t => t.sprintId === activeSprint.id).map(ticket => (
                                <TicketCard key={ticket.id} ticket={ticket} />
                            ))}
                            {tickets.filter(t => t.sprintId === activeSprint.id).length === 0 && (
                                <div className="col-span-full py-8 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                                    No tickets in this sprint yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Planned Sprints */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Planned Sprints</h3>
                {plannedSprints.map(sprint => (
                    <div key={sprint.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-base font-semibold text-gray-900">{sprint.name}</h4>
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                    <CalendarIcon size={14} className="mr-1.5" />
                                    {format(new Date(sprint.startDate), 'MMM d')} - {format(new Date(sprint.endDate), 'MMM d, yyyy')}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-sm text-gray-500">
                                    {tickets.filter(t => t.sprintId === sprint.id).length} issues
                                </div>
                                <button className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                                    Start Sprint
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {plannedSprints.length === 0 && (
                    <p className="text-gray-500 italic">No planned sprints.</p>
                )}
            </div>
        </div>
    );
};

const SprintProgress: React.FC<{ sprintId: string }> = ({ sprintId }) => {
    const { tickets } = useStore();
    const sprintTickets = tickets.filter(t => t.sprintId === sprintId);
    const total = sprintTickets.length;
    const done = sprintTickets.filter(t => t.status === 'done').length;
    const inProgress = sprintTickets.filter(t => t.status === 'in-progress' || t.status === 'in-review').length;

    if (total === 0) return null;

    const donePercent = (done / total) * 100;
    const inProgressPercent = (inProgress / total) * 100;

    return (
        <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-700">{Math.round(donePercent)}% Done</span>
                <span className="text-gray-500">{done} of {total} tickets</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 flex overflow-hidden">
                <div className="bg-green-500 h-2.5" style={{ width: `${donePercent}%` }}></div>
                <div className="bg-blue-500 h-2.5" style={{ width: `${inProgressPercent}%` }}></div>
            </div>
            <div className="flex space-x-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div> Done</div>
                <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div> In Progress</div>
                <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-gray-200 mr-1"></div> To Do</div>
            </div>
        </div>
    );
};

export default Sprints;
