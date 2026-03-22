import React, { useState, useEffect, ReactElement } from 'react';
import { Box } from '@mui/material';
import { AdvancedView } from '../AdvancedView/AdvancedView';
import { AdvancedSwitch } from '../AdvancedSwitch/AdvancedSwitch';
import { NormalMode } from '../NormalMode/NormalMode';
import {
  calculateRecipe,
  defaultFormInput,
  PizzaRecipe,
} from '../../util/calculations';

export function CentralPanel(): ReactElement {
  const [advancedModeActive, setAdvancedModeActive] =
    React.useState<boolean>(false);
  const [pizzaNumber, setPizzaNumber] = useState<number>(
    defaultFormInput.pizzaNumber,
  );
  const [waterContent, setWaterContent] = useState<number>(
    defaultFormInput.waterContent,
  );
  const [doughballWeight, setDoughballWeight] = useState<number>(
    defaultFormInput.doughballWeight,
  );
  const [yeastContent, setYeastContent] = useState<number>(
    defaultFormInput.yeastContent,
  );
  const [saltContent, setSaltContent] = useState<number>(
    defaultFormInput.saltContent,
  );
  const [pizzaRecipe, setPizzaRecipe] = useState<PizzaRecipe>(
    calculateRecipe(
      pizzaNumber,
      waterContent,
      yeastContent,
      saltContent,
      doughballWeight,
    ),
  );

  useEffect(() => {
    setPizzaRecipe(
      calculateRecipe(
        pizzaNumber,
        waterContent,
        yeastContent,
        saltContent,
        doughballWeight,
      ),
    );
  }, [pizzaNumber, waterContent, doughballWeight, yeastContent, saltContent]);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <AdvancedSwitch
          advancedModeActive={advancedModeActive}
          setAdvancedModeActive={setAdvancedModeActive}
        />
      </Box>
      <Box sx={{ padding: '15px', display: 'flex', justifyContent: 'center' }}>
        {advancedModeActive ? (
          <AdvancedView
            pizzaRecipe={pizzaRecipe}
            pizzaNumber={pizzaNumber}
            setPizzaNumber={setPizzaNumber}
            waterContent={waterContent}
            setWaterContent={setWaterContent}
            yeastContent={yeastContent}
            setYeastContent={setYeastContent}
            saltContent={saltContent}
            setSaltContent={setSaltContent}
            doughballWeight={doughballWeight}
            setDoughballWeight={setDoughballWeight}
          />
        ) : (
          <NormalMode
            setAdvancedModeActive={setAdvancedModeActive}
            pizzaRecipe={pizzaRecipe}
            setPizzaNumber={setPizzaNumber}
            setWaterContent={setWaterContent}
            setYeastContent={setYeastContent}
            setSaltContent={setSaltContent}
            setDoughballWeight={setDoughballWeight}
          />
        )}
      </Box>
    </div>
  );
}
