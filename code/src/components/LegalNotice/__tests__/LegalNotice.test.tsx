import { render } from '@testing-library/react';
import { LegalNotice } from '../LegalNotice';

describe('The legal notice', () => {
  test('renders', () => {
    render(<LegalNotice />);
  });
});
