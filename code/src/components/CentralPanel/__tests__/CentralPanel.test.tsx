import { render } from '@testing-library/react';
import { CentralPanel } from '../CentralPanel';

describe('The central panel', () => {
  test('renders', () => {
    render(<CentralPanel />);
  });
});
