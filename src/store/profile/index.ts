/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */
import {Profile} from '../../core/profile';
export const namespace = 'profile';
export const endpoint = '/api/profile/';
export type ProfileActions = {
  type: 'PROFILE_REQUEST' | 'PROFILE_SUCCESS' | 'PROFILE_FAILURE' | 'PROFILE_LOGOUT';
  payload?: Profile;
  error?: boolean;
};
