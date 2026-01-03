import { useState } from 'react';

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  selectedRoomType?: 'small' | 'large' | 'both';
  onRoomTypeChange?: (roomType: 'small' | 'large' | 'both') => void;
  showRoomSelector?: boolean;
}

export default function DateSelector({ 
  selectedDate, 
  onDateChange, 
  selectedRoomType = 'both',
  onRoomTypeChange,
  showRoomSelector = false 
}: DateSelectorProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(new Date(e.target.value));
    setShowDatePicker(false);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const handleRoomTypeChange = (roomType: 'small' | 'large' | 'both') => {
    if (onRoomTypeChange) {
      onRoomTypeChange(roomType);
    }
  };

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

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 border border-gray-700 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#f37121]">📅 Select Date</h2>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Quick Date Buttons */}
          <button
            onClick={goToToday}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedDate.toDateString() === new Date().toDateString()
                ? 'bg-[#f37121] text-white shadow-md'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600'
            }`}
          >
            Today
          </button>
          <button
            onClick={goToPreviousDay}
            className="bg-gray-700 hover:bg-gray-600 text-white p-1.5 rounded-lg transition-all border border-gray-600"
            title="Previous Day"
          >
            ←
          </button>
          
          {/* Date Display & Picker - أكثر وضوحاً */}
          <div className="relative flex-1 sm:flex-initial">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg transition-all border border-gray-600 text-sm font-medium min-w-[140px]"
            >
              {formatDate(selectedDate)}
            </button>
            
            {showDatePicker && (
              <div className="absolute top-full left-0 mt-2 z-20 bg-gray-800 border border-gray-600 rounded-lg p-2 shadow-xl">
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={handleDateChange}
                  className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] w-full"
                  min={new Date().toISOString().split('T')[0]}
                  autoFocus
                />
              </div>
            )}
          </div>
          
          <button
            onClick={goToNextDay}
            className="bg-gray-700 hover:bg-gray-600 text-white p-1.5 rounded-lg transition-all border border-gray-600"
            title="Next Day"
          >
            →
          </button>
        </div>
      </div>

      {/* Room Type Selector - إذا كان مطلوب */}
      {showRoomSelector && onRoomTypeChange && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => handleRoomTypeChange('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedRoomType === 'both'
                  ? 'bg-[#f37121] text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => handleRoomTypeChange('small')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedRoomType === 'small'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              }`}
            >
              Small
            </button>
            <button
              onClick={() => handleRoomTypeChange('large')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedRoomType === 'large'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              }`}
            >
              Large
            </button>
          </div>
        </div>
      )}
    </div>
  );
}