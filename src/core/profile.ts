/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

export type ProfileStatus =  "SPLASH" | "AUTH_REQUIRED" | "CONNECTING_ACCOUNT" | "READY" | "ERROR";


export interface Profile{
    id: string;
    name: string;
    avatar: string;
  }
