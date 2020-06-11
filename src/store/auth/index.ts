/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {RootState} from '../index';

// AUTH handlers

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';

export const SIGNUP_REQUEST = '@@auth/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = '@@auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = '@@auth/SIGNUP_FAILURE';

export const GETCODE_REQUEST = '@@auth/GETCODE_REQUEST';
export const GETCODE_SUCCESS = '@@auth/GETCODE_SUCCESS';
export const GETCODE_FAILURE = '@@auth/GETCODE_FAILURE';

export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';

export const CLEAR_AUTH_DATA = '@@auth/CLEAR_AUTH_DATA';
export const LOGOUT = '@@auth/LOGOUT';

export function accessToken(state: RootState) {
  if (state.auth.access) {
    return state.auth.access.token;
  }
}

export function isAccessTokenExpired(state: RootState) {
  if (state.auth.access && state.auth.access.exp) {
    return 1000 * state.auth.access.exp - new Date().getTime() < 5000;
  }
  return true;
}

export function refreshToken(state: RootState) {
  if (state.auth.refresh) {
    return state.auth.refresh.token;
  }
}

export function isRefreshTokenExpired(state: RootState): boolean {
  if (state.auth.refresh && state.auth.refresh.exp) {
    return 1000 * state.auth.refresh.exp - new Date().getTime() < 5000;
  }
  return true;
}

export function isAuthenticated(state: RootState): boolean {
  return !isRefreshTokenExpired(state);
}

export function errors(state: RootState) {
  return state.auth.errors;
}

export function withAuth(headers = {}) {
  return (state: RootState) => ({
    ...headers,
    Authorization: `Bearer ${accessToken(state)}`,
  });
}
