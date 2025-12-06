import React, { useState } from 'react';
import { Save, Moon, Bell, Lock, Palette, Download, RotateCcw } from 'lucide-react';
import { useStore } from '../store/store';

const Settings: React.FC = () => {
    const { users, currentUserId } = useStore();
    const currentUser = users.find((u) => u.id === currentUserId);

    // Theme and Notification Settings
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [weeklyDigest, setWeeklyDigest] = useState(true);

    // Display Settings
    const [ticketsPerPage, setTicketsPerPage] = useState('20');
    const [defaultView, setDefaultView] = useState('board');
    const [compactView, setCompactView] = useState(false);

    // Account Settings
    const [email, setEmail] = useState('user@example.com');
    const [fullName, setFullName] = useState(currentUser?.name || '');

    // Save notifications
    const [saveMessage, setSaveMessage] = useState('');

    const handleSaveGeneral = () => {
        setSaveMessage('Settings saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    const handleSaveNotifications = () => {
        setSaveMessage('Notification preferences saved!');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    const handleSaveDisplay = () => {
        setSaveMessage('Display settings saved!');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    const handleExportData = () => {
        const data = {
            exportDate: new Date().toISOString(),
            user: currentUser,
            settings: {
                isDarkMode,
                emailNotifications,
                pushNotifications,
                weeklyDigest,
                ticketsPerPage,
                defaultView,
                compactView,
            },
        };
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `jira-settings-${new Date().getTime()}.json`;
        link.click();
        setSaveMessage('Settings exported successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    const handleResetSettings = () => {
        if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
            setIsDarkMode(false);
            setEmailNotifications(true);
            setPushNotifications(true);
            setWeeklyDigest(true);
            setTicketsPerPage('20');
            setDefaultView('board');
            setCompactView(false);
            setSaveMessage('Settings reset to defaults!');
            setTimeout(() => setSaveMessage(''), 3000);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            </div>

            {saveMessage && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    ✓ {saveMessage}
                </div>
            )}

            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
                </div>
                <div className="px-6 py-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="your.email@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
                        <input
                            type="text"
                            value={currentUser?.name || 'Not assigned'}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        />
                    </div>
                    <button
                        onClick={handleSaveGeneral}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Save size={18} />
                        Save Account Settings
                    </button>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Bell size={20} />
                        Notification Preferences
                    </h2>
                </div>
                <div className="px-6 py-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                            <p className="text-xs text-gray-500">Receive email updates about your tickets</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={emailNotifications}
                                onChange={(e) => setEmailNotifications(e.target.checked)}
                                className="w-5 h-5 text-indigo-600 rounded"
                            />
                        </label>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                                <p className="text-xs text-gray-500">Get browser notifications</p>
                            </div>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={pushNotifications}
                                    onChange={(e) => setPushNotifications(e.target.checked)}
                                    className="w-5 h-5 text-indigo-600 rounded"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Weekly Digest</p>
                                <p className="text-xs text-gray-500">Receive weekly summary of activity</p>
                            </div>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={weeklyDigest}
                                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                                    className="w-5 h-5 text-indigo-600 rounded"
                                />
                            </label>
                        </div>
                    </div>
                    <button
                        onClick={handleSaveNotifications}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors mt-4"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>

            {/* Display Settings */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Palette size={20} />
                        Display Settings
                    </h2>
                </div>
                <div className="px-6 py-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
                        <select
                            value={defaultView}
                            onChange={(e) => setDefaultView(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="board">Kanban Board</option>
                            <option value="calendar">Calendar</option>
                            <option value="sprints">Sprints</option>
                            <option value="dashboard">Dashboard</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tickets Per Page</label>
                        <select
                            value={ticketsPerPage}
                            onChange={(e) => setTicketsPerPage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <div>
                            <p className="text-sm font-medium text-gray-900">Compact View</p>
                            <p className="text-xs text-gray-500">Show more tickets with less space</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={compactView}
                                onChange={(e) => setCompactView(e.target.checked)}
                                className="w-5 h-5 text-indigo-600 rounded"
                            />
                        </label>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <div>
                            <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                <Moon size={16} />
                                Dark Mode
                            </p>
                            <p className="text-xs text-gray-500">Coming soon</p>
                        </div>
                        <label className="flex items-center cursor-pointer opacity-50">
                            <input
                                type="checkbox"
                                disabled
                                checked={isDarkMode}
                                className="w-5 h-5 text-indigo-600 rounded"
                            />
                        </label>
                    </div>
                    <button
                        onClick={handleSaveDisplay}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors mt-4"
                    >
                        Save Display Settings
                    </button>
                </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Lock size={20} />
                        Security
                    </h2>
                </div>
                <div className="px-6 py-6 space-y-3">
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                        Change Password
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                        Enable Two-Factor Authentication
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                        View Active Sessions
                    </button>
                </div>
            </div>

            {/* Data & Privacy */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Data & Privacy</h2>
                </div>
                <div className="px-6 py-6 space-y-3">
                    <button
                        onClick={handleExportData}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                        <Download size={16} />
                        Export My Data
                    </button>
                    <button
                        onClick={handleResetSettings}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={16} />
                        Reset All Settings
                    </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-red-200">
                    <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
                </div>
                <div className="px-6 py-6">
                    <p className="text-sm text-red-700 mb-3">Once you delete your account, there is no going back.</p>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
