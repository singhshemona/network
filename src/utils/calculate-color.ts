import { theme } from "../styles/theme";
import { NodeColor } from "../types/shared-types";

export const calculateColor = (efactor: number): NodeColor => {
  if (efactor < 1.54) {
    return {
      dark: theme.colors.darkRed,
      light: theme.colors.lightRed,
    };
  } else if (efactor < 1.78) {
    return {
      dark: theme.colors.darkOrange,
      light: theme.colors.lightOrange,
    };
  } else if (efactor === 2.5) {
    return {
      dark: theme.colors.darkNeutral,
      light: theme.colors.lightNeutral,
    };
  } else if (efactor < 2.26) {
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
