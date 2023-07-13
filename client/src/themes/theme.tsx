import { PaletteMode } from "@mui/material";
import { amber, deepPurple, indigo, grey } from "@mui/material/colors";

const theme = {
  palette: {
    primary: amber,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: indigo,
          divider: indigo[900],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: grey,
          divider: grey[900],
          background: {
            default: grey[800],
            paper: grey[800],
          },
          text: {
            primary: "#fff",
            secondary: "#FFFFFF",
          },
        }),
  },
});

export default theme;