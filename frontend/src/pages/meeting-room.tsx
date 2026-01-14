'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Booking } from '../types';
import { bookingsAPI } from '../utils/api';
import LoginForm from '../components/LoginForm';
import TimeSlotPicker from '../components/TimeSlotPicker';
import ScheduleGrid from '../components/ScheduleGrid';
import DateSelector from '../components/DateSelector';
import ChangePassword from '../components/ChangePassword';
import { ArrowLeft } from 'lucide-react';

export default function MeetingRoomPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoomType, setSelectedRoomType] = useState<'small' | 'large' | 'both'>('both');
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    checkAuth();

    // تحميل البيانات فقط إذا كان المستخدم مسجل دخول
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      loadInitialBookings();
    } else {
      // إذا لم يكن هناك token، نوقف الـ loading فورًا
      setLoading(false);
    }
    
    // Set up interval to refresh bookings every 30 seconds
    const interval = setInterval(() => {
      if (isLoggedIn) {
        refreshBookings();
      }
    }, 30000);

    // Listen for change password events
    const handleShowChangePassword = () => setShowChangePassword(true);
    const handleCloseChangePassword = () => setShowChangePassword(false);
    window.addEventListener('showChangePassword', handleShowChangePassword);
    window.addEventListener('closeChangePassword', handleCloseChangePassword);

    return () => {
      clearInterval(interval);
      window.removeEventListener('showChangePassword', handleShowChangePassword);
      window.removeEventListener('closeChangePassword', handleCloseChangePassword);
    };
  }, [isLoggedIn]);

  const checkAuth = () => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const loadInitialBookings = async () => {
    // التحقق من وجود token قبل المحاولة
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // تحسين الأداء: استخدام timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const result = await Promise.race([
        bookingsAPI.getAll(),
        timeoutPromise
      ]) as any;
      
      if (result.status === 'success') {
        setBookings(result.data.bookings);
      }
    } catch (error: any) {
      // إذا كان الخطأ متعلق بالمصادقة، نتجاهله (المستخدم غير مسجل دخول)
      if (error?.message?.includes('not logged in') || error?.message?.includes('401')) {
        console.log('User not authenticated, skipping bookings load');
        setBookings([]);
      } else {
        console.error('Error fetching bookings:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshBookings = async () => {
    // التحقق من وجود token قبل المحاولة
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      return;
    }

    try {
      const result = await bookingsAPI.getAll();
      if (result.status === 'success') {
        setBookings(result.data.bookings);
        setLastUpdate(new Date());
      }
    } catch (error: any) {
      // إذا كان الخطأ متعلق بالمصادقة، نتجاهله
      if (error?.message?.includes('not logged in') || error?.message?.includes('401')) {
        console.log('User not authenticated, skipping refresh');
        setBookings([]);
      } else {
        console.error('Error fetching bookings:', error);
      }
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setIsLoggedIn(false);
    setUser(null);
    setBookings([]); // مسح البيانات بعد logout
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f37121] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Meeting Room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-4 pt-20 sm:pt-24">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#f37121]/10 via-transparent to-[#f37121]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => router.push('/display')}
                  className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 border border-gray-600 text-xs sm:text-sm"
                  title="Back to Display"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Display</span>
                  <span className="sm:hidden">Back</span>
                </button>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                Meeting Room Booking
              </h1>
              <p className="text-gray-400 mt-2 text-sm">View and book available time slots</p>
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
            
            {isLoggedIn && user && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <span className="text-gray-300 bg-gray-700/50 px-2 sm:px-3 py-1 rounded-lg border border-gray-600 text-sm">
                  Welcome, {user.fullName}
                </span>
                
                {user.role === 'admin' && (
                  <Link 
                    href="/admin-dashboard"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-purple-500/50 text-sm"
                  >
                    Admin
                  </Link>
                )}
                
                <Link
                  href="/my-bookings"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500/50 text-sm"
                >
                  My Bookings
                </Link>
                
                <button
                  onClick={() => {
                    const changePasswordEvent = new CustomEvent('showChangePassword');
                    window.dispatchEvent(changePasswordEvent);
                  }}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-green-500/50 text-sm"
                >
                  Change Password
                </button>
                
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-red-500/50 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Login Section */}
        {!isLoggedIn && (
          <LoginForm onLogin={() => {
            setIsLoggedIn(true);
            const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
            if (userData) setUser(JSON.parse(userData));
            refreshBookings();
          }} />
        )}

        

        {/* Booking Controls */}
        {isLoggedIn && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 mb-6 border border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-semibold text-[#f37121]">
                Meeting Room Schedule
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={refreshBookings}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-500/50"
                >
                  Refresh
                </button>
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-orange-400/50"
                >
                  Book Meeting Room
                </button>
              </div>
            </div>
          </div>
        )}

{/* Date Selector */}
        {isLoggedIn && (
          <DateSelector 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate}
          />
        )}


        {/* Time Slot Picker Modal */}
        {showBookingForm && (
          <TimeSlotPicker 
            onClose={() => setShowBookingForm(false)}
            onBookingSuccess={() => {
              setShowBookingForm(false);
              refreshBookings();
              // Force refresh to show updated bookings
              setTimeout(() => {
                refreshBookings();
              }, 500);
            }}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        )}

        {/* Schedule Grid مع أزرار الغرف */}
        {isLoggedIn && (
          <ScheduleGrid 
            bookings={bookings} 
            selectedDate={selectedDate}
            selectedRoomType={selectedRoomType}
            onRoomTypeChange={setSelectedRoomType}
            showRoomButtons={true}
          />
        )}

        {/* Change Password Modal */}
        {showChangePassword && user && (
          <ChangePassword
            onPasswordChanged={() => {
              setShowChangePassword(false);
            }}
            onClose={() => setShowChangePassword(false)}
            userEmail={user.email}
            userName={user.fullName}
          />
        )}
      </div>
    </div>
  );
}