import { ThemeOption } from '../models/types';

export type ThemeTokens = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  softSurface: string;
  text: string;
  mutedText: string;
  border: string;
  success: string;
  error: string;
};

export const themes: Record<ThemeOption, ThemeTokens> = {
  neutral: {
    name: 'Neutral',
    primary: '#0D1B2A',
    secondary: '#3B5A7A',
    accent: '#6B7280',
    background: '#F7F7F5',
    surface: '#FFFFFF',
    softSurface: '#E5E7EB',
    text: '#1F1F1F',
    mutedText: '#4B5563',
    border: '#D5DFEA',
    success: '#2E7D57',
    error: '#C43D3D',
  },
  blueGreen: {
    name: 'Blue & Green',
    primary: '#0B2D4D',
    secondary: '#0E7C86',
    accent: '#2E7D57',
    background: '#F7FAF9',
    surface: '#FFFFFF',
    softSurface: '#E6F4EC',
    text: '#111111',
    mutedText: '#3F4F5F',
    border: '#D5DFEA',
    success: '#2E7D57',
    error: '#C43D3D',
  },
  purplePink: {
    name: 'Purple & Pink',
    primary: '#4B1F4D',
    secondary: '#7A4D9C',
    accent: '#E07BAE',
    background: '#FBF8FA',
    surface: '#FFFFFF',
    softSurface: '#F7EAF3',
    text: '#1F1F2E',
    mutedText: '#4B4453',
    border: '#D5DFEA',
    success: '#2E7D57',
    error: '#C43D3D',
  },
  kids: {
    name: 'Kids',
    primary: '#183153',
    secondary: '#4FA3F7',
    accent: '#22B8B0',
    background: '#FAFBF8',
    surface: '#FFFFFF',
    softSurface: '#EAF7F1',
    text: '#1E2A35',
    mutedText: '#415161',
    border: '#D5DFEA',
    success: '#2E7D57',
    error: '#C43D3D',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  screenTitle: 30,
  sectionTitle: 24,
  cardTitle: 20,
  body: 18,
  bodySmall: 16,
};
