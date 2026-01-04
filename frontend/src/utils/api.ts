
// import { Booking, BookingFormData, AuthResponse, AdminBooking, AvailableRoom } from '../types';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://energize-global-backend.onrender.com/api';
// // Auth API
// export const authAPI = {
//   login: async (email: string, password: string): Promise<AuthResponse> => {
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     return response.json();
//   },
// };

// // Bookings API
// export const bookingsAPI = {
//   getAll: async (roomType?: string): Promise<{ status: string; data: { bookings: Booking[] } }> => {
//     const token = localStorage.getItem('token');
//     const url = roomType 
//       ? `${API_BASE_URL}/bookings?roomType=${roomType}`
//       : `${API_BASE_URL}/bookings`;
    
//     const response = await fetch(url, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   },

//   create: async (bookingData: BookingFormData): Promise<any> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/bookings`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(bookingData),
//     });
//     return response.json();
//   },

//   getAvailable: async (date: string, roomType?: string): Promise<any> => {
//     const token = localStorage.getItem('token');
//     const url = roomType 
//       ? `${API_BASE_URL}/bookings/available?date=${date}&roomType=${roomType}`
//       : `${API_BASE_URL}/bookings/available?date=${date}`;
    
//     const response = await fetch(url, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   },

//   getAvailableRooms: async (): Promise<{ status: string; data: { availableRooms: AvailableRoom[] } }> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/bookings/available-rooms`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   },
// };

// // Admin API
// export const adminAPI = {
//   getAllBookings: async (): Promise<{ status: string; data: { bookings: AdminBooking[] } }> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   },

//   updateBooking: async (id: string, bookingData: any): Promise<any> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(bookingData),
//     });
//     return response.json();
//   },

//   deleteBooking: async (id: string): Promise<any> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (response.status === 204) {
//       return { status: 'success', data: null };
//     }
    
//     try {
//       return await response.json();
//     } catch (error) {
//       return {
//         status: 'error',
//         message: 'Failed to delete booking'
//       };
//     }
//   },

//   getAllUsers: async (): Promise<any> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/admin/users`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   },

//   createUser: async (userData: any): Promise<any> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/admin/users`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(userData),
//     });
//     return response.json();
//   },

//   updateUser: async (id: string, userData: any): Promise<any> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(userData),
//     });
//     return response.json();
//   },

//   updateUserPermissions: async (id: string, permissions: { smallRoom: boolean; largeRoom: boolean }): Promise<any> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/admin/users/${id}/permissions`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(permissions),
//     });
//     return response.json();
//   },

//   deleteUser: async (id: string): Promise<any> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (response.status === 204) {
//       return { status: 'success', data: null };
//     }
    
//     try {
//       return await response.json();
//     } catch (error) {
//       return {
//         status: 'error',
//         message: 'Failed to delete user'
//       };
//     }
//   },
// };

// // Display API للعرض المنفصل على الشاشات
// export const displayAPI = {
//   getRoomBookings: async (roomType: 'small' | 'large'): Promise<{ status: string; data: { bookings: Booking[] } }> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/bookings?roomType=${roomType}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   },

//   // دالة خاصة للعرض العام بدون الحاجة لتسجيل الدخول (إذا أردت)
//   getPublicRoomBookings: async (roomType: 'small' | 'large'): Promise<{ status: string; data: { bookings: Booking[] } }> => {
//     const response = await fetch(`${API_BASE_URL}/bookings/public?roomType=${roomType}`);
//     return response.json();
//   },

//   // دالة للحصول على حجوزات يوم محدد لغرفة محددة
//   getRoomBookingsByDate: async (roomType: 'small' | 'large', date: string): Promise<{ status: string; data: { bookings: Booking[] } }> => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_BASE_URL}/bookings?roomType=${roomType}&date=${date}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.json();
//   },
// };

// // Public API للعرض على الشاشات بدون مصادقة (إذا أردت عمل endpoint خاص)
// export const publicAPI = {
//   getSmallRoomBookings: async (): Promise<{ status: string; data: { bookings: Booking[] } }> => {
//     const response = await fetch(`${API_BASE_URL}/public/small-room-bookings`);
//     return response.json();
//   },

//   getLargeRoomBookings: async (): Promise<{ status: string; data: { bookings: Booking[] } }> => {
//     const response = await fetch(`${API_BASE_URL}/public/large-room-bookings`);
//     return response.json();
//   },

