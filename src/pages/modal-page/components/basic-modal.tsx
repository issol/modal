import useModal from '@/lib/hooks/useModal';
import { Box, Button, Typography } from '@mui/material';

type Props = { onClose: any; onClick: any };
const BasicModal = ({ onClose, onClick }: Props) => {
  return (
    <Box sx={{ border: '1px solid #ffffff', width: '500px', height: '300px', background: '#ffffff', borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box sx={{ width: '100%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src='/images/mangom-no-cry.png' alt='' />
        <Typography variant='subtitle1'>이 망곰이를 지우시나요... ?</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Button variant='outlined' onClick={onClose}>
          아뇨, 그냥 눌러봤어요
        </Button>
        <Button variant='contained' onClick={onClick}>
          네! 지울건데요!
        </Button>
      </Box>
    </Box>
  );
};

export default BasicModal;
