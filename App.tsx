import React, { useState } from 'react';
import type { Farmer } from './types';
import { FarmerStatus } from './types';
import Dashboard from './components/Dashboard';
import FarmersList from './components/FarmersList';
import AddFarmer from './components/AddFarmer';
import EditFarmer from './components/EditFarmer';
import { 
    MenuIcon, BellIcon, XIcon, DashboardIcon, UsersIcon, 
    CampaignsIcon, AnalyticsIcon, SettingsIcon, PlusCircleIcon 
} from './components/icons';

const mockFarmers: Farmer[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', aadhaar: '1111 1111 1111', address: '123 Farm Lane', status: FarmerStatus.Premium, lastActive: '2024-09-10', dob: '1985-05-15', notes: 'Interested in organic farming techniques.' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '123-456-7891', aadhaar: '2222 2222 2222', address: '456 Farmer Rd', status: FarmerStatus.Regular, lastActive: '2024-09-08', dob: '1992-11-20', notes: '' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '123-456-7892', aadhaar: '3333 3333 3333', address: '789 Cultivator Ave', status: FarmerStatus.Premium, lastActive: '2024-09-09', dob: '1978-02-10', notes: 'Owns a large plot of land.' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', phone: '123-456-7893', aadhaar: '4444 4444 4444', address: '101 Harvest St', status: FarmerStatus.Regular, lastActive: '2024-09-05', dob: '1995-08-30' },
];

type Page = 'dashboard' | 'farmers' | 'campaigns' | 'analytics';

const App: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [farmers, setFarmers] = useState<Farmer[]>(mockFarmers);
    const [showAddFarmer, setShowAddFarmer] = useState(false);
    const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);

    const addFarmer = (farmer: Farmer) => {
        setFarmers(prev => [...prev, farmer]);
        setShowAddFarmer(false);
        setCurrentPage('farmers');
    };

    const handleUpdateFarmer = (updatedFarmer: Farmer) => {
        setFarmers(farmers.map(f => f.id === updatedFarmer.id ? updatedFarmer : f));
        setEditingFarmer(null);
    };

    const handleDeleteFarmer = (farmerId: string) => {
        setFarmers(farmers.filter(f => f.id !== farmerId));
        setEditingFarmer(null);
        setCurrentPage('farmers');
    };

    const renderPage = () => {
        if (editingFarmer) {
            return <EditFarmer 
                        farmer={editingFarmer} 
                        onUpdateFarmer={handleUpdateFarmer} 
                        onDeleteFarmer={handleDeleteFarmer}
                        onCancel={() => setEditingFarmer(null)}
                    />;
        }
        if (showAddFarmer) {
            return <AddFarmer onAddFarmer={addFarmer} setCurrentPage={setCurrentPage} />;
        }
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard farmers={farmers} />;
            case 'farmers':
                return <FarmersList farmers={farmers} onEditFarmer={setEditingFarmer} />;
            case 'campaigns':
                return <div className="p-4 text-center text-xl">Campaigns Page</div>;
            case 'analytics':
                return <div className="p-4 text-center text-xl">Analytics Page</div>;
            default:
                return <Dashboard farmers={farmers} />;
        }
    };
    
    const getPageTitle = () => {
        if (editingFarmer) return 'Edit Farmer';
        if (showAddFarmer) return 'Add Farmer';
        switch(currentPage) {
            case 'dashboard': return 'DataFlow Pro';
            case 'farmers': return 'Users';
            case 'campaigns': return 'Campaigns';
            case 'analytics': return 'Analytics';
            default: return 'DataFlow Pro';
        }
    };

    const handleBottomNavClick = (page: Page) => {
        setShowAddFarmer(false);
        setEditingFarmer(null);
        setCurrentPage(page);
    };
    
    const handleSideNavClick = (page: Page) => {
        setShowAddFarmer(false);
        setEditingFarmer(null);
        setCurrentPage(page);
        setSidebarOpen(false);
    };

    const showAddFarmerPage = () => {
        setEditingFarmer(null);
        setCurrentPage('farmers');
        setShowAddFarmer(true);
    }


    return (
        <div className="h-screen w-screen bg-slate-100 flex flex-col font-sans max-w-md mx-auto shadow-2xl relative">
             <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} currentPage={currentPage} setCurrentPage={handleSideNavClick} />
            
             <Header 
                title={getPageTitle()}
                onMenuClick={() => setSidebarOpen(true)}
             />

            <main className="flex-1 overflow-y-auto pb-20">
                {renderPage()}
            </main>

            {currentPage === 'farmers' && !showAddFarmer && !editingFarmer && (
                 <button 
                    onClick={showAddFarmerPage}
                    className="absolute bottom-24 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label="Add new farmer"
                >
                    <PlusCircleIcon className="w-8 h-8" />
                 </button>
            )}

            <BottomNav currentPage={currentPage} onNavClick={handleBottomNavClick} />
        </div>
    );
};

