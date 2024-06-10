import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Firewall = ({ onBack }) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');

  const handleChange = (event) => {
    setIp(event.target.value);
    setPort(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/firewall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip, port }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('IP주소와 Port번호가 성공적으로 변경되었습니다.');
      } else {
        alert('변경에 실패했습니다.');
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
          방화벽정책 변경
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '16px',
        }}>
        <TextField
          label="IP 주소를 입력하세요"
          variant="outlined"
          value={ip}
          onChange={handleChange}
          sx={{ marginRight: '10px' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextField
          label="Port 번호를 입력하세요"
          variant="outlined"
          value={port}
          onChange={handleChange}
          sx={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginRight: '10px' }}>
          변경
        </Button>
        <Button variant="contained" color="secondary" onClick={onBack}>
          뒤로가기
        </Button>
      </Box>
    </Box>
  );
};

export default Firewall;