//   getRoomBookingsByDate: async (roomType: 'small' | 'large', date: string): Promise<{ status: string; data: { bookings: Booking[] } }> => {
//     const response = await fetch(`${API_BASE_URL}/public/room-bookings/${roomType}?date=${date}`);
//     return response.json();
//   },
// };

import {
  Booking,
  BookingFormData,
  AuthResponse,
  AdminBooking,
  AvailableRoom,
} from "../types";

// Determine API base URL - use localhost in development, production URL otherwise
const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // In development, try localhost first
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:5001/api";
  }
  
  // Production fallback
  return "https://energize-global-backend.onrender.com/api";
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Safely parse JSON even if backend returns empty body or invalid JSON.
 */
const safeJson = async (response: Response) => {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {
      status: "error",
      message: text || "Invalid JSON response",
    };
  }
};

/**
 * Common headers builder
 */
// const authHeaders = (extra?: Record<string, string>) => {
//   const token = localStorage.getItem("token");
//   return {
//     ...(extra || {}),
//     Authorization: `Bearer ${token}`,
//   };
// };
const authHeaders = (extra?: Record<string, string>) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const base: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  return {
    ...(extra || {}),
    ...base,
  };
};

/**
 * Helper: throw on non-2xx responses with backend message if available
 */
const throwIfNotOk = (response: Response, data: any, fallbackMsg: string) => {
  if (!response.ok) {
    const msg =
      data?.message ||
      data?.error ||
      (typeof data === "string" ? data : "") ||
      fallbackMsg;
    throw new Error(msg);
  }
};

// =======================
// Auth API
// =======================
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Login failed");
    return data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: "PATCH",
      headers: authHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to change password");
    return data;
  },
};

// =======================
// Bookings API
// =======================
export const bookingsAPI = {
  getAll: async (
    roomType?: string
  ): Promise<{ status: string; data: { bookings: Booking[] } }> => {
    const url = roomType
      ? `${API_BASE_URL}/bookings?roomType=${roomType}`
      : `${API_BASE_URL}/bookings`;

    const response = await fetch(url, {
      headers: authHeaders(),
      cache: 'no-store', // Prevent caching for real-time data
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load bookings");
    return data;
  },

  create: async (bookingData: BookingFormData): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: authHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(bookingData),
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to create booking");
    return data;
  },

  getAvailable: async (date: string, roomType?: string): Promise<any> => {
    const url = roomType
      ? `${API_BASE_URL}/bookings/available?date=${date}&roomType=${roomType}`
      : `${API_BASE_URL}/bookings/available?date=${date}`;

    const response = await fetch(url, {
      headers: authHeaders(),
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load availability");
    return data;
  },

  getAvailableRooms: async (): Promise<{
    status: string;
    data: { availableRooms: AvailableRoom[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/bookings/available-rooms`, {
      headers: authHeaders(),
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load available rooms");
    return data;
  },

  // Get user's own bookings
  getMyBookings: async (): Promise<{
    status: string;
    data: { bookings: Booking[] };
  }> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    if (!token) {
      throw new Error("You must be logged in to view your bookings");
    }

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/my-bookings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      // Handle network errors
      if (!response) {
        throw new Error("Network error. Please check your connection.");
      }

      const data = await safeJson(response);
      
      if (!response.ok) {
        // Handle 401 (unauthorized) separately
        if (response.status === 401) {
          // Clear invalid token
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
          throw new Error("Please log in to view your bookings");
        }
        // Handle 404 (route not found) - might be server issue
        if (response.status === 404) {
          console.error("404 Error - Route not found:", `${API_BASE_URL}/bookings/my-bookings`);
          console.error("Check if backend server is running and route is registered.");
          throw new Error("Booking service is currently unavailable. Please try again later.");
        }
        throwIfNotOk(response, data, "Failed to load my bookings");
      }
      
      return data;
    } catch (error: any) {
      // Handle fetch errors (network, CORS, etc.)
      if (error.message && !error.message.includes("log in") && !error.message.includes("unavailable")) {
        console.error("Fetch error:", error);
        throw new Error("Unable to connect to server. Please check if the backend is running.");
      }
      throw error;
    }
  },

  // تحديث حجز للمستخدم
  updateMyBooking: async (
    id: string,
    bookingData: Partial<BookingFormData>
  ): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/bookings/my-bookings/${id}`, {
      method: "PATCH",
      headers: authHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(bookingData),
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to update booking");
    return data;
  },

  // حذف حجز للمستخدم
  deleteMyBooking: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/bookings/my-bookings/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    if (response.status === 204) {
      return { status: "success", data: null };
    }

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to delete booking");
    return data;
  },
};

// =======================
// Admin API
// =======================
export const adminAPI = {
  getAllBookings: async (): Promise<{
    status: string;
    data: { bookings: AdminBooking[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
      headers: authHeaders(),
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load admin bookings");
    return data;
  },

  updateBooking: async (id: string, bookingData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
      method: "PATCH",
      headers: authHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(bookingData),
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to update booking");
    return data;
  },

  deleteBooking: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    // backend may return 204 with empty body
    if (response.status === 204) {
      return { status: "success", data: null };
    }

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to delete booking");
    return data;
  },


    getAllUsers: async (): Promise<any> => {
    // ✅ cache busting + منع الكاش
    const url = `${API_BASE_URL}/admin/users?ts=${Date.now()}`;

    const response = await fetch(url, {
      headers: authHeaders(),
      cache: "no-store",
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load users");
    return data;
  },

  // getAllUsers: async (): Promise<any> => {
  //   const response = await fetch(`${API_BASE_URL}/admin/users`, {
  //     headers: authHeaders(),
  //   });

  //   const data = await safeJson(response);
  //   throwIfNotOk(response, data, "Failed to load users");
  //   return data;
  // },
  

  createUser: async (userData: any): Promise<any> => {
    // إضافة timeout (5 ثواني - سريع جداً)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: "POST",
        headers: authHeaders({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(userData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      // التحقق من أن الرد وصل بشكل صحيح
      if (!response.ok && response.status !== 201) {
        const errorData = await safeJson(response);
        throw new Error(errorData?.message || `Server error: ${response.status}`);
      }
      
      const data = await safeJson(response);
      throwIfNotOk(response, data, "Failed to create user");
      return data;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError' || error.message?.includes('aborted')) {
        throw new Error('Request timeout: The server took too long to respond.');
      }
      throw error;
    }
  },

  updateUser: async (id: string, userData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: "PATCH",
      headers: authHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(userData),
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to update user");
    return data;
  },

  updateUserPermissions: async (
    id: string,
    permissions: { smallRoom: boolean; largeRoom: boolean }
  ): Promise<any> => {
    const response = await fetch(
      `${API_BASE_URL}/admin/users/${id}/permissions`,
      {
        method: "PATCH",
        headers: authHeaders({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(permissions),
      }
    );

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to update permissions");
    return data;
  },

  deleteUser: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    if (response.status === 204) {
      return { status: "success", data: null };
    }

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to delete user");
    return data;
  },
};

// =======================
// Display API (auth)
// =======================
export const displayAPI = {
  getRoomBookings: async (
    roomType: "small" | "large"
  ): Promise<{ status: string; data: { bookings: Booking[] } }> => {
    const response = await fetch(`${API_BASE_URL}/bookings?roomType=${roomType}`, {
      headers: authHeaders(),
    });

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load room bookings");
    return data;
  },

  // public display endpoint (no auth) - if you use it
  getPublicRoomBookings: async (
    roomType: "small" | "large"
  ): Promise<{ status: string; data: { bookings: Booking[] } }> => {
    const response = await fetch(
      `${API_BASE_URL}/bookings/public?roomType=${roomType}`
    );

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load public room bookings");
    return data;
  },

  getRoomBookingsByDate: async (
    roomType: "small" | "large",
    date: string
  ): Promise<{ status: string; data: { bookings: Booking[] } }> => {
    const response = await fetch(
      `${API_BASE_URL}/bookings?roomType=${roomType}&date=${date}`,
      {
        headers: authHeaders(),
      }
    );

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load room bookings by date");
    return data;
  },
};

// =======================
// Public API (no auth)
// =======================
export const publicAPI = {
  getSmallRoomBookings: async (): Promise<{
    status: string;
    data: { bookings: Booking[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/public/small-room-bookings`);
    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load small room public bookings");
    return data;
  },

  getLargeRoomBookings: async (): Promise<{
    status: string;
    data: { bookings: Booking[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/public/large-room-bookings`);
    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load large room public bookings");
    return data;
  },

  getRoomBookingsByDate: async (
    roomType: "small" | "large",
    date: string
  ): Promise<{ status: string; data: { bookings: Booking[] } }> => {
    const response = await fetch(
      `${API_BASE_URL}/public/room-bookings/${roomType}?date=${date}`
    );

    const data = await safeJson(response);
    throwIfNotOk(response, data, "Failed to load public room bookings by date");
    return data;
  },
};