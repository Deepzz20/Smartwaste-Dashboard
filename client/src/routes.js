/* 
  All of the routes for the SmartWaste Dashboard React are added here,
  You can add a new route, customize the routes, and delete the routes here.

  Once you add a new route to this file, it will be visible automatically in
  the Sidenav.

  To add a new route, follow the existing routes in the routes array:
  1. The `name` key is used for the name of the route on the Sidenav.
  2. The `key` key is used for the key of the route (It helps with the key prop inside a loop).
  3. The `icon` key is used for the icon of the route on the Sidenav; you have to add a node.
  4. The `route` key is used to store the route location used for the react router.
  5. The `component` key is used to store the component of its route.
  6. The `show` key is used to determine whether the route should be displayed in the Sidenav (true/false).
*/

// SmartWaste Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Issues from "layouts/issues";
import Bins from "layouts/bin";
import Drivers from "layouts/drivers";
import Profile from "layouts/profile";
import SignIn from "layouts/login";
import Users from "layouts/user";

// SmartWaste Dashboard React icons
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoHome, IoWarning } from "react-icons/io5";
import { FaTrash, FaTruck, FaUser } from 'react-icons/fa';

const routes = [
  {
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="18px" color="inherit" />,
    component: Dashboard,
    show: true,
  },
  {
    name: "Issues",
    key: "issues",
    route: "/issues",
    icon: <IoWarning size="18px" color="inherit" />,
    component: Issues,
    show: true,
  },
  {
    name: "Bins",
    key: "bins",
    route: "/bins",
    icon: <FaTrash size="15px" color="inherit" />,
    component: Bins,
    show: true,
  },
  {
    name: "Drivers",
    key: "drivers",
    route: "/drivers",
    icon: <FaTruck size="15px" color="inherit" />,
    component: Drivers,
    show: true,
  },
  {
    name: "Users",
    key: "users",
    route: "/users",
    icon: <FaUser size="15px" color="inherit" />,
    component: Users,
    show: true,
  },
  {
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="18px" color="inherit" />,
    component: Profile,
    show: true,
  },
  {
    name: "Sign In",
    key: "login",
    route: "/login",
    icon: <IoIosDocument size="18px" color="inherit" />,
    component: SignIn,
    show: false,
  },
];

export default routes;
