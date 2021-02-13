import React, { ReactElement } from 'react';
import { PizzaRecipe } from '../../util/calculations';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, makeStyles } from '@material-ui/core';

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
