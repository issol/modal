import useModal from '@/lib/hooks/useModal';
import { Box, Button, IconButton } from '@mui/material';
import BasicModal from './components/basic-modal';
import OverlapModal from './components/overlap-modal';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';

const ModalPage = () => {
  const { openModal, closeModal } = useModal();

  const [mangom, setMangom] = useState<{ id: number; name: string; isHovering: boolean }[]>([]);
  const [selectedMangom, setSelectedMangom] = useState(-1);

  const handleMouseEnter = (id: number) => {
    setMangom(
      mangom.map((m) => {
        if (m.id === id) {
          return { ...m, isHovering: true };
        }
        return m;
      })
    );
  };

  const handleMouseLeave = (id: number) => {
    setMangom(
      mangom.map((m) => {
        if (m.id === id) {
          return { ...m, isHovering: false };
        }
        return m;
      })
    );
  };

  const handleCloseOverlapModal = () => {
    closeModal('OverlapModal');
  };
  const onClickRemoveMangom = (id: number) => {
    console.log(id);

    setMangom(mangom.filter((m) => m.id !== id));
  };

  const handleOpenOverlapModal = (id: number) => {
    openModal({
      type: 'OverlapModal',
      children: (
        <OverlapModal
          onClick={() => {
            onClickRemoveMangom(id);
            handleCloseOverlapModal();
            handleCloseBasicModal();
          }}
          onClose={handleCloseOverlapModal}
        />
      ),
    });
  };

  const handleCloseBasicModal = () => {
    closeModal('BasicModal');
  };

  const onClickAddMangom = () => {
    setMangom([...mangom, { id: mangom.length + 1, name: `mangom-${mangom.length + 1}`, isHovering: false }]);
  };

  const handleOpenBasicModal = (id: number, overlap?: boolean) => {
    openModal({
      type: 'BasicModal',
      children: (
        <BasicModal
          onClose={handleCloseBasicModal}
          onClick={() => {
            if (overlap) {
              handleOpenOverlapModal(id);
            } else {
              onClickRemoveMangom(id);
              handleCloseBasicModal();
            }
          }}
        />
      ),
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ display: 'flex', gap: '16px', width: '50%', flexWrap: 'wrap' }}>
        {mangom.length
          ? mangom.map((value, index) => {
              return (
                <Box onMouseEnter={() => handleMouseEnter(value.id)} onMouseLeave={() => handleMouseLeave(value.id)} sx={{ position: 'relative' }} key={value.id}>
                  <img src={`/images/mangom-${index + 1}.png`} alt='heart' />
                  {value.isHovering && (
                    <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                      <IconButton
                        onClick={() => {
                          console.log(value.id);

                          setSelectedMangom(value.id);
                          index % 2 === 0 ? handleOpenBasicModal(value.id, false) : handleOpenBasicModal(value.id, true);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              );
            })
          : null}

        {/* <Button variant='outlined' onClick={() => handleOpenBasicModal(true)}>
          확실하게 게시글 지우기
        </Button> */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          {mangom.length < 10 && (
            <IconButton onClick={onClickAddMangom}>
              <AddBoxIcon></AddBoxIcon>
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ModalPage;
