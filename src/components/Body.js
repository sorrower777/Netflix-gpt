import { createBrowserRouter, RouterProvider } from "react-router-dom"; //importing router from react-router
import Browse from "./Browse.js";
// import Header from "./Header.js";
import Login from "./Login.js";
//importing ReactDOM from react-dom/client

const Body = () =>{
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        
        {
            path:"/login",
            element:<Login/>,
        },
        {
            path:"/browse",
            element:<Browse/>,
        },
    ]);

    return (
    <div>
        <RouterProvider router = {appRouter}/>
    </div>
)};
export default Body;
