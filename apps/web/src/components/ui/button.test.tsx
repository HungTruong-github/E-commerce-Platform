import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders disabled state when isLoading is true', () => {
    render(<Button isLoading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
