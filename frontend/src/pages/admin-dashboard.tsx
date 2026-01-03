
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminBooking, User, BookingFormData } from '../types';
import { adminAPI } from '../utils/api';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [editFormData, setEditFormData] = useState<BookingFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; bookingId: string | null }>({
    isOpen: false,
    bookingId: null
  });

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  const loadData = async () => {
    try {
      const [bookingsRes, usersRes] = await Promise.all([
        adminAPI.getAllBookings(),
        adminAPI.getAllUsers()
      ]);

      if (bookingsRes.status === 'success') {
        setBookings(bookingsRes.data.bookings);
      }

      if (usersRes.status === 'success') {
        setUsers(usersRes.data.users);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBookingClick = (id: string) => {
    setDeleteConfirm({ isOpen: true, bookingId: id });
  };

  const handleDeleteBooking = async () => {
    if (!deleteConfirm.bookingId) return;

    try {
      const result = await adminAPI.deleteBooking(deleteConfirm.bookingId);
      if (result.status === 'success') {
        setBookings(bookings.filter(booking => booking._id !== deleteConfirm.bookingId));
        setRefreshTrigger(prev => prev + 1);
        toast.success('Booking deleted successfully');
      } else {
        toast.error(result.message || 'Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    } finally {
      setDeleteConfirm({ isOpen: false, bookingId: null });
    }
  };

  const handleEditBooking = (booking: AdminBooking) => {
    setSelectedBooking(booking);
    
    const formatForDateTimeLocal = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16);
    };

    setEditFormData({
      startTime: formatForDateTimeLocal(booking.startTime),
      endTime: formatForDateTimeLocal(booking.endTime),
      numberOfAttendees: booking.numberOfAttendees,
      contactPerson: booking.contactPerson,
      roomType: booking.roomType
    });
    setShowEditModal(true);
  };

  const handleUpdateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !editFormData) return;

    try {
      const updateData = {
        ...editFormData,
        startTime: new Date(editFormData.startTime).toISOString(),
        endTime: new Date(editFormData.endTime).toISOString()
      };

      const result = await adminAPI.updateBooking(selectedBooking._id, updateData);
      if (result.status === 'success') {
        setBookings(bookings.map(booking => 
          booking._id === selectedBooking._id ? result.data.booking : booking
        ));
        setShowEditModal(false);
        setSelectedBooking(null);
        setEditFormData(null);
        setRefreshTrigger(prev => prev + 1);
        toast.success('Booking updated successfully');
      } else {
        toast.error(result.message || 'Failed to update booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  };

  const handleContactPersonChange = (field: keyof typeof editFormData.contactPerson, value: string) => {
    if (editFormData) {
      setEditFormData(prev => ({
        ...prev!,
        contactPerson: {
          ...prev!.contactPerson,
          [field]: value
        }
      }));
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setRefreshTrigger(prev => prev + 1);
  };

  const getRoomTypeColor = (roomType: string) => {
    return roomType === 'large' ? 'bg-blue-900/50 text-blue-300 border-blue-700/50' : 'bg-green-900/50 text-green-300 border-green-700/50';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f37121] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 pt-20 sm:pt-24">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#f37121]/10 via-transparent to-[#f37121]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - أصغر وأكثر تنظيماً */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 mb-4 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-400 mt-1">Manage bookings and users</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleRefresh}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-all border border-gray-600"
              >
                🔄 Refresh
              </button>
              <Link 
                href="/meeting-room"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-all border border-blue-500/50 text-center"
              >
                📅 Bookings
              </Link>
              <Link 
                href="/user-management"
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-all border border-green-500/50"
              >
                👥 Users
              </Link>
              <Link 
                href="/analytics"
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-all border border-purple-500/50"
              >
                📊 Analytics
              </Link>
            </div>
          </div>
        </div>
        
        {/* Statistics - أصغر */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow border border-gray-700 hover:border-[#f37121]/40 transition-all">
            <h3 className="text-xs font-medium text-gray-400 mb-1">Total Bookings</h3>
            <p className="text-2xl font-bold text-[#f37121]">{bookings.length}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow border border-gray-700 hover:border-green-500/40 transition-all">
            <h3 className="text-xs font-medium text-gray-400 mb-1">Total Users</h3>
            <p className="text-2xl font-bold text-green-400">{users.length}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow border border-gray-700 hover:border-blue-500/40 transition-all">
            <h3 className="text-xs font-medium text-gray-400 mb-1">Small Room</h3>
            <p className="text-2xl font-bold text-blue-400">
              {bookings.filter(b => b.roomType === 'small').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow border border-gray-700 hover:border-orange-400/40 transition-all">
            <h3 className="text-xs font-medium text-gray-400 mb-1">Large Room</h3>
            <p className="text-2xl font-bold text-orange-400">
              {bookings.filter(b => b.roomType === 'large').length}
            </p>
          </div>
        </div>

        {/* Bookings Table - أصغر وأكثر تنظيماً */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-700">
          <div className="px-4 py-3 border-b border-gray-700 bg-gray-800/50">
            <h2 className="text-lg font-semibold text-[#f37121]">All Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Company & Contact</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Time & Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Room</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Booked By</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {bookings.map(booking => (
                  <tr key={booking._id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-white">{booking.contactPerson.company}</div>
                      <div className="text-xs text-gray-400">{booking.contactPerson.name} • {booking.contactPerson.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-white">{new Date(booking.startTime).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(booking.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 inline-flex text-xs font-medium rounded ${getRoomTypeColor(booking.roomType)}`}>
                          {booking.roomType === 'small' ? 'Small' : 'Large'}
                        </span>
                        <span className="text-xs text-gray-400">{booking.numberOfAttendees} people</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-white">{booking.user?.fullName || "Unknown"}</div>
                      <div className="text-xs text-gray-400">{booking.user?.email || ""}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 inline-flex text-xs font-medium rounded ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-900/50 text-green-300 border border-green-700/50' 
                          : 'bg-red-900/50 text-red-300 border border-red-700/50'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBooking(booking)}
                          className="text-[#f37121] hover:text-orange-400 transition-colors text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBookingClick(booking._id)}
                          className="text-red-400 hover:text-red-300 transition-colors text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal - أصغر */}
        {showEditModal && selectedBooking && editFormData && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-lg font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                  Edit Booking
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-[#f37121] text-xl font-bold transition-colors"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUpdateBooking} className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Start Time</label>
                    <input
                      type="datetime-local"
                      value={editFormData.startTime}
                      onChange={(e) => setEditFormData({...editFormData, startTime: e.target.value})}
                      className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">End Time</label>
                    <input
                      type="datetime-local"
                      value={editFormData.endTime}
                      onChange={(e) => setEditFormData({...editFormData, endTime: e.target.value})}
                      className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Room Type</label>
                    <select
                      value={editFormData.roomType || 'small'}
                      onChange={(e) => setEditFormData({...editFormData, roomType: e.target.value as 'small' | 'large'})}
                      className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                    >
                      <option value="small">Small Room</option>
                      <option value="large">Large Room</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Attendees</label>
                    <input
                      type="number"
                      value={editFormData.numberOfAttendees}
                      onChange={(e) => setEditFormData({...editFormData, numberOfAttendees: parseInt(e.target.value)})}
                      min="1"
                      max={editFormData.roomType === 'small' ? '10' : '30'}
                      className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                      required
                    />
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-3">
                  <h3 className="text-sm font-semibold text-[#f37121] mb-3">Contact Person</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editFormData.contactPerson.name}
                        onChange={(e) => handleContactPersonChange('name', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={editFormData.contactPerson.phone}
                        onChange={(e) => handleContactPersonChange('phone', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Company</label>
                      <input
                        type="text"
                        value={editFormData.contactPerson.company}
                        onChange={(e) => handleContactPersonChange('company', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all border border-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, bookingId: null })}
        onConfirm={handleDeleteBooking}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}