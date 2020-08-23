import React from "react";
import { Helmet } from "react-helmet";
import { Switch, Route, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Routes from "./routes";

export default function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Title Set In Helmet</title>
      </Helmet>
      <nav>
        <ul>
          {Routes.map((route) => {
            if (!route.path) {
              return null;
            }
            return (
              <li key={route.label}>
                <Link to={route.path}>{route.label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Switch>{renderRoutes(Routes)}</Switch>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
