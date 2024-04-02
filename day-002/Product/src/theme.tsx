import { createContext, useState, useMemo, ReactNode } from "react";
import { createTheme, Theme } from "@mui/material/styles";

// Define types for color tokens
interface ColorTokens {
  [key: number]: string;
}

interface ColorPalette {
  [key: string]: ColorTokens;
}

// Define types for tokens
type Mode = "dark" | "light";

interface TokensFunction {
  (mode: Mode): ColorPalette;
}

// Define types for theme settings
interface ThemeSettingsFunction {
  (mode: Mode): any; // You may need to replace 'any' with more specific types
}

// Define types for color mode context
interface ColorModeContextProps {
  toggleColorMode: () => void;
}

// Define types for useMode hook return value
type UseModeHookReturnValue = [Theme, ColorModeContextProps];

export const tokens: TokensFunction = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#ffffff",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        // Rest of the dark mode colors
      }
    : {
        grey: {
          100: "#141414",
          200: "#ffffff",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        // Rest of the light mode colors
      }),
});

export const themeSettings: ThemeSettingsFunction = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 16,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
});

export const useMode = (): UseModeHookReturnValue => {
  const [mode, setMode] = useState<Mode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
