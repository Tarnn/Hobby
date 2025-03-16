import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';
import Testimonials from '../Testimonials';
import { createTheme } from '@mui/material/styles';
import i18n from '../__tests__/mocks/i18n';

// Mock ScrollAnimation component
vi.mock('react-animate-on-scroll', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Testimonials Component', () => {
  const theme = createTheme();

  const renderTestimonials = () => {
    return render(
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <Testimonials />
        </I18nextProvider>
      </ThemeProvider>
    );
  };

  it('renders the testimonials title and description', () => {
    renderTestimonials();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('What others say about working with me.')).toBeInTheDocument();
  });

  it('renders all testimonial cards', () => {
    renderTestimonials();
    const testimonialCards = screen.getAllByRole('article');
    expect(testimonialCards).toHaveLength(6); // We have 6 testimonials
  });

  it('displays correct testimonial content', () => {
    renderTestimonials();
    expect(screen.getByText('Naga Satyaveni Kommireddy')).toBeInTheDocument();
    expect(screen.getByText('Lead software Developer')).toBeInTheDocument();
    expect(screen.getByText(/TJ was a great team member/)).toBeInTheDocument();
  });

  it('renders all avatar images', () => {
    renderTestimonials();
    const avatars = screen.getAllByRole('img');
    expect(avatars.length).toBeGreaterThanOrEqual(6); // At least 6 avatars (one per testimonial)
  });

  it('renders company logos', () => {
    renderTestimonials();
    const logos = screen.getAllByAltText(/Logo \d/);
    expect(logos).toHaveLength(6);
    logos.forEach(logo => {
      expect(logo).toHaveStyle({ width: '64px', opacity: 0.3 });
    });
  });

  it('contains correct LinkedIn links', () => {
    renderTestimonials();
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/naga-satyaveni-kommireddy-777040134/');
    expect(links[0]).toHaveAttribute('target', '_blank');
  });

  it('applies correct styling to testimonial cards', () => {
    renderTestimonials();
    const cards = screen.getAllByRole('article');
    cards.forEach(card => {
      expect(card).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
      });
    });
  });

  it('renders in both light and dark themes', () => {
    const darkTheme = createTheme({ palette: { mode: 'dark' } });
    const { rerender } = render(
      <ThemeProvider theme={darkTheme}>
        <I18nextProvider i18n={i18n}>
          <Testimonials />
        </I18nextProvider>
      </ThemeProvider>
    );

    // Check dark theme
    const darkContainer = screen.getByTestId('testimonials-container');
    expect(darkContainer).toHaveStyle({
      background: expect.stringContaining('rgba(0, 0, 0, 0.5)'),
    });

    // Rerender with light theme
    rerender(
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <Testimonials />
        </I18nextProvider>
      </ThemeProvider>
    );

    // Check light theme
    const lightContainer = screen.getByTestId('testimonials-container');
    expect(lightContainer).toHaveStyle({
      background: expect.stringContaining('rgba(77, 166, 255, 0.1)'),
    });
  });
}); 