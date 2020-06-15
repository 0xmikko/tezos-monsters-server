/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {STATUS} from '../utils/status';
import {DataLoaderListActions} from './types';
import * as actionTypes from './index';
import {DataObjectWithID} from './reducer';

export type DataLoaderListState<T> = {
  data: Array<T>;
  error?: boolean;
  status: STATUS;
};

export function createDataLoaderListReducer<T extends DataObjectWithID>(
  prefix: string = '',
) {
  const initialState: DataLoaderListState<T> = {
    data: [],
    error: undefined,
    status: STATUS.UPDATE_NEEDED,
  };

  return function (
    state: DataLoaderListState<T> = initialState,
    action: DataLoaderListActions<T>,
  ): DataLoaderListState<T> {
    switch (action.type) {
      case prefix + actionTypes.LIST_REQUEST:
        return {...state, status: STATUS.LOADING};

      case prefix + actionTypes.LIST_SUCCESS:
        return {
          ...state,
          data: action.payload ? action.payload : [],
          status: STATUS.SUCCESS,
        };

      case prefix + actionTypes.LIST_FAILURE:
        return {
          ...state,
          data: [],
          status: STATUS.FAILURE,
          error: action? action.error : false,
        };

      default:
        return state;
    }
  };
}
