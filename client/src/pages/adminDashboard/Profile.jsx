import  { useState, useEffect } from 'react';
import { Avatar, Box, Typography, Grid, Button, useMediaQuery, useTheme } from '@mui/material';
import { MdEdit, MdEmail, MdPhone } from 'react-icons/md';
import ComponentContainer from '../../components/ComponentContainer';
import EditProfile from '../../components/adminDashboard/EditProfile';
import axios from 'axios';

const ProfileItem = ({ icon, label, value }) => (



  <Box display="flex" alignItems="center" mb={2}>
    {icon}
    <Box ml={2}>
      <p className='font-semibold text-slate-600'>{label}</p>
      <p className='font-semibold text-slate-300 text-[12px]'>{value}</p>
    </Box>
  </Box>
);

const Profile = ({ profileData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    userId: '',
    username: '',
    image: '',
    email: '', // Assuming you'll get email data from your API in the future
    phone: '',  // Assuming you'll get phone data from your API in the future
    
    joinDate: '',
  });


  const handleEditSalesperson = async (salespersonId) => {
    try {
      const formData = new FormData();
      for (const key in isEditing) {
        formData.append(key, isEditing[key]);
      }

      await axios.put(
        `http://localhost:5000/api/admin/salespersons/${salespersonId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

     
      setIsEditing(null);
    } catch (error) {
      console.error('Error editi\\ng profile:', error);
    }
  };
  

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
      console.log(profileData);
    } else {
      console.log("No profile data");
    }
  }, [profileData]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Box p={3}>
      <p className='text-[32px] mb-5 text-slate-300 font-bold ml-4'>
        Profile
      </p>
      {isEditing ? (
        <EditProfile profile={profile} onSave={handleSave} onCancel={handleCancel} handleEditSalesperson = {handleEditSalesperson}/>
      ) : (
        <ComponentContainer>
          <div className='flex flex-wrap items-center justify-around w-full px-8'>
            <div className='mb-14 md:mb-0'>
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <Avatar
                  src={profile.image || 'https://via.placeholder.com/150'}
                  alt={profile.username}
                  sx={{ width: 160, height: 160, mb: 1 }}
                />
                <p className='text-[20px] font-semibold mb-0'>{profile.username}</p>
                <p className='mb-4 text-slate-300'>
                  Sales Representative
                </p>
                <Button
                  variant="contained"
                  startIcon={<MdEdit />}
                  onClick={() => {
                     
                    setIsEditing(true)}}
                  sx={{ mt: 0, backgroundColor:'#3f51b5', fontWeight:300 }}
                >
                  Edit Profile
                </Button>
              </Box>
            </div>
            <div className='md:w-[60%]'>
              <Box>
                <p className='text-slate-100 text-[20px] font-semibold'>Contact Information</p>
                <ProfileItem icon={<MdEmail color="action" />} label="Email" value={profile.email || 'No email provided'} />
                <ProfileItem icon={<MdPhone color="action" />} label="Phone" value={profile.phone || 'No phone number provided'} />
                {/* If you have additional information like address or join date */}
                {/* <ProfileItem icon={<MdLocationOn color="action" />} label="Address" value={profile.address || 'No address provided'} />
                <ProfileItem icon={<MdCalendarToday color="action" />} label="Joined" value={profile.joinDate || 'No join date provided'} /> */}
              </Box>
              {!isMobile && (
                <Box mt={4}>
                  <p className='text-slate-100 text-[20px] mb-2 font-semibold'>Performance Summary</p>
                  {/* Add performance metrics here */}
                  <p className=' text-slate-300 text-[16px]'>
                    Performance metrics and charts can be added here to provide a quick overview of the sales representative's performance.
                  </p>
                </Box>
              )}
            </div>
          </div>
        </ComponentContainer>
      )}
    </Box>
  );
};

export default Profile;
