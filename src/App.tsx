import * as React from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { Link, Switch } from "react-router-dom";
import store from "src/app/store";
import Routes from "src/routes";

export default function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <div>
        <Helmet>
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
    </Provider>
  );
}
