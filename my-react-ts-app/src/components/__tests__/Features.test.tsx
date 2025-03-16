import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Features from '../Features';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import i18n from '../__tests__/mocks/i18n';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  }
}));

// Mock Swiper components
vi.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}));

// Mock ScrollAnimation
vi.mock('react-animate-on-scroll', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Features Component', () => {
  const theme = createTheme();

  const renderFeatures = () => {
    return render(
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <Features />
        </I18nextProvider>
      </ThemeProvider>
    );
  };

  it('renders the features title and description', () => {
    renderFeatures();
    expect(screen.getByText('Completed Projects')).toBeInTheDocument();
    expect(screen.getByText("Here's a brief list of projects I've worked on.")).toBeInTheDocument();
  });

  it('renders all feature items', () => {
    renderFeatures();
    expect(screen.getByText('Intuit')).toBeInTheDocument();
    expect(screen.getByText('Royal Bank of Canada')).toBeInTheDocument();
    expect(screen.getByText('Rogers')).toBeInTheDocument();
    expect(screen.getByText('NCR')).toBeInTheDocument();
  });

  it('changes selected feature when clicking on a feature item', () => {
    renderFeatures();
    const rbcButton = screen.getByText('Royal Bank of Canada');
    fireEvent.click(rbcButton);
    expect(screen.getByText('Worked on RBC Mobile Banking App...')).toBeInTheDocument();
  });

  it('displays feature images correctly', () => {
    renderFeatures();
    const imageContainers = screen.getAllByTestId(/feature-image|image-container/);
    expect(imageContainers.length).toBeGreaterThan(0);
    imageContainers.forEach(container => {
      expect(container).toHaveStyle({
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      });
    });
  });

  it('renders mobile layout on small screens', () => {
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    renderFeatures();
    const swiperElement = screen.getByTestId('swiper');
    expect(swiperElement).toBeInTheDocument();
  });

  it('renders desktop layout on large screens', () => {
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    renderFeatures();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4); // Four feature items
  });
}); 