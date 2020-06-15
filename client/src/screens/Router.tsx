import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import { RootState } from "../store";
import { STATUS } from "../store/utils/status";
import { WelcomeScreen } from "./WelcomeScreen/WelcomeScreen";
import { StoryScreen } from "./StoryScreen/StoryScreen";
import AppBar from "../components/AppBar/AppBar";

export const Router: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.auth.getTokenAtStartup());
  }, []);

  const { status } = useSelector((state: RootState) => state.auth);

  switch (status) {
    default:
    case STATUS.LOADING:
    case STATUS.FAILURE:
      return (
        <>
          <AppBar />
          <Switch>
            <Route exact path="/" component={WelcomeScreen} />
            <Route exact path="/story" component={StoryScreen} />

            <Route path={"*"}>
              <Redirect to={"/story"} />
            </Route>
          </Switch>
        </>
      );
    case STATUS.SUCCESS:
      return <div>Hello</div>;
  }
};
