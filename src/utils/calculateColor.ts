import { theme } from "../styles/Theme"
import { NodeColor } from "../types/types"


export const calculateColor = (efactor: number): NodeColor => {
  if(efactor < 1) {
    return {
      dark: theme.colors.darkRed, 
      light: theme.colors.lightRed
    }
  } else if(efactor < 2) {
    return {
      dark: theme.colors.darkOrange, 
      light: theme.colors.lightOrange
    }
  } else if(efactor < 3) {
    return {
      dark: theme.colors.darkYellow, 
      light: theme.colors.lightYellow
    }
  } else if(efactor < 4) {
    return {
      dark: theme.colors.darkYellowGreen, 
      light: theme.colors.lightYellowGreen
    }
  } else return {
    dark: theme.colors.darkGreen, 
    light: theme.colors.lightGreen
  }
}