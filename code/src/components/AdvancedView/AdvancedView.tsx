import { ReactElement } from 'react';
import React from 'react';
import { InputBox } from '../InputBox/InputBox';
import { Recipe } from '../Recipe/Recipe';
import { PizzaRecipe } from '../../util/calculations';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    marginBottom: '20px',
  },
});

interface AdvancedViewProps {
  pizzaRecipe: PizzaRecipe;
  pizzaNumber: number;
  setPizzaNumber: (newValue: number) => void;
  waterContent: number;
  setWaterContent: (newValue: number) => void;
  yeastContent: number;
  setYeastContent: (newValue: number) => void;
  saltContent: number;
  setSaltContent: (newValue: number) => void;
  doughballWeight: number;
  setDoughballWeight: (newValue: number) => void;
}

export function AdvancedView(props: AdvancedViewProps): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <InputBox
        pizzaNumber={props.pizzaNumber}
        setPizzaNumber={props.setPizzaNumber}
        waterContent={props.waterContent}
        setWaterContent={props.setWaterContent}
        yeastContent={props.yeastContent}
        setYeastContent={props.setYeastContent}
        saltContent={props.saltContent}
        setSaltContent={props.setSaltContent}
        doughballWeight={props.doughballWeight}
        setDoughballWeight={props.setDoughballWeight}
      />
      <Recipe recipe={props.pizzaRecipe} />
    </div>
  );
}
