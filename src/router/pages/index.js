import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ClientRoutes from "./clientRoutes";
import InvoiceRoutes from "./invoiceRoutes";
import QuoteRoutes from "./quoteRoutes";
import ServicesRoutes from "./servicesRoutes";

const PagesRoutes = [
    {
        path: '/login',
        component: lazy(() => import('../../views/pages/auth/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/register',
        component: lazy(() => import('../../views/pages/auth/Register')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/forgot-password',
        component: lazy(() => import('../../views/pages/auth/ForgotPassword')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/reset-password',
        component: lazy(() => import('../../views/pages/auth/ResetPassword')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/dashboard',
        component: lazy(() => import('../../views/pages/Dashboard')),
    },
]

const AllRoutes = [
    ...PagesRoutes,
    ...ClientRoutes,
    ...InvoiceRoutes,
    ...ServicesRoutes,
    ...QuoteRoutes
]

export const DefaultRoute = '/dashboard';

export default AllRoutes;