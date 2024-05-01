import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./shared";
import { AlertProvider } from './hooks';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <AlertProvider>
        <RouterProvider router={routes} />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
