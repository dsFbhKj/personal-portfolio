import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Experience } from './components/Experience';

const router = createBrowserRouter([
  { path: '/', element: <Experience /> },
  // { path: '/hyperspace', element: <Hyperspace /> },
  // { path: '/world', element: <World /> },
  // { path: '/main', element: <Main /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
