/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Action} from 'redux';
import {namespace, OPERATION_PREFIX} from './index';
import {DETAIL_SUCCESS, LIST_SUCCESS} from '../dataloader';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {STATUS} from '../utils/status';

export const updateStatus = (
  opHash: string,
  status: STATUS,
  error?: string,
) => ({
  type: OPERATION_PREFIX + DETAIL_SUCCESS,
  payload: {
    id: opHash,
    status,
    error,
  },
});

export const updateOperationStatusByAction = (
  action: any,
  opHash: string,
): Action<string> => {
  if (action === undefined || action.error) {
    console.log(action);

    return updateStatus(
      opHash || '0',
      STATUS.FAILURE,
      // @ts-ignore
      action === undefined ? 'Network error' : action.payload.response ? action.payload.respons.error : action.payload.message,
    );
  }
  return updateStatus(opHash || '0', STATUS.SUCCESS);
};

export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'operations:update',
    typeOnSuccess: OPERATION_PREFIX + DETAIL_SUCCESS,
  });
};
