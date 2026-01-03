// import { useState, useEffect } from 'react';
// import { BookingFormData } from '../types';
// import { bookingsAPI, adminAPI } from '../utils/api';

// interface TimeSlotPickerProps {
//   onClose: () => void;
//   onBookingSuccess: () => void;
//   selectedDate: Date;
//   initialData?: BookingFormData;
//   isEditMode?: boolean;
//   bookingId?: string;
// }

// interface TimeSlot {
//   hour: number;
//   minute: number;
//   formatted: string;
//   available: boolean;
//   start: Date;
//   end: Date;
// }

// export default function TimeSlotPicker({
//   onClose,
//   onBookingSuccess,
//   selectedDate,
//   initialData,
//   isEditMode = false,
//   bookingId
// }: TimeSlotPickerProps) {
//   const [selectedStart, setSelectedStart] = useState<TimeSlot | null>(null);
//   const [selectedEnd, setSelectedEnd] = useState<TimeSlot | null>(null);
//   const [step, setStep] = useState<'time' | 'details'>(isEditMode ? 'details' : 'time');
//   const [existingBookings, setExistingBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState<BookingFormData>(initialData || {
//     startTime: '',
//     endTime: '',
//     numberOfAttendees: 1,
//     contactPerson: {
//       name: '',
//       phone: '',
//       company: ''
//     }
//   });

//   // إنشاء جميع المواعيد المتاحة (كل 30 دقيقة) - 24 ساعة
//   const timeSlots: TimeSlot[] = [];
//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute of [0, 30]) {
//       const period = hour >= 12 ? 'PM' : 'AM';
//       const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

//       const start = new Date(selectedDate);
//       start.setHours(hour, minute, 0, 0);

//       const end = new Date(start);
//       end.setHours(hour, minute, 0, 0);

//       timeSlots.push({
//         hour,
//         minute,
//         formatted: `${displayHour}:${minute === 0 ? '00' : '30'} ${period}`,
//         available: true,
//         start,
//         end
//       });
//     }
//   }

//   useEffect(() => {
//     loadExistingBookings();

//     // إذا كان في بيانات أولية (وضع التعديل)، نعرض الأوقات المختارة
//     if (initialData && initialData.startTime && initialData.endTime) {
//       const startTime = new Date(initialData.startTime);
//       const endTime = new Date(initialData.endTime);

//       const startSlot = timeSlots.find(slot =>
//         slot.hour === startTime.getHours() && slot.minute === startTime.getMinutes()
//       );

//       const endSlot = timeSlots.find(slot =>
//         slot.hour === endTime.getHours() && slot.minute === endTime.getMinutes()
//       );

//       if (startSlot) setSelectedStart(startSlot);
//       if (endSlot) setSelectedEnd(endSlot);

//       // ✅ إصلاح: تعيين البيانات الأولية في formData
//       setFormData(initialData);
//     }
//   }, [selectedDate, initialData]);

//   const loadExistingBookings = async () => {
//     try {
//       const result = await bookingsAPI.getAll();
//       if (result.status === 'success') {
//         setExistingBookings(result.data.bookings);
//       }
//     } catch (error) {
//       console.error('Error loading bookings:', error);
//     }
//   };

//   const isSlotAvailable = (slot: TimeSlot) => {
//     const slotDate = new Date(selectedDate);
//     slotDate.setHours(slot.hour, slot.minute, 0, 0);

//     // في وضع التعديل، نستثني الحجز الحالي من التحقق
//     const conflict = existingBookings.some(booking => {
//       if (isEditMode && bookingId && booking._id === bookingId) return false;

//       const start = new Date(booking.startTime);
//       const end = new Date(booking.endTime);
//       return slotDate >= start && slotDate < end;
//     });

//     return !conflict;
//   };

//   const handleStartSelect = (slot: TimeSlot) => {
//     if (!isSlotAvailable(slot)) return;

//     setSelectedStart(slot);
//     setSelectedEnd(null);
//   };

//   const handleEndSelect = (slot: TimeSlot) => {
//     if (!selectedStart || !isSlotAvailable(slot)) return;

//     const startMinutes = selectedStart.hour * 60 + selectedStart.minute;
//     const endMinutes = slot.hour * 60 + slot.minute;

//     if (endMinutes > startMinutes) {
//       setSelectedEnd(slot);
//     }
//   };

//   const handleContinueToDetails = () => {
//     if (!selectedStart || !selectedEnd) {
//       alert('Please select both start and end time');
//       return;
//     }

//     const startTime = new Date(selectedStart.start);
//     const endTime = new Date(selectedEnd.start);

//     setFormData(prev => ({
//       ...prev,
//       startTime: startTime.toISOString(),
//       endTime: endTime.toISOString()
//     }));
//     setStep('details');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       let result;

//       if (isEditMode && bookingId) {
//         // ✅ في وضع التعديل، نستخدم adminAPI.updateBooking
//         console.log('Updating booking:', bookingId, formData);
//         result = await adminAPI.updateBooking(bookingId, formData);
//       } else {
//         // ✅ في وضع الحجز العادي، نستخدم bookingsAPI.create
//         console.log('Creating new booking:', formData);
//         result = await bookingsAPI.create(formData);
//       }

//       console.log('API Response:', result);

//       if (result.status === 'success') {
//         onBookingSuccess();
//         onClose();
//       } else {
//         setError(result.message || 'Something went wrong');
//       }
//     } catch (err) {
//       console.error('Booking error:', err);
//       setError(isEditMode ? 'Failed to update booking' : 'Booking failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContactPersonChange = (field: keyof typeof formData.contactPerson, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       contactPerson: {
//         ...prev.contactPerson,
//         [field]: value
//       }
//     }));
//   };

//   const getAvailableSlotsAfter = (startSlot: TimeSlot | null) => {
//     if (!startSlot) return timeSlots.filter(slot => isSlotAvailable(slot));

//     const startMinutes = startSlot.hour * 60 + startSlot.minute;
//     return timeSlots.filter(slot => {
//       const slotMinutes = slot.hour * 60 + slot.minute;
//       return slotMinutes > startMinutes && isSlotAvailable(slot);
//     });
//   };

//   // دالة لحساب المدة بين وقتين
//   const calculateDuration = (start: Date, end: Date) => {
//     const diffMs = end.getTime() - start.getTime();
//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     if (hours === 0) {
//       return `${minutes} minutes`;
//     } else if (minutes === 0) {
//       return `${hours} hour${hours > 1 ? 's' : ''}`;
//     } else {
//       return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
//     }
//   };

//   // دالة لعرض الوقت بشكل واضح
//   const formatTimeForDisplay = (date: Date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   if (step === 'time') {
//     return (
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           {/* Header */}
//           <div className="flex justify-between items-center p-6 border-b border-gray-700">
//             <div>
//               <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//                 {isEditMode ? 'Edit Booking' : 'Book Meeting Room'}
//               </h2>
//               <p className="text-gray-400 text-sm mt-1">
//                 {selectedDate.toLocaleDateString('en-US', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//             >
//               ×
//             </button>
//           </div>

//           <div className="p-6">
//             {/* Time Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               {/* Start Time */}
//               <div>
//                 <h3 className="text-lg font-semibold text-[#f37121] mb-3">
//                   Start Time
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
//                   {timeSlots.map((slot) => (
//                     <button
//                       key={`${slot.hour}-${slot.minute}`}
//                       onClick={() => handleStartSelect(slot)}
//                       disabled={!isSlotAvailable(slot)}
//                       className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
//                         selectedStart?.hour === slot.hour && selectedStart?.minute === slot.minute
//                           ? 'bg-[#f37121] border-[#f37121] text-white shadow-lg'
//                           : isSlotAvailable(slot)
//                           ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-500'
//                           : 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       {slot.formatted}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* End Time */}
//               <div>
//                 <h3 className="text-lg font-semibold text-[#f37121] mb-3">
//                   End Time
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
//                   {getAvailableSlotsAfter(selectedStart).map((slot) => (
//                     <button
//                       key={`${slot.hour}-${slot.minute}`}
//                       onClick={() => handleEndSelect(slot)}
//                       className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
//                         selectedEnd?.hour === slot.hour && selectedEnd?.minute === slot.minute
//                           ? 'bg-[#f37121] border-[#f37121] text-white shadow-lg'
//                           : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-500'
//                       }`}
//                     >
//                       {slot.formatted}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Selected Time Display */}
//             {(selectedStart || selectedEnd) && (
//               <div className="bg-gray-700 rounded-lg p-4 mb-6 border border-gray-600">
//                 <h3 className="text-lg font-semibold text-gray-300 mb-2">
//                   Selected Time
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <div className="text-center">
//                     <p className="text-sm text-gray-400">From</p>
//                     <p className="text-xl font-bold text-white">
//                       {selectedStart?.formatted}
//                     </p>
//                   </div>
//                   <div className="text-gray-400 mx-4">→</div>
//                   <div className="text-center">
//                     <p className="text-sm text-gray-400">To</p>
//                     <p className="text-xl font-bold text-white">
//                       {selectedEnd?.formatted || 'Select end time'}
//                     </p>
//                   </div>
//                 </div>
//                 {selectedStart && selectedEnd && (
//                   <div className="text-center mt-2">
//                     <p className="text-sm text-gray-400">
//                       Duration: {calculateDuration(selectedStart.start, selectedEnd.start)}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleContinueToDetails}
//                 disabled={!selectedStart || !selectedEnd}
//                 className="px-6 py-3 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-orange-500/50"
//               >
//                 Continue to Details
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Details Step
//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-700">
//           <div>
//             <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//               {isEditMode ? 'Edit Booking Details' : 'Booking Details'}
//             </h2>
//             <p className="text-sm text-gray-400 mt-1">
//               {selectedStart && formatTimeForDisplay(selectedStart.start)} - {selectedEnd && formatTimeForDisplay(selectedEnd.start)}
//             </p>
//             <p className="text-xs text-gray-500 mt-1">
//               Duration: {selectedStart && selectedEnd ?
//                 calculateDuration(selectedStart.start, selectedEnd.start) : ''}
//             </p>
//           </div>
//           <button
//             onClick={() => isEditMode ? onClose() : setStep('time')}
//             className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//           >
//             ×
//           </button>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mx-6 mt-4 bg-red-900/50 border border-red-700/50 text-red-200 px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Attendees */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Number of Attendees</label>
//             <input
//               type="number"
//               value={formData.numberOfAttendees}
//               onChange={(e) => setFormData({...formData, numberOfAttendees: parseInt(e.target.value)})}
//               min="1"
//               max="50"
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white transition-all duration-200"
//               required
//             />
//           </div>

