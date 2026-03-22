import { Box, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CentralPanel } from '../CentralPanel/CentralPanel';
import { LegalNotice } from '../LegalNotice/LegalNotice';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box
          sx={{
            backgroundColor: 'white',
            paddingRight: 'calc(17px - (100vw - 100%))',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: '100px',
              paddingLeft: '25px',
              paddingRight: '25px',
              paddingTop: '25px',
            }}
          >
            <Routes>
              <Route path="/legalnotice" element={<LegalNotice />} />
              <Route path="/" element={<CentralPanel />} />
            </Routes>
          </Box>
          <Box
            sx={{
              width: '100vw',
              position: 'fixed',
              bottom: 0,
              backgroundColor: 'rgb(255, 255, 255)',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box
              sx={{
                padding: '25px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MenuItem component={Link} to={'/'}>
                Pizza calculator
              </MenuItem>
              <MenuItem component={Link} to={'/legalnotice'}>
                Legal notice
              </MenuItem>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
