import { createBrowserRouter, Navigate } from 'react-router-dom';
import AboutPage from '../../features/about/AboutPage';
import LoginForm from '../../features/account/LoginForm';
import RegisterForm from '../../features/account/RegisterForm';
import BasketPage from '../../features/basket/BasketPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import CheckoutSuccess from '../../features/checkout/CheckoutSuccess';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';
import App from '../layout/App';
import RequireAuth from './RequireAuth';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          element: <RequireAuth />,
          children: [
            { path: 'checkout', element: <CheckoutPage /> },
            { path: 'checkout/success', element: <CheckoutSuccess /> },
          ],
        },
        { path: '', element: <HomePage /> },
        { path: 'catalog', element: <Catalog /> },
        { path: 'catalog/:id', element: <ProductDetails /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'basket', element: <BasketPage /> },
        { path: 'server-error', element: <ServerError /> },
        { path: 'login', element: <LoginForm /> },
        { path: 'register', element: <RegisterForm /> },
        { path: 'not-found', element: <NotFound /> },
        { path: '*', element: <Navigate replace to="/not-found" /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
