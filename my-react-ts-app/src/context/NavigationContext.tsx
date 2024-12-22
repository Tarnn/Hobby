// src/NavigationContext.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the type for the navigation function
type NavigationFunction = (route: string) => void;

// Create context with a default no-op function to avoid runtime errors if used outside provider
const NavigationContext = createContext<NavigationFunction>(() => {});

// NavigationProvider component
export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  // Define handleNavigation function
  const handleNavigation: NavigationFunction = (route) => {
    navigate(route);
  };

  // Return with JSX
  return (
    <NavigationContext.Provider value={handleNavigation}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to consume the context
export const useNavigation = (): NavigationFunction => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};