import React, { useState, useEffect, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AdvancedView } from '../AdvancedView/AdvancedView';
import { AdvancedSwitch } from '../AdvancedSwitch/AdvancedSwitch';
import { NormalMode } from '../NormalMode/NormalMode';
import {
  calculateRecipe,
  defaultFormInput,
  PizzaRecipe,
} from '../../util/calculations';

const useStyles = makeStyles({
  switch: {
    display: 'flex',
    justifyContent: 'center',
  },
  centralPanel: {
    padding: '15px',
    display: 'flex',
    justifyContent: 'center',
  },
});

export function CentralPanel(): ReactElement {
  const classes = useStyles();

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
      <div className={classes.switch}>
        <AdvancedSwitch
          advancedModeActive={advancedModeActive}
          setAdvancedModeActive={setAdvancedModeActive}
        />
      </div>
      <div className={classes.centralPanel}>
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
      </div>
    </div>
  );
}
