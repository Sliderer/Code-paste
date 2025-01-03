import React from 'react';
import ReactDOM from 'react-dom/client';
import PageTemplate from './ui/organisms/PageTemplate';
import ResourceCreationPage from './mvvm/views/ResourceCreationPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { lightTheme } from './ui/styling/themes';
import { resourceCreationViewModel } from './mvvm/view_models/ResourceCreationViewModel';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/create_resource",
    element: <PageTemplate page={<ResourceCreationPage viewModel={resourceCreationViewModel}/>} />
  },
]);

root.render(
    <ThemeProvider theme={lightTheme}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
);