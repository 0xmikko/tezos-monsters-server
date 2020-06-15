/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Operation, OPERATION_PREFIX} from './';

import {createDataLoaderDetailsReducer} from '../dataloader/details';

export default createDataLoaderDetailsReducer<Operation>(OPERATION_PREFIX);
