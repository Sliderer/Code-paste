import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './ui/organisms/Header';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import PageTemplate from './ui/organisms/PageTemplate';
import ResourceCreationPage from './mvvm/views/ResourceCreationPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<ChakraProvider value={defaultSystem}>
  <React.StrictMode>
    <PageTemplate page={new ResourceCreationPage({})} />
  </React.StrictMode>
    </ChakraProvider>
);
