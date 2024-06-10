import React from 'react';
import { Link } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Settings from '@mui/icons-material/Settings';

const SettingButton = () => {
  return (
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit'}}>
      <ListItemButton>
        <ListItemIcon style={{color:'white',}} >
          <Settings />
        </ListItemIcon>
        <ListItemText primary="설정" style={{color:'white',}} />
      </ListItemButton>
    </Link>
  );
}

export default SettingButton;