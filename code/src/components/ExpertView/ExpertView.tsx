import { ReactElement, useState } from 'react';
import React from 'react';
import { InputBox } from '../InputBox/InputBox';
import { Recipe } from '../Recipe/Recipe';
import { defaultRecipe, PizzaRecipe } from '../../util/calculations';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginBottom: '20px',
  },
});

export function ExpertView(): ReactElement {
  const classes = useStyles();

  const [pizzaRecipe, setPizzaRecipe] = useState<PizzaRecipe>(defaultRecipe);

  return (
    <div className={classes.root}>
      <InputBox setPizzaRecipe={setPizzaRecipe} />
      <Recipe recipe={pizzaRecipe} />
    </div>
  );
}
