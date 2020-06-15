/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {DataLoaderDetailsActions} from './types';
import * as actionTypes from './index';
import {STATUS} from '../utils/status';
import {DataItem, DataObjectWithID} from './reducer';

export type DataLoaderDetailsState<T> = {
  data: Record<string, DataItem<T>>;
  hashes: Record<string, DataItem<T>>;
};

export function createDataLoaderDetailsReducer<T extends DataObjectWithID>(
  prefix: string = '',
) {
  const initialState: DataLoaderDetailsState<T> = {
    data: {},
    hashes: {},
  };

  return function (
    state: DataLoaderDetailsState<T> = initialState,
    action: DataLoaderDetailsActions<T>,
  ): DataLoaderDetailsState<T> {
    const updateDetailState = (
      state: DataLoaderDetailsState<T>,
      id: string,
      hash: string,
      newData: DataItem<T>,
    ): DataLoaderDetailsState<T> => ({
      ...state,
      data: {
        ...state.data,
        [id]: newData,
      },
      hashes: {
        ...state.hashes,
        [hash]: newData,
      },
    });

    let id = '-';
    if (action.payload !== undefined && action.payload.id !== undefined) {
      id = action.payload.id;
    }
    if (action.meta !== undefined && action.meta.id !== undefined) {
      id = action.meta.id;
    }

    const hash = "";

    switch (action.type) {
      case prefix + actionTypes.DETAIL_REQUEST:
        return updateDetailState(state, id, hash, {status: STATUS.LOADING});

      case prefix + actionTypes.UPLOAD_REQUEST:
        return updateDetailState(state, id, hash, {
          ...state.data[id],
          status: STATUS.UPDATING,
        });

      case prefix + actionTypes.DETAIL_SUCCESS:
      case prefix + actionTypes.UPLOAD_SUCCESS:
        return updateDetailState(state, id, hash, {
          data: action.payload,
          status: STATUS.SUCCESS,
        });

      case prefix + actionTypes.DETAIL_FAILURE:
      case prefix + actionTypes.UPLOAD_FAILURE:
        return updateDetailState(state, id, hash, {
          data: undefined,
          status: STATUS.FAILURE,
        });

      default:
        return state;
    }
  };
}
