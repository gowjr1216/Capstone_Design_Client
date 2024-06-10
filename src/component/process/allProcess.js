import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, DialogActions, Typography, Popover } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import Whitelist from '../management/whitelist';
import Firewall from '../management/firewall';

const ProcessBox = ({ items, icons, ips }) => {
  // 모달
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedIp, setSelectedIp] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(null);
  // 프로세스
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIPs, setSelectedIPs] = useState([]);
  const uniqueIPs = [...new Set(selectedIPs)]; // 중복 제거

  const handleModalOpen = (item, icon, ip) => {
    setSelectedItem(item);
    setSelectedIcon(icon);
    setSelectedIp(ip);
    setModalOpen(true);
    setCurrentScreen('menu');
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentScreen(null);
  };
  const goBackToMenu = () => {
    setCurrentScreen('menu');
  };
  const showWhitelist = () => {
    setCurrentScreen('whitelist');
  };
  const showFirewall = () => {
    setCurrentScreen('firewall');
  };
  // 프로세스 설정
  const handleClick = (event, ips) => {
    setAnchorEl(event.currentTarget);
    setSelectedIPs(ips ? ips.split('/') : []); // ips가 존재하면 분리, 아니면 빈 배열 설정
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const validItemsAndIcons = items.reduce((acc, item, index) => {
    if (item !== ' -') {
      acc.push({ item, icon: icons[index], ips: ips[index] }); // 각 상자에 대한 ips 속성 전달
    }
    return acc;
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', maxHeight: '600px' }}>
      {Array(Math.ceil(validItemsAndIcons.length / 5))
        .fill()
        .map((_, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              marginTop: '10px',
              marginLeft: '10px',
              marginBottom: '-10px',
              '& > *': {
                marginRight: '10px'
              }
            }}
          >
            {validItemsAndIcons
              .slice(rowIndex * 5, rowIndex * 5 + 5)
              .map(({ item, icon, ips }, index) => (
                <Box
                  key={index}
                  sx={{
                    background: '#002244',
                    border: '2px solid #3C6382',
                    borderRadius: '5px',
                    height: '93px',
                    width: 'calc(20% - 10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <CircleIcon
                    style={{
                      width: '10px',
                      height: '10px',
                      color: 'lightblue',
                      // color: {item.color},
                      // 각각 판별된 프로세스의 색상
                      position: 'absolute',
                      top: '5px',
                      left: '5px'
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      padding: '4px 6px', // 패딩 증가
                      fontSize: '8px',
                      minWidth: 'auto',
                      lineHeight: 1
                    }}
                    onClick={() => handleModalOpen(item, icon, ips)}
                  >
                    정보
                  </Button>

                  <Dialog
                  open={isModalOpen}
                  onClose={handleModalClose}
                  maxWidth="sm"
                  fullWidth
                  BackdropProps={{
                    style: { backgroundColor: 'rgba(0, 0, 0, 0.03)' }, // 투명하게 설정
                  }}
                  >
                    <DialogTitle>
                      <Box
                        sx={{
                          border: '1px solid black', // 테두리 색상과 두께 설정
                          borderRadius: '5px', // 테두리의 둥근 정도 설정
                          display: 'inline-block', // 이미지 크기에 맞추기 위해 인라인 블록으로 설정
                          padding: '0px' // 이미지와 테두리 사이에 여백 추가
                        }}
                      >
                        {selectedIcon && selectedIcon.trim() === 'OUT' ? (
                          <img src={'/outprocess.png'} style={{ width: '30px', height: '30px' }} alt="icon" />
                        ) : (
                          <img src={`data:image/png;base64,${selectedIcon}`} style={{ width: '30px', height: '30px' }} alt="icon" />
                        )}
                      </Box>
                      {selectedItem && selectedItem.endsWith('.exe') ? selectedItem.slice(0, -4) : selectedItem}의 정보
                      
                    </DialogTitle>
                    <DialogContent>
                      {currentScreen === 'menu' && (
                      <Box>
                        <Typography>
                          IP정보
                        </Typography>
                        {selectedIp.split('/').map((ip, index) => (
                          <Typography key={index}>
                            {ip}
                          </Typography>
                        ))}
                        <Box mt={2}> {/* 여기에 상단 여백을 줍니다 */}
                          <Button variant="contained" onClick={showWhitelist} sx={{ margin: '0px' }}>
                            화이트리스트
                          </Button>
                          <Button variant="contained" onClick={showFirewall} sx={{ marginLeft: '10px' }}>
                            방화벽정책
                          </Button>
                        </Box>
                      </Box>
                      )}
                      {currentScreen === 'whitelist' && <Whitelist onBack={goBackToMenu} selectedItem={selectedItem}/>}
                      {currentScreen === 'firewall' && <Firewall onBack={goBackToMenu}/>}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleModalClose}>닫기</Button>
                    </DialogActions>
                  </Dialog>

                  <Box
                    sx={{
                      background: 'white',
                      border: '2px solid black',
                      borderRadius: '15%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '10px'
                    }}
                    onClick={(event) => handleClick(event, ips)}
                  >
                    {icon && icon.trim() === 'OUT' ? (
                      <img src={'/outprocess.png'} style={{ width: '30px', height: '30px' }} alt="icon" />
                    ) : (
                      <img src={`data:image/png;base64,${icon}`} style={{ width: '30px', height: '30px' }} alt="icon" />
                    )}
                  </Box>
                  <Typography color={'white'} style={{ fontSize: '12px', marginTop: '0px' }}>
                    {item.endsWith('.exe') ? item.slice(0, -4) : item}
                  </Typography>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ marginBottom: '8px', fontWeight: 'bold', padding:'5px' }}>
                      출발지 IP
                    </Typography>
                    {uniqueIPs.map((ip, index) => (
                      <Typography key={index} sx={{ p: 1, marginBottom: '0px', marginTop: index === 0 ? '0px' : '-10px'  }}>
                        {ip}
                      </Typography>
                    ))}
                  </Popover>
                </Box>
              ))}
          </Box>
        ))}
    </div>
  );
};

export default ProcessBox;
