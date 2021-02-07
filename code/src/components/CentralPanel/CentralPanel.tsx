import React, { useState, useEffect, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ExpertView } from '../ExpertView/ExpertView';
import { ExpertSwitch } from '../ExpertSwitch/ExpertSwitch';
import { NormalMode } from '../NormalMode/NormalMode';
import {
  calculateRecipe,
  defaultFormInput,
  PizzaRecipe,
} from '../../util/calculations';

const useStyles = makeStyles({
  switch: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  centralPanel: {
    display: 'grid',
    gridColumn: 1,
    gridRow: 1,
  },
});

export function CentralPanel(): ReactElement {
  const classes = useStyles();

  const [expertModeActive, setExpertModeActive] = React.useState<boolean>(
    false,
  );
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
    <div className={classes.centralPanel}>
      <div className={classes.switch}>
        <ExpertSwitch
          expertModeActive={expertModeActive}
          setExpertModeActive={setExpertModeActive}
        />
      </div>
      <div>
        {expertModeActive ? (
          <ExpertView
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
            setExpertModeActive={setExpertModeActive}
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
