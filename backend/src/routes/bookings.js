// import express from 'express';
// import { 
//   getAllBookings, 
//   createBooking, 
//   getAvailableSlots 
// } from '../controllers/bookingController.js';
// import { protect } from '../middleware/auth.js';

// const router = express.Router();

// router.use(protect); // All booking routes require authentication

// router.get('/', getAllBookings);
// router.post('/', createBooking);
// router.get('/available', getAvailableSlots);

// export default router;

import express from 'express';
import { 
  getAllBookings, 
  createBooking, 
  getAvailableSlots,
  getAvailableRoomTypes,
  getMyBookings,
  updateMyBooking,
  deleteMyBooking
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All booking routes require authentication

router.get('/', getAllBookings);
router.post('/', createBooking);
router.get('/available', getAvailableSlots);
router.get('/available-rooms', getAvailableRoomTypes);

// Routes للمستخدمين لإدارة حجوزاتهم الخاصة
router.get('/my-bookings', getMyBookings);
router.patch('/my-bookings/:id', updateMyBooking);
router.delete('/my-bookings/:id', deleteMyBooking);

export default router;