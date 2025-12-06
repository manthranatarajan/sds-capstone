import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings, HelpCircle } from 'lucide-react';
import { useStore } from '../store/store';

const ProfileDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { users, currentUserId, setCurrentUser } = useStore();

    const user = users.find((u) => u.id === currentUserId);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSwitchUser = (userId: string) => {
        setCurrentUser(userId);
        setIsOpen(false);
    };

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Icon Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 text-indigo-700 font-medium hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                title={user.name}
            >
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full rounded-full object-cover"
                    />
                ) : (
                    <User size={18} />
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                                    <User size={18} />
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500">ID: {user.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Switch User Section */}
                    <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Switch User
                        </p>
                        <div className="space-y-1">
                            {users.map((u) => (
                                <button
                                    key={u.id}
                                    onClick={() => handleSwitchUser(u.id)}
                                    className={`w-full flex items-center space-x-2 px-2 py-2 rounded text-sm transition-colors ${
                                        currentUserId === u.id
                                            ? 'bg-indigo-50 text-indigo-700 font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {u.avatar ? (
                                        <img
                                            src={u.avatar}
                                            alt={u.name}
                                            className="h-6 w-6 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                            <User size={14} />
                                        </div>
                                    )}
                                    <span>{u.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Items */}
                    <div className="px-2 py-2">
                        <Link
                            to="/settings"
                            onClick={() => setIsOpen(false)}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50 transition-colors"
                        >
                            <Settings size={16} />
                            <span>Account Settings</span>
                        </Link>
                        <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50 transition-colors">
                            <HelpCircle size={16} />
                            <span>Help & Support</span>
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 rounded hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