// --- Sub-components defined in the same file for simplicity ---

const Header: React.FC<{ title: string; onMenuClick: () => void; }> = ({ title, onMenuClick }) => (
    <header className="bg-white flex items-center justify-between p-4 shadow-sm z-10 sticky top-0">
        <button onClick={onMenuClick}>
            <MenuIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">2</span>
        </div>
    </header>
);

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, setCurrentPage }) => {
    return (
         <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="font-bold text-xl">Menu</h2>
                    <button onClick={onClose}>
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    <NavItem icon={<DashboardIcon className="w-5 h-5" />} label="Dashboard" page="dashboard" currentPage={currentPage} onClick={setCurrentPage} />
                    <NavItem icon={<UsersIcon className="w-5 h-5" />} label="Users" page="farmers" currentPage={currentPage} onClick={setCurrentPage} />
                    <NavItem icon={<CampaignsIcon className="w-5 h-5" />} label="Campaigns" page="campaigns" currentPage={currentPage} onClick={setCurrentPage} />
                    <NavItem icon={<AnalyticsIcon className="w-5 h-5" />} label="Analytics" page="analytics" currentPage={currentPage} onClick={setCurrentPage} />
                    <div className="border-t my-4"></div>
                    <NavItem icon={<BellIcon className="w-5 h-5" />} label="Notifications" hasBadge={true} />
                    <NavItem icon={<SettingsIcon className="w-5 h-5" />} label="Settings" />
                </nav>
            </div>
         </>
    );
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    page?: Page;
    currentPage?: Page;
    onClick?: (page: Page) => void;
    hasBadge?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, currentPage, onClick, hasBadge }) => {
    const isActive = page && currentPage === page;
    return (
        <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); if (onClick && page) onClick(page); }}
            className={`flex items-center space-x-3 p-2 rounded-lg ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
        >
            {icon}
            <span>{label}</span>
            {hasBadge && <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">2</span>}
        </a>
    );
};


const BottomNav: React.FC<{ currentPage: Page; onNavClick: (page: Page) => void; }> = ({ currentPage, onNavClick }) => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around max-w-md mx-auto">
        <BottomNavItem icon={<DashboardIcon />} label="Dashboard" page="dashboard" currentPage={currentPage} onClick={onNavClick} />
        <BottomNavItem icon={<UsersIcon />} label="Users" page="farmers" currentPage={currentPage} onClick={onNavClick} />
        <BottomNavItem icon={<CampaignsIcon />} label="Campaigns" page="campaigns" currentPage={currentPage} onClick={onNavClick} />
        <BottomNavItem icon={<AnalyticsIcon />} label="Analytics" page="analytics" currentPage={currentPage} onClick={onNavClick} />
    </nav>
);

interface BottomNavItemProps {
    // FIX: Specify a more specific type for the icon prop to resolve the `React.cloneElement` error.
    icon: React.ReactElement<{ className?: string }>;
    label: string;
    page: Page;
    currentPage: Page;
    onClick: (page: Page) => void;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({ icon, label, page, currentPage, onClick }) => {
    const isActive = currentPage === page;
    const color = isActive ? 'text-blue-600' : 'text-gray-500';
    return (
        <button onClick={() => onClick(page)} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 ${color}`}>
            {React.cloneElement(icon, { className: 'w-6 h-6 mb-1' })}
            <span className="text-xs">{label}</span>
        </button>
    );
};

export default App;