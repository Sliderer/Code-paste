import React from 'react';
import ReactDOM from 'react-dom/client';
import PageTemplate from './ui/organisms/PageTemplate';
import ResourceCreationPage from './mvvm/views/ResourceCreationPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { lightTheme } from './ui/styling/themes';
import { resourceCreationViewModel } from './mvvm/view_models/ResourceCreationViewModel';
import RegistrationPage from './mvvm/views/RegistrationPage';
import EnterPage from './mvvm/views/EnterPage';
import { registrationViewModel } from './mvvm/view_models/RegistratioinViewModel';
import { enterViewModel } from './mvvm/view_models/EnterViewModel';

document.body.style.margin = '0';
document.body.style.padding = '0';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/create_resource",
    element: <PageTemplate needHeader={true} page={<ResourceCreationPage viewModel={resourceCreationViewModel}/>} />
  },
  {
    path: "/registration",
    element: <PageTemplate page={<RegistrationPage viewModel={registrationViewModel}/>} />
  },
  {
    path: "/enter",
    element: <PageTemplate page={<EnterPage viewModel={enterViewModel}/>} />
  },
]);

root.render(
    <ThemeProvider theme={lightTheme}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
);