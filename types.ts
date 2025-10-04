export enum Page {
  Dashboard = 'DASHBOARD',
  Farmers = 'FARMERS',
  Campaigns = 'CAMPAIGNS',
  Analytics = 'ANALYTICS',
}

export enum FarmerStatus {
    Premium = 'Premium',
    Regular = 'Regular',
}

export interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  aadhaar: string;
  address: string;
  status: FarmerStatus;
  lastActive: string; // ISO date string
  dob: string; // YYYY-MM-DD
  notes?: string;
}