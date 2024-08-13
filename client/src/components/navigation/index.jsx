import { useState } from 'react';
import { Box, IconButton, Typography} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Cust_Nav_Buttons } from '../../data';

// eslint-disable-next-line react/prop-types
const Navigation = ({ setSelectedComponent, navItems = Cust_Nav_Buttons, ...props }) => {
    const [selected, setSelected] = useState(1);
    const [showTitles, setShowTitles] = useState(true);
   

    const toggleShowTitles = () => {
        setShowTitles(prevShowTitles => !prevShowTitles);
    };

    return (
        <div className="sticky top-0 left-0 h-[100vh] shadow-md shadow-slate-800">
            

            <div className={`bg-[#171821] h-[100vh]  font-extrabold text-slate-300 flex md:flex `} {...props}>
                <div className="flex flex-col items-start w-full">
                    <IconButton onClick={toggleShowTitles} className="mt-2 text-3xl text-right text-white ">
                        {showTitles ? <KeyboardArrowLeft className="text-blue-500 "/> : <KeyboardArrowRight className="text-blue-500"/>}
                    </IconButton>

                    {navItems.map((el) => (
                        <Box
                            onClick={() => { setSelected(el.index); setSelectedComponent(el.title); }}
                            key={el.index}
                            p={1}
                            sx={{
                                '&:hover': {
                                    backgroundColor: el.index !== selected ? '#3f51b511' : '#3f51b5'
                                },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: showTitles ? 'start' : 'center',
                                cursor: 'pointer',
                                height: 50,
                                borderRadius: 1.5,
                                backgroundColor: el.index === selected ? '#3f51b5' : 'transparent',
                                color: el.index === selected ? '#fff' : '#ccc',
                                transition: 'all 0.2s ease-in-out',
                                width: showTitles ? "220px" : "auto",
                            }}
                        >
                            <IconButton
                                sx={{ width: "32px", color: 'inherit' }}
                            >
                                {el.icon}
                            </IconButton>
                            {showTitles && (
                                <p className={`ml-1 text-[12px] font-${el.index === selected ? 'semibold' : 'semibold'}`} >
                                    {el.title}
                                </p>
                            )}
                        </Box>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
