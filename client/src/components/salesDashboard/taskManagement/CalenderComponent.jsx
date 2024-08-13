import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [meetings, setMeetings] = useState({});
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const onChange = (newDate) => {
        setDate(newDate);
        const dateString = newDate.toDateString();
        setDescription(meetings[dateString]?.description || '');
        setSelectedDate(dateString);
    };

    const handleAddOrUpdate = () => {
        setMeetings({
            ...meetings,
            [selectedDate]: { description }
        });
        setDescription('');
        setSelectedDate(null);
    };

    const handleDelete = (date) => {
        const newMeetings = { ...meetings };
        delete newMeetings[date];
        setMeetings(newMeetings);
        setSelectedDate(null);
        setDescription('');
    };

    return (
        <div className="absolute z-10 p-4 bg-gray-100 rounded-lg shadow-lg top-15 left-16">
            <Calendar
                onChange={onChange}
                value={date}
                tileContent={({ date, view }) => {
                    const dateString = date.toDateString();
                    if (view === 'month' && meetings[dateString]) {
                        return (
                            <div className="flex items-center justify-center">
                                <div className="w-2 h-2 text-white bg-blue-500 rounded-full"></div>
                            </div>
                        );
                    }
                }}
                className="text-black" // Ensuring calendar text is black
            />
            {selectedDate && (
                <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
                    <div className="mb-2">
                        <label className="block mb-2 font-semibold text-gray-700">
                            Description for {selectedDate}
                        </label>
                        <textarea
                            className="w-full p-2 text-black bg-white border rounded-md" // Ensure text is black and background is white
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="flex items-center px-4 py-2 text-white bg-[#3f51b5] rounded-md hover:bg-[#3f51b5ea]"
                            onClick={handleAddOrUpdate}
                        >
                            <FaPlus className="mr-2" />
                            Add/Update
                        </button>
                        <button
                            className="flex items-center px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                            onClick={() => handleDelete(selectedDate)}
                        >
                            <FaTrash className="mr-2" />
                            Delete
                        </button>
                    </div>
                </div>
            )}
            <ul className="mt-4">
                {Object.entries(meetings).map(([date, { description }]) => (
                    <li key={date} className="flex items-center justify-between p-2 mb-2 bg-white rounded-lg shadow-sm">
                        <span className="text-black">{date}: {description}</span>
                        <div className="flex space-x-2">
                            <button
                                className="flex items-center px-2 py-1 text-white rounded-md "
                                onClick={() => {
                                    setDate(new Date(date));
                                    setDescription(description);
                                    setSelectedDate(date);
                                }}
                            >
                                <FaEdit  className='text-yellow-500 hover:text-yellow-600'/>
                            </button>
                            <button
                                className="flex items-center px-2 py-1 text-white rounded-md"
                                onClick={() => handleDelete(date)}
                            >
                                <FaTrash  className='text-red-500 hover:text-red-600'/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CalendarComponent;
