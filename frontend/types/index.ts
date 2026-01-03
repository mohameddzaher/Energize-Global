// import { email } from './../node_modules/zod/src/v4/core/regexes';

// export interface User {
//   id: string;
//   email: string;
//   fullName: string;
//   role: 'user' | 'admin';
// }

export interface User {
  _id?: string;
  id?: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
  bookingPermissions?: {
    smallRoom: boolean;
    largeRoom: boolean;
  };
  mustChangePassword?: boolean;
}

export interface ContactPerson {
  name: string;
  phone: string;
  company: string;
}

export interface Booking {
  _id: string;
  startTime: string;
  endTime: string;
  numberOfAttendees: number;
  contactPerson: ContactPerson;
  user: User;
  status: 'confirmed' | 'cancelled';
}

export interface AdminBooking extends Booking {
  user: User & { role: string };
}

export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

export interface BookingFormData {
  startTime: string;
  endTime: string;
  numberOfAttendees: number;
  contactPerson: ContactPerson;
}

// ---------------------

