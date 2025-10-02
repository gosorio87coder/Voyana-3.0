import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/ChevronIcons';
import { CalendarIcon } from './icons/FeatureIcons';

interface DatePickerProps {
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
    selectableDays?: number[]; // 0 for Sunday, 1 for Monday, etc.
    minDaysFromToday?: number;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateSelect, selectableDays, minDaysFromToday = 0 }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startOfMonth.getDay());
    
    const days: Date[] = [];
    let day = new Date(startDate);
    
    // Create a 6-week (42 days) grid for calendar consistency
    for (let i = 0; i < 42; i++) {
        days.push(new Date(day));
        day.setDate(day.getDate() + 1);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const minSelectableDate = new Date(today);
    minSelectableDate.setDate(today.getDate() + minDaysFromToday);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isSameDay = (d1: Date, d2: Date) => 
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    return (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-gray-500" />
                <span>Elige tu fecha de Salida</span>
            </h3>
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200" aria-label="Mes anterior">
                    <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <span className="font-semibold text-lg capitalize">
                    {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200" aria-label="Mes siguiente">
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => <div key={i}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days.map((d, i) => {
                    const isCurrentMonth = d.getMonth() === currentDate.getMonth();
                    const isSelectable = (!selectableDays || selectableDays.includes(d.getDay())) && d >= minSelectableDate;
                    const isSelected = selectedDate && isSameDay(d, selectedDate);
                    
                    let buttonClasses = "w-10 h-10 flex items-center justify-center rounded-full transition-colors ";
                    if (!isCurrentMonth) {
                        buttonClasses += "text-gray-300";
                    } else if (isSelected) {
                        buttonClasses += "bg-[#1856C5] text-white font-bold";
                    } else if (isSelectable) {
                        buttonClasses += "hover:bg-blue-100 cursor-pointer";
                    } else {
                        buttonClasses += "text-gray-400 cursor-not-allowed line-through";
                    }

                    return (
                        <button 
                            key={i} 
                            disabled={!isSelectable || !isCurrentMonth}
                            onClick={() => onDateSelect(d)}
                            className={buttonClasses}
                            aria-label={`Seleccionar fecha ${d.toLocaleDateString()}`}
                        >
                            {d.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DatePicker;