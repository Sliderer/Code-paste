import React from 'react';
import ReactDOM from 'react-dom/client';
import PageTemplate from './ui/organisms/PageTemplate';
import ResourceCreationPage from './mvvm/views/ResourceCreationPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import { lightTheme } from './ui/styling/themes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/create_resource",
    element: <PageTemplate page={new ResourceCreationPage({})} />
  },
]);

root.render(
    <ThemeProvider theme={lightTheme}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
);