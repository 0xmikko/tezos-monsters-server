/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {createAction, RSAAAction, RSAAResultAction} from 'redux-api-middleware';
import {getApiById} from '../utils/api';
import * as actionTypes from './index';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {updateStatus} from '../operations/actions';
import {STATUS} from '../utils/status';
import {withAuth} from '../auth';

export const createDataLoaderListActions = (
  api: string,
  actionPrefix: string,
) => {
  return (
    hash?: string,
  ): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch,
  ) => {
    dispatch(updateStatus(hash || '0', STATUS.LOADING));
    const action = await dispatch(
      createAction({
        endpoint: getApiById(api, ''),
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
          actionPrefix + actionTypes.LIST_REQUEST,
          actionPrefix + actionTypes.LIST_SUCCESS,
          actionPrefix + actionTypes.LIST_FAILURE,
        ],
      }),
    );

    if (action === undefined || action.error) {
      dispatch(
        updateStatus(hash || '0', STATUS.FAILURE, action.payload.message),
      );
    } else {
      dispatch(updateStatus(hash || '0', STATUS.SUCCESS));
    }
    return action;
  };
};

export const createDataLoaderDetailActions = (
  api: string,
  actionPrefix: string,
) => (
  id: string,
  hash?: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  dispatch(updateStatus(hash || '0', STATUS.LOADING));

  const action = await dispatch(
    createAction({
      endpoint: getApiById(api, id),
      method: 'GET',
      headers: withAuth({'Content-Type': 'application/json'}),
      types: [
        {
          type: actionPrefix + actionTypes.DETAIL_REQUEST,
          meta: {id},
        },
        {
          type: actionPrefix + actionTypes.DETAIL_SUCCESS,
          meta: {id},
        },
        {
          type: actionPrefix + actionTypes.DETAIL_FAILURE,
          meta: {id},
        },
      ],
    }),
  );

  if (action === undefined || action.error) {
    dispatch(updateStatus(hash || '0', STATUS.FAILURE, action.payload.message));
  } else {
    dispatch(updateStatus(hash || '0', STATUS.SUCCESS));
  }
  return action;
};

export const createDataLoaderCreateUpdateDataAction = <T>(
  apiCreate: string,
  apiUpdate: string,
  actionPrefix: string,
) => (
  id: string,
  data: T,
  hash: string = '0',
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  dispatch(updateStatus(hash || '0', STATUS.UPDATING));

  const api = id.startsWith('new')
    ? getApiById(apiCreate)
    : getApiById(apiUpdate, id);

  if (id === undefined) {
    throw `Error in updateDataLoaderDetail, wrong parameters!\napi:${api}\nid:${id}`;
  }

  const method = id.startsWith('new') ? 'POST' : 'PUT';

  console.log('DATA SENT:', data);

  const action = await dispatch(
    createAction({
      endpoint: api,
      method: method,
      headers: withAuth({'Content-Type': 'application/json'}),
      body: JSON.stringify(data),
      types: [
        {
          type: actionPrefix + actionTypes.UPLOAD_REQUEST,
          meta: {id, hash},
        },
        {
          type: actionPrefix + actionTypes.UPLOAD_SUCCESS,
          meta: {id, hash},
        },
        {
          type: actionPrefix + actionTypes.UPLOAD_FAILURE,
          meta: {id, hash},
        },
      ],
    }),
  );

  console.log('HASHHH', hash);

  if (action.error) {
    dispatch(updateStatus(hash || '0', STATUS.FAILURE, action.payload.message));
  } else {
    dispatch(updateStatus(hash || '0', STATUS.SUCCESS));
  }

  return action;
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
