/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {DataItem} from "./reducer";
import {DataLoaderDetailsState} from "./details";

export const LIST_REQUEST = 'LIST_REQUEST';
export const LIST_UPDATE = 'LIST_UPDATE';
export const LIST_SUCCESS = 'LIST_SUCCESS';
export const LIST_FAILURE = 'LIST_FAILURE';

export const DETAIL_REQUEST = 'DETAIL_REQUEST';
export const DETAIL_UPDATE = 'DETAIL_UPDATE';
export const DETAIL_SUCCESS = 'DETAIL_SUCCESS';
export const DETAIL_FAILURE = 'DETAIL_FAILURE';

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export function getDetailsItem<T>(data: DataLoaderDetailsState<T>, id: string) : DataItem<T> | undefined {
    if (!data || !data.data[id]) return undefined;
    return data.data[id]

}


