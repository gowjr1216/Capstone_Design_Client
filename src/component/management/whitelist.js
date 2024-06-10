import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Whitelist = ({ onBack, selectedItem }) => {
  const item = selectedItem && selectedItem.endsWith('.exe') ? selectedItem.slice(0, -4) : selectedItem;

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/whitelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('IP가 성공적으로 변경되었습니다.');
      } else {
        alert('IP 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('요청 중 오류가 발생했습니다:', error);
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom sx={{ marginRight: 'auto' }}>
          화이트리스트 설정
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginRight: '10px' }}>
          프로세스 적용
        </Button>
        <Button variant="contained" color="secondary" onClick={onBack}>
          뒤로가기
        </Button>
      </Box>
    </Box>
  );
};

export default Whitelist;