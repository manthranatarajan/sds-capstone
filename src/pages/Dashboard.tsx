import React from 'react';
import HealthAlerts from '../components/dashboard/HealthAlerts';
import TicketSummary from '../components/dashboard/TicketSummary';
import TicketsChart from '../components/dashboard/TicketsChart';

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </div>

            <TicketSummary />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-80">
                    <TicketsChart />
                </div>
                <div>
                    <HealthAlerts />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
