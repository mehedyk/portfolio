import { render, screen, fireEvent, act } from '@testing-library/react';
import { LumoraShowcase } from '@/components/LumoraShowcase';

describe('LumoraShowcase', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const heading = () => screen.getByRole('heading', { level: 2 });
  const scene = (name: string) => screen.getByRole('button', { name });

  it('switches the hero text to dark for "Deep Woods" only', () => {
    render(<LumoraShowcase />);
    expect(heading()).toHaveStyle({ color: '#ffffff' });
    fireEvent.click(scene('Deep Woods'));
    expect(heading()).toHaveStyle({ color: '#182C41' });
    expect(scene('Deep Woods')).toHaveAttribute('aria-pressed', 'true');
  });

  it('ignores clicks during the 1000ms crossfade cooldown', () => {
    render(<LumoraShowcase />);
    fireEvent.click(scene('Still Water'));
    fireEvent.click(scene('Quiet Dawn')); // too soon → ignored
    expect(scene('Still Water')).toHaveAttribute('aria-pressed', 'true');
    expect(scene('Quiet Dawn')).toHaveAttribute('aria-pressed', 'false');
    act(() => { vi.advanceTimersByTime(1000); });
    fireEvent.click(scene('Quiet Dawn'));
    expect(scene('Quiet Dawn')).toHaveAttribute('aria-pressed', 'true');
  });

  it('is labelled as a concept and never stores the email', () => {
    render(<LumoraShowcase />);
    expect(screen.getByText(/UI concept/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Your best email'), { target: { value: 'a@b.co' } });
    fireEvent.click(screen.getByRole('button', { name: 'Get Early Access' }));
    expect(screen.getByRole('status')).toHaveTextContent(/nothing was sent or stored/i);
  });

  it('toggles the mobile menu', () => {
    render(<LumoraShowcase />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu', expanded: true })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });
});
