'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ActivityLog {
  id: number;
  action: string;
  description: string;
  timestamp: string;
  type: 'login' | 'property' | 'transaction' | 'document' | 'profile';
  ipAddress?: string;
  device?: string;
}

export default function ActivityPage() {
  const [activities] = useState<ActivityLog[]>([
    {
      id: 1,
      action: 'Login',
      description: 'Successful login from new device',
      timestamp: '2025-11-13T10:30:00',
      type: 'login',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
    },
    {
      id: 2,
      action: 'Property Added',
      description: 'Added new property: 789 Pine Road',
      timestamp: '2025-11-13T09:15:00',
      type: 'property',
    },
    {
      id: 3,
      action: 'Transaction Created',
      description: 'Recorded expense: Plumbing repair - $850.00',
      timestamp: '2025-11-12T16:45:00',
      type: 'transaction',
    },
    {
      id: 4,
      action: 'Document Uploaded',
      description: 'Uploaded lease agreement for 123 Main Street',
      timestamp: '2025-11-12T14:20:00',
      type: 'document',
    },
    {
      id: 5,
      action: 'Profile Updated',
      description: 'Changed email address',
      timestamp: '2025-11-11T11:00:00',
      type: 'profile',
    },
    {
      id: 6,
      action: 'Login',
      description: 'Successful login',
      timestamp: '2025-11-11T08:30:00',
      type: 'login',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
    },
    {
      id: 7,
      action: 'Transaction Created',
      description: 'Recorded income: Monthly rent - $2,500.00',
      timestamp: '2025-11-10T10:00:00',
      type: 'transaction',
    },
    {
      id: 8,
      action: 'Property Updated',
      description: 'Updated property details for 456 Oak Avenue',
      timestamp: '2025-11-09T15:30:00',
      type: 'property',
    },
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
        );
      case 'property':
        return (
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        );
      case 'transaction':
        return (
          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'document':
        return (
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'profile':
        return (
          <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Activity Log</h1>
        <p className="text-gray-500">Track your recent activities and login history</p>
      </div>

      <Card className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6">
            <div className="flex items-start space-x-4">
              {getActivityIcon(activity.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                {(activity.ipAddress || activity.device) && (
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    {activity.ipAddress && (
                      <span className="flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        {activity.ipAddress}
                      </span>
                    )}
                    {activity.device && (
                      <span className="flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {activity.device}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500">
                {formatTimestamp(activity.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </Card>

      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-start">
          <svg className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-yellow-900">Security Notice</h3>
            <p className="text-sm text-yellow-700 mt-1">
              If you notice any suspicious activity, please contact support immediately and change your password.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
