import {Action} from "routing-controllers";
import {verify} from "jsonwebtoken";
import config from "../config";
import { tokenData} from "../core/user";

export const authChecker = (action: Action, roles: string[]): boolean => {
  if (
      action.request.headers.authorization &&
      action.request.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = action.request.headers.authorization.split(" ")[1];
    const tokenData = verify(token, config.jwt_secret) as tokenData;
    if (tokenData.user_id && !roles.length)
      return true;
    console.log(tokenData, roles);
    if (tokenData && roles.find(role => tokenData.role === role))
      return true;
  } // we specify controllers we want to use
  return false;
};

export const currentUserChecker = async (action: Action) => {
  // here you can use request/response objects from action
  // you need to provide a user object that will be injected in controller actions
  // demo code:
  if (
      action.request.headers.authorization &&
      action.request.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = action.request.headers.authorization.split(" ")[1];
    const tokenData = verify(token, config.jwt_secret) as tokenData;
    return {id: tokenData.user_id}
  } // we specify controllers we want to use
  return undefined;
}
