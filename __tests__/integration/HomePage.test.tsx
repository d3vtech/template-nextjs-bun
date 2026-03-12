import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import HomePage from '../../app/page';

describe('HomePage', () => {
  it('should render the app name', () => {
    render(<HomePage />);
    expect(screen.getByText('NextjsBoilerplate')).toBeTruthy();
  });

  it('should render the environment', () => {
    render(<HomePage />);
    expect(screen.getByText(/Environment:/)).toBeTruthy();
  });
});
