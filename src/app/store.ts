import counterReducer from "src/features/counter/counterSlice";
import { IAppState } from "src/models";

import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export const DEFAULT_STATE: IAppState = {
  counter: {
    value: 5,
  },
};
