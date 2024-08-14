import { createStore } from "redux-box";
import userModule  from "../features/user";

export default createStore({
  user: userModule
});