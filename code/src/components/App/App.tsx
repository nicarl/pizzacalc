import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CentralPanel } from '../CentralPanel/CentralPanel';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import { LegalNotice } from '../LegalNotice/LegalNotice';

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

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <div className={classes.body}>
          <Switch>
            <Route path="/legalnotice">
              <LegalNotice />
            </Route>
            <Route path="/">
              <CentralPanel />
            </Route>
          </Switch>
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
  );
}

export default App;
