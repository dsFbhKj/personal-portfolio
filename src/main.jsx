import './styles/global.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Experience from './components/Experience';
import Main from './pages/Main';
import World from './pages/World';
import Hyperspace from './components/Hyperspace';

const router = createBrowserRouter([
  { path: '/', element: <Experience /> },
  { path: '/main', element: <Main /> },
  { path: '/hyperspace', element: <Hyperspace /> },
  { path: '/world', element: <World /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
