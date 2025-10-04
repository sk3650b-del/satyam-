
import React from 'react';
import type { Farmer } from '../types';
import { UsersIcon, AnalyticsIcon, CampaignsIcon, ChevronRightIcon } from './icons';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => (
  <div className={`${color} text-white p-4 rounded-xl shadow-lg flex flex-col justify-between`}>
    <div className="flex items-center space-x-3">
      {icon}
      <span className="font-medium">{title}</span>
    </div>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

interface RecentActivityItemProps {
    farmer: Farmer;
}

const RecentActivityItem: React.FC<RecentActivityItemProps> = ({ farmer }) => {
    const initials = farmer.name.split(' ').map(n => n[0]).join('');
    const colors = ['bg-blue-200 text-blue-800', 'bg-green-200 text-green-800', 'bg-purple-200 text-purple-800', 'bg-orange-200 text-orange-800'];
    const randomColor = colors[farmer.id.charCodeAt(0) % colors.length];

    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${randomColor}`}>
                    {initials}
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{farmer.name}</p>
                    <p className="text-sm text-gray-500">Last active: {farmer.lastActive}</p>
                </div>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </div>
    );
};

interface DashboardProps {
  farmers: Farmer[];
}

const Dashboard: React.FC<DashboardProps> = ({ farmers }) => {
  const recentFarmers = farmers.slice(-3).reverse();

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <DashboardCard title="Total Farmers" value={farmers.length.toString()} icon={<UsersIcon className="w-8 h-8" />} color="bg-blue-500" />
        <DashboardCard title="Premium" value={farmers.filter(f => f.status === 'Premium').length.toString()} icon={<AnalyticsIcon className="w-8 h-8" />} color="bg-green-500" />
        <DashboardCard title="Active Campaigns" value="1" icon={<CampaignsIcon className="w-8 h-8" />} color="bg-purple-500" />
        <DashboardCard title="Messages Sent" value="2.1k" icon={<AnalyticsIcon className="w-8 h-8" />} color="bg-orange-500" />
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Recent Activity</h2>
        <div className="divide-y divide-gray-100">
            {recentFarmers.map(farmer => (
                <RecentActivityItem key={farmer.id} farmer={farmer} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
