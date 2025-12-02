import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useStore } from '../../store/store';
import type { Alert } from '../../types';
import clsx from 'clsx';

const HealthAlerts: React.FC = () => {
    const { alerts, clearAlert } = useStore();

    if (alerts.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
                <div className="flex items-center justify-center h-32 text-gray-500">
                    <div className="text-center">
                        <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                        <p>All systems operational</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health Alerts</h2>
            <div className="space-y-3">
                {alerts.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} onDismiss={() => clearAlert(alert.id)} />
                ))}
            </div>
        </div>
    );
};

const AlertItem: React.FC<{ alert: Alert; onDismiss: () => void }> = ({ alert, onDismiss }) => {
    const icon = {
        info: <Info className="h-5 w-5 text-blue-500" />,
        warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
        error: <XCircle className="h-5 w-5 text-red-500" />,
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
    }[alert.type];

    const bgColor = {
        info: 'bg-blue-50 border-blue-100',
        warning: 'bg-yellow-50 border-yellow-100',
        error: 'bg-red-50 border-red-100',
        success: 'bg-green-50 border-green-100',
    }[alert.type];

    return (
        <div className={clsx('flex items-start p-4 rounded-lg border', bgColor)}>
            <div className="flex-shrink-0">{icon}</div>
            <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
                <p className="mt-1 text-xs text-gray-400">{new Date(alert.timestamp).toLocaleString()}</p>
            </div>
            <button
                onClick={onDismiss}
                className="ml-auto -mx-1.5 -my-1.5 p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default HealthAlerts;
