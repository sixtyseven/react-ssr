import React from "react";
import loadData from "../apis/loadData";

class Todos extends React.Component {
  constructor(props) {
    super(props);

    if (props.staticContext && props.staticContext.data) {
      this.state = {
        data: props.staticContext.data,
      };
    } else {
      this.state = {
        data: [],
      };
    }
  }

  componentDidMount() {
    if (window && window.__ROUTE_DATA__) {
      console.log("[componentDidMount] window.__ROUTE_DATA__ has value");
      this.setState({
        data: window.__ROUTE_DATA__,
      });
    } else {
      console.log("[componentDidMount] window.__ROUTE_DATA__ has NO value");
      loadData("todos").then((data) => {
        this.setState({
          data,
        });
      });
    }
  }

  render() {
    if (typeof window !== "undefined" && window.__ROUTE_DATA__) {
      console.log("[render] window.__ROUTE_DATA__ has value");
    } else {
      console.log("[render] window.__ROUTE_DATA__ has NO value");
    }

    const { data } = this.state;
    return (
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    );
  }
}

export default Todos;
