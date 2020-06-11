/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {apiMiddleware, isRSAA} from 'redux-api-middleware';

import {isAccessTokenExpired, refreshToken, TOKEN_RECEIVED} from './auth';
import {refreshAccessToken} from './auth/actions';

export function createApiMiddleware() {
  let postponedRSAAs = [];

  return ({dispatch, getState}) => {
    const rsaaMiddleware = apiMiddleware({dispatch, getState});

    return (next) => (action) => {
      console.log('DISPATCH RSAA', action);

      const nextCheckPostoned = (nextAction) => {
        // Run postponed actions after token refresh
        if (nextAction.type === TOKEN_RECEIVED) {
          next(nextAction);
          postponedRSAAs.forEach((postponed) => {
            rsaaMiddleware(next)(postponed);
          });
          postponedRSAAs = [];
        } else {
          next(nextAction);
        }
      };

      if (isRSAA(action)) {
        const state = getState(),
          token = refreshToken(state);

        if (token && isAccessTokenExpired(state)) {
          postponedRSAAs.push(action);
          if (postponedRSAAs.length === 1) {
            return rsaaMiddleware(nextCheckPostoned)(refreshAccessToken(token));
          } else {
            return;
          }
        }

        return rsaaMiddleware(next)(action);
      }
      return next(action);
    };
  };
}

export default createApiMiddleware();
