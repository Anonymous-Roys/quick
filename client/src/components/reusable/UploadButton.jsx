
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import image from '../../assets/Image.png'

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputFileUpload() {
  return (
    <Button
    sx={{height:"196px", display:"flex", flexDirection:"column"}}
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="outlined"
      color="neutral"
    >
      <img src={image} alt="image" />
      <p>Browse through your files and Drop your logo here</p>
      <p className='text-slate-400'>Maximum file size is 2 MB</p>
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}