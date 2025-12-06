import React, { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { useStore } from '../store/store';

const AlertsDropdown: React.FC = () => {
    const { alerts, clearAlert, addAlert } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    const handleClearOne = (id: string) => {
        clearAlert(id);
    };

    const handleClearAll = () => {
        // clear all alerts by calling clearAlert for each
        alerts.forEach((a) => clearAlert(a.id));
        setIsOpen(false);
    };

    const unread = alerts.length;

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen((s) => !s)}
                className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-expanded={isOpen}
                aria-label="Notifications"
                type="button"
            >
                <Bell size={20} />
                {unread > 0 && (
                    <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <div className="text-sm font-medium">Notifications</div>
                        <div className="text-xs text-gray-500">{unread} new</div>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                        {alerts.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500">You're all caught up</div>
                        ) : (
                            alerts.map((a) => (
                                <div key={a.id} className="px-4 py-3 hover:bg-gray-50 flex items-start justify-between">
                                    <div className="flex-1 pr-3">
                                        <div className="text-sm font-medium text-gray-900">{a.title}</div>
                                        <div className="text-xs text-gray-500">{a.message}</div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <button
                                            onClick={() => handleClearOne(a.id)}
                                            className="text-gray-400 hover:text-red-600 p-1"
                                            aria-label={`Clear ${a.title}`}
                                            type="button"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-between">
                        <button
                            onClick={handleClearAll}
                            className="text-sm text-gray-600 hover:text-gray-900"
                            type="button"
                        >
                            Clear All
                        </button>
                        <div className="text-xs text-gray-400">Auto-refresh</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlertsDropdown;
