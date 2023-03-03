import COLORS from "constants/colors";

import { createMuiTheme } from "@material-ui/core";

export const appTheme = createMuiTheme({
  palette: {
    type: "dark", // light/dark
    primary: {
      main: COLORS.CodGray,
      dark: COLORS.CodGray,
    },
    secondary: {
      main: COLORS.White,
    },
    background: {
      paper: COLORS.MineShaft,
      default: COLORS.CodGray,
    },
    // action: {
    // active: '#fff',
    // hover: 'rgba(255, 255, 255, 0.08)',
    // hover: COLORS.,
    // hoverOpacity: 0.08,
    // selected: 'rgba(255, 255, 255, 0.16)',
    // selectedOpacity: 0.16,
    // disabled: 'rgba(255, 255, 255, 0.3)',
    // disabledBackground: 'rgba(255, 255, 255, 0.12)',
    // disabledOpacity: 0.38,
    // focus: 'rgba(255, 255, 255, 0.12)',
    // focusOpacity: 0.12,
    // activatedOpacity: 0.24,
    // },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "sans-serif, Helvetica, Arial",
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h3: {
      fontFamily: "sans-serif, Helvetica, Arial",
      fontWeight: 700,
      fontSize: "1.5rem", // 24
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h5: {
      fontFamily: "sans-serif, Helvetica, Arial",
      fontWeight: 700,
      fontSize: "1rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    body1: {
      fontFamily: "sans-serif, Helvetica, Arial",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontFamily: "sans-serif, Helvetica, Arial",
      fontWeight: 400,
      fontSize: "0.875rem", // 14
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    caption: {
      fontFamily: "sans-serif, Helvetica, Arial",
      fontWeight: 400,
      fontSize: "0.75rem", // 12
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
  },
  overrides: {
    MuiSlider: {
      root: {},
      thumb: {
        height: 14,
        width: 14,
      },
      track: {
        height: 4,
      },
      rail: {
        height: 4,
      },
    },
  },
});
