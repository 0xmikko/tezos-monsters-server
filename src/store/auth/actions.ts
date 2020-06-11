/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {
  createAction,
  RSAA,
  RSAAAction,
  RSAAResultAction,
} from 'redux-api-middleware';
import {getFullAPIAddress} from '../utils/api';
import * as actionTypes from './';

import {RootState} from '../index';
import {AuthPayload} from './reducer';
import {BACKEND_ADDR, SSO_ADDR} from '../../config';
import {actionsAfterAuth} from '../actions';
import io from 'socket.io-client';
import {GETCODE_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS} from './';

export const login = (
  email: string,
  password: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  const endpoint = '/auth/login/';
  const json = JSON.stringify({email, password});

  dispatch(authenticate(endpoint, json));
};

// Send request for refresh token

export const refreshAccessToken = (
  token: string,
): RSAAAction<any, AuthPayload, void> => ({
  [RSAA]: {
    endpoint: getFullAPIAddress('/auth/token/refresh/', undefined, SSO_ADDR),
    method: 'POST',
    body: JSON.stringify({refresh: token}),
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin',
    // @ts-ignore
    options: {timeout: 10000},
    types: [
      actionTypes.TOKEN_REQUEST,
      actionTypes.TOKEN_RECEIVED,
      actionTypes.TOKEN_FAILURE,
    ],
  },
});

export const signup = (
  email: string,
  password: string,
): RSAAAction<any, AuthPayload, void> =>
  createAction({
    endpoint: getFullAPIAddress('/auth/signup/', undefined, SSO_ADDR),
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {'Content-Type': 'application/json'},
    types: [
      actionTypes.SIGNUP_REQUEST,
      actionTypes.SIGNUP_SUCCESS,
      actionTypes.SIGNUP_FAILURE,
    ],
  });

export const getWebConnectCode = (
  hash?: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  let socket = io(BACKEND_ADDR + '/webwait', {
    autoConnect: true,
    reconnection: true,
    forceNew: true,
  });

  socket.on('connect_error', (err: string) => {
    console.log(err);
  });

  socket.on('code', (code: string) => {
    console.log(code);
    dispatch({
      type: GETCODE_SUCCESS,
      payload: {
        access: code,
      },
    });
  });

  socket.on('login', async (payload: AuthPayload) => {
    console.log(payload);
    if (payload.refresh === undefined) {
      dispatch({
        type: LOGIN_FAILURE,
        payload,
      });
      return;
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload,
    });
    localStorage.setItem('token', payload.refresh.toString());
    await dispatch(actionsAfterAuth());
  });

  socket.on('disconnect', () => {
    dispatch(getWebConnectCode());
  });

  socket.emit('getCode');
};

/*
  Authenticate flow
  @param endpoint
  @param body
 */
export const authenticate = (
  endpoint: string,
  body: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  const result = await dispatch<AuthPayload, void>(
    createAction({
      endpoint: getFullAPIAddress(endpoint, undefined, SSO_ADDR),
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'},
      types: [
        actionTypes.LOGIN_REQUEST,
        actionTypes.LOGIN_SUCCESS,
        actionTypes.LOGIN_FAILURE,
      ],
    }),
  );

  if (
    result &&
    !result.error &&
    result.payload.refresh &&
    result.type === actionTypes.LOGIN_SUCCESS
  ) {
    localStorage.setItem('token', result.payload.refresh.toString());
    await dispatch(actionsAfterAuth());
  }

  console.log(result);
};

export const logout = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  // Clear local storage at logout
  await localStorage.clear();
  dispatch({
    type: actionTypes.LOGOUT,
  });

  dispatch({
    type: 'PROFILE_LOGOUT',
  })
};

export const getTokenAtStartup = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const token =localStorage.getItem('token');

  if (token) {
    const result = await dispatch(refreshAccessToken(token));
    if (
      !result.error &&
      result.payload.refresh &&
      result.type === actionTypes.TOKEN_RECEIVED
    ) {
      await dispatch(actionsAfterAuth());
    }
  }
};

declare module 'redux-thunk' {
  /*
   * Overload to add api middleware support to Redux's dispatch() function.
   * Useful for react-redux or any other library which could use this type.
   */

  interface ThunkDispatch<S, E, A extends Action> {
    <T extends A>(action: T): T;
    <R>(asyncAction: ThunkAction<R, S, E, A>): R;
    <Payload, Meta>(action: RSAAAction<any, Payload, Meta>): Promise<
      RSAAResultAction<Payload, Meta>
    >;
  }
}
