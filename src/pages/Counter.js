import React from "react";
import { Counter as CounterFeature } from "../features/counter/Counter";

export default function Counter() {
  return (
    <>
      <h2>[DEBUG] Counter</h2>
      <CounterFeature />
    </>
  );
}
