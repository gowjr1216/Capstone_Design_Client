import * as React from 'react';
// Mui 스타일
import { Typography } from '@mui/material';
import { GlobalStyles } from '@mui/system';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListSubheader from '@mui/material/ListSubheader';
// 컴포넌트
import HelpButton from '../pages/helpPage';
import SettingButton from '../pages/settingPage';
import SidebarProcess from '../component/process/sideProcess';

const SecondaryListItems = () => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset style={{ backgroundColor: '#002244', color: 'white',}}>
        Help
      </ListSubheader>
      <SettingButton />
      <HelpButton />
    </React.Fragment>
  );
};

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      background: '#002244',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Sidebar({ open, toggleDrawer,
  public_ip,
  private_ip,
  cpuUsage,
  gpuUsage,
  memUsage,
  startIp,
  comCount,
  totalTraffic,
  processName,
  processIcon,
  riskLV}) {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider sx={{ height: '1px', backgroundColor: 'lightgray' }} />
      <GlobalStyles styles={{
        'body': {
          overflow: 'hidden',
        },
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        '.hide-scrollbar': {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }} />
      <List component="nav" style={{
        position: 'relative',
        height: '100vh',
      }}>
        <List class="hide-scrollbar" style={{
          position: 'relative',
          overflow: 'scroll',
          height: `calc(100vh - 240px)`,
        }}> {/* 사이드바 윗쪽 컨텐츠*/}
          <Typography color='white' style={{ marginLeft: '-11px' }}>
            riskLV
            <SidebarProcess riskLV={riskLV} processName={processName} processIcon={processIcon}/>
          </Typography>
        </List>
        <Divider sx={{ height: '1px', backgroundColor: 'lightgray' }} />
        <List style={{
          position: 'relative',
          width: '100%',
        }}> {/* 사이드바 아랫쪽 컨텐츠 */}
          {SecondaryListItems()}
        </List>
      </List>
    </Drawer>
  );
}
