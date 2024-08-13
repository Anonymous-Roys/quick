import { Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page404 from "../pages/Page404";
import CustomerDashboard from "../pages/customerDashboard";
import AdminDashboard from "../pages/adminDashboard";
import SalesDashboard from "../pages/salesDashboard";
import Home from "../pages/Home";
import Login from "../components/salesDashboard/auth/Login";



const Router = () => {
    // eslint-disable-next-line react/prop-types
    const Layout = ({ children }) => {
        return (
            <main className="App">
                {children}
            </main>
        );
    };

    // set up router
    const router = createBrowserRouter([
        {
            path: "*",
            element: <Page404 />,
        },
        {
            path: "/",
            // eslint-disable-next-line react/no-children-prop
            element: <Layout children={<CustomerDashboard />} />,
        },
        {
            path: "/admin",
            // eslint-disable-next-line react/no-children-prop
            element: <Layout children={<AdminDashboard />} />,
        },
        {
            path: "/sales",
            // eslint-disable-next-line react/no-children-prop
            element: <Layout children={<SalesDashboard />} />,
        },
        {
            path: "/about",
            // eslint-disable-next-line react/no-children-prop
            element: <Layout children={<Home />} />,
        }
        ,
        {
            path: "/login",
            // eslint-disable-next-line react/no-children-prop
            element: <Layout children={<Login />} />,
        }
     

    ]);

    return (
        <>
            <Suspense fallback={"loading...."}>
                <RouterProvider router={router} />
            </Suspense>
        </>
    );
};

export default Router;
