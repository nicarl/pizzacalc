import React from 'react';
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { CentralPanel } from '../CentralPanel/CentralPanel';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import { LegalNotice } from '../LegalNotice/LegalNotice';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    paddingRight: 'calc(17px - (100vw - 100%))',
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '100px',
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '25px',
  },
  footer: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'rgb(255, 255, 255)',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  },
  links: {
    padding: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const theme = createTheme();

function App() {
  const classes = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <div className={classes.root}>
            <div className={classes.body}>
              <Routes>
                <Route path="/legalnotice" element={<LegalNotice />} />
                <Route path="/" element={<CentralPanel />} />
              </Routes>
            </div>
            <div className={classes.footer}>
              <div className={classes.links}>
                <MenuItem component={Link} to={'/'}>
                  Pizza calculator
                </MenuItem>
                <MenuItem component={Link} to={'/legalnotice'}>
                  Legal notice
                </MenuItem>
              </div>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
