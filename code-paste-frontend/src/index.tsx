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
import ResourceDemonstrationPage from './mvvm/views/ResourceDemonstrationPage';
import { resourceDemonstrationViewModel } from './mvvm/view_models/ResourceDemonstrationViewModel';
import AccountPage from './mvvm/views/AccountPage';
import { accountViewModel } from './mvvm/view_models/AccountViewModel';
import SearchPage from './mvvm/views/SearchPage';
import { searchViewModel } from './mvvm/view_models/SearchViewModel';
import FolderPage from './mvvm/views/FolderPage';
import { folderViewModel } from './mvvm/view_models/FolderViewModel';

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
    path: "/account/:nickname",
    element: <PageTemplate needHeader={true} page={<AccountPage viewModel={accountViewModel}/>} />
  },
  {
    path: "/registration",
    element: <PageTemplate page={<RegistrationPage viewModel={registrationViewModel}/>} />
  },
  {
    path: "/enter",
    element: <PageTemplate page={<EnterPage viewModel={enterViewModel}/>} />
  },
  {
    path: "/resource/:resource_id",
    element: <PageTemplate needHeader={true} page={<ResourceDemonstrationPage viewModel={resourceDemonstrationViewModel}/>} />
  },
  {
    path: "/search/:text_search",
    element: <PageTemplate needHeader={true} page={<SearchPage viewModel={searchViewModel}/>} />
  },
  {
    path: "/folder/:folder_id",
    element: <PageTemplate needHeader={true} page={<FolderPage viewModel={folderViewModel}/>} />
  },
]);

root.render(
    <ThemeProvider theme={lightTheme}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
);