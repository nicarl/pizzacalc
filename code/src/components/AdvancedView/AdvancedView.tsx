import { ReactElement } from 'react';
import { Box } from '@mui/material';
import { InputBox } from '../InputBox/InputBox';
import { Recipe } from '../Recipe/Recipe';
import { PizzaRecipe } from '../../util/calculations';

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
  return (
    <Box sx={{ marginBottom: '20px' }}>
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
    </Box>
  );
}
