/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import SocketIO, {Socket} from 'socket.io';
import socketioJwt from 'socketio-jwt';
import config from '../config';
import {tokenData} from '../core/user';
import {SocketUpdate, STATUS} from '../core/operations';

export type socketListeners = Record<string, (...args: any[]) => Promise<void>>;

export interface SocketController {
  namespace: string;
  getListeners: (socket: SocketWithToken, userId: string) => socketListeners;
  update: () => SocketUpdate[];
}

export interface SocketWithToken extends SocketIO.Socket {
  tData: tokenData;
  ok: (opHash: string) => void;
  failure: (opHash: string, error: string) => void;
}

export class SocketRouter {
  private readonly socketsMobilePool: Record<string, Socket> = {};
  private readonly socketsWebPool: Record<string, Socket> = {};
  private readonly _controllers: SocketController[];

  constructor(controllers: SocketController[]) {
    this._controllers = [...controllers];
    setTimeout(() => this.update(), 5000);
  }

  connect(io: SocketIO.Server) {
    const mobileNsp = io.of('/mobile');
    mobileNsp
      .on(
        'connection',
        socketioJwt.authorize({
          secret: config.jwt_secret,
          timeout: 15000, // 15 seconds to send the authentication message
          decodedPropertyName: 'tData',
        }),
      )
      .on('authenticated', (socket: SocketWithToken) =>
        this._onNewAuthSocket.bind(this)(socket, 'mobile'),
      );
    const webNsp = io.of('/web');
    webNsp
      .on(
        'connection',
        socketioJwt.authorize({
          secret: config.jwt_secret,
          timeout: 15000, // 15 seconds to send the authentication message
          decodedPropertyName: 'tData',
        }),
      )
      .on('authenticated', (socket: SocketWithToken) =>
        this._onNewAuthSocket.bind(this)(socket, 'web'),
      );
  }

  // Connect new socket to pool
  private _onNewAuthSocket(socket: SocketWithToken, type: string) {
    const userId = socket.tData.user_id;
    const socketsPool =
      type === 'mobile' ? this.socketsMobilePool : this.socketsWebPool;

    // Add new socket in socketsPool connection array
    socketsPool[userId] = socket;
    console.log(`[SOCKET.IO / ${type}] : user ${userId} connected`);

    // Middleware to show all incoming requests
    socket.use((packet, next) => {
      console.log(`[SOCKET.IO / ${type}] : INCOMING REQUEST ${packet[0]}`);
      next();
    });

    // Add delete listener
    socket.on('disconnect', () => {
      //this socket is authenticated, we are good to handle more events from it.
      console.log(`bye ${userId}`);
      delete socketsPool[userId];
    });

    socket.ok = (opHash: string) => {
      socket.emit('operations:update', {
        id: opHash,
        status: STATUS.SUCCESS,
      });
    };

    socket.failure = (opHash, error) => {
      socket.emit('operations:update', {
        id: opHash,
        status: STATUS.FAILURE,
        error,
      });
    };

    // Add listeners from all controllers
    for (const controller of this._controllers) {
      const listeners = controller.getListeners(socket, userId);

      const {namespace} = controller;
      Object.entries(listeners).map((l) => {
        const event = l[0];
        const handler = l[1];
        socket.on(
          namespace + ':' + event,
          this.loggerMiddleware(namespace, event, handler),
        );
      });
      console.log(`[SOCKET.IO] : ${namespace} | listeners connected`);
    }
  }

  private loggerMiddleware(
    namespace: string,
    event: string,
    fn: (...args: any[]) => Promise<void>,
  ): any {
    return async function (...args: any[]) {
      const start = Date.now();
      await fn(...args);
      const finish = Date.now();
      console.log(
        `[SOCKET.IO] : ${namespace} | ${event} | ${finish - start} ms`,
      );
    };
  }

  private update(): void {

    for (const controller of this._controllers) {
      const updates = controller.update();
      updates
        .filter((elm) => this.socketsMobilePool[elm.userId] !== undefined)
        .forEach((elm) => {
          console.log("[UPDATE:MOBILE]", elm.event);
          const socket = this.socketsMobilePool[elm.userId];
          socket.emit(elm.event, elm.payload);
        });
      updates
          .filter((elm) => this.socketsWebPool[elm.userId] !== undefined)
          .forEach((elm) => {
            console.log("[UPDATE:WEB]", elm.event);
            const socket = this.socketsWebPool[elm.userId];
            socket.emit(elm.event, elm.payload);
          });
    }

    setTimeout(() => this.update(), 500);
  }
}
