/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {BACKEND_ADDR} from '../../config';

export const getFullAPIAddress = (
  url: string,
  params?: {[P in keyof string]: string[P]},
  host: string = BACKEND_ADDR,
) => {
  // Decode URI if it was in %% format, it's important
  // when we receive next_url in pagination
  url = decodeURI(url);
  url = url.startsWith('http://') ? url : host + url;
  let pos = 0;
  if (params !== undefined) {
    for (let key in params) {
      let value = params[key];
      if (value) {
        url += (pos === 0 ? '?' : '&') + key + '=' + value;
        pos++;
      }
    }
  }
  return url;
};

export const getApiById = (api: string, id?: string, params?: {[P in keyof string]: string[P]}) => {
  if (api.includes(':id') && id !== undefined) {
    api = api.replace(':id', id);
  }

  api += !api.endsWith('/') ? '/' : '';
  return getFullAPIAddress(api, params);
};
