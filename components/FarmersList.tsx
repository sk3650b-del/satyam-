import React, { useState, useMemo } from 'react';
import type { Farmer } from '../types';
import { FarmerStatus } from '../types';
import { SearchIcon, ChevronRightIcon } from './icons';

interface FarmerListItemProps {
    farmer: Farmer;
    onClick: () => void;
}

const FarmerListItem: React.FC<FarmerListItemProps> = ({ farmer, onClick }) => {
    const initials = farmer.name.split(' ').map(n => n[0]).join('');
    const initialsColors = ['bg-blue-200 text-blue-800', 'bg-green-200 text-green-800', 'bg-purple-200 text-purple-800', 'bg-orange-200 text-orange-800', 'bg-pink-200 text-pink-800', 'bg-indigo-200 text-indigo-800'];
    const randomInitialsColor = initialsColors[farmer.id.charCodeAt(0) % initialsColors.length];

    const statusColors = {
        [FarmerStatus.Premium]: 'bg-green-100 text-green-800',
        [FarmerStatus.Regular]: 'bg-yellow-100 text-yellow-800',
    };

    return (
        <button onClick={onClick} className="w-full text-left bg-white p-4 rounded-xl shadow-md mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${randomInitialsColor} flex-shrink-0`}>
                    {initials}
                </div>
                <div className="flex-grow">
                    <p className="font-bold text-gray-900">{farmer.name}</p>
                    <p className="text-sm text-gray-500">{farmer.email}</p>
                    {farmer.notes && (
                        <p className="text-xs text-gray-400 italic mt-1 max-w-xs truncate">
                            &ldquo;{farmer.notes}&rdquo;
                        </p>
                    )}
                     <p className="text-xs text-gray-400 mt-1">Last active: {farmer.lastActive}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[farmer.status]}`}>
                    {farmer.status}
                </span>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </div>
        </button>
    );
};

interface FarmersListProps {
  farmers: Farmer[];
  onEditFarmer: (farmer: Farmer) => void;
}

const FarmersList: React.FC<FarmersListProps> = ({ farmers, onEditFarmer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | FarmerStatus>('all');

  const filteredFarmers = useMemo(() => {
    return farmers
      .filter(farmer => {
        if (statusFilter === 'all') return true;
        return farmer.status === statusFilter;
      })
      .filter(farmer =>
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [farmers, searchTerm, statusFilter]);

  const FilterButton: React.FC<{ label: string; value: 'all' | FarmerStatus }> = ({ label, value }) => (
    <button
        onClick={() => setStatusFilter(value)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === value ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
    >
        {label}
    </button>
  );

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="flex space-x-2 mb-6 p-1 bg-gray-100 rounded-full">
        <FilterButton label="All" value="all" />
        <FilterButton label="Premium" value={FarmerStatus.Premium} />
        <FilterButton label="Regular" value={FarmerStatus.Regular} />
      </div>

      <div className="space-y-3">
        {filteredFarmers.length > 0 ? (
            filteredFarmers.map(farmer => (
                <FarmerListItem key={farmer.id} farmer={farmer} onClick={() => onEditFarmer(farmer)} />
            ))
        ) : (
            <p className="text-center text-gray-500 mt-8">No farmers found.</p>
        )}
      </div>
    </div>
  );
};

export default FarmersList;