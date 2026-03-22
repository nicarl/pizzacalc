import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../select';

describe('Select', () => {
  it('renders select trigger', () => {
    render(
      <Select>
        <SelectTrigger aria-label="Pick a fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders select trigger with custom className', () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger" data-testid="trigger">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
      </Select>,
    );
    expect(screen.getByTestId('trigger').className).toContain('custom-trigger');
  });

  it('renders select trigger with sm size', () => {
    render(
      <Select>
        <SelectTrigger size="sm" data-testid="trigger">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
      </Select>,
    );
    expect(screen.getByTestId('trigger')).toHaveAttribute('data-size', 'sm');
  });

  it('opens content on trigger click and shows items', async () => {
    render(
      <Select>
        <SelectTrigger aria-label="fruit">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectSeparator />
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
    fireEvent.click(screen.getByRole('combobox'));
    expect(await screen.findByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
    expect(screen.getByText('Fruits')).toBeInTheDocument();
  });

  it('renders SelectValue with custom className', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue className="custom-value" placeholder="Pick" />
        </SelectTrigger>
      </Select>,
    );
    const value = document.querySelector('[data-slot="select-value"]');
    expect(value?.className).toContain('custom-value');
  });

  it('renders SelectContent with custom positioning props', async () => {
    render(
      <Select defaultValue="apple">
        <SelectTrigger aria-label="fruit">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent
          side="top"
          sideOffset={8}
          align="start"
          alignOffset={4}
          alignItemWithTrigger={false}
          className="custom-content"
        >
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );
    fireEvent.click(screen.getByRole('combobox'));
    const content = await screen.findByText('Apple');
    expect(content).toBeInTheDocument();
  });

  it('renders SelectGroup with custom className', async () => {
    render(
      <Select>
        <SelectTrigger aria-label="fruit">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="custom-group">
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
    fireEvent.click(screen.getByRole('combobox'));
    await screen.findByText('Apple');
    const group = document.querySelector('[data-slot="select-group"]');
    expect(group?.className).toContain('custom-group');
  });

  it('renders SelectLabel with custom className', async () => {
    render(
      <Select>
        <SelectTrigger aria-label="fruit">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="custom-label">Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
    fireEvent.click(screen.getByRole('combobox'));
    const label = await screen.findByText('Fruits');
    expect(label.className).toContain('custom-label');
  });

  it('renders SelectItem with custom className', async () => {
    render(
      <Select>
        <SelectTrigger aria-label="fruit">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple" className="custom-item">
            Apple
          </SelectItem>
        </SelectContent>
      </Select>,
    );
    fireEvent.click(screen.getByRole('combobox'));
    await screen.findByText('Apple');
    const item = document.querySelector('[data-slot="select-item"]');
    expect(item?.className).toContain('custom-item');
  });

  it('renders SelectSeparator with custom className', async () => {
    render(
      <Select>
        <SelectTrigger aria-label="fruit">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectSeparator className="custom-sep" />
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );
    fireEvent.click(screen.getByRole('combobox'));
    await screen.findByText('Apple');
    const sep = document.querySelector('[data-slot="select-separator"]');
    expect(sep?.className).toContain('custom-sep');
  });

  it('exports SelectScrollUpButton and SelectScrollDownButton', () => {
    // These components require Select.Root context and are rendered internally
    // by SelectContent. Verify they are exported and are functions.
    expect(typeof SelectScrollUpButton).toBe('function');
    expect(typeof SelectScrollDownButton).toBe('function');
  });
});
