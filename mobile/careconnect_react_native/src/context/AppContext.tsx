import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CareConnectRole, ThemeOption } from '../models/types';
import { themes, ThemeTokens } from '../theme/theme';

type AppContextValue = {
  role: CareConnectRole | null;
  selectedTheme: ThemeOption;
  textScale: number;
  wideSpacing: boolean;
  readAloudEnabled: boolean;
  activeTheme: ThemeTokens;
  signIn: (role: CareConnectRole) => void;
  signOut: () => void;
  setSelectedTheme: (theme: ThemeOption) => void;
  setTextScale: (scale: number) => void;
  setWideSpacing: (enabled: boolean) => void;
  setReadAloudEnabled: (enabled: boolean) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [role, setRole] = useState<CareConnectRole | null>(null);
  const [selectedTheme, setSelectedTheme] =
    useState<ThemeOption>('neutral');
  const [textScale, setTextScale] = useState(1);
  const [wideSpacing, setWideSpacing] = useState(false);
  const [readAloudEnabled, setReadAloudEnabled] = useState(false);

  const value = useMemo(
    () => ({
      role,
      selectedTheme,
      textScale,
      wideSpacing,
      readAloudEnabled,
      activeTheme: themes[selectedTheme],
      signIn: setRole,
      signOut: () => setRole(null),
      setSelectedTheme,
      setTextScale,
      setWideSpacing,
      setReadAloudEnabled,
    }),
    [role, selectedTheme, textScale, wideSpacing, readAloudEnabled],
  );

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}

export function useCareConnect() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useCareConnect must be used inside AppProvider');
  }

  return context;
}
