// import Booking from '../models/Booking.js';

// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate('user', 'username fullName')
//       .sort({ startTime: 1 });

//     res.status(200).json({
//       status: 'success',
//       results: bookings.length,
//       data: {
//         bookings
//       }
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: err.message
//     });
//   }
// };

// export const createBooking = async (req, res) => {
//   try {
//     const { startTime, endTime, numberOfAttendees, contactPerson } = req.body;

//     // Check for overlapping bookings
//     const overlappingBooking = await Booking.findOne({
//       $or: [
//         {
//           startTime: { $lt: new Date(endTime) },
//           endTime: { $gt: new Date(startTime) }
//         }
//       ],
//       status: 'confirmed'
//     });

//     if (overlappingBooking) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'This time slot is already booked'
//       });
//     }

//     const newBooking = await Booking.create({
//       user: req.user.id,
//       startTime: new Date(startTime),
//       endTime: new Date(endTime),
//       numberOfAttendees,
//       contactPerson
//     });

//     const booking = await Booking.findById(newBooking._id).populate('user', 'username fullName');

//     // Emit real-time update (we'll implement this later with Socket.io if needed)
    
//     res.status(201).json({
//       status: 'success',
//       data: {
//         booking
//       }
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: err.message
//     });
//   }
// };

// export const getAvailableSlots = async (req, res) => {
//   try {
//     const { date } = req.query;
//     const startOfDay = new Date(date);
//     startOfDay.setHours(0, 0, 0, 0);
    
//     const endOfDay = new Date(date);
//     endOfDay.setHours(23, 59, 59, 999);

//     const bookings = await Booking.find({
//       startTime: { $gte: startOfDay, $lte: endOfDay },
//       status: 'confirmed'
//     }).select('startTime endTime');

//     res.status(200).json({
//       status: 'success',
//       data: {
//         bookings
//       }
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: err.message
//     });
//   }
// };
import Booking from '../models/Booking.js';
import User from '../models/User.js';

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'email fullName')
      .sort({ startTime: 1 });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { startTime, endTime, numberOfAttendees, contactPerson, roomType } = req.body;

    // الحصول على بيانات المستخدم للتحقق من الصلاحيات
    const user = await User.findById(req.user.id);
    
    // التحقق من صلاحية المستخدم لحجز نوع الغرفة المطلوب
    if (roomType === 'small' && !user.bookingPermissions.smallRoom) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have access to the small room'
      });
    }
    
    if (roomType === 'large' && !user.bookingPermissions.largeRoom) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have access to the large room'
      });
    }

    // التحقق من التداخل في الحجوزات لنفس نوع الغرفة
    const overlappingBooking = await Booking.findOne({
      roomType: roomType,
      $or: [
        {
          startTime: { $lt: new Date(endTime) },
          endTime: { $gt: new Date(startTime) }
        }
      ],
      status: 'confirmed'
    });

    if (overlappingBooking) {
      return res.status(400).json({
        status: 'fail',
        message: `This slot is already booked for the ${roomType === 'small' ? 'small room' : 'large room'}`
      });
    }

    const newBooking = await Booking.create({
      user: req.user.id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      numberOfAttendees,
      contactPerson,
      roomType
    });

    const booking = await Booking.findById(newBooking._id).populate('user', 'email fullName');

    res.status(201).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

export const getAvailableSlots = async (req, res) => {
  try {
    const { date, roomType } = req.query;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const query = {
      startTime: { $gte: startOfDay, $lte: endOfDay },
      status: 'confirmed'
    };

    // إذا تم تحديد نوع الغرفة، أضفه للبحث
    if (roomType) {
      query.roomType = roomType;
    }

    const bookings = await Booking.find(query).select('startTime endTime roomType roomName');

    res.status(200).json({
      status: 'success',
      data: {
        bookings
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// دالة جديدة للحصول على أنواع الغرف المتاحة للمستخدم
export const getAvailableRoomTypes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const availableRooms = [];
    
    if (user.bookingPermissions.smallRoom) {
      availableRooms.push({
        type: 'small',
        name: 'Small Meeting Room',
        capacity: 'Accommodates up to 10 people'
      });
    }
    
    if (user.bookingPermissions.largeRoom) {
      availableRooms.push({
        type: 'large', 
        name: 'Large Meeting Room',
        capacity: 'Accommodates up to 30 people'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        availableRooms
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// الحصول على حجوزات المستخدم الخاصة
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('user', 'email fullName')
      .sort({ startTime: 1 });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// تحديث حجز للمستخدم (فقط حجوزاته الخاصة)
export const updateMyBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, numberOfAttendees, contactPerson, roomType } = req.body;

    // التحقق من أن الحجز موجود وأنه يخص المستخدم
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'Booking not found'
      });
    }

    // التحقق من أن الحجز يخص المستخدم الحالي
    if (booking.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only update your own bookings'
      });
    }

    // التحقق من صلاحيات المستخدم إذا تم تغيير نوع الغرفة
    if (roomType && roomType !== booking.roomType) {
      const user = await User.findById(req.user.id);
      
      if (roomType === 'small' && !user.bookingPermissions.smallRoom) {
        return res.status(403).json({
          status: 'fail',
          message: 'You do not have access to the small room'
        });
      }
      
      if (roomType === 'large' && !user.bookingPermissions.largeRoom) {
        return res.status(403).json({
          status: 'fail',
          message: 'You do not have access to the large room'
        });
      }
    }

    // التحقق من التداخل في الحجوزات (استثناء الحجز الحالي)
    const finalRoomType = roomType || booking.roomType;
    const overlappingBooking = await Booking.findOne({
      _id: { $ne: id },
      roomType: finalRoomType,
      $or: [
        {
          startTime: { $lt: new Date(endTime || booking.endTime) },
          endTime: { $gt: new Date(startTime || booking.startTime) }
        }
      ],
      status: 'confirmed'
    });

    if (overlappingBooking) {
      return res.status(400).json({
        status: 'fail',
        message: `This slot is already booked for the ${finalRoomType === 'small' ? 'small room' : 'large room'}`
      });
    }

    // تحديث الحجز
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        ...(startTime && { startTime: new Date(startTime) }),
        ...(endTime && { endTime: new Date(endTime) }),
        ...(numberOfAttendees && { numberOfAttendees }),
        ...(contactPerson && { contactPerson }),
        ...(roomType && { roomType })
      },
      { new: true, runValidators: true }
    ).populate('user', 'email fullName');

    res.status(200).json({
      status: 'success',
      data: {
        booking: updatedBooking
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// حذف حجز للمستخدم (فقط حجوزاته الخاصة)
export const deleteMyBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // التحقق من أن الحجز موجود وأنه يخص المستخدم
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'Booking not found'
      });
    }

    // التحقق من أن الحجز يخص المستخدم الحالي
    if (booking.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only delete your own bookings'
      });
    }

    // حذف الحجز
    await Booking.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};