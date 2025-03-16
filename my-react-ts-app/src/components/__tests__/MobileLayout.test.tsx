import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MobileLayout } from '../Features';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  }
}));

// Mock Swiper components
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div data-testid="mobile-swiper">{children}</div>,
  SwiperSlide: ({ children }: any) => <div data-testid="mobile-slide">{children}</div>,
}));

describe('MobileLayout Component', () => {
  const theme = createTheme();
  const mockHandleClick = jest.fn();
  
  const mockProps = {
    selectedItemIndex: 0,
    handleItemClick: mockHandleClick,
    selectedFeature: {
      title: 'Intuit',
      description: 'Test description',
      imageLight: 'test-image.jpg',
      imageDark: 'test-image-dark.jpg',
    }
  };

  const renderMobileLayout = (props = mockProps) => {
    return render(
      <ThemeProvider theme={theme}>
        <MobileLayout {...props} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders mobile swiper with correct number of slides', () => {
    renderMobileLayout();
    const slides = screen.getAllByTestId('mobile-slide');
    expect(slides).toHaveLength(4); // Number of companies
  });

  it('shows selected feature content', () => {
    renderMobileLayout();
    expect(screen.getByText('Intuit')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('calls handleItemClick when clicking a tab', () => {
    renderMobileLayout();
    fireEvent.click(screen.getByText('Intuit'));
    expect(mockHandleClick).toHaveBeenCalledWith(0);
  });

  it('applies active styles to selected tab', () => {
    renderMobileLayout();
    const activeTab = screen.getByText('Intuit').closest('div');
    expect(activeTab).toHaveStyle({
      border: `1px solid ${theme.palette.primary.main}`
    });
  });

  it('renders image with correct background', () => {
    renderMobileLayout();
    const imageBox = screen.getByTestId('feature-image');
    expect(imageBox).toHaveStyle({
      backgroundImage: 'var(--items-imageLight)'
    });
  });

  it('handles null selected feature gracefully', () => {
    const nullProps = {
      ...mockProps,
      selectedFeature: null
    };
    const { container } = renderMobileLayout(nullProps);
    expect(container.firstChild).toBeNull();
  });
}); 