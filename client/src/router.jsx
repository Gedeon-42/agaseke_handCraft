import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeLayout from "./Layouts/HomeLayout";
import AllPuppies from "./pages/Puppies/AllPuppies";
import Cart from "./pages/Cart/Cart";
import PuppyDetail from "./pages/Puppies/PuppyDetail";
import DashboardLayout from "./Layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Dashboard/Orders";
import DashPuppies from "./pages/Dashboard/DashPuppies";
import Users from "./pages/Dashboard/Users";
import DashCategories from "./pages/Dashboard/DashCategories";
import Customers from "./pages/Dashboard/Customers";
import AddPuppie from "./pages/Dashboard/Forms/AddPuppie";
import EditPuppie from "./pages/Dashboard/Forms/EditPuppie";
import EditCategory from "./pages/Dashboard/Forms/EditCategory";
import Reports from "./pages/Dashboard/Reports";
import Settings from "./pages/Dashboard/Settings";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Cart/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/products",
        element: <AllPuppies />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element:<Checkout/>
      },
      {
        path: "/product/:id",
        element: <PuppyDetail />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
      {
        path: "/admin/products",
        element: <DashPuppies />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/categories",
        element: <DashCategories />,
      },
      {
        path: "/admin/customers",
        element: <Customers />,
      },
      {
        path: "/admin/add-product",
        element: <AddPuppie />,
      },
      {
        path: "/admin/edit-product/:id",
        element: <EditPuppie />,
      },
      {
        path:"/admin/edit-category",
        element:<EditCategory/>
      },
      {
        path:"/admin/reports",
        element:<Reports/>
      },
      {
        path:"/admin/settings",
        element:<Settings />
    }
    ],
  },
  {
    path:'/login',
    element:<Login/>

},
{
    path:'/register',
    element:<Signup/>
},
{
    path:"*",
    element:<NotFound/>
}
]);

export default router;
