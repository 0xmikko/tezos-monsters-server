/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {RootState} from '../index';
import {updateStatus} from '../operations/actions';
import {createAction} from 'redux-api-middleware';
import {STATUS} from '../utils/status';
import {namespace} from './index';
import {getFullAPIAddress} from '../utils/api';
import {withAuth} from '../auth';
import {Profile} from '../../core/profile';
import {SocketEmitAction} from '../socketMiddleware';

export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'profile:updateDetails',
    typeOnSuccess: 'PROFILE_SUCCESS',
  });
};

export const getProfile: (opHash: string) => SocketEmitAction = (opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'profile:retrieve',
  typeOnFailure: 'PROFILE_FAILURE',
  payload: undefined,
  opHash,
});

export const updateProfile: (
  profile: Profile,
  opHash?: string,
) => SocketEmitAction = (profile, opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'profile:update',
  typeOnFailure: 'PROFILE_FAILURE',
  payload: profile,
  opHash,
});

export const addContract: (id: string, opHash?: string) => SocketEmitAction = (
  id,
  opHash,
) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'profile:new_contact',
  typeOnFailure: 'PROFILE_FAILURE',
  payload: { id },
  opHash,
});
