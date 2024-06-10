import React, { useState } from 'react';
import { List, ListItem, Typography, Popover } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const getRiskColor = (riskIndex) => {
  if (riskIndex >= 7) return 'red';
  if (riskIndex >= 4) return 'yellow';
  return 'green';
};

const SidebarProcess = ({ riskLV, processName, processIcon }) => {
  // useState 훅을 컴포넌트의 최상위 수준에서 호출
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);

  if (!riskLV || Object.keys(riskLV).length === 0) {
    return <div>No data available</div>;
  }

  // 프로세스 이름과 아이콘을 매핑하는 객체 생성
  const processIconMap = {};
  processName.forEach((name, index) => {
    // 앞뒤 공백을 제거하여 비교
    const trimmedName = name.trim();
    processIconMap[trimmedName] = processIcon[index]
      ? `data:image/png;base64,${processIcon[index]}`
      : processIconMap['default'];
  });

  // riskLV를 riskIndex를 기준으로 내림차순 정렬
  const sortedRiskLV = Object.entries(riskLV).sort((a, b) => b[1].risk_index - a[1].risk_index);

  const handleClick = (event, processName) => {
    setAnchorEl(event.currentTarget);
    setSelectedProcess(processName);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedProcess(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div style={{ padding: '10px' }}>
      {/* List of processes with risk indicators */}
      <List className="hide-scrollbar" style={{
        position: 'relative',
        overflow: 'scroll',
        height: `calc(100vh - 240px)`,
      }}>
        {sortedRiskLV.map(([key, value], index) => (
          <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0' }}>
            {/* 프로세스 아이콘과 이름 표시 */}
            {processIconMap[key] && (
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={(event) => handleClick(event, key)}>
                {processIconMap[key].includes('OUT') ? (
                  <img src="/outprocess.png" alt="out" style={{ background: 'white', width: '20px', height: '20px', marginRight: '10px' }} />
                ) : (
                  <img src={processIconMap[key]} alt={key} style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                )}
                <Typography color='white'>{key}</Typography>
              </div>
            )}
            <CircleIcon
              style={{
                color: getRiskColor(value.risk_index),
                fontSize: '16px',
              }}
            />
          </ListItem>
        ))}
      </List>
      {/* Popover to display detailed information */}
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
        <Typography variant="subtitle1" sx={{ marginBottom: '8px', fontWeight: 'bold', padding: '5px' }}>
          Process Details
        </Typography>
        <Typography sx={{ p: 1 }}>{selectedProcess}</Typography>
        {/* You can add more detailed information here */}
      </Popover>
    </div>
  );
};

export default SidebarProcess;
