'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Booking } from '../types';
import { bookingsAPI } from '../utils/api';
import TimeSlotPicker from '../components/TimeSlotPicker';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';
import { ArrowLeft, Edit2, Trash2, Calendar, Clock, Users, Building, Mail, Phone } from 'lucide-react';

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [user, setUser] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; bookingId: string | null }>({
    isOpen: false,
    bookingId: null
  });

  useEffect(() => {
    const init = async () => {
      checkAuth();
      // Only load bookings if user is logged in
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        await loadMyBookings();
      } else {
        // If no token, redirect to login
        router.push('/meeting-room');
      }
    };
    init();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/meeting-room');
      return;
    }
    
    setUser(JSON.parse(userData));
  };

  const loadMyBookings = async () => {
    try {
      setLoading(true);
      const result = await bookingsAPI.getMyBookings();
      if (result.status === 'success') {
        setBookings(result.data?.bookings || []);
      } else {
        setBookings([]);
      }
    } catch (error: any) {
      console.error('Error loading bookings:', error);
      setBookings([]);
      
      // If user is not logged in, show empty state and redirect
      if (error?.message?.includes('logged in') || error?.message?.includes('401') || error?.message?.includes('must be logged')) {
        toast.error('Please log in to view your bookings');
        setTimeout(() => {
          router.push('/meeting-room');
        }, 1500);
      } else if (error?.message?.includes('404') || error?.message?.includes('Cannot GET') || error?.message?.includes('unavailable') || error?.message?.includes('connect to server')) {
        // Server route not found or server down
        toast.error('Service temporarily unavailable. Please check if the backend server is running.');
        console.error('Backend server may be down. Check:', error);
      } else {
        toast.error(error?.message || 'Failed to load bookings. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm({ isOpen: true, bookingId: id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.bookingId) return;

    try {
      const result = await bookingsAPI.deleteMyBooking(deleteConfirm.bookingId);
      if (result.status === 'success') {
        setBookings(bookings.filter(b => b._id !== deleteConfirm.bookingId));
        toast.success('Booking deleted successfully');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete booking');
    } finally {
      setDeleteConfirm({ isOpen: false, bookingId: null });
    }
  };

  const handleEdit = (booking: Booking) => {
    console.log('Editing booking:', booking);
    if (!booking || !booking._id) {
      toast.error('Invalid booking data');
      return;
    }
    setEditingBooking(booking);
    console.log('Edit modal should open now');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isPastBooking = (endTime: string) => {
    const bookingEnd = new Date(endTime);
    const now = new Date();
    // A booking is past only if the end time has completely passed
    return bookingEnd < now;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-20 sm:pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f37121] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-4 pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => router.push('/meeting-room')}
                  className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 border border-gray-600 text-xs sm:text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                My Bookings
              </h1>
              <p className="text-gray-400 mt-2 text-sm">
                Manage and edit your meeting room bookings
              </p>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-700 text-center">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-300 mb-2">No Bookings Yet</h2>
            <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
            <button
              onClick={() => router.push('/meeting-room')}
              className="bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
            >
              Book a Meeting Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {bookings.map((booking) => {
              const isPast = isPastBooking(booking.endTime);
              return (
                <div
                  key={booking._id}
                  className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border ${
                    isPast ? 'border-gray-700 opacity-60' : 'border-gray-700'
                  } p-4 sm:p-6 transition-all duration-200 hover:shadow-xl`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          booking.roomType === 'small' 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/50' 
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                        }`}>
                          {booking.roomType === 'small' ? 'Small Room' : 'Large Room'}
                        </span>
                        {isPast && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-400 border border-gray-600">
                            Past
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {formatDate(booking.startTime)}
                      </h3>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock className="w-4 h-4 text-[#f37121]" />
                      <span>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="w-4 h-4 text-[#f37121]" />
                      <span>{booking.numberOfAttendees} attendees</span>
                    </div>

                    <div className="border-t border-gray-700 pt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Building className="w-4 h-4 text-[#f37121]" />
                        <span>{booking.contactPerson.company}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Mail className="w-4 h-4 text-[#f37121]" />
                        <span>{booking.contactPerson.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Phone className="w-4 h-4 text-[#f37121]" />
                        <span>{booking.contactPerson.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions - Always show for all bookings */}
                  <div className="flex gap-2 pt-4 border-t border-gray-700">
                    <button
                      onClick={() => {
                        if (!isPast) {
                          handleEdit(booking);
                        } else {
                          toast.error("Cannot edit past bookings");
                        }
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm ${
                        isPast 
                          ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      title={isPast ? "Cannot edit past bookings" : "Edit booking"}
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(booking._id)}
                      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
                      title="Delete booking"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Edit Modal */}
        {editingBooking && editingBooking._id && (
          <TimeSlotPicker
            onClose={() => {
              console.log('Closing edit modal');
              setEditingBooking(null);
            }}
            onBookingSuccess={() => {
              console.log('Booking updated successfully');
              setEditingBooking(null);
              // Force refresh to show updated bookings
              setTimeout(() => {
                loadMyBookings();
              }, 500);
            }}
            selectedDate={new Date(editingBooking.startTime)}
            onDateChange={() => {}}
            initialData={{
              startTime: editingBooking.startTime,
              endTime: editingBooking.endTime,
              numberOfAttendees: editingBooking.numberOfAttendees,
              contactPerson: editingBooking.contactPerson || {
                name: '',
                phone: '',
                company: ''
              },
              roomType: editingBooking.roomType
            }}
            isEditMode={true}
            bookingId={editingBooking._id}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={deleteConfirm.isOpen}
          onClose={() => setDeleteConfirm({ isOpen: false, bookingId: null })}
          onConfirm={handleDeleteConfirm}
          title="Delete Booking"
          message="Are you sure you want to delete this booking? This action cannot be undone."
          type="danger"
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}

