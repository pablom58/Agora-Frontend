import { Dispatch , SetStateAction } from 'react'
import AgoraRTC from 'agora-rtc-sdk'

export enum RoleTypes{
  HOST = 'host',
  AUDIENCE = 'audience'
}

export type ArgsType = {
  appId: string
  role: RoleTypes
  clientToken: string
  channel: string
  children?: JSX.Element
}

export type LiveStreamingContext = {
  client: AgoraRTC.Client
  localStream: LocalStream
  audio: MediaDevicesState
  video: MediaDevicesState
  remoteStreams: RemoteStreamInterface[]
  setVideo: Dispatch<SetStateAction<MediaDevicesState>>
  setAudio: Dispatch<SetStateAction<MediaDevicesState>>
}

export interface UseAgoraLiveStreaming {
  (Args: ArgsType) : LiveStreamingContext
}

export interface AgoraError { 
  type: string 
  msg: string
  info?: string | undefined
}

export interface HandleErrorInterface {
  (error : AgoraError | string) : void
}

export interface LocalStream {
  id: number,
  stream?: AgoraRTC.Stream
}

export type MediaDevicesState = {
  toggle: boolean
  active: boolean
}

export interface RemoteStreamsClousureInterface {
  addRemoteStream: (remoteStream: RemoteStreamInterface) => void
  removeRemoteStream: (id: string | number) => void
  value: () => RemoteStreamInterface[]
  empty: () => void
}

export interface RemoteStreamInterface {
  id: number | string,
  stream: AgoraRTC.Stream
}