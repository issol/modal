import useModal from '@/lib/hooks/useModal';
import { Box, Button, IconButton } from '@mui/material';
import BasicModal from './components/basic-modal';
import OverlapModal from './components/overlap-modal';
import { useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ModalContext } from '@/context/ModalContext';

const ModalPage = () => {
  const { openModal, closeModal } = useModal();
  const { setModal, setClickable, setScrollable } = useContext(ModalContext);

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

  const handleOpenBasicModal = (id: number, overlap?: boolean, closeable?: boolean) => {
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
      isCloseable: closeable,
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '130vh' }}>
      <Box sx={{ display: 'flex', gap: '16px', width: '50%', flexWrap: 'wrap' }}>
        {mangom.length
          ? mangom.map((value, index) => {
              return (
                <Box onMouseEnter={() => handleMouseEnter(value.id)} onMouseLeave={() => handleMouseLeave(value.id)} sx={{ position: 'relative' }} key={value.id}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                    <img src={`/images/mangom-${value.id}.png`} alt='heart' />
                    {value.id === 1 ? (
                      <Box sx={{ textAlign: 'center' }}>기본 모달</Box>
                    ) : value.id === 2 ? (
                      <Box sx={{ textAlign: 'center' }}>중첩 모달</Box>
                    ) : value.id === 3 ? (
                      <Box sx={{ textAlign: 'center' }}>팝업</Box>
                    ) : value.id === 4 ? (
                      <Box sx={{ textAlign: 'center' }}>바깥 클릭이 안되는 모달</Box>
                    ) : value.id === 5 ? (
                      <Box sx={{ textAlign: 'center' }}>바깥 클릭, 스크롤이 안되는 모달</Box>
                    ) : value.id === 6 ? (
                      <Box sx={{ textAlign: 'center' }}>경고 팝업</Box>
                    ) : value.id === 7 ? (
                      <Box sx={{ textAlign: 'center' }}>프롬프트 팝업</Box>
                    ) : value.id === 8 ? (
                      <Box sx={{ textAlign: 'center' }}>컨펌 팝업</Box>
                    ) : (
                      <Box sx={{ textAlign: 'center' }}>아무것도 없는 애들</Box>
                    )}
                  </Box>

                  {value.isHovering && (
                    <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                      <IconButton
                        onClick={() => {
                          switch (value.id) {
                            case 1:
                              handleOpenBasicModal(value.id, false, true);
                              break;
                            case 2:
                              handleOpenBasicModal(value.id, true, true);
                              break;
                            case 3:
                              window.open('https://pro.glo-hub.com', '_blank', 'top=0,right=0,width=500,height=500,noopener');
                              window.resizeTo(1400, 700);
                              break;
                            case 4:
                              handleOpenBasicModal(value.id, false, false);
                              break;

                            case 5:
                              setModal(
                                <BasicModal
                                  onClose={() => setModal(null)}
                                  onClick={() => {
                                    setModal(null);
                                    onClickRemoveMangom(value.id);
                                  }}
                                />
                              );
                              setClickable!(false);
                              setScrollable!(true);
                              break;

                            case 6:
                              window.alert('얜 못지우는 친구에요');
                              break;

                            case 7:
                              const res = window.prompt('지우고 싶으면 나는 바보를 입력하세요');
                              if (res === '나는 바보') {
                                window.alert('ㅋㅋㅋ 바보다 ㅋㅋㅋ');
                              }
                              break;
                            case 8:
                              const res1 = window.confirm('정말 지우시겠어요?');
                              if (res1) {
                                onClickRemoveMangom(value.id);
                              }
                              break;
                            default:
                              window.alert('얘넨 못지워요');
                              break;
                          }
                          // index % 2 === 0 ? handleOpenBasicModal(value.id, false) : handleOpenBasicModal(value.id, true);
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
