import React, { useState, useEffect } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
// 컴포넌트
import AllProcess from '../component/process/allProcess';
import OneProcess from '../component/process/oneProcess';
import BarChart from '../component/chart/barChart';
import CpuChart from '../component/chart/cpuChart';
import GpuChart from '../component/chart/gpuChart';
import MemChart from '../component/chart/memChart';

const MainPage = ({
  public_ip,
  private_ip,
  cpuUsage,
  gpuSpec,
  gpuUsage,
  memUsage,
  startIp,
  comCount,
  totalTraffic,
  processName,
  processIcon,
  whitelist,
  processlist
}) => {

  const [prevMemUsage, setPrevMemUsage] = useState(memUsage.usage / memUsage.total);

  useEffect(() => {
    setPrevMemUsage(memUsage.usage / memUsage.total);
  }, [memUsage]);

  if (!gpuSpec || !gpuUsage) {
    gpuSpec = [];
    gpuUsage = [];
  }

  return (
    <Grid
    container
    direction="column"
    spacing={0}
    gap={1}
    sx={{
      display: 'flex',
      background: '#000033',
      height: 'calc(100vh - 63.6px)',
      maxHeight: 'calc(100vh - 63.6px)',
      width: '100%',
      margin: '0 auto',
      padding: '10px',
      overflow: 'hidden',
    }}>
      {/* 위 */}
      <Grid
      container
      direction="row"
      spacing={1}
      sx={{
        background: '#000033',
        display: 'flex',
        height: '100%',
        maxHeight: '85%',
        borderRadius: '5px',
        boxSizing: 'border-box',
      }}>
        {/* 위왼 */}
        <Grid item xs={8} sx={{ maxHeight: '100%',}}>
          <Grid
          container
          direction="column"
          spacing={0}
          sx={{
            display: 'flex',
            background: '#3C6382',
            borderRadius: '5px',
            height: '100%',
            maxHeight: '100%',
            width: '100%',
          }}>
            <Grid item xs={12}
            sx={{
              width: '100%',
              background: '#002244',
              borderRadius: '2px',
              border: '1px solid #29527A',
              height: '100%',
              maxHeight: '100%',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {/* 위왼위 */}
              <Box
              sx={{
                background: '#002244',
                borderRadius: '5px',
                border: '2px solid #3C6382',
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: '75%',
                overflow: 'auto',
                 // 프로세스 스크롤바 안보이게
                '::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
              > {/* 1번 */}
                <AllProcess items={processName} icons={processIcon} ips={startIp} />
              </Box>

              {/* 위왼아래 */}
              <Box
              sx={{
                background: '#002244',
                borderRadius: '5px',
                border: '2px solid #3C6382',
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: '25%',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'row',
              }}
              >
                {/* 왼쪽 70% */}
                <Box
                  sx={{
                    flex: '0 0 70%', // 고정된 70% 너비
                    background: '#002244', // 배경색 추가 (옵션)
                    padding: '5px',
                    borderRight: '2px solid #3C6382',
                    overflow: 'hidden',
                  }}
                >  {/* 2번 */}
                  <BarChart data={totalTraffic} data2={processName}/>
                </Box>

                {/* 오른쪽 30% */}
                <Box
                  sx={{
                    flex: '0 0 30%', // 고정된 30% 너비
                    background: '#002244', // 배경색 추가 (옵션)
                    padding: '5px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'space-evenly',
                  }}
                > {/* 3번 */}
                  <Typography color={'white'} style={{marginLeft: '10px',}}>화이트리스트</Typography>
                  <OneProcess list={processlist} whitelist={whitelist}/>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* 위오 */}
        <Grid item xs={4} sx={{ maxHeight: '100%', }}>
          <Box
          sx={{
            background: '#002244',
            height: '100%',
            maxHeight: '100%',
            width: '100%',
            padding: '5px',
            border: '2px solid #3C6382',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
          }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', // 가로 방향 배열 설정
                backgroundColor: '#002244', // 배경색 설정
                border: '2px solid #3C6382', // 테두리 설정
                borderRadius: '5px', // 테두리 둥글게 설정
                padding: '10px', // 내부 여백 설정
                height: '100%',
                maxHeight: '100%',
                overflow: 'auto',
                // 스크롤 바 안보이게
                '::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
            > {/* 4번 */}
              <Box
                sx={{
                  flex: 1, // 유연한 크기 조절
                  display: 'flex',
                  flexDirection: 'column', // 세로 방향 배열 설정
                  paddingRight: '20px', // 우측 여백 설정
                }}
              >
                {/* 출발지 IP */}
                <Typography variant="body2" color="white" style={{ display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                  출발지 IP
                </Typography>
                <br />
                {processName.map((ip, index) => (
                  <Typography key={index} variant="body2" color="white">
                    {ip.endsWith('.exe') ? ip.slice(0, -4) : ip}
                  </Typography>
                ))}
              </Box>
              
              {/* 구분선 */}
              <Divider orientation="vertical" flexItem sx={{ borderRight: '2px solid #3C6382', height: '100%', }} />
              
              <Box
                sx={{
                  flex: 1, // 유연한 크기 조절
                  display: 'flex',
                  flexDirection: 'column', // 세로 방향 배열 설정
                  paddingX: '20px', // 좌우 여백 설정
                }}
              >
                {/* 통신 횟수 */}
                <Typography variant="body2" color="white" style={{ display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                  통신 횟수
                </Typography>
                <br />
                {comCount.map((count, index) => (
                  <Typography key={index} variant="body2" color="white">
                    {count}
                  </Typography>
                ))}
              </Box>
              
              {/* 구분선 */}
              <Divider orientation="vertical" flexItem sx={{ borderRight: '2px solid #3C6382', height: '100%', }} />
              
              <Box
                sx={{
                  flex: 1, // 유연한 크기 조절
                  display: 'flex',
                  flexDirection: 'column', // 세로 방향 배열 설정
                  paddingLeft: '20px', // 좌측 여백 설정
                }}
              >
                {/* 트래픽량 */}
                <Typography variant="body2" color="white" style={{ display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                  트래픽량
                </Typography>
                <br />
                {totalTraffic.map((traffic, index) => (
                  <Typography key={index} variant="body2" color="white">
                    {traffic}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* 아래 */}
      <Grid
      container
      direction="row"
      gap={2} // 내부 요소 사이의 간격을 10px로 설정
      sx={{
        height: '15%',
        maxHeight: '15%',
        background: '#002244',
        padding: '4px',
        borderRadius: '5px',
        boxSizing: 'border-box',
        display: 'flex', // flexbox layout을 사용
        alignItems: 'center', // 요소들을 세로 중앙에 정렬
      }}
      > {/* 5번 */}
        <Box
        sx={{
        border: '3px solid #3C6382',
        borderRadius: '0 5px 5px 5px',
        height: '75px',
        flexGrow: 2,
        margin: '5px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        overflow: 'visible',
        position: 'relative',
        }}
        >
          <Box
          sx={{
            position: 'absolute',
            border: '3px solid #3C6382',
            borderRadius: '5px 5px 0 0',
            width: '30%',
            display: 'flex',
            justifyContent: 'center',
            top: -25,
            left: -3,
          }}>
            <Typography color='white' fontSize='small'>
              CPU
            </Typography>
          </Box>
          <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}>
          </Box>
          <CpuChart cpuUsage={cpuUsage.usage}/>
          <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}>
            <Typography fontSize='x-small' color='white'>
            <span style={{color: 'lightblue'}}>코어 수 </span> {cpuUsage.cores}
            </Typography>
            <Typography fontSize='x-small' color='white'>
            <span style={{color: 'lightblue'}}>쓰레드 수 </span> {cpuUsage.threads}
            </Typography>
            <Typography fontSize='x-small' color='white'>
            <span style={{color: 'lightblue'}}>주파수 </span> {cpuUsage.frequency} MHz
            </Typography>
          </Box>
        </Box>
        
        <Box
        sx={{
          border: '3px solid #3C6382',
          borderRadius: '5px 0 5px 5px',
          height: '75px',
          flexGrow: 2,
          margin: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          position: 'relative',
          overflow: 'visible', 
        }}
        > {/* 6번 */}
          <Box
          sx={{
            position: 'absolute',
            border: '3px solid #3C6382',
            borderRadius: '5px 5px 0 0',
            width: '25%',
            display: 'flex',
            justifyContent: 'center',
            top: -25,
            right: -3,
          }}>
            <Typography color='white' fontSize='small'>
              GPU
            </Typography>
          </Box>
          <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}>
            <Typography fontSize='x-small' color='white'>
            <span style={{color: 'lightblue'}}>이름 </span> {gpuSpec.name}
            </Typography>
            <Typography fontSize='x-small' color='white'>
            <span style={{color: 'lightblue'}}>온도 </span> {gpuSpec.temperature}
            </Typography>
            <Typography fontSize='x-small' color='white'>
            <span style={{color: 'lightblue'}}>총 메모리 </span> {gpuSpec.total_memory} (MB)
            </Typography>
          </Box>
          <GpuChart gpuUsage={gpuUsage}/>
          <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}>
          </Box>
        </Box>
        
        <Box
        sx={{
        border: '3px solid #3C6382',
        borderRadius: '5px 0 5px 5px',
        height: '75px',
        flexGrow: 2,
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'relative',
        overflow: 'visible',
        }}
        > {/* 7번 */}
          <Box
          sx={{
            position: 'absolute',
            border: '3px solid #3C6382',
            borderRadius: '5px 5px 0 0',
            width: '45%',
            display: 'flex',
            justifyContent: 'center',
            top: -25,
            right: -3,
          }}>
            <Typography color='white' fontSize='small'>
              MEMORY
            </Typography>
          </Box>
          <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}>
            <Typography fontSize='x-small' color='white'>
            <span style={{color: 'lightblue'}}>총 메모리 </span> {memUsage.total}
            </Typography>
            <Typography fontSize='x-small' color='white'>
            <span style={{color: 'lightblue'}}>현재 메모리 </span> {memUsage.usage}
            </Typography>
            <Typography fontSize='small' color='white'>
            <span style={{color: 'lightblue'}}>사용량 </span> {Math.round((memUsage.usage / memUsage.total) * 100)} %

            </Typography>
          </Box>
            <MemChart prevMemUsage={prevMemUsage}/>
          </Box>
        
        <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#3C6382',
        height: '75px',
        maxWidth: '33%',
        flexGrow: 3.3,
        margin: '5px',
        borderRadius: '3px',
        }}
        > {/* 8번 */}
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            background: '#3C6382',
            height: '75px',
            flexGrow: 3.3,
            margin: '5px',
            borderRadius: '3px',
          }}
          > {/* 첫 번째 줄 */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center', // 내용을 수직 중앙에 위치시킵니다.
                borderBottom: '2px solid #002244', // 아래쪽에 흰색 구분선을 추가합니다.
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2" color="white" >
                내부 IP
              </Typography>
              <Typography variant="body2" color="white" >
                {private_ip}
              </Typography>
            </Box>
            {/* 세 번째 줄 */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center', // 내용을 수직 중앙에 위치시킵니다.
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2" color="white" >
                외부 IP
              </Typography>
              <Typography variant="body2" color="white" >
                {public_ip}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainPage;
