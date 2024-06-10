import React, { useState } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const HelpButton = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div style={{ position: 'static' }}>
      <ListItemButton onClick={() => setShowHelp(!showHelp)}>
        <ListItemIcon>
          <QuestionMarkIcon style={{color:'white',}}/>
        </ListItemIcon>
        <ListItemText primary="도움말" style={{color:'white',}}/>
      </ListItemButton>
      
      {showHelp && (
        <div style={{
          position: 'absolute', 
          right: 0, 
          left: '100px',
          top: '-100px', 
          width: '200px',
          padding: '10px', 
          backgroundColor: 'white',
          borderRadius: '10px',
          marginTop: '5px',
          zIndex: 999
        }}>
          <p></p>
        </div>
      )}
    </div>
  );
}

export default HelpButton;