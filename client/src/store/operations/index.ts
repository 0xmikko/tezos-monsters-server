/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {STATUS} from "../utils/status";

export interface Operation {
    id: string,
    status: STATUS,
    error?: string,
}

export const namespace = 'operations';
export const OPERATION_PREFIX = 'OPERATIONS@@';
