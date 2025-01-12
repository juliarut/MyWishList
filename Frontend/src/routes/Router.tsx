
import { createRouter, RouterProvider, createRoute, createRootRoute } from '@tanstack/react-router';
import RootPage from '../pages/__root';
import HomePage from '../pages/HomePage';
import WishListPage from '../pages/WishListPage';
import StatisticsPage from '../pages/StatisticsPage';
import UserPage from '../pages/UserPage';
import NotFoundPage from '../pages/NotFoundPage';


const rootRoute = createRootRoute({
    component: RootPage
});


const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
});

const wishListRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/wishlist',
    component: WishListPage
});

const statisticsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/statistics',
    component: StatisticsPage
});

const userRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/user',
    component: UserPage
});

const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '*',
    component: NotFoundPage
});

const routeTree = rootRoute.addChildren([
    homeRoute,
    wishListRoute,
    statisticsRoute,
    userRoute,
    notFoundRoute
]);

const router = createRouter({
    routeTree
});

export const AppRouter = () => <RouterProvider router={router} />;
