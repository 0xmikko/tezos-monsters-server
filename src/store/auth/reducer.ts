/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import jwtDecode from 'jwt-decode';
import * as auth from './';
import {STATUS} from '../utils/status';

interface TokenDTO {
  token: string;
  user_id: string;
  exp: number;
}

interface AuthStateType {
  access?: TokenDTO;
  refresh?: TokenDTO;
  errors: {};
  signup_success: boolean;
  status: STATUS;
  webcode?: string;
}

export interface AuthPayload {
  access: string;
  refresh?: string;
  errors: string;
  response?: string;
  statusText?: string;
}

export interface GetCodePayload {
 code: string
}

export interface AuthActionsType {
  type: string;
  payload: AuthPayload;
}

export interface GetCodeActionsType {
  type: string;
  payload: AuthPayload;
}

const initialState: AuthStateType = {
  access: undefined,
  refresh: undefined,
  errors: {},
  signup_success: false,
  status: STATUS.ACTIVE,
  webcode: '',
};

export default (
  state: AuthStateType = initialState,
  action: AuthActionsType,
): AuthStateType => {
  console.log(action);

  switch (action.type) {
    case auth.LOGIN_SUCCESS:
    case auth.TOKEN_RECEIVED:
      return {
        ...state,
        access: {
          ...jwtDecode<TokenDTO>(action.payload.access),
          token: action.payload.access,
        },
        refresh: {
          ...jwtDecode<TokenDTO>(action.payload.refresh || ''),
          token: action.payload.refresh || '',
        },
        // profile: undefined,
        // isVerified: undefined,
        errors: {},
        status: STATUS.SUCCESS,
      };

    case auth.TOKEN_FAILURE:
    case auth.LOGIN_FAILURE:
      return {
        ...state,
        access: undefined,
        refresh: undefined,
        errors: action.payload.response || {
          non_field_errors: action.payload.statusText,
        },
      };

    case auth.SIGNUP_FAILURE:
      return {
        ...state,
        access: undefined,
        refresh: undefined,
        errors: action.payload.response || {
          non_field_errors: action.payload.statusText,
        },
        status: STATUS.FAILURE,
      };

    case auth.LOGOUT:
      return {
        ...state,
        access: undefined,
        refresh: undefined,
        status: STATUS.UPDATE_NEEDED,
      };

    case auth.SIGNUP_SUCCESS:
      return {
        ...state,
        signup_success: true,
        status: STATUS.SUCCESS,
      };

    case auth.GETCODE_SUCCESS:
      return {
        ...state,
        webcode: action.payload.access,
      };
    default:
      return state;
  }
};
