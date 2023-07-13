// // import './App.css';
import MainContainer from "./layouts/MainContainer";

// // function App() {
// //   return (
// //     <>
// //       <MainContainer></MainContainer>
// //     </>
// //   );
// // }

// // export default App;

import Box from '@mui/material/Box';
import { CssBaseline, ThemeProvider } from '@mui/material';
import NightModeToggle from "./components/NightModeToggle"
import { useThemeContext } from "./themes/ThemeContextProvider"

export default function App() {

  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
      {/* <NightModeToggle></NightModeToggle> */}
      <MainContainer></MainContainer>

      </CssBaseline>
    </ThemeProvider>
  );
}