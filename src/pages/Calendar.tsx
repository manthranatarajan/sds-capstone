import React, { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useStore } from '../store/store';
import clsx from 'clsx';

const Calendar: React.FC = () => {
    const { tickets } = useStore();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const resetToToday = () => setCurrentMonth(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center">
                        <CalendarIcon className="mr-2 text-indigo-600" size={24} />
                        {format(currentMonth, 'MMMM yyyy')}
                    </h1>
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button onClick={prevMonth} className="p-1 hover:bg-white rounded-md shadow-sm transition-all text-gray-600">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={resetToToday} className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-white rounded-md shadow-sm transition-all mx-1">
                            Today
                        </button>
                        <button onClick={nextMonth} className="p-1 hover:bg-white rounded-md shadow-sm transition-all text-gray-600">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                {weekDays.map((day) => (
                    <div key={day} className="py-2 text-center text-sm font-semibold text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-7 grid-rows-5 md:grid-rows-6">
                {calendarDays.map((day) => {
                    const dayTickets = tickets.filter(
                        (t) => t.dueDate && isSameDay(new Date(t.dueDate), day)
                    );

                    return (
                        <div
                            key={day.toString()}
                            className={clsx(
                                'min-h-[100px] border-b border-r border-gray-100 p-2 transition-colors hover:bg-gray-50',
                                !isSameMonth(day, monthStart) && 'bg-gray-50/50 text-gray-400',
                                isToday(day) && 'bg-indigo-50/30'
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <span
                                    className={clsx(
                                        'text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full',
                                        isToday(day)
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-700'
                                    )}
                                >
                                    {format(day, 'd')}
                                </span>
                            </div>

                            <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px] scrollbar-hide">
                                {dayTickets.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className={clsx(
                                            'text-xs px-1.5 py-1 rounded border truncate cursor-pointer hover:opacity-80',
                                            {
                                                'bg-blue-50 border-blue-100 text-blue-700': ticket.priority === 'low',
                                                'bg-yellow-50 border-yellow-100 text-yellow-700': ticket.priority === 'medium',
                                                'bg-red-50 border-red-100 text-red-700': ticket.priority === 'high',
                                            }
                                        )}
                                        title={ticket.title}
                                    >
                                        {ticket.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
