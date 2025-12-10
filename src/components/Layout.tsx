import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, KanbanSquare, Calendar, Layers, Settings, Search } from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '../store/store';
import TicketModal from './TicketModal';
import ProfileDropdown from './ProfileDropdown';
import AlertsDropdown from './AlertsDropdown';
import logo from '../assets/sdss.png';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { alerts, searchQuery, setSearchQuery } = useStore();
    const unreadAlerts = alerts.length;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
                <div className="p-6 flex items-center space-x-3 border-b border-gray-100">
                    <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
                    <span className="text-xl font-bold text-gray-800 tracking-tight">QC-Lite</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    <NavItem to="/board" icon={<KanbanSquare size={20} />} label="Board" />
                    <NavItem to="/calendar" icon={<Calendar size={20} />} label="Calendar" />
                    <NavItem to="/sprints" icon={<Layers size={20} />} label="Sprints" />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
                    <div className="flex items-center md:hidden">
                        <span className="text-xl font-bold text-gray-800">QC-Lite</span>
                    </div>

                    <div className="flex items-center w-full max-w-md ml-4 hidden md:flex">
                        <div className="relative w-full text-gray-500 focus-within:text-indigo-600">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                placeholder="Search tickets, sprints, or people..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <AlertsDropdown />
                        <ProfileDropdown />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Create
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>

                <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
};

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                clsx(
                    'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150',
                    isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )
            }
        >
            <span className="mr-3">{icon}</span>
            {label}
        </NavLink>
    );
};

export default Layout;
