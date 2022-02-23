import React, { ReactElement } from 'react';
import { PizzaRecipe } from '../../util/calculations';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    width: '230px',
  },
});

interface Props {
  recipe: PizzaRecipe;
}

export function Recipe(props: Props): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="recipe table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Box fontWeight="fontWeightBold">Ingredient</Box>
              </TableCell>
              <TableCell align="right">
                <Box fontWeight="fontWeightBold">Weight /g</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Water
              </TableCell>
              <TableCell align="right">
                {props.recipe.waterMass.toFixed(1)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Salt
              </TableCell>
              <TableCell align="right">
                {props.recipe.saltMass.toFixed(1)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Yeast
              </TableCell>
              <TableCell align="right">
                {props.recipe.yeastMass.toFixed(1)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Flour
              </TableCell>
              <TableCell align="right">
                {props.recipe.flourMass.toFixed(1)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
