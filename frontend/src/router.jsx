import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import OpenSection from "./layout/openSection";
import About from "./layout/about";
import GalleryGrid from "./gallery/galleryGrid";
import AddDrawing from "./gallery/addDrawing";
import { ContextUserProvider } from "./contextUser";
import Contact from "./orders/contact";
import Orders from "./orders/orders";
import { ContextDrawingProvider } from "./contextDrawing";
import { ContextOrdersProvider } from "./orders/contextOrders";
import ProtectedRoute from "./protectRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element: <ContextUserProvider><ContextDrawingProvider> <App /> </ContextDrawingProvider></ContextUserProvider> ,
        children: [
            { path: '/', element: <Navigate to="/about" replace /> },
            {
                path: "/",
                element: <OpenSection />,
                children: [
                    {
                        path: "/about",
                        element: <About />,
                    },
                    {
                        path: "/gallery",
                        element: <GalleryGrid />,

                    },
                    {
                        path: "/:id/contact",
                        element: <ProtectedRoute><ContextOrdersProvider><Contact /></ContextOrdersProvider></ProtectedRoute>,
                    },
                    {
                        path: "/:id/orders",
                        element: <ProtectedRoute><ContextOrdersProvider><Orders /></ContextOrdersProvider></ProtectedRoute>,
                    },
                    {
                        path: "/addDrawing",
                        element: <AddDrawing />,
                    },
                    ]
                },
            
            {path:'*', element:<Navigate to="/gallery"/>}
        ],
    },
]);

export default router