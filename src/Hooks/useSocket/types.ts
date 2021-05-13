import { RoleTypes, LeaveChannelInterface } from '../AgoraLiveStreamingHook/types'

export enum Events{
  EMMIT_ALERT = 'emit-alert',
  EMMIT_BREAKOUT_ROOMS = 'emit-breakout-rooms',
  ALERT = 'alert',
  BREAKOUT_ROOMS = 'breakout-rooms',
}

export type SocketData = {
  socket: SocketIOClient.Socket
  online: boolean
  emitEvent: emitEventInterface
}

export type ArgsType = {
  channel: string
  role: RoleTypes | ''
  children?: JSX.Element
  leaveChannel: LeaveChannelInterface | undefined
}

export interface UseSocket {
  (Args: ArgsType): SocketData
}

export interface emitEventInterface {
  (event: Events): void
}
