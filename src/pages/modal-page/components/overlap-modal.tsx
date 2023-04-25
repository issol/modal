import useModal from '@/lib/hooks/useModal';
import { Box, Button, Typography } from '@mui/material';

type Props = { onClose: any; onClick: any };
const OverlapModal = ({ onClose, onClick }: Props) => {
  return (
    <Box sx={{ border: '1px solid #ffffff', width: '300px', height: '275px', background: '#ffffff', borderRadius: '16px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box sx={{ width: '100%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src='/images/mangom-broken-heart.png' alt='' />
        <Typography variant='subtitle1'>진짜 삭제할거에요..? ㅠㅠ</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Button variant='outlined' onClick={onClose}>
          움,, 더 생각해볼게요
        </Button>
        <Button variant='contained' onClick={onClick}>
          응! 지워줘!
        </Button>
      </Box>
    </Box>
  );
};

export default OverlapModal;
