import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ExpertView } from '../ExpertView/ExpertView';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpertView />
    </div>
  );
}

export default App;
