import React, { useState } from 'react';
import { X, Truck, Calendar } from 'lucide-react';
import type { AuthorityAssignment } from '../types';

interface AssignRepairModalProps {
  reportId: string;
  onAssign: (assignment: Omit<AuthorityAssignment, 'id' | 'assigned_at'>) => Promise<void>;
  onClose: () => void;
}

export const AssignRepairModal: React.FC<AssignRepairModalProps> = ({ reportId, onAssign, onClose }) => {
  const [department, setDepartment] = useState('Roads Department');
  const [zone, setZone] = useState('North Zone');
  const [team, setTeam] = useState('Road Maintenance Team A');
  const [notes, setNotes] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expectedDate) {
      setError('Please select an expected completion date.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      await onAssign({
        report_id: reportId,
        department,
        zone,
        team,
        notes: `Expected Completion: ${expectedDate}\n${notes}`
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to assign repair');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-purple-600" />
            Assign Repair Team
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select 
              value={department} 
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            >
              <option value="Roads Department">Roads Department</option>
              <option value="Public Works">Public Works</option>
              <option value="Emergency Response">Emergency Response</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
            <select 
              value={zone} 
              onChange={(e) => setZone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            >
              <option value="North Zone">North Zone</option>
              <option value="South Zone">South Zone</option>
              <option value="East Zone">East Zone</option>
              <option value="West Zone">West Zone</option>
              <option value="Central Zone">Central Zone</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Team (Demo)</label>
            <select 
              value={team} 
              onChange={(e) => setTeam(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            >
              <option value="Road Maintenance Team A">Road Maintenance Team A</option>
              <option value="Road Maintenance Team B">Road Maintenance Team B</option>
              <option value="Emergency Road Team">Emergency Road Team</option>
              <option value="Heavy Machinery Unit">Heavy Machinery Unit</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">*Demo maintenance teams for prototype</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-500" />
              Expected Completion Date
            </label>
            <input 
              type="date" 
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none min-h-[80px]"
              placeholder="Instructions for the team..."
            />
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isSubmitting ? 'Assigning...' : 'Assign Team'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
