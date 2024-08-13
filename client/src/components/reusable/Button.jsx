import { Button } from "@mui/material";

import { styled } from '@mui/material/styles';





export const BootstrapButton = styled(Button)({
    textTransform: 'none',
    fontSize: 16,
    marginLeft: '30px',
    color: '#000',
    padding: '6px 12px',
    border: '3px solid',
    lineHeight: 1.5,
    backgroundColor: '#fff',
    borderColor: '#E5E7EB',
    borderRadius: "10px",
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#eee',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#cccccc',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });


