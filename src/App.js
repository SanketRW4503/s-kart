import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./component/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./component/Body";
import SearchBar from "./component/SearchBar";
import { Provider } from "react-redux";
import store from "./utility/store";
import DetailsPage from "./component/DetailsPage";
import SearchResult from "./component/SearchResult";
import Footer from "./component/Footer";
import CartPage from "./component/CartPage";
import About from "./component/About";
import Contact from "./component/Contact";
import SignUpPage from "./component/SignUpPage";
import LoginPage from "./component/LoginPage";
import UserProfileCom from "./component/UserProfileCom";
import Payment_Success_Page from "./component/Payment_Success_Page";



const App = () => {

    return (
        <>
            <Provider store={store}>
                <Header />
                <SearchBar />
                <Outlet />
                <Footer />
            </Provider>
        </>
    )


}


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Body />
            },
            {
                path: '/details/:id',
                element: <DetailsPage />
            }
            , {
                path: '/search/:text',
                element: <SearchResult />
            }, {
                path: '/cart',
                element: <CartPage />
            }, {
                path: '/about',
                element: <About />
            }, {
                path: '/contact',
                element: <Contact />
            }, {
                path: '/signup',
                element: <SignUpPage />
            }, {
                path: '/login',
                element: <LoginPage />
            }, {
                path: '/myProfile',
                element: <UserProfileCom />
            }, {
                path: '/payment/success/:id',
                element: <Payment_Success_Page />
            }


        ]
    }
]);


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<RouterProvider router={router} />)