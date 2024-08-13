import React, { useState } from 'react';
import {  FaShoppingCart, FaShippingFast, FaChartBar } from 'react-icons/fa';
import ComponentContainer from '../../components/ComponentContainer';
import { IconButton } from '@mui/material';
import { IoIosNotificationsOutline } from 'react-icons/io';

const notificationData = [
  {
    id: 1,
    type: 'order',
    message: 'New order received',
    time: '5 minutes ago',
    icon: FaShoppingCart,
    color: 'text-green-400',
  },
  {
    id: 2,
    type: 'shipping',
    message: 'Order #1234 has been shipped',
    time: '2 hours ago',
    icon: FaShippingFast,
    color: 'text-blue-400',
  },
  {
    id: 3,
    type: 'report',
    message: 'Monthly sales report available',
    time: '1 day ago',
    icon: FaChartBar,
    color: 'text-yellow-400',
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationData);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
<>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[32px] text-slate-300 font-bold ml-4">Notifications</h2>
        <IconButton style={{ width: '40px', fontWeight: 900, color: '#3f51b5' }}>
          <IoIosNotificationsOutline style={{ height: "25px", }} />
        </IconButton>
      </div>
    <ComponentContainer style={{ padding: '20px' }}>
      {notifications.length > 0 ? (
        <ul className="space-y-3">
          {notifications.map((notification) => (
            //---------------------------- #2c2d3a
            <li key={notification.id} className="flex items-start p-3 bg-[#171821] rounded-md">
              <notification.icon className={`mt-1 mr-3 text-xl ${notification.color}`} />
              <div className="flex-grow">
                <p className="font-semibold">{notification.message}</p>
                <p className="text-sm text-gray-400">{notification.time}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="px-2 py-1 text-xs text-gray-400 hover:text-gray-200"
              >
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No new notifications</p>
      )}
    </ComponentContainer>
    </>

  );
};

export default Notifications;