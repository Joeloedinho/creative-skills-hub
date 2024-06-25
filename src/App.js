import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { AlertProvider } from './hooks';
import {ThemeProvider} from "./shared";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <RouterProvider router={routes} />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
