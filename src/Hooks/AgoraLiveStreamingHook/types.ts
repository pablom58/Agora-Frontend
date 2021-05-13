import { Dispatch , SetStateAction } from 'react'
import AgoraRTC from 'agora-rtc-sdk'

export enum RoleTypes{
  HOST = 'host',
  AUDIENCE = 'audience'
}

export type UserData = {
  name: string
  id?: number
}

export type ArgsType = {
  appId: string
  role: RoleTypes
  clientToken: string
  screenToken: string
  channel: string
  user: UserData
  screen: UserData
  children?: JSX.Element
}

export type LiveStreamingContext = {
  localStream: LocalStream
  screenStream: LocalStream
  audio: MediaDevicesState
  video: MediaDevicesState
  remoteStreams: RemoteStreamInterface[]
  channel: string
  role: RoleTypes
  setVideo: Dispatch<SetStateAction<MediaDevicesState>>
  setAudio: Dispatch<SetStateAction<MediaDevicesState>>
  toggleAudio: ToggleMediaDeviceInterface
  toggleVideo: ToggleMediaDeviceInterface
  shareScreen: ShareScreenInterface
  stopShareScreen: StopShareScreenInterface
  leaveChannel: LeaveChannelInterface
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
  find: (id: number | string) => boolean
}

export interface RemoteStreamInterface {
  id: number | string,
  stream: AgoraRTC.Stream
}

export interface ToggleMediaDeviceInterface {
  () : void
}

export interface ShareScreenInterface {
  () : void
}

export interface StopShareScreenInterface {
  () : void
}

export interface LeaveChannelInterface {
  () : void
}