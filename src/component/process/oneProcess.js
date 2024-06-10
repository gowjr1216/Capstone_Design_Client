import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const ProcessBox2 = ({ list, whitelist }) => {
  // whitelist에 포함된 항목만 필터링
  const filteredItems = list.filter(list => whitelist.includes(list));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginTop: '10px',
        marginLeft: '10px',
        overflow: 'auto',
        // 스크롤 바 안보이게
        '::-webkit-scrollbar': {
          display: 'none'
        },
        '& > *': {
          marginRight: '10px',
          marginBottom: '10px',
        },
      }}
    >
      {filteredItems.map((list, index) => (
        <Box
          key={index}
          sx={{
            background: '#002244',
            border: '2px solid #3C6382',
            borderRadius: '5px',
            height: '60px',
            width: '90px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            overflow: 'hidden',
          }}
        >
          <Typography color={'white'} style={{ fontSize: '11px' }}>
            {list.endsWith('.exe') ? list.slice(0, -4) : list}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProcessBox2;
