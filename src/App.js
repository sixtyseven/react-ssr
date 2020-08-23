import React from "react";
import { Helmet } from "react-helmet";
import { Switch, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Routes from "./routes";

export default function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Title Set In Helmet</title>
      </Helmet>
      <header>
        <h1>My SSR Dev Environment v6</h1>
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
      </header>

      <Switch>{renderRoutes(Routes)}</Switch>
    </div>
  );
}
