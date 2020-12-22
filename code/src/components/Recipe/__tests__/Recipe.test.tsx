import { render } from '@testing-library/react';
import React from 'react';
import { Recipe } from '../Recipe';

describe('The Recipe', () => {
  it('renders', () => {
    const { getByText } = render(
      <Recipe
        recipe={{
          yeastMass: 0.02,
          flourMass: 0.3,
          waterMass: 5,
          saltMass: 100,
        }}
      />,
    );

    expect(getByText('Flour'));
    expect(getByText('Yeast'));
    expect(getByText('Salt'));
    expect(getByText('Water'));
    expect(getByText('0.0'));
    expect(getByText('0.3'));
    expect(getByText('5.0'));
    expect(getByText('100.0'));
  });
});
