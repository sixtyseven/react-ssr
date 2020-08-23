import React from "react";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Todos from "./pages/Todos";
import NameLength from "./pages/NameLength";
import NotFound from "./pages/NotFound";

import loadData from "./apis/loadData";

const Routes = [
  {
    label: "Home",
    path: "/",
    exact: true,
    render: () => <Home name="Bruce" />,
  },
  {
    label: "Name Length",
    path: "/name-lenth",
    component: NameLength,
  },
  {
    label: "Posts",
    path: "/posts",
    component: Posts,
    loadData: () => loadData("posts"),
  },
  {
    label: "Todos",
    path: "/todos",
    component: Todos,
    loadData: () => loadData("todos"),
  },
  {
    component: NotFound,
  },
];

export default Routes;
