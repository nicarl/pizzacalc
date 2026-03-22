import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { LegalNotice } from '../LegalNotice';

describe('LegalNotice', () => {
  it('renders legal notice heading', () => {
    render(
      <MemoryRouter>
        <LegalNotice />
      </MemoryRouter>,
    );
    expect(screen.getByText(/impressum/i)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(
      <MemoryRouter>
        <LegalNotice />
      </MemoryRouter>,
    );
    expect(screen.getByText(/nico carl/i)).toBeInTheDocument();
  });
});