//           {/* Contact Person Section */}
//           <div className="border-t border-gray-700 pt-6">
//             <h3 className="text-lg font-semibold text-[#f37121] mb-4">Contact Person</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   value={formData.contactPerson.name}
//                   onChange={(e) => handleContactPersonChange('name', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter full name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
//                 <input
//                   type="tel"
//                   value={formData.contactPerson.phone}
//                   onChange={(e) => handleContactPersonChange('phone', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
//                 <input
//                   type="text"
//                   value={formData.contactPerson.company}
//                   onChange={(e) => handleContactPersonChange('company', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter company name"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             {!isEditMode && (
//               <button
//                 type="button"
//                 onClick={() => setStep('time')}
//                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
//               >
//                 Back
//               </button>
//             )}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`${isEditMode ? 'flex-1' : 'flex-1'} bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 border border-orange-500/50`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                   {isEditMode ? 'Updating...' : 'Booking...'}
//                 </span>
//               ) : (
//                 isEditMode ? 'Update Booking' : 'Confirm Booking'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { BookingFormData, AvailableRoom } from '../types';
// import { bookingsAPI, adminAPI } from '../utils/api';

// interface TimeSlotPickerProps {
//   onClose: () => void;
//   onBookingSuccess: () => void;
//   selectedDate: Date;
//   initialData?: BookingFormData;
//   isEditMode?: boolean;
//   bookingId?: string;
// }

// interface TimeSlot {
//   hour: number;
//   minute: number;
//   formatted: string;
//   available: boolean;
//   start: Date;
//   end: Date;
// }

// export default function TimeSlotPicker({
//   onClose,
//   onBookingSuccess,
//   selectedDate,
//   initialData,
//   isEditMode = false,
//   bookingId
// }: TimeSlotPickerProps) {
//   const [selectedStart, setSelectedStart] = useState<TimeSlot | null>(null);
//   const [selectedEnd, setSelectedEnd] = useState<TimeSlot | null>(null);
//   const [selectedRoomType, setSelectedRoomType] = useState<'small' | 'large' | ''>('');
//   const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
//   const [step, setStep] = useState<'room' | 'time' | 'details'>(isEditMode ? 'details' : 'room');
//   const [existingBookings, setExistingBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState<BookingFormData>(initialData || {
//     startTime: '',
//     endTime: '',
//     numberOfAttendees: 1,
//     contactPerson: {
//       name: '',
//       phone: '',
//       company: ''
//     },
//     roomType: 'small'
//   });

//   // إنشاء جميع المواعيد المتاحة (كل 30 دقيقة) - 24 ساعة
//   const timeSlots: TimeSlot[] = [];
//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute of [0, 30]) {
//       const period = hour >= 12 ? 'PM' : 'AM';
//       const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

//       const start = new Date(selectedDate);
//       start.setHours(hour, minute, 0, 0);

//       const end = new Date(start);
//       end.setHours(hour, minute, 0, 0);

//       timeSlots.push({
//         hour,
//         minute,
//         formatted: `${displayHour}:${minute === 0 ? '00' : '30'} ${period}`,
//         available: true,
//         start,
//         end
//       });
//     }
//   }

//   useEffect(() => {
//     loadAvailableRooms();
//     loadExistingBookings();

//     // إذا كان في بيانات أولية (وضع التعديل)، نعرض الأوقات المختارة
//     if (initialData && initialData.startTime && initialData.endTime && initialData.roomType) {
//       const startTime = new Date(initialData.startTime);
//       const endTime = new Date(initialData.endTime);

//       const startSlot = timeSlots.find(slot =>
//         slot.hour === startTime.getHours() && slot.minute === startTime.getMinutes()
//       );

//       const endSlot = timeSlots.find(slot =>
//         slot.hour === endTime.getHours() && slot.minute === endTime.getMinutes()
//       );

//       if (startSlot) setSelectedStart(startSlot);
//       if (endSlot) setSelectedEnd(endSlot);
//       if (initialData.roomType) setSelectedRoomType(initialData.roomType);

//       setFormData(initialData);
//     }
//   }, [selectedDate, initialData]);

//   const loadAvailableRooms = async () => {
//     try {
//       const result = await bookingsAPI.getAvailableRooms();
//       if (result.status === 'success') {
//         setAvailableRooms(result.data.availableRooms);
//         // Auto-select first available room if not in edit mode
//         if (!isEditMode && result.data.availableRooms.length > 0) {
//           setSelectedRoomType(result.data.availableRooms[0].type);
//           setFormData(prev => ({ ...prev, roomType: result.data.availableRooms[0].type }));
//         }
//       }
//     } catch (error) {
//       console.error('Error loading available rooms:', error);
//     }
//   };

//   const loadExistingBookings = async () => {
//     try {
//       const result = await bookingsAPI.getAll();
//       if (result.status === 'success') {
//         setExistingBookings(result.data.bookings);
//       }
//     } catch (error) {
//       console.error('Error loading bookings:', error);
//     }
//   };

//   const isSlotAvailable = (slot: TimeSlot, roomType: string) => {
//     const slotDate = new Date(selectedDate);
//     slotDate.setHours(slot.hour, slot.minute, 0, 0);

//     // في وضع التعديل، نستثني الحجز الحالي من التحقق
//     const conflict = existingBookings.some(booking => {
//       if (isEditMode && bookingId && booking._id === bookingId) return false;

//       const start = new Date(booking.startTime);
//       const end = new Date(booking.endTime);
//       return booking.roomType === roomType && slotDate >= start && slotDate < end;
//     });

//     return !conflict;
//   };

//   const handleRoomSelect = (roomType: 'small' | 'large') => {
//     setSelectedRoomType(roomType);
//     setFormData(prev => ({ ...prev, roomType }));
//     setSelectedStart(null);
//     setSelectedEnd(null);
//   };

//   const handleStartSelect = (slot: TimeSlot) => {
//     if (!selectedRoomType || !isSlotAvailable(slot, selectedRoomType)) return;

//     setSelectedStart(slot);
//     setSelectedEnd(null);
//   };

//   const handleEndSelect = (slot: TimeSlot) => {
//     if (!selectedStart || !selectedRoomType || !isSlotAvailable(slot, selectedRoomType)) return;

//     const startMinutes = selectedStart.hour * 60 + selectedStart.minute;
//     const endMinutes = slot.hour * 60 + slot.minute;

//     if (endMinutes > startMinutes) {
//       setSelectedEnd(slot);
//     }
//   };

//   const handleContinueToTime = () => {
//     if (!selectedRoomType) {
//       alert('Please select a room type');
//       return;
//     }
//     setStep('time');
//   };

//   const handleContinueToDetails = () => {
//     if (!selectedStart || !selectedEnd || !selectedRoomType) {
//       alert('Please select both start and end time');
//       return;
//     }

//     const startTime = new Date(selectedStart.start);
//     const endTime = new Date(selectedEnd.start);

//     setFormData(prev => ({
//       ...prev,
//       startTime: startTime.toISOString(),
//       endTime: endTime.toISOString(),
//       roomType: selectedRoomType
//     }));
//     setStep('details');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       let result;

//       if (isEditMode && bookingId) {
//         result = await adminAPI.updateBooking(bookingId, formData);
//       } else {
//         result = await bookingsAPI.create(formData);
//       }

//       if (result.status === 'success') {
//         onBookingSuccess();
//         onClose();
//       } else {
//         setError(result.message || 'Something went wrong');
//       }
//     } catch (err) {
//       console.error('Booking error:', err);
//       setError(isEditMode ? 'Failed to update booking' : 'Booking failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContactPersonChange = (field: keyof typeof formData.contactPerson, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       contactPerson: {
//         ...prev.contactPerson,
//         [field]: value
//       }
//     }));
//   };

//   const getAvailableSlotsAfter = (startSlot: TimeSlot | null) => {
//     if (!startSlot || !selectedRoomType) return timeSlots.filter(slot => isSlotAvailable(slot, selectedRoomType));

//     const startMinutes = startSlot.hour * 60 + startSlot.minute;
//     return timeSlots.filter(slot => {
//       const slotMinutes = slot.hour * 60 + slot.minute;
//       return slotMinutes > startMinutes && isSlotAvailable(slot, selectedRoomType);
//     });
//   };

//   const calculateDuration = (start: Date, end: Date) => {
//     const diffMs = end.getTime() - start.getTime();
//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     if (hours === 0) {
//       return `${minutes} minutes`;
//     } else if (minutes === 0) {
//       return `${hours} hour${hours > 1 ? 's' : ''}`;
//     } else {
//       return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
//     }
//   };

//   const formatTimeForDisplay = (date: Date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   // Room Selection Step
//   if (step === 'room') {
//     return (
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           {/* Header */}
//           <div className="flex justify-between items-center p-6 border-b border-gray-700">
//             <div>
//               <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//                 Select Room Type
//               </h2>
//               <p className="text-gray-400 text-sm mt-1">
//                 Choose the meeting room that fits your needs
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//             >
//               ×
//             </button>
//           </div>

//           <div className="p-6">
//             {/* Room Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               {availableRooms.map((room) => (
//                 <button
//                   key={room.type}
//                   onClick={() => handleRoomSelect(room.type)}
//                   className={`p-6 rounded-xl text-left transition-all duration-200 border-2 ${
//                     selectedRoomType === room.type
//                       ? room.type === 'small'
//                         ? 'bg-green-500/20 border-green-400 shadow-lg shadow-green-500/20'
//                         : 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
//                       : 'bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className={`text-lg font-semibold ${
//                       selectedRoomType === room.type
//                         ? room.type === 'small' ? 'text-green-300' : 'text-blue-300'
//                         : 'text-white'
//                     }`}>
//                       {room.name}
//                     </h3>
//                     {selectedRoomType === room.type && (
//                       <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
//                         <span className="text-white text-sm">✓</span>
//                       </div>
//                     )}
//                   </div>
//                   <p className="text-gray-300 text-sm mb-2">{room.capacity}</p>
//                   <div className={`text-xs ${
//                     selectedRoomType === room.type ? 'text-gray-200' : 'text-gray-400'
//                   }`}>
//                     {room.type === 'small'
//                       ? 'Perfect for small team meetings and discussions'
//                       : 'Ideal for large presentations and conferences'
//                     }
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {availableRooms.length === 0 && (
//               <div className="text-center py-8 text-gray-400">
//                 No rooms available for booking
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleContinueToTime}
//                 disabled={!selectedRoomType}
//                 className="px-6 py-3 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-orange-500/50"
//               >
//                 Continue to Time Selection
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Time Selection Step
//   if (step === 'time') {
//     return (
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           {/* Header */}
//           <div className="flex justify-between items-center p-6 border-b border-gray-700">
//             <div>
//               <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//                 Select Time Slot
//               </h2>
//               <p className="text-gray-400 text-sm mt-1">
//                 {selectedDate.toLocaleDateString('en-US', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })} - {selectedRoomType === 'small' ? 'Small Room' : 'Large Room'}
//               </p>
//             </div>
//             <button
//               onClick={() => setStep('room')}
//               className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//             >
//               ×
//             </button>
//           </div>

//           <div className="p-6">
//             {/* Time Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               {/* Start Time */}
//               <div>
//                 <h3 className="text-lg font-semibold text-[#f37121] mb-3">
//                   Start Time
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
//                   {timeSlots.map((slot) => (
//                     <button
//                       key={`${slot.hour}-${slot.minute}`}
//                       onClick={() => handleStartSelect(slot)}
//                       disabled={!isSlotAvailable(slot, selectedRoomType)}
//                       className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
//                         selectedStart?.hour === slot.hour && selectedStart?.minute === slot.minute
//                           ? 'bg-[#f37121] border-[#f37121] text-white shadow-lg'
//                           : isSlotAvailable(slot, selectedRoomType)
//                           ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-500'
//                           : 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       {slot.formatted}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* End Time */}
//               <div>
//                 <h3 className="text-lg font-semibold text-[#f37121] mb-3">
//                   End Time
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
//                   {getAvailableSlotsAfter(selectedStart).map((slot) => (
//                     <button
//                       key={`${slot.hour}-${slot.minute}`}
//                       onClick={() => handleEndSelect(slot)}
//                       className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
//                         selectedEnd?.hour === slot.hour && selectedEnd?.minute === slot.minute
//                           ? 'bg-[#f37121] border-[#f37121] text-white shadow-lg'
//                           : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-500'
//                       }`}
//                     >
//                       {slot.formatted}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Selected Time Display */}
//             {(selectedStart || selectedEnd) && (
//               <div className="bg-gray-700 rounded-lg p-4 mb-6 border border-gray-600">
//                 <h3 className="text-lg font-semibold text-gray-300 mb-2">
//                   Selected Time
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <div className="text-center">
//                     <p className="text-sm text-gray-400">From</p>
//                     <p className="text-xl font-bold text-white">
//                       {selectedStart?.formatted}
//                     </p>
//                   </div>
//                   <div className="text-gray-400 mx-4">→</div>
//                   <div className="text-center">
//                     <p className="text-sm text-gray-400">To</p>
//                     <p className="text-xl font-bold text-white">
//                       {selectedEnd?.formatted || 'Select end time'}
//                     </p>
//                   </div>
//                 </div>
//                 {selectedStart && selectedEnd && (
//                   <div className="text-center mt-2">
//                     <p className="text-sm text-gray-400">
//                       Duration: {calculateDuration(selectedStart.start, selectedEnd.start)}
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Room: {selectedRoomType === 'small' ? 'Small Room' : 'Large Room'}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-between gap-3">
//               <button
//                 onClick={() => setStep('room')}
//                 className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
//               >
//                 Back to Room Selection
//               </button>
//               <div className="flex gap-3">
//                 <button
//                   onClick={onClose}
//                   className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleContinueToDetails}
//                   disabled={!selectedStart || !selectedEnd}
//                   className="px-6 py-3 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-orange-500/50"
//                 >
//                   Continue to Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Details Step
//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-700">
//           <div>
//             <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//               {isEditMode ? 'Edit Booking Details' : 'Booking Details'}
//             </h2>
//             <p className="text-sm text-gray-400 mt-1">
//               {selectedStart && formatTimeForDisplay(selectedStart.start)} - {selectedEnd && formatTimeForDisplay(selectedEnd.start)}
//             </p>
//             <p className="text-xs text-gray-500 mt-1">
//               Duration: {selectedStart && selectedEnd ?
//                 calculateDuration(selectedStart.start, selectedEnd.start) : ''}
//               <br />
//               Room: {selectedRoomType === 'small' ? 'Small Room' : 'Large Room'}
//             </p>
//           </div>
//           <button
//             onClick={() => isEditMode ? onClose() : setStep('time')}
//             className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//           >
//             ×
//           </button>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mx-6 mt-4 bg-red-900/50 border border-red-700/50 text-red-200 px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Attendees */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Number of Attendees</label>
//             <input
//               type="number"
//               value={formData.numberOfAttendees}
//               onChange={(e) => setFormData({...formData, numberOfAttendees: parseInt(e.target.value)})}
//               min="1"
//               max={selectedRoomType === 'small' ? '10' : '30'}
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white transition-all duration-200"
//               required
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Maximum {selectedRoomType === 'small' ? '10' : '30'} attendees for {selectedRoomType === 'small' ? 'small room' : 'large room'}
//             </p>
//           </div>

//           {/* Contact Person Section */}
//           <div className="border-t border-gray-700 pt-6">
//             <h3 className="text-lg font-semibold text-[#f37121] mb-4">Contact Person</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   value={formData.contactPerson.name}
//                   onChange={(e) => handleContactPersonChange('name', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter full name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
//                 <input
//                   type="tel"
//                   value={formData.contactPerson.phone}
//                   onChange={(e) => handleContactPersonChange('phone', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
//                 <input
//                   type="text"
//                   value={formData.contactPerson.company}
//                   onChange={(e) => handleContactPersonChange('company', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter company name"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             {!isEditMode && (
//               <button
//                 type="button"
//                 onClick={() => setStep('time')}
//                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
//               >
//                 Back
//               </button>
//             )}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`${isEditMode ? 'flex-1' : 'flex-1'} bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 border border-orange-500/50`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                   {isEditMode ? 'Updating...' : 'Booking...'}
//                 </span>
//               ) : (
//                 isEditMode ? 'Update Booking' : 'Confirm Booking'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// good but withoiout email

// import { useState, useEffect } from 'react';
// import { BookingFormData, AvailableRoom } from '../types';
// import { bookingsAPI, adminAPI } from '../utils/api';

// interface TimeSlotPickerProps {
//   onClose: () => void;
//   onBookingSuccess: () => void;
//   selectedDate: Date;
//   initialData?: BookingFormData;
//   isEditMode?: boolean;
//   bookingId?: string;
// }

// interface TimeSlot {
//   hour: number;
//   minute: number;
//   formatted: string;
//   available: boolean;
//   start: Date;
//   end: Date;
// }

// export default function TimeSlotPicker({
//   onClose,
//   onBookingSuccess,
//   selectedDate,
//   initialData,
//   isEditMode = false,
//   bookingId
// }: TimeSlotPickerProps) {
//   const [selectedStart, setSelectedStart] = useState<TimeSlot | null>(null);
//   const [selectedEnd, setSelectedEnd] = useState<TimeSlot | null>(null);
//   const [selectedRoomType, setSelectedRoomType] = useState<'small' | 'large' | ''>('');
//   const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
//   const [step, setStep] = useState<'room' | 'time' | 'details'>(isEditMode ? 'details' : 'room');
//   const [existingBookings, setExistingBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState<BookingFormData>(initialData || {
//     startTime: '',
//     endTime: '',
//     numberOfAttendees: 1,
//     contactPerson: {
//       name: '',
//       phone: '',
//       company: ''
//     },
//     roomType: 'small'
//   });

//   // إنشاء جميع المواعيد المتاحة (كل 30 دقيقة) - من 7 صباحاً إلى 10 مساءً
//   const timeSlots: TimeSlot[] = [];
//   for (let hour = 7; hour <= 22; hour++) { // من 7 إلى 22 (10 مساءً)
//     for (let minute of [0, 30]) {
//       const period = hour >= 12 ? 'PM' : 'AM';
//       const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

//       const start = new Date(selectedDate);
//       start.setHours(hour, minute, 0, 0);

//       const end = new Date(start);
//       end.setHours(hour, minute, 0, 0);

//       timeSlots.push({
//         hour,
//         minute,
//         formatted: `${displayHour}:${minute === 0 ? '00' : '30'} ${period}`,
//         available: true,
//         start,
//         end
//       });
//     }
//   }

//   useEffect(() => {
//     loadAvailableRooms();
//     loadExistingBookings();

//     // إذا كان في بيانات أولية (وضع التعديل)، نعرض الأوقات المختارة
//     if (initialData && initialData.startTime && initialData.endTime && initialData.roomType) {
//       const startTime = new Date(initialData.startTime);
//       const endTime = new Date(initialData.endTime);

//       const startSlot = timeSlots.find(slot =>
//         slot.hour === startTime.getHours() && slot.minute === startTime.getMinutes()
//       );

//       const endSlot = timeSlots.find(slot =>
//         slot.hour === endTime.getHours() && slot.minute === endTime.getMinutes()
//       );

//       if (startSlot) setSelectedStart(startSlot);
//       if (endSlot) setSelectedEnd(endSlot);
//       if (initialData.roomType) setSelectedRoomType(initialData.roomType);

//       setFormData(initialData);
//     }
//   }, [selectedDate, initialData]);

//   const loadAvailableRooms = async () => {
//     try {
//       const result = await bookingsAPI.getAvailableRooms();
//       if (result.status === 'success') {
//         setAvailableRooms(result.data.availableRooms);
//         // Auto-select first available room if not in edit mode
//         if (!isEditMode && result.data.availableRooms.length > 0) {
//           setSelectedRoomType(result.data.availableRooms[0].type);
//           setFormData(prev => ({ ...prev, roomType: result.data.availableRooms[0].type }));
//         }
//       }
//     } catch (error) {
//       console.error('Error loading available rooms:', error);
//     }
//   };

//   const loadExistingBookings = async () => {
//     try {
//       const result = await bookingsAPI.getAll();
//       if (result.status === 'success') {
//         setExistingBookings(result.data.bookings);
//       }
//     } catch (error) {
//       console.error('Error loading bookings:', error);
//     }
//   };

//   const isSlotAvailable = (slot: TimeSlot, roomType: string) => {
//     const slotDate = new Date(selectedDate);
//     slotDate.setHours(slot.hour, slot.minute, 0, 0);

//     // في وضع التعديل، نستثني الحجز الحالي من التحقق
//     const conflict = existingBookings.some(booking => {
//       if (isEditMode && bookingId && booking._id === bookingId) return false;

//       const start = new Date(booking.startTime);
//       const end = new Date(booking.endTime);
//       return booking.roomType === roomType && slotDate >= start && slotDate < end;
//     });

//     return !conflict;
//   };

//   const handleRoomSelect = (roomType: 'small' | 'large') => {
//     setSelectedRoomType(roomType);
//     setFormData(prev => ({ ...prev, roomType }));
//     setSelectedStart(null);
//     setSelectedEnd(null);
//   };

//   const handleStartSelect = (slot: TimeSlot) => {
//     if (!selectedRoomType || !isSlotAvailable(slot, selectedRoomType)) return;

//     setSelectedStart(slot);
//     setSelectedEnd(null);
//   };

//   const handleEndSelect = (slot: TimeSlot) => {
//     if (!selectedStart || !selectedRoomType || !isSlotAvailable(slot, selectedRoomType)) return;

//     const startMinutes = selectedStart.hour * 60 + selectedStart.minute;
//     const endMinutes = slot.hour * 60 + slot.minute;

//     if (endMinutes > startMinutes) {
//       setSelectedEnd(slot);
//     }
//   };

//   const handleContinueToTime = () => {
//     if (!selectedRoomType) {
//       alert('Please select a room type');
//       return;
//     }
//     setStep('time');
//   };

//   const handleContinueToDetails = () => {
//     if (!selectedStart || !selectedEnd || !selectedRoomType) {
//       alert('Please select both start and end time');
//       return;
//     }

//     const startTime = new Date(selectedStart.start);
//     const endTime = new Date(selectedEnd.start);

//     setFormData(prev => ({
//       ...prev,
//       startTime: startTime.toISOString(),
//       endTime: endTime.toISOString(),
//       roomType: selectedRoomType
//     }));
//     setStep('details');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       let result;

//       if (isEditMode && bookingId) {
//         result = await adminAPI.updateBooking(bookingId, formData);
//       } else {
//         result = await bookingsAPI.create(formData);
//       }

//       if (result.status === 'success') {
//         onBookingSuccess();
//         onClose();
//       } else {
//         setError(result.message || 'Something went wrong');
//       }
//     } catch (err) {
//       console.error('Booking error:', err);
//       setError(isEditMode ? 'Failed to update booking' : 'Booking failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContactPersonChange = (field: keyof typeof formData.contactPerson, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       contactPerson: {
//         ...prev.contactPerson,
//         [field]: value
//       }
//     }));
//   };

//   const getAvailableSlotsAfter = (startSlot: TimeSlot | null) => {
//     if (!startSlot || !selectedRoomType) return timeSlots.filter(slot => isSlotAvailable(slot, selectedRoomType));

//     const startMinutes = startSlot.hour * 60 + startSlot.minute;
//     return timeSlots.filter(slot => {
//       const slotMinutes = slot.hour * 60 + slot.minute;
//       return slotMinutes > startMinutes && isSlotAvailable(slot, selectedRoomType);
//     });
//   };

//   const calculateDuration = (start: Date, end: Date) => {
//     const diffMs = end.getTime() - start.getTime();
//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     if (hours === 0) {
//       return `${minutes} minutes`;
//     } else if (minutes === 0) {
//       return `${hours} hour${hours > 1 ? 's' : ''}`;
//     } else {
//       return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
//     }
//   };

//   const formatTimeForDisplay = (date: Date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   // Room Selection Step
//   if (step === 'room') {
//     return (
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           {/* Header */}
//           <div className="flex justify-between items-center p-6 border-b border-gray-700">
//             <div>
//               <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//                 Select Room Type
//               </h2>
//               <p className="text-gray-400 text-sm mt-1">
//                 Choose the meeting room that fits your needs
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//             >
//               ×
//             </button>
//           </div>

//           <div className="p-6">
//             {/* Room Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               {availableRooms.map((room) => (
//                 <button
//                   key={room.type}
//                   onClick={() => handleRoomSelect(room.type)}
//                   className={`p-6 rounded-xl text-left transition-all duration-200 border-2 ${
//                     selectedRoomType === room.type
//                       ? room.type === 'small'
//                         ? 'bg-green-500/20 border-green-400 shadow-lg shadow-green-500/20'
//                         : 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
//                       : 'bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className={`text-lg font-semibold ${
//                       selectedRoomType === room.type
//                         ? room.type === 'small' ? 'text-green-300' : 'text-blue-300'
//                         : 'text-white'
//                     }`}>
//                       {room.name}
//                     </h3>
//                     {selectedRoomType === room.type && (
//                       <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
//                         <span className="text-white text-sm">✓</span>
//                       </div>
//                     )}
//                   </div>
//                   <p className="text-gray-300 text-sm mb-2">{room.capacity}</p>
//                   <div className={`text-xs ${
//                     selectedRoomType === room.type ? 'text-gray-200' : 'text-gray-400'
//                   }`}>
//                     {room.type === 'small'
//                       ? 'Perfect for small team meetings and discussions'
//                       : 'Ideal for large presentations and conferences'
//                     }
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {availableRooms.length === 0 && (
//               <div className="text-center py-8 text-gray-400">
//                 No rooms available for booking
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleContinueToTime}
//                 disabled={!selectedRoomType}
//                 className="px-6 py-3 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-orange-500/50"
//               >
//                 Continue to Time Selection
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Time Selection Step
//   if (step === 'time') {
//     return (
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           {/* Header */}
//           <div className="flex justify-between items-center p-6 border-b border-gray-700">
//             <div>
//               <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//                 Select Time Slot
//               </h2>
//               <p className="text-gray-400 text-sm mt-1">
//                 {selectedDate.toLocaleDateString('en-US', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })} - {selectedRoomType === 'small' ? 'Small Room' : 'Large Room'}
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 Available times: 7:00 AM - 10:00 PM
//               </p>
//             </div>
//             <button
//               onClick={() => setStep('room')}
//               className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//             >
//               ×
//             </button>
//           </div>

//           <div className="p-6">
//             {/* Time Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               {/* Start Time */}
//               <div>
//                 <h3 className="text-lg font-semibold text-[#f37121] mb-3">
//                   Start Time
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
//                   {timeSlots.map((slot) => (
//                     <button
//                       key={`${slot.hour}-${slot.minute}`}
//                       onClick={() => handleStartSelect(slot)}
//                       disabled={!isSlotAvailable(slot, selectedRoomType)}
//                       className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
//                         selectedStart?.hour === slot.hour && selectedStart?.minute === slot.minute
//                           ? 'bg-[#f37121] border-[#f37121] text-white shadow-lg'
//                           : isSlotAvailable(slot, selectedRoomType)
//                           ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-500'
//                           : 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       {slot.formatted}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* End Time */}
//               <div>
//                 <h3 className="text-lg font-semibold text-[#f37121] mb-3">
//                   End Time
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
//                   {getAvailableSlotsAfter(selectedStart).map((slot) => (
//                     <button
//                       key={`${slot.hour}-${slot.minute}`}
//                       onClick={() => handleEndSelect(slot)}
//                       className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
//                         selectedEnd?.hour === slot.hour && selectedEnd?.minute === slot.minute
//                           ? 'bg-[#f37121] border-[#f37121] text-white shadow-lg'
//                           : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-500'
//                       }`}
//                     >
//                       {slot.formatted}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Selected Time Display */}
//             {(selectedStart || selectedEnd) && (
//               <div className="bg-gray-700 rounded-lg p-4 mb-6 border border-gray-600">
//                 <h3 className="text-lg font-semibold text-gray-300 mb-2">
//                   Selected Time
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <div className="text-center">
//                     <p className="text-sm text-gray-400">From</p>
//                     <p className="text-xl font-bold text-white">
//                       {selectedStart?.formatted}
//                     </p>
//                   </div>
//                   <div className="text-gray-400 mx-4">→</div>
//                   <div className="text-center">
//                     <p className="text-sm text-gray-400">To</p>
//                     <p className="text-xl font-bold text-white">
//                       {selectedEnd?.formatted || 'Select end time'}
//                     </p>
//                   </div>
//                 </div>
//                 {selectedStart && selectedEnd && (
//                   <div className="text-center mt-2">
//                     <p className="text-sm text-gray-400">
//                       Duration: {calculateDuration(selectedStart.start, selectedEnd.start)}
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Room: {selectedRoomType === 'small' ? 'Small Room' : 'Large Room'}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-between gap-3">
//               <button
//                 onClick={() => setStep('room')}
//                 className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
//               >
//                 Back to Room Selection
//               </button>
//               <div className="flex gap-3">
//                 <button
//                   onClick={onClose}
//                   className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleContinueToDetails}
//                   disabled={!selectedStart || !selectedEnd}
//                   className="px-6 py-3 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-orange-500/50"
//                 >
//                   Continue to Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Details Step
//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-700">
//           <div>
//             <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//               {isEditMode ? 'Edit Booking Details' : 'Booking Details'}
//             </h2>
//             <p className="text-sm text-gray-400 mt-1">
//               {selectedStart && formatTimeForDisplay(selectedStart.start)} - {selectedEnd && formatTimeForDisplay(selectedEnd.start)}
//             </p>
//             <p className="text-xs text-gray-500 mt-1">
//               Duration: {selectedStart && selectedEnd ?
//                 calculateDuration(selectedStart.start, selectedEnd.start) : ''}
//               <br />
//               Room: {selectedRoomType === 'small' ? 'Small Room' : 'Large Room'}
//             </p>
//           </div>
//           <button
//             onClick={() => isEditMode ? onClose() : setStep('time')}
//             className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//           >
//             ×
//           </button>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mx-6 mt-4 bg-red-900/50 border border-red-700/50 text-red-200 px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Attendees */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Number of Attendees</label>
//             <input
//               type="number"
//               value={formData.numberOfAttendees}
//               onChange={(e) => setFormData({...formData, numberOfAttendees: parseInt(e.target.value)})}
//               min="1"
//               max={selectedRoomType === 'small' ? '10' : '30'}
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white transition-all duration-200"
//               required
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Maximum {selectedRoomType === 'small' ? '10' : '30'} attendees for {selectedRoomType === 'small' ? 'small room' : 'large room'}
//             </p>
//           </div>

//           {/* Contact Person Section */}
//           <div className="border-t border-gray-700 pt-6">
//             <h3 className="text-lg font-semibold text-[#f37121] mb-4">Contact Person</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   value={formData.contactPerson.name}
//                   onChange={(e) => handleContactPersonChange('name', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter full name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
//                 <input
//                   type="tel"
//                   value={formData.contactPerson.phone}
//                   onChange={(e) => handleContactPersonChange('phone', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
//                 <input
//                   type="text"
//                   value={formData.contactPerson.company}
//                   onChange={(e) => handleContactPersonChange('company', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter company name"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             {!isEditMode && (
//               <button
//                 type="button"
//                 onClick={() => setStep('time')}
//                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
//               >
//                 Back
//               </button>
//             )}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`${isEditMode ? 'flex-1' : 'flex-1'} bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 border border-orange-500/50`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                   {isEditMode ? 'Updating...' : 'Booking...'}
//                 </span>
//               ) : (
//                 isEditMode ? 'Update Booking' : 'Confirm Booking'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// goooood

// import { useState, useEffect } from 'react';
// import { BookingFormData, AvailableRoom } from '../types';
// import { bookingsAPI, adminAPI } from '../utils/api';

// interface TimeSlotPickerProps {
//   onClose: () => void;
//   onBookingSuccess: () => void;
//   selectedDate: Date;
//   initialData?: BookingFormData;
//   isEditMode?: boolean;
//   bookingId?: string;
// }

// interface TimeSlot {
//   hour: number;
//   minute: number;
//   formatted: string;
//   available: boolean;
//   start: Date;
//   end: Date;
// }

// export default function TimeSlotPicker({
//   onClose,
//   onBookingSuccess,
//   selectedDate,
//   initialData,
//   isEditMode = false,
//   bookingId
// }: TimeSlotPickerProps) {
//   const [selectedStart, setSelectedStart] = useState<TimeSlot | null>(null);
//   const [selectedEnd, setSelectedEnd] = useState<TimeSlot | null>(null);
//   const [selectedRoomType, setSelectedRoomType] = useState<'small' | 'large' | ''>('');
//   const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
//   const [step, setStep] = useState<'room' | 'time' | 'details'>(isEditMode ? 'details' : 'room');
//   const [existingBookings, setExistingBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState<BookingFormData>(initialData || {
//     startTime: '',
//     endTime: '',
//     numberOfAttendees: 1,
//     contactPerson: {
//       name: '',
//       phone: '',
//       company: ''
//     },
//     roomType: 'small'
//   });

//   // إنشاء جميع المواعيد المتاحة (كل 30 دقيقة) - من 7 صباحاً إلى 10 مساءً
//   const timeSlots: TimeSlot[] = [];
//   for (let hour = 7; hour <= 22; hour++) { // من 7 إلى 22 (10 مساءً)
//     for (let minute of [0, 30]) {
//       const period = hour >= 12 ? 'PM' : 'AM';
//       const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

//       const start = new Date(selectedDate);
//       start.setHours(hour, minute, 0, 0);

//       const end = new Date(start);
//       end.setHours(hour, minute, 0, 0);

//       timeSlots.push({
//         hour,
//         minute,
//         formatted: `${displayHour}:${minute === 0 ? '00' : '30'} ${period}`,
//         available: true,
//         start,
//         end
//       });
//     }
//   }

//   useEffect(() => {
//     loadAvailableRooms();
//     loadExistingBookings();

//     // إذا كان في بيانات أولية (وضع التعديل)، نعرض الأوقات المختارة
//     if (initialData && initialData.startTime && initialData.endTime && initialData.roomType) {
//       const startTime = new Date(initialData.startTime);
//       const endTime = new Date(initialData.endTime);

//       const startSlot = timeSlots.find(slot =>
//         slot.hour === startTime.getHours() && slot.minute === startTime.getMinutes()
//       );

//       const endSlot = timeSlots.find(slot =>
//         slot.hour === endTime.getHours() && slot.minute === endTime.getMinutes()
//       );

//       if (startSlot) setSelectedStart(startSlot);
//       if (endSlot) setSelectedEnd(endSlot);
//       if (initialData.roomType) setSelectedRoomType(initialData.roomType);

//       setFormData(initialData);
//     }
//   }, [selectedDate, initialData]);

//   const loadAvailableRooms = async () => {
//     try {
//       const result = await bookingsAPI.getAvailableRooms();
//       if (result.status === 'success') {
//         setAvailableRooms(result.data.availableRooms);
//         // Auto-select first available room if not in edit mode
//         if (!isEditMode && result.data.availableRooms.length > 0) {
//           setSelectedRoomType(result.data.availableRooms[0].type);
//           setFormData(prev => ({ ...prev, roomType: result.data.availableRooms[0].type }));
//         }
//       }
//     } catch (error) {
//       console.error('Error loading available rooms:', error);
//     }
//   };

//   const loadExistingBookings = async () => {
//     try {
//       const result = await bookingsAPI.getAll();
//       if (result.status === 'success') {
//         setExistingBookings(result.data.bookings);
//       }
//     } catch (error) {
//       console.error('Error loading bookings:', error);
//     }
//   };

//   const isSlotAvailable = (slot: TimeSlot, roomType: string) => {
//     const slotDate = new Date(selectedDate);
//     slotDate.setHours(slot.hour, slot.minute, 0, 0);

//     // في وضع التعديل، نستثني الحجز الحالي من التحقق
//     const conflict = existingBookings.some(booking => {
//       if (isEditMode && bookingId && booking._id === bookingId) return false;

//       const start = new Date(booking.startTime);
//       const end = new Date(booking.endTime);
//       return booking.roomType === roomType && slotDate >= start && slotDate < end;
//     });

//     return !conflict;
//   };

//   const handleRoomSelect = (roomType: 'small' | 'large') => {
//     setSelectedRoomType(roomType);
//     setFormData(prev => ({ ...prev, roomType }));
//     setSelectedStart(null);
//     setSelectedEnd(null);
//   };

//   const handleStartSelect = (slot: TimeSlot) => {
//     if (!selectedRoomType || !isSlotAvailable(slot, selectedRoomType)) return;

//     setSelectedStart(slot);
//     setSelectedEnd(null);
//   };

//   const handleEndSelect = (slot: TimeSlot) => {
//     if (!selectedStart || !selectedRoomType || !isSlotAvailable(slot, selectedRoomType)) return;

//     const startMinutes = selectedStart.hour * 60 + selectedStart.minute;
//     const endMinutes = slot.hour * 60 + slot.minute;

//     if (endMinutes > startMinutes) {
//       setSelectedEnd(slot);
//     }
//   };

//   const handleContinueToTime = () => {
//     if (!selectedRoomType) {
//       alert('Please select a room type');
//       return;
//     }
//     setStep('time');
//   };

//   const handleContinueToDetails = () => {
//     if (!selectedStart || !selectedEnd || !selectedRoomType) {
//       alert('Please select both start and end time');
//       return;
//     }

//     const startTime = new Date(selectedStart.start);
//     const endTime = new Date(selectedEnd.start);

//     setFormData(prev => ({
//       ...prev,
//       startTime: startTime.toISOString(),
//       endTime: endTime.toISOString(),
//       roomType: selectedRoomType
//     }));
//     setStep('details');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       let result;

//       if (isEditMode && bookingId) {
//         result = await adminAPI.updateBooking(bookingId, formData);
//       } else {
//         result = await bookingsAPI.create(formData);
//       }

//       if (result.status === 'success') {
//         onBookingSuccess();
//         onClose();
//       } else {
//         setError(result.message || 'Something went wrong');
//       }
//     } catch (err) {
//       console.error('Booking error:', err);
//       setError(isEditMode ? 'Failed to update booking' : 'Booking failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContactPersonChange = (field: keyof typeof formData.contactPerson, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       contactPerson: {
//         ...prev.contactPerson,
//         [field]: value
//       }
//     }));
//   };

//   const getAvailableSlotsAfter = (startSlot: TimeSlot | null) => {
//     if (!startSlot || !selectedRoomType) return timeSlots.filter(slot => isSlotAvailable(slot, selectedRoomType));

//     const startMinutes = startSlot.hour * 60 + startSlot.minute;
//     return timeSlots.filter(slot => {
//       const slotMinutes = slot.hour * 60 + slot.minute;
//       return slotMinutes > startMinutes && isSlotAvailable(slot, selectedRoomType);
//     });
//   };

//   const calculateDuration = (start: Date, end: Date) => {
//     const diffMs = end.getTime() - start.getTime();
//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     if (hours === 0) {
//       return `${minutes} minutes`;
//     } else if (minutes === 0) {
//       return `${hours} hour${hours > 1 ? 's' : ''}`;
//     } else {
//       return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
//     }
//   };

//   const formatTimeForDisplay = (date: Date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   // Room Selection Step
//   if (step === 'room') {
//     return (
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           {/* Header */}
//           <div className="flex justify-between items-center p-6 border-b border-gray-700">
//             <div>
//               <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//                 Select Room Type
//               </h2>
//               <p className="text-gray-400 text-sm mt-1">
//                 Choose the meeting room that fits your needs
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//             >
//               ×
//             </button>
//           </div>

//           <div className="p-6">
//             {/* Room Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               {availableRooms.map((room) => (
//                 <button
//                   key={room.type}
//                   onClick={() => handleRoomSelect(room.type)}
//                   className={`p-6 rounded-xl text-left transition-all duration-200 border-2 ${
//                     selectedRoomType === room.type
//                       ? room.type === 'small'
//                         ? 'bg-green-500/20 border-green-400 shadow-lg shadow-green-500/20'
//                         : 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
//                       : 'bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className={`text-lg font-semibold ${
//                       selectedRoomType === room.type
//                         ? room.type === 'small' ? 'text-green-300' : 'text-blue-300'
//                         : 'text-white'
//                     }`}>
//                       {room.name}
//                     </h3>
//                     {selectedRoomType === room.type && (
//                       <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
//                         <span className="text-white text-sm">✓</span>
//                       </div>
//                     )}
//                   </div>
//                   <p className="text-gray-300 text-sm mb-2">{room.capacity}</p>
//                   <div className={`text-xs ${
//                     selectedRoomType === room.type ? 'text-gray-200' : 'text-gray-400'
//                   }`}>
//                     {room.type === 'small'
//                       ? 'Perfect for small team meetings and discussions'
//                       : 'Ideal for large presentations and conferences'
//                     }
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {availableRooms.length === 0 && (
//               <div className="text-center py-8 text-gray-400">
//                 No rooms available for booking
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleContinueToTime}
//                 disabled={!selectedRoomType}
//                 className="px-6 py-3 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-orange-500/50"
//               >
//                 Continue to Time Selection
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Time Selection Step
//   if (step === 'time') {
//     return (
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           {/* Header */}
//           <div className="flex justify-between items-center p-6 border-b border-gray-700">
//             <div>
//               <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//                 Select Time Slot
//               </h2>
//               <p className="text-gray-400 text-sm mt-1">
//                 {selectedDate.toLocaleDateString('en-US', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })} - {selectedRoomType === 'small' ? 'Small Room' : 'Large Room'}
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 Available times: 7:00 AM - 10:00 PM
//               </p>
//             </div>
//             <button
//               onClick={() => setStep('room')}
//               className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//             >
//               ×
//             </button>
//           </div>

//           <div className="p-6">
//             {/* Time Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               {/* Start Time */}
//               <div>
//                 <h3 className="text-lg font-semibold text-[#f37121] mb-3">
//                   Start Time
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
//                   {timeSlots.map((slot) => (
//                     <button
//                       key={`${slot.hour}-${slot.minute}`}
//                       onClick={() => handleStartSelect(slot)}
//                       disabled={!isSlotAvailable(slot, selectedRoomType)}
//                       className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
//                         selectedStart?.hour === slot.hour && selectedStart?.minute === slot.minute
//                           ? 'bg-[#f37121] border-[#f37121] text-white shadow-lg'
//                           : isSlotAvailable(slot, selectedRoomType)
//                           ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-500'
//                           : 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       {slot.formatted}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* End Time */}
//               <div>
//                 <h3 className="text-lg font-semibold text-[#f37121] mb-3">
//                   End Time
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
//                   {getAvailableSlotsAfter(selectedStart).map((slot) => (
//                     <button
//                       key={`${slot.hour}-${slot.minute}`}
//                       onClick={() => handleEndSelect(slot)}
//                       className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
//                         selectedEnd?.hour === slot.hour && selectedEnd?.minute === slot.minute
//                           ? 'bg-[#f37121] border-[#f37121] text-white shadow-lg'
//                           : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-500'
//                       }`}
//                     >
//                       {slot.formatted}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Selected Time Display */}
//             {(selectedStart || selectedEnd) && (
//               <div className="bg-gray-700 rounded-lg p-4 mb-6 border border-gray-600">
//                 <h3 className="text-lg font-semibold text-gray-300 mb-2">
//                   Selected Time
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <div className="text-center">
//                     <p className="text-sm text-gray-400">From</p>
//                     <p className="text-xl font-bold text-white">
//                       {selectedStart?.formatted}
//                     </p>
//                   </div>
//                   <div className="text-gray-400 mx-4">→</div>
//                   <div className="text-center">
//                     <p className="text-sm text-gray-400">To</p>
//                     <p className="text-xl font-bold text-white">
//                       {selectedEnd?.formatted || 'Select end time'}
//                     </p>
//                   </div>
//                 </div>
//                 {selectedStart && selectedEnd && (
//                   <div className="text-center mt-2">
//                     <p className="text-sm text-gray-400">
//                       Duration: {calculateDuration(selectedStart.start, selectedEnd.start)}
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Room: {selectedRoomType === 'small' ? 'Small Room' : 'Large Room'}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-between gap-3">
//               <button
//                 onClick={() => setStep('room')}
//                 className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
//               >
//                 Back to Room Selection
//               </button>
//               <div className="flex gap-3">
//                 <button
//                   onClick={onClose}
//                   className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleContinueToDetails}
//                   disabled={!selectedStart || !selectedEnd}
//                   className="px-6 py-3 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-orange-500/50"
//                 >
//                   Continue to Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Details Step
//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-700">
//           <div>
//             <h2 className="text-xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
//               {isEditMode ? 'Edit Booking Details' : 'Booking Details'}
//             </h2>
//             <p className="text-sm text-gray-400 mt-1">
//               {selectedStart && formatTimeForDisplay(selectedStart.start)} - {selectedEnd && formatTimeForDisplay(selectedEnd.start)}
//             </p>
//             <p className="text-xs text-gray-500 mt-1">
//               Duration: {selectedStart && selectedEnd ?
//                 calculateDuration(selectedStart.start, selectedEnd.start) : ''}
//               <br />
//               Room: {selectedRoomType === 'small' ? 'Small Room' : 'Large Room'}
//             </p>
//           </div>
//           <button
//             onClick={() => isEditMode ? onClose() : setStep('time')}
//             className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
//           >
//             ×
//           </button>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mx-6 mt-4 bg-red-900/50 border border-red-700/50 text-red-200 px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Attendees */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Number of Attendees</label>
//             <input
//               type="number"
//               value={formData.numberOfAttendees}
//               onChange={(e) => setFormData({...formData, numberOfAttendees: parseInt(e.target.value)})}
//               min="1"
//               max={selectedRoomType === 'small' ? '10' : '30'}
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white transition-all duration-200"
//               required
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Maximum {selectedRoomType === 'small' ? '10' : '30'} attendees for {selectedRoomType === 'small' ? 'small room' : 'large room'}
//             </p>
//           </div>

//           {/* Contact Person Section */}
//           <div className="border-t border-gray-700 pt-6">
//             <h3 className="text-lg font-semibold text-[#f37121] mb-4">Contact Person</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   value={formData.contactPerson.name}
//                   onChange={(e) => handleContactPersonChange('name', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter full name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
//                 <input
//                   type="tel"
//                   value={formData.contactPerson.phone}
//                   onChange={(e) => handleContactPersonChange('phone', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
//                 <input
//                   type="text"
//                   value={formData.contactPerson.company}
//                   onChange={(e) => handleContactPersonChange('company', e.target.value)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
//                   required
//                   placeholder="Enter company name"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             {!isEditMode && (
//               <button
//                 type="button"
//                 onClick={() => setStep('time')}
//                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
//               >
//                 Back
//               </button>
//             )}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`${isEditMode ? 'flex-1' : 'flex-1'} bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 border border-orange-500/50`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                   {isEditMode ? 'Updating...' : 'Booking...'}
//                 </span>
//               ) : (
//                 isEditMode ? 'Update Booking' : 'Confirm Booking'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { BookingFormData, AvailableRoom } from "../types";
import { bookingsAPI, adminAPI } from "../utils/api";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Calendar, Clock, Users, Building, Mail, Phone, Edit2, Trash2, CheckCircle, X } from "lucide-react";

interface TimeSlotPickerProps {
  onClose: () => void;
  onBookingSuccess: () => void;
  selectedDate: Date;
  onDateChange?: (date: Date) => void;
  initialData?: BookingFormData;
  isEditMode?: boolean;
  bookingId?: string;
}

interface TimeSlot {
  hour: number;
  minute: number;
  formatted: string;
  available: boolean;
  start: Date;
  end: Date;
}

// EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_i311hrs",
  TEMPLATE_ID: "template_xnrk0wq",
  PUBLIC_KEY: "qxwOsIvUcT67V-62A",
};

// إيميلك الثابت لإرسال جميع الحجوزات
const ADMIN_EMAIL = "mohamedzaher.dev@gmail.com"; // ضع إيميلك هنا

export default function TimeSlotPicker({
  onClose,
  onBookingSuccess,
  selectedDate,
  onDateChange,
  initialData,
  isEditMode = false,
  bookingId,
}: TimeSlotPickerProps) {
  const [selectedStart, setSelectedStart] = useState<TimeSlot | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<TimeSlot | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<
    "small" | "large" | ""
  >("");
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [step, setStep] = useState<"date" | "room" | "time" | "details">(
    isEditMode ? "time" : "date"
  );
  const [localSelectedDate, setLocalSelectedDate] = useState<Date>(selectedDate);

  // تحديث localSelectedDate عند تغيير selectedDate من الخارج
  useEffect(() => {
    setLocalSelectedDate(selectedDate);
  }, [selectedDate]);
  const [existingBookings, setExistingBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<BookingFormData>(
    initialData || {
      startTime: "",
      endTime: "",
      numberOfAttendees: 1,
      contactPerson: {
        name: "",
        phone: "",
        company: "",
      },
      roomType: "small",
    }
  );

  // Generate all available time slots (every 30 minutes) - from 7 AM to 10 PM
  const timeSlots: TimeSlot[] = [];
  const dateToUse = isEditMode && initialData ? new Date(initialData.startTime) : localSelectedDate;
  
  for (let hour = 7; hour <= 22; hour++) {
    // From 7 to 22 (10 PM)
    for (let minute of [0, 30]) {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

      const start = new Date(dateToUse);
      start.setHours(hour, minute, 0, 0);

      const end = new Date(start);
      end.setHours(hour, minute, 0, 0);

      timeSlots.push({
        hour,
        minute,
        formatted: `${displayHour}:${minute === 0 ? "00" : "30"} ${period}`,
        available: true,
        start,
        end,
      });
    }
  }

  useEffect(() => {
    loadAvailableRooms();
    loadExistingBookings();
  }, []);

  // Load initial data when in edit mode
  useEffect(() => {
    if (
      isEditMode &&
      initialData &&
      initialData.startTime &&
      initialData.endTime &&
      initialData.roomType
    ) {
      console.log('Loading initial data for edit mode:', initialData);
      const startTime = new Date(initialData.startTime);
      const endTime = new Date(initialData.endTime);
      setLocalSelectedDate(startTime);
      setFormData(initialData);
      setSelectedRoomType(initialData.roomType);

      // Wait for timeSlots to be generated - use longer timeout to ensure timeSlots array is ready
      const timer = setTimeout(() => {
        console.log('TimeSlots available:', timeSlots.length);
        const startSlot = timeSlots.find(
          (slot) =>
            slot.hour === startTime.getHours() &&
            slot.minute === startTime.getMinutes()
        );

        const endSlot = timeSlots.find(
          (slot) =>
            slot.hour === endTime.getHours() &&
            slot.minute === endTime.getMinutes()
        );

        console.log('Found slots:', { startSlot, endSlot });
        if (startSlot) {
          setSelectedStart(startSlot);
          console.log('Start slot set:', startSlot);
        }
        if (endSlot) {
          setSelectedEnd(endSlot);
          console.log('End slot set:', endSlot);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isEditMode, initialData, timeSlots.length]);

  const loadAvailableRooms = async () => {
    try {
      const result = await bookingsAPI.getAvailableRooms();
      if (result.status === "success") {
        setAvailableRooms(result.data.availableRooms);
        // Auto-select first available room if not in edit mode
        if (!isEditMode && result.data.availableRooms.length > 0) {
          setSelectedRoomType(result.data.availableRooms[0].type);
          setFormData((prev) => ({
            ...prev,
            roomType: result.data.availableRooms[0].type,
          }));
        }
      }
    } catch (error) {
      console.error("Error loading available rooms:", error);
    }
  };

  const loadExistingBookings = async () => {
    try {
      const result = await bookingsAPI.getAll();
      if (result.status === "success") {
        setExistingBookings(result.data.bookings);
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  const isSlotAvailable = (slot: TimeSlot, roomType: string) => {
    const slotDate = new Date(selectedDate);
    slotDate.setHours(slot.hour, slot.minute, 0, 0);

    // في وضع التعديل، نستثني الحجز الحالي من التحقق
    const conflict = existingBookings.some((booking) => {
      if (isEditMode && bookingId && booking._id === bookingId) return false;

      const start = new Date(booking.startTime);
      const end = new Date(booking.endTime);
      return (
        booking.roomType === roomType && slotDate >= start && slotDate < end
      );
    });

    return !conflict;
  };

  const handleRoomSelect = (roomType: "small" | "large") => {
    setSelectedRoomType(roomType);
    setFormData((prev) => ({ ...prev, roomType }));
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  const handleStartSelect = (slot: TimeSlot) => {
    if (!selectedRoomType || !isSlotAvailable(slot, selectedRoomType)) return;

    setSelectedStart(slot);
    setSelectedEnd(null);
  };

  const handleEndSelect = (slot: TimeSlot) => {
    if (
      !selectedStart ||
      !selectedRoomType ||
      !isSlotAvailable(slot, selectedRoomType)
    )
      return;

    const startMinutes = selectedStart.hour * 60 + selectedStart.minute;
    const endMinutes = slot.hour * 60 + slot.minute;

    if (endMinutes > startMinutes) {
      setSelectedEnd(slot);
    }
  };

  const handleContinueToTime = () => {
    if (!selectedRoomType) {
      // Room type validation will be handled by UI
      return;
    }
    setStep("time");
  };

  const handleContinueToDetails = () => {
    if (!selectedStart || !selectedEnd || !selectedRoomType) {
      alert("Please select both start and end time");
      return;
    }

    const startTime = new Date(selectedStart.start);
    const endTime = new Date(selectedEnd.start);

    setFormData((prev) => ({
      ...prev,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      roomType: selectedRoomType,
    }));
    setStep("details");
  };

  // دالة إرسال الإيميل باستخدام EmailJS
  const sendConfirmationEmail = async (bookingData: any) => {
    try {
      const templateParams = {
        to_email: ADMIN_EMAIL, // كل الإيميلات تروح لإيميلك
        to_name: "Admin",
        from_name: "Meeting Rooms Booking System",
        booking_date: selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        start_time: selectedStart
          ? formatTimeForDisplay(selectedStart.start)
          : "",
        end_time: selectedEnd ? formatTimeForDisplay(selectedEnd.start) : "",
        duration:
          selectedStart && selectedEnd
            ? calculateDuration(selectedStart.start, selectedEnd.start)
            : "",
        room_type: selectedRoomType === "small" ? "Small Room" : "Large Room",
        room_capacity: selectedRoomType === "small" ? "10 people" : "30 people",
        number_of_attendees: bookingData.numberOfAttendees,
        contact_person_name: bookingData.contactPerson.name,
        contact_person_phone: bookingData.contactPerson.phone,
        contact_person_company: bookingData.contactPerson.company,
        booking_id: bookingId || "NEW",
        booking_status: isEditMode ? "Updated" : "Confirmed",
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log("Confirmation email sent successfully to admin");
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
      // لا نرمي خطأ هنا لأن الإيميل ليس أساسياً للحجز
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result;

      if (isEditMode && bookingId) {
        // استخدام updateMyBooking للمستخدمين العاديين
        result = await bookingsAPI.updateMyBooking(bookingId, formData);
      } else {
        result = await bookingsAPI.create(formData);
      }

      if (result.status === "success") {
        // Send confirmation email after successful booking
        try {
          await sendConfirmationEmail(formData);
        } catch (emailError) {
          console.error(
            "Email sending failed, but booking was successful:",
            emailError
          );
          // Continue even if email fails
        }

        toast.success(isEditMode ? "Booking updated successfully!" : "Booking created successfully!");
        // Small delay to ensure backend has processed the update
        setTimeout(() => {
          onBookingSuccess();
          onClose();
        }, 300);
      } else {
        const errorMsg = result.message || "Something went wrong";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      const errorMsg = isEditMode
        ? err?.message || "Failed to update booking"
        : err?.message || "Booking failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleContactPersonChange = (
    field: keyof typeof formData.contactPerson,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      contactPerson: {
        ...prev.contactPerson,
        [field]: value,
      },
    }));
  };

  const getAvailableSlotsAfter = (startSlot: TimeSlot | null) => {
    if (!startSlot || !selectedRoomType)
      return timeSlots.filter((slot) =>
        isSlotAvailable(slot, selectedRoomType)
      );

    const startMinutes = startSlot.hour * 60 + startSlot.minute;
    return timeSlots.filter((slot) => {
      const slotMinutes = slot.hour * 60 + slot.minute;
      return (
        slotMinutes > startMinutes && isSlotAvailable(slot, selectedRoomType)
      );
    });
  };

  const calculateDuration = (start: Date, end: Date) => {
    const diffMs = end.getTime() - start.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (minutes === 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
    }
  };

  const formatTimeForDisplay = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Date Selection Step - جديد
  if (step === "date") {
    const formatDate = (date: Date) => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const dateStr = date.toDateString();
      const todayStr = today.toDateString();
      const tomorrowStr = tomorrow.toDateString();
      
      if (dateStr === todayStr) return 'Today';
      if (dateStr === tomorrowStr) return 'Tomorrow';
      
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    };

    const goToToday = () => {
      const today = new Date();
      setLocalSelectedDate(today);
    };

    const goToPreviousDay = () => {
      const newDate = new Date(localSelectedDate);
      newDate.setDate(newDate.getDate() - 1);
      setLocalSelectedDate(newDate);
    };

    const goToNextDay = () => {
      const newDate = new Date(localSelectedDate);
      newDate.setDate(newDate.getDate() + 1);
      setLocalSelectedDate(newDate);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSelectedDate(new Date(e.target.value));
    };

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md">
          <div className="flex justify-between items-center p-5 border-b border-gray-700">
            <h2 className="text-lg font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#f37121]" />
              Select Date
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#f37121] transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div className="text-center py-4">
              <p className="text-gray-300 text-sm mb-4">Choose the date for your meeting</p>
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <button
                  onClick={goToPreviousDay}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-all border border-gray-600"
                >
                  ←
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => {
                      const input = document.getElementById('date-picker-input') as HTMLInputElement;
                      input?.showPicker?.();
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all border border-gray-600 text-base font-medium min-w-[180px]"
                  >
                    {formatDate(localSelectedDate)}
                  </button>
                  <input
                    id="date-picker-input"
                    type="date"
                    value={localSelectedDate.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <button
                  onClick={goToNextDay}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-all border border-gray-600"
                >
                  →
                </button>
              </div>

              <button
                onClick={goToToday}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  localSelectedDate.toDateString() === new Date().toDateString()
                    ? 'bg-[#f37121] text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600'
                }`}
              >
                Today
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // تحديث selectedDate في الصفحة الرئيسية
                  if (onDateChange) {
                    onDateChange(localSelectedDate);
                  }
                  // تحديث selectedDate المحلي أيضاً
                  setStep("room");
                }}
                className="flex-1 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all"
              >
                Continue to Room Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Room Selection Step - أصغر
  if (step === "room") {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header - أصغر */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                Select Room Type
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Choose the meeting room that fits your needs
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep("date")}
                className="text-gray-400 hover:text-[#f37121] text-sm transition-colors"
                title="Change Date"
              >
                📅
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-[#f37121] text-xl font-bold transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Room Selection - أصغر */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {availableRooms.map((room) => (
                <button
                  key={room.type}
                  onClick={() => handleRoomSelect(room.type)}
                  className={`p-4 rounded-lg text-left transition-all border-2 ${
                    selectedRoomType === room.type
                      ? room.type === "small"
                        ? "bg-green-500/20 border-green-400 shadow-md"
                        : "bg-blue-500/20 border-blue-400 shadow-md"
                      : "bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className={`text-base font-semibold ${
                        selectedRoomType === room.type
                          ? room.type === "small"
                            ? "text-green-300"
                            : "text-blue-300"
                          : "text-white"
                      }`}
                    >
                      {room.name}
                    </h3>
                    {selectedRoomType === room.type && (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 text-xs mb-1">{room.capacity}</p>
                  <div
                    className={`text-xs ${
                      selectedRoomType === room.type
                        ? "text-gray-200"
                        : "text-gray-400"
                    }`}
                  >
                    {room.type === "small"
                      ? "Perfect for small team meetings"
                      : "Ideal for large presentations"}
                  </div>
                </button>
              ))}
            </div>

            {availableRooms.length === 0 && (
              <div className="text-center py-6 text-gray-400 text-sm">
                No rooms available for booking
              </div>
            )}

            {/* Action Buttons - أصغر */}
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-all border border-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleContinueToTime}
                disabled={!selectedRoomType}
                className="px-4 py-2 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-orange-500/50"
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Time Selection Step - أصغر وأكثر تنظيماً
  if (step === "time") {
    const formatDateDisplay = (date: Date) => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const dateStr = date.toDateString();
      const todayStr = today.toDateString();
      const tomorrowStr = tomorrow.toDateString();
      
      if (dateStr === todayStr) return 'Today';
      if (dateStr === tomorrowStr) return 'Tomorrow';
      
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    };

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header - أصغر */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                Select Time Slot
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-300">
                  {formatDateDisplay(localSelectedDate)}
                </p>
                <span className="text-gray-500">•</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  selectedRoomType === "small" 
                    ? "bg-green-900/50 text-green-300" 
                    : "bg-blue-900/50 text-blue-300"
                }`}>
                  {selectedRoomType === "small" ? "Small Room" : "Large Room"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep("date")}
                className="text-gray-400 hover:text-[#f37121] transition-colors p-1"
                title="Change Date"
              >
                <Calendar className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStep("room")}
                className="text-gray-400 hover:text-[#f37121] transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Time Selection - أصغر */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Start Time */}
              <div>
                <h3 className="text-sm font-semibold text-[#f37121] mb-2">Start Time</h3>
                <div className="grid grid-cols-3 gap-1.5 max-h-64 overflow-y-auto p-1">
                  {timeSlots.map((slot) => (
                    <button
                      key={`${slot.hour}-${slot.minute}`}
                      onClick={() => handleStartSelect(slot)}
                      disabled={!isSlotAvailable(slot, selectedRoomType)}
                      className={`p-2 rounded text-xs font-medium transition-all border ${
                        selectedStart?.hour === slot.hour &&
                        selectedStart?.minute === slot.minute
                          ? "bg-[#f37121] border-[#f37121] text-white shadow-md"
                          : isSlotAvailable(slot, selectedRoomType)
                          ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                          : "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed opacity-50"
                      }`}
                    >
                      {slot.formatted}
                    </button>
                  ))}
                </div>
              </div>

              {/* End Time */}
              <div>
                <h3 className="text-sm font-semibold text-[#f37121] mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  End Time
                </h3>
                <div className="grid grid-cols-3 gap-1.5 max-h-64 overflow-y-auto p-1">
                  {getAvailableSlotsAfter(selectedStart).map((slot) => (
                    <button
                      key={`${slot.hour}-${slot.minute}`}
                      onClick={() => handleEndSelect(slot)}
                      className={`p-2 rounded text-xs font-medium transition-all border ${
                        selectedEnd?.hour === slot.hour &&
                        selectedEnd?.minute === slot.minute
                          ? "bg-[#f37121] border-[#f37121] text-white shadow-md"
                          : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                      }`}
                    >
                      {slot.formatted}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Time Display - أصغر */}
            {(selectedStart || selectedEnd) && (
              <div className="bg-gray-700 rounded-lg p-3 mb-4 border border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-xs text-gray-400 mb-1">From</p>
                    <p className="text-base font-bold text-white">
                      {selectedStart?.formatted || "Select start"}
                    </p>
                  </div>
                  <div className="text-gray-400 mx-2">→</div>
                  <div className="text-center flex-1">
                    <p className="text-xs text-gray-400 mb-1">To</p>
                    <p className="text-base font-bold text-white">
                      {selectedEnd?.formatted || "Select end"}
                    </p>
                  </div>
                </div>
                {selectedStart && selectedEnd && (
                  <div className="text-center mt-2 pt-2 border-t border-gray-600">
                    <p className="text-xs text-gray-400">
                      Duration: {calculateDuration(selectedStart.start, selectedEnd.start)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons - أصغر */}
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setStep("room")}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-all border border-gray-600"
              >
                ← Back
              </button>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-all border border-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContinueToDetails}
                  disabled={!selectedStart || !selectedEnd}
                  className="px-4 py-2 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-orange-500/50"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Details Step - Improved for edit mode
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {isEditMode ? (
                <Edit2 className="w-5 h-5 text-[#f37121]" />
              ) : (
                <CheckCircle className="w-5 h-5 text-[#f37121]" />
              )}
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                {isEditMode ? "Edit Booking" : "Booking Details"}
              </h2>
            </div>
            {isEditMode && initialData && (
              <div className="text-xs text-gray-400 mt-1 bg-gray-700/50 px-2 py-1 rounded">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Current: {formatTimeForDisplay(new Date(initialData.startTime))} - {formatTimeForDisplay(new Date(initialData.endTime))}</span>
                </div>
              </div>
            )}
            {(selectedStart || selectedEnd) && (
              <div className="text-xs text-gray-300 mt-1">
                {selectedStart && formatTimeForDisplay(selectedStart.start)} -{" "}
                {selectedEnd && formatTimeForDisplay(selectedEnd.start)}
                {selectedStart && selectedEnd && (
                  <span className="text-gray-500"> • {calculateDuration(selectedStart.start, selectedEnd.start)}</span>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => (isEditMode ? onClose() : setStep("time"))}
            className="text-gray-400 hover:text-[#f37121] transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-4 mt-3 bg-red-900/50 border border-red-700/50 text-red-200 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form - أصغر */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Attendees - أصغر */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Number of Attendees
            </label>
            <input
              type="number"
              value={formData.numberOfAttendees}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  numberOfAttendees: parseInt(e.target.value),
                })
              }
              min="1"
              max={selectedRoomType === "small" ? "10" : "30"}
              className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Max {selectedRoomType === "small" ? "10" : "30"} for {selectedRoomType === "small" ? "small" : "large"} room
            </p>
          </div>

          {/* Contact Person Section - أصغر */}
          <div className="border-t border-gray-700 pt-3">
            <h3 className="text-sm font-semibold text-[#f37121] mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Contact Person
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.contactPerson.name}
                  onChange={(e) =>
                    handleContactPersonChange("name", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  required
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.contactPerson.phone}
                  onChange={(e) =>
                    handleContactPersonChange("phone", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  required
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Building className="w-3 h-3" />
                  Company
                </label>
                <input
                  type="text"
                  value={formData.contactPerson.company}
                  onChange={(e) =>
                    handleContactPersonChange("company", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  required
                  placeholder="Enter company name"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            {!isEditMode && (
              <button
                type="button"
                onClick={() => setStep("time")}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500 text-sm sm:text-base"
              >
                ← Back
              </button>
            )}
            {isEditMode && (
              <button
                type="button"
                onClick={() => setStep("time")}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500 text-sm sm:text-base"
              >
                ← Change Time
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 border border-orange-500/50 text-sm sm:text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isEditMode ? "Updating..." : "Booking..."}
                </span>
              ) : isEditMode ? (
                "Update Booking"
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
