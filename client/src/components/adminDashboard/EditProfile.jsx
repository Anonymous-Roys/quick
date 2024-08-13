import { useState } from 'react';
import ComponentContainer from '../ComponentContainer';
import { Avatar } from '@mui/material';

const EditProfile = ({ profile, onSave, onCancel, handleEditSalesperson }) => {
  const [editedProfile, setEditedProfile] = useState(profile);
  const [imagePreview, setImagePreview] = useState(profile.avatar);

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };


  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditedProfile({ ...editedProfile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSave = () => {
  //   onSave(editedProfile);
  //   handleEditSalesperson(editedProfile._id);
  // };

  return (
    <div className="p-6 mt-2">
      <h1 className="mb-4 text-3xl font-bold text-slate-100">Edit Profile</h1>
      <ComponentContainer>
        <div className="p-4">
          <div className="flex items-center mb-6">
            <Avatar src={imagePreview} alt={editedProfile.username} sx={{ width: 80, height: 80 }} />
            <div className="ml-4">
              <label className="block text-slate-400">Avatar:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-white bg-[#171821] border border-gray-600 rounded cursor-pointer"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-slate-400">Name:</label>
            <input
              type="text"
              name="name"
              value={editedProfile.username}
              onChange={handleChange}
              className="p-2 bg-[#171821] text-white rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-400">Email:</label>
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleChange}
              className="p-2 bg-[#171821] text-white rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-400">Phone:</label>
            <input
              type="text"
              name="phone"
              value={editedProfile.phone}
              onChange={handleChange}
              className="p-2 bg-[#171821] text-white rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-400">Address:</label>
            <input
              type="text"
              name="address"
              value={editedProfile.address}
              onChange={handleChange}
              className="p-2 bg-[#171821] text-white rounded w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleEditSalesperson}
              className="mr-2 bg-[#3f51b5] text-white px-4 py-2 rounded-md hover:bg-[#303f9f] transition-colors"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 text-white transition-colors bg-red-600 rounded-md hover:bg-red-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </ComponentContainer>
    </div>
  );
};

export default EditProfile;
