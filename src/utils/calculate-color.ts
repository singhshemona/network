import { theme } from "../styles/theme";
import { NodeColor } from "../types/shared-types";

export const calculateColor = (interval: number, efactor: number): NodeColor => {
  if (interval === 0) {
    return {
      dark: theme.colors.darkNeutral,
      light: theme.colors.lightNeutral,
    }; 
  }

  if (efactor < 1.6) {
    return {
      dark: theme.colors.darkRed,
      light: theme.colors.lightRed,
    };
  } else if (efactor < 1.9) {
    return {
      dark: theme.colors.darkOrange,
      light: theme.colors.lightOrange,
    };
  } else if (efactor < 2.2) {
    return {
      dark: theme.colors.darkYellow,
      light: theme.colors.lightYellow,
    };
  } else if (efactor < 2.5) {
    return {
      dark: theme.colors.darkYellowGreen,
      light: theme.colors.lightYellowGreen,
    };
  } else
    return {
      dark: theme.colors.darkGreen,
      light: theme.colors.lightGreen,
    };
};
