import React from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
//import HomePage from /HomePage'
//import AboutPage from /AboutPage'

// const router = createRouter({
//   routeTree: [
//     {
//       path: '/',
//       component: HomePage,
//     },
//     {
//       path: '/about',
//       component: AboutPage,
//     },
//   ],
// });

// const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
