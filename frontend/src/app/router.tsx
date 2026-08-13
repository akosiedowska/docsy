import { createBrowserRouter } from "react-router";

import Loginpage from "../pages/auth/Loginpage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/patient/DashboardPage";
import DashboardLayout from "../layouts/DashboardLayout";
import { RequireAuth } from "../features/auth/components/RequireAuth";

const paths = {
    'HOME': '/',
    'LOGIN': 'login', 
    'REGISTER': 'register', 
    'DASHBOARD': 'dashboard'

}

export const router = createBrowserRouter([
    {
        path: paths.HOME,
        errorElement: <div>Error</div>,
        children: [
            {path: paths.LOGIN, element: <Loginpage /> },
            {path: paths.REGISTER, element: <RegisterPage /> },
            { 
                element: <RequireAuth />,
                children: [
                    {
                        element: <DashboardLayout />,
                        children: [
                            {
                                path: paths.DASHBOARD, element: <DashboardPage />
                            }
                        ]
                    }
                ]
            }
        ]
    }
])