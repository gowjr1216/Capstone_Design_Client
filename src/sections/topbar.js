import * as React from 'react';
// Mui 스타일
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import Login from '@mui/icons-material/Login';
// 컴포넌트
import SignIn from '../pages/signPage';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Topbar({ open, toggleDrawer }) {

  // Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <AppBar position="absolute" open={open}
      sx={{ 
        background: '#002244'
        // maxWidth: '100%',
        }}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        {/* 사이드바 버튼 */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
        >
          Capture
        </Typography>
        {/* 섹션들 */}
          <Box sx={{ position: 'relative', left: 75, width: '420px'}}>
            <List style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'}}>

              {/* <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <IconName sx={{ fontSize: 20 }}/>
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                        첫번째 섹션
                    </Typography>
                  }
                />
              </ListItem> */}

            </List>
       </Box>
     {/* 로그인창 */}
        <Box sx={{ position: 'fixed', right: 20}}>
          <IconButton color="inherit" onClick={handleOpen}>
          <Login />
          </IconButton>
        </Box>
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              ...style,
              backgroundColor: '#fff',
              border: '2px solid transparent',
              borderImage: 'linear-gradient(to right, blue 0%, cyan 100%)',
              borderImageSlice: '1',
            }}
          >
            <SignIn />
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  )
}