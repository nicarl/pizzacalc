import {
  StepLabel,
  Stepper,
  Step,
  StepContent,
  Button,
} from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import validator from 'validator';
import { defaultFormInput, PizzaRecipe } from '../../util/calculations';
import { validatePositiveInt } from '../../util/validation';
import { BackButton } from '../BackButton/BackButton';
import { InputForm } from '../InputForm/InputForm';
import { NextButton } from '../NextButton/NextButton';
import { PizzaSizeSlider } from '../PizzaSizeSlider/PizzaSizeSlider';
import { RadioGroupWithChoices } from '../RadioGroupWithChoices/RadioGroupWithChoices';
import { Recipe } from '../Recipe/Recipe';
import { ovenTypes } from './types';
import EditIcon from '@material-ui/icons/Edit';

interface DefaultValues {
  activeStep: number;
  ovenType: string;
}

const defaultValues: DefaultValues = {
  activeStep: 0,
  ovenType: '',
};

interface NormalModeProps {
  setExpertModeActive: (expertModesisActive: boolean) => void;
  pizzaRecipe: PizzaRecipe;
  setPizzaNumber: (newValue: number) => void;
  setWaterContent: (newValue: number) => void;
  setYeastContent: (newValue: number) => void;
  setSaltContent: (newValue: number) => void;
  setDoughballWeight: (newValue: number) => void;
}

export function NormalMode(props: NormalModeProps): ReactElement {
  const [activeStep, setActiveStep] = useState(defaultValues.activeStep);
  const [ovenType, setOvenType] = useState<string>(defaultValues.ovenType);
  const [pizzaNumber, setPizzaNumber] = useState<number>(
    defaultFormInput.pizzaNumber,
  );
  const [doughBallWeight, setDoughBallWeight] = useState<number>(
    defaultFormInput.doughballWeight,
  );

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key="ovenType">
          <StepLabel>Select the oven type</StepLabel>
          <StepContent>
            <div>
              <div>
                <RadioGroupWithChoices
                  choices={ovenTypes}
                  value={ovenType}
                  setChoice={setOvenType}
                  label="ovenType"
                ></RadioGroupWithChoices>
              </div>
              <NextButton
                onClick={() => setActiveStep(1)}
                disabled={ovenType ? false : true}
                testId="ovenTypeNextButton"
              />
            </div>
          </StepContent>
        </Step>
        <Step key="numberOfPizzas">
          <StepLabel>Select the number of pizzas</StepLabel>
          <StepContent>
            <div>
              <div>
                <InputForm
                  label={'Number of pizzas'}
                  helpText="Please insert a positive integer."
                  value={pizzaNumber}
                  setValue={(value: string) => {
                    setPizzaNumber(validator.toInt(value));
                  }}
                  validation={validatePositiveInt}
                  dialButton={true}
                />
              </div>
              <div>
                <BackButton
                  onClick={() => setActiveStep(0)}
                  testId="pizzaNumberBackButton"
                />
                <NextButton
                  onClick={() => setActiveStep(2)}
                  disabled={false}
                  testId="pizzaNumberNextButton"
                />
              </div>
            </div>
          </StepContent>
        </Step>
        <Step key="sizeOfPizzas">
          <StepLabel>Select the size of the pizza</StepLabel>
          <StepContent>
            <div>
              <div>
                <PizzaSizeSlider
                  doughBallWeight={doughBallWeight}
                  setDoughBallWeight={setDoughBallWeight}
                />
              </div>
            </div>
            <div>
              <BackButton
                onClick={() => setActiveStep(1)}
                testId="pizzaSizeBackButton"
              />
              <NextButton
                onClick={() => {
                  props.setPizzaNumber(pizzaNumber);
                  props.setWaterContent(ovenType === 'homeOven' ? 70.0 : 62.0);
                  props.setYeastContent(defaultFormInput.yeastContent);
                  props.setSaltContent(defaultFormInput.saltContent);
                  props.setDoughballWeight(doughBallWeight);
                  setActiveStep(3);
                }}
                disabled={false}
                label="Finish"
              />
            </div>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === 3 ? (
        <div>
          <Button
            onClick={() => props.setExpertModeActive(true)}
            data-testid="editButton"
          >
            <EditIcon />
          </Button>
          <Recipe recipe={props.pizzaRecipe} />
          <div>
            <BackButton
              onClick={() => setActiveStep(2)}
              testId="finalViewBackButton"
            />
            <NextButton
              onClick={() => {
                setActiveStep(defaultValues.activeStep);
                setOvenType(defaultValues.ovenType);
                setPizzaNumber(defaultFormInput.pizzaNumber);
                setDoughBallWeight(defaultFormInput.doughballWeight);
              }}
              disabled={false}
              label="Reset"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
