import React, { useState, useEffect } from 'react';
import type { Farmer } from '../types';
import { FarmerStatus } from '../types';

interface EditFarmerProps {
  farmer: Farmer;
  onUpdateFarmer: (farmer: Farmer) => void;
  onDeleteFarmer: (farmerId: string) => void;
  onCancel: () => void;
}

const EditFarmer: React.FC<EditFarmerProps> = ({ farmer, onUpdateFarmer, onDeleteFarmer, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FarmerStatus>(FarmerStatus.Regular);
  const [dob, setDob] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setName(farmer.name);
    setPhone(farmer.phone);
    setAadhaar(farmer.aadhaar);
    setAddress(farmer.address);
    setEmail(farmer.email);
    setStatus(farmer.status);
    setDob(farmer.dob);
    setNotes(farmer.notes || '');
  }, [farmer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !aadhaar || !address || !email || !dob) {
        alert("Please fill all required fields.");
        return;
    };

    const updatedFarmer: Farmer = {
      ...farmer,
      name,
      phone,
      aadhaar,
      address,
      email,
      status,
      dob,
      notes,
    };
    onUpdateFarmer(updatedFarmer);
    alert('Farmer updated successfully!');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this farmer? This action cannot be undone.')) {
      onDeleteFarmer(farmer.id);
      alert('Farmer deleted.');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Farmer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
          <input
            type="text"
            id="aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as FarmerStatus)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                <option>{FarmerStatus.Regular}</option>
                <option>{FarmerStatus.Premium}</option>
            </select>
        </div>
        <div className="space-y-3 pt-4">
            <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Update Farmer
            </button>
            <button
                type="button"
                onClick={handleDelete}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Delete Farmer
            </button>
             <button
                type="button"
                onClick={onCancel}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Cancel
            </button>
        </div>
      </form>
    </div>
  );
};

export default EditFarmer;