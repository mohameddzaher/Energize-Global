'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminAPI } from '../utils/api';
import { AdminBooking } from '../types';
import { BarChart3, Calendar, TrendingUp, Users, Clock, Building2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface AnalyticsData {
  totalBookings: number;
  totalUsers: number;
  bookingsByDay: { date: string; count: number }[];
  bookingsByHour: { hour: number; count: number }[];
  topUsers: { userId: string; userName: string; userEmail: string; bookingCount: number }[];
  bookingsByRoomType: { roomType: string; count: number }[];
  averageBookingDuration: number;
  peakDays: string[];
  peakHours: number[];
}

type TimeRange = 'lastMonth' | 'lastQuarter' | 'lastYear' | 'custom';

export default function AnalyticsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('lastMonth');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      calculateAnalytics();
    }
  }, [bookings, timeRange, customStartDate, customEndDate]);

  const loadBookings = async () => {
    try {
      const result = await adminAPI.getAllBookings();
      if (result.status === 'success') {
        setBookings(result.data.bookings);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast.error('Failed to load bookings data');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredBookings = (): AdminBooking[] => {
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'lastQuarter':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case 'lastYear':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          startDate = new Date(customStartDate);
          const endDate = new Date(customEndDate);
          return bookings.filter(booking => {
            const bookingDate = new Date(booking.startTime);
            return bookingDate >= startDate && bookingDate <= endDate;
          });
        }
        return bookings;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    }

    return bookings.filter(booking => {
      const bookingDate = new Date(booking.startTime);
      return bookingDate >= startDate;
    });
  };

  const calculateAnalytics = () => {
    const filteredBookings = getFilteredBookings();
    
    // Total bookings and users - Filter out bookings without user
    const bookingsWithUsers = filteredBookings.filter(b => b.user && b.user._id);
    const uniqueUsers = new Set(bookingsWithUsers.map(b => b.user!._id));
    const totalBookings = filteredBookings.length;
    const totalUsers = uniqueUsers.size;

    // Bookings by day
    const bookingsByDayMap = new Map<string, number>();
    filteredBookings.forEach(booking => {
      const date = new Date(booking.startTime).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      bookingsByDayMap.set(date, (bookingsByDayMap.get(date) || 0) + 1);
    });
    const bookingsByDay = Array.from(bookingsByDayMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Bookings by hour
    const bookingsByHourMap = new Map<number, number>();
    filteredBookings.forEach(booking => {
      const hour = new Date(booking.startTime).getHours();
      bookingsByHourMap.set(hour, (bookingsByHourMap.get(hour) || 0) + 1);
    });
    const bookingsByHour = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: bookingsByHourMap.get(i) || 0
    }));

    // Top users - Only process bookings with valid users
    const userBookingCount = new Map<string, { userName: string; userEmail: string; count: number }>();
    bookingsWithUsers.forEach(booking => {
      if (booking.user && booking.user._id) {
        const userId = booking.user._id;
        const existing = userBookingCount.get(userId);
        if (existing) {
          existing.count++;
        } else {
          userBookingCount.set(userId, {
            userName: booking.user.fullName || 'Unknown',
            userEmail: booking.user.email || 'N/A',
            count: 1
          });
        }
      }
    });
    const topUsers = Array.from(userBookingCount.entries())
      .map(([userId, data]) => ({
        userId,
        userName: data.userName,
        userEmail: data.userEmail,
        bookingCount: data.count
      }))
      .sort((a, b) => b.bookingCount - a.bookingCount)
      .slice(0, 10);

    // Bookings by room type
    const roomTypeCount = new Map<string, number>();
    filteredBookings.forEach(booking => {
      roomTypeCount.set(booking.roomType, (roomTypeCount.get(booking.roomType) || 0) + 1);
    });
    const bookingsByRoomType = Array.from(roomTypeCount.entries())
      .map(([roomType, count]) => ({ roomType, count }));

    // Average booking duration - Only count valid durations (positive)
    let totalDuration = 0;
    let validBookings = 0;
    filteredBookings.forEach(booking => {
      const start = new Date(booking.startTime);
      const end = new Date(booking.endTime);
      const duration = (end.getTime() - start.getTime()) / (1000 * 60); // minutes
      // Only count positive durations (end time should be after start time)
      if (duration > 0) {
        totalDuration += duration;
        validBookings++;
      }
    });
    const averageBookingDuration = validBookings > 0 
      ? Math.round(totalDuration / validBookings) 
      : 0;

    // Peak days (top 5)
    const peakDays = bookingsByDay
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(item => item.date);

    // Peak hours (top 5)
    const peakHours = bookingsByHour
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(item => item.hour);

    setAnalytics({
      totalBookings,
      totalUsers,
      bookingsByDay,
      bookingsByHour,
      topUsers,
      bookingsByRoomType,
      averageBookingDuration,
      peakDays,
      peakHours
    });
  };

  const getMaxCount = (data: { count: number }[]) => {
    return Math.max(...data.map(d => d.count), 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f37121] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 pt-20 sm:pt-24">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#f37121]/10 via-transparent to-[#f37121]/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 mb-4 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/admin-dashboard"
                className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-all border border-gray-600"
                title="Back to Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-[#f37121]" />
                  Analytics Dashboard
                </h1>
                <p className="text-xs text-gray-400 mt-1">Comprehensive booking system analytics</p>
              </div>
            </div>
            
            {/* Time Range Selector */}
            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f37121]"
              >
                <option value="lastMonth">Last Month</option>
                <option value="lastQuarter">Last Quarter</option>
                <option value="lastYear">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
              
              {timeRange === 'custom' && (
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f37121]"
                  />
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f37121]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {analytics && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow border border-gray-700 hover:border-[#f37121]/40 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[#f37121]" />
                  <h3 className="text-xs font-medium text-gray-400">Total Bookings</h3>
                </div>
                <p className="text-2xl font-bold text-[#f37121]">{analytics.totalBookings}</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow border border-gray-700 hover:border-green-500/40 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <h3 className="text-xs font-medium text-gray-400">Active Users</h3>
                </div>
                <p className="text-2xl font-bold text-green-400">{analytics.totalUsers}</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow border border-gray-700 hover:border-blue-500/40 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xs font-medium text-gray-400">Avg Booking Length</h3>
                </div>
                <p className="text-2xl font-bold text-blue-400">{analytics.averageBookingDuration} min</p>
                <p className="text-[10px] text-gray-500 mt-1">Average time per booking</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow border border-gray-700 hover:border-purple-500/40 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xs font-medium text-gray-400">Top Busy Days</h3>
                </div>
                <p className="text-2xl font-bold text-purple-400">{analytics.peakDays.length}</p>
                <p className="text-[10px] text-gray-500 mt-1">Days with most bookings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {/* Bookings by Day Chart */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 border border-gray-700">
                <h2 className="text-lg font-semibold text-[#f37121] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Bookings by Day
                </h2>
                <div className="space-y-2">
                  {analytics.bookingsByDay.slice(-14).map((item, index) => {
                    const maxCount = getMaxCount(analytics.bookingsByDay);
                    const percentage = (item.count / maxCount) * 100;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-xs text-gray-400 w-24 flex-shrink-0">{item.date}</div>
                        <div className="flex-1 bg-gray-700 rounded-full h-6 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#f37121] to-orange-500 h-full flex items-center justify-end pr-2 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          >
                            {item.count > 0 && (
                              <span className="text-xs font-semibold text-white">{item.count}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bookings by Hour Chart */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 border border-gray-700">
                <h2 className="text-lg font-semibold text-[#f37121] mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Bookings by Hour
                </h2>
                <div className="grid grid-cols-12 gap-1">
                  {analytics.bookingsByHour.map((item, index) => {
                    const maxCount = getMaxCount(analytics.bookingsByHour);
                    const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                    const period = item.hour >= 12 ? 'PM' : 'AM';
                    const displayHour = item.hour === 0 ? 12 : item.hour > 12 ? item.hour - 12 : item.hour;
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-full bg-gray-700 rounded-t h-32 flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-[#f37121] to-orange-500 transition-all duration-500 rounded-t"
                            style={{ height: `${percentage}%` }}
                            title={`${displayHour} ${period}: ${item.count} bookings`}
                          />
                        </div>
                        <div className="text-[8px] text-gray-400 mt-1 text-center">
                          {displayHour}{period === 'AM' ? 'a' : 'p'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {/* Top Users */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 border border-gray-700">
                <h2 className="text-lg font-semibold text-[#f37121] mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Top Users
                </h2>
                <div className="space-y-2">
                  {analytics.topUsers.map((user, index) => (
                    <div key={user.userId} className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#f37121] to-orange-500 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{user.userName}</div>
                          <div className="text-xs text-gray-400">{user.userEmail}</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-[#f37121]">{user.bookingCount}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Type Distribution */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 border border-gray-700">
                <h2 className="text-lg font-semibold text-[#f37121] mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Room Type Distribution
                </h2>
                <div className="space-y-3">
                  {analytics.bookingsByRoomType.map((item, index) => {
                    const total = analytics.bookingsByRoomType.reduce((sum, r) => sum + r.count, 0);
                    const percentage = total > 0 ? (item.count / total) * 100 : 0;
                    const isSmall = item.roomType === 'small';
                    return (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-white capitalize">{item.roomType} Room</span>
                          <span className="text-sm font-bold text-[#f37121]">{item.count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              isSmall 
                                ? 'bg-gradient-to-r from-green-500 to-green-600' 
                                : 'bg-gradient-to-r from-blue-500 to-blue-600'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Peak Times Table */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 border border-gray-700">
              <h2 className="text-lg font-semibold text-[#f37121] mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Peak Times Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Most Busy Days</h3>
                  <p className="text-xs text-gray-500 mb-2">Days with the highest number of bookings</p>
                  <div className="space-y-1">
                    {analytics.peakDays.map((day, index) => {
                      const dayData = analytics.bookingsByDay.find(d => d.date === day);
                      const count = dayData?.count || 0;
                      return (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#f37121]">#{index + 1}</span>
                            <span className="text-sm text-white">{day}</span>
                          </div>
                          <span className="text-sm font-semibold text-[#f37121]">{count} bookings</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Most Busy Hours</h3>
                  <p className="text-xs text-gray-500 mb-2">Hours with the highest number of bookings</p>
                  <div className="space-y-1">
                    {analytics.peakHours.map((hour, index) => {
                      const period = hour >= 12 ? 'PM' : 'AM';
                      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                      const hourData = analytics.bookingsByHour.find(h => h.hour === hour);
                      const count = hourData?.count || 0;
                      return (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#f37121]">#{index + 1}</span>
                            <span className="text-sm text-white">{displayHour} {period}</span>
                          </div>
                          <span className="text-sm font-semibold text-[#f37121]">{count} bookings</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

