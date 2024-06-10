import React, { useState, useEffect } from 'react';
// Mui 스타일
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// 컴포넌트
import Topbar from './topbar';
import Sidebar from './sidebar';
import MainPage from '../pages/mainPage';

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [public_ip, setPublic_ip] = useState("0.0.0.0");
  const [private_ip, setPrivate_ip] = useState("0.0.0.0");
  const [cpuUsage, setCpuUsage] = useState(0);
  const [gpuUsage, setGpuUsage] = useState(0);
  const [gpuSpec, setGpuSpec] = useState(0);
  const [memUsage, setMemUsage] = useState(0);
  const [startIp, setStartIp] = useState([]);
  const [comCount, setComCount] = useState([]);
  const [totalTraffic, setTotalTraffic] = useState([]);
  const [processName, setProcessName] = useState([]);
  const [processIcon, setProcessIcon] = useState([]);
  const [riskLV, setRiskLV] = useState({});
  const [whitelist, setWhitelist] = useState([]);
  const [processlist, setProcesslist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPublic_ip(data.public_ip);
        setPrivate_ip(data.private_ip);
        setCpuUsage(data.resources_usage.cpu);
        setGpuUsage(data.resources_usage.gpu.usage[0]);
        setGpuSpec(data.resources_usage.gpu.specs[0]);
        setMemUsage(data.resources_usage.ram);
        setProcessName(data.packet_data);
        setRiskLV(data.riskLV);
        setWhitelist(data.whitelist);
        setProcesslist(data.process_list);

        // 각 위치별 데이터를 합치기
        const startIps = [];
        const comCounts = [];
        const totalTraffics = [];
        const processNames = [];
        const processIcons = [];

        data.packet_data.forEach(packet => {
          const parts = packet.split(',');
          startIps.push(parts[0]);
          comCounts.push(parts[1]);
          totalTraffics.push(parts[2]);
          processNames.push(parts[3]);
          processIcons.push(parts[4]);
        });

        setStartIp(startIps);
        setComCount(comCounts);
        setTotalTraffic(totalTraffics);
        setProcessName(processNames);
        setProcessIcon(processIcons);
      } catch (error) {
        console.error('Error fetching CPU usage:', error);
      }
    };

    fetchData();
    
    const intervalId = setInterval(fetchData, 1000);

    // 컴포넌트가 언마운트될 때 인터벌을 정리
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* 상단바 */}
        <Topbar open={open} toggleDrawer={toggleDrawer} />

        {/* 사이드바 */}
        <Sidebar open={open} toggleDrawer={toggleDrawer} 
        public_ip={public_ip}
        private_ip={private_ip}
        cpuUsage={cpuUsage}
        gpuSpec={gpuSpec}
        gpuUsage={gpuUsage}
        memUsage={memUsage}
        startIp={startIp}
        comCount={comCount}
        totalTraffic={totalTraffic}
        processName={processName}
        processIcon={processIcon}
        riskLV={riskLV}
        whitelist={whitelist}
        processlist={processlist}/>

        {/* 메인화면 */}
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{
            display: 'flex',
            width: '100vw',
            height: '100vh'
            }}>
            <CssBaseline />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />

              {/* 화면전환 라우터 설정 */}
              <Routes>
                <Route path="/" element={<MainPage
                  public_ip={public_ip}
                  private_ip={private_ip}
                  cpuUsage={cpuUsage}
                  gpuSpec={gpuSpec}
                  gpuUsage={gpuUsage}
                  memUsage={memUsage}
                  startIp={startIp}
                  comCount={comCount}
                  totalTraffic={totalTraffic}
                  processName={processName}
                  processIcon={processIcon}
                  riskLV={riskLV}
                  whitelist={whitelist}
                  processlist={processlist}
                />} />
              </Routes>

            </Box>
          </Box>
        </ThemeProvider>

        </Box>
      </ThemeProvider>
    </Router>
  );
}