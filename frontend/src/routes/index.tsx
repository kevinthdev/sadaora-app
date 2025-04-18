import Feed from "../pages/Feed";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { IRoute } from "../types";

export const routes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    isPrivate: false,
    element: <Home />,
  },
  {
    name: "Feed",
    path: "/feed",
    isPrivate: true,
    element: <Feed />,
  },
  {
    name: "Profile",
    path: "/profile",
    isPrivate: true,
    element: <Profile />,
  },
];
