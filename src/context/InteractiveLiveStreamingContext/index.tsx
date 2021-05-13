import { createContext, Context } from 'react'
import useAgoraLiveStreaming from '../../Hooks/AgoraLiveStreamingHook'

import {
  LiveStreamingContext,
  ArgsType
} from '../../Hooks/AgoraLiveStreamingHook/types'

import { AgoraLiveStreamingProvider as AgoraLiveStreamingProviderInterface } from './types'

export const AgoraLiveStreamingContext: Context<Partial<LiveStreamingContext>> = createContext<Partial<LiveStreamingContext>>({})

export const AgoraLiveStreamingProvider: AgoraLiveStreamingProviderInterface = (props: ArgsType) => {
  const {
    localStream,
    screenStream,
    audio,
    video,
    remoteStreams,
    channel,
    role,
    setAudio,
    setVideo,
    toggleAudio,
    toggleVideo,
    shareScreen,
    stopShareScreen,
    leaveChannel
  } = useAgoraLiveStreaming({
    appId: props.appId,
    channel: props.channel,
    clientToken: props.clientToken,
    role: props.role,
    user: props.user,
    screenToken: props.screenToken,
    screen: props.screen
  })

  return (
    <AgoraLiveStreamingContext.Provider
      value={{
        localStream,
        screenStream,
        audio,
        video,
        remoteStreams,
        channel,
        role,
        setAudio,
        setVideo,
        toggleAudio,
        toggleVideo,
        shareScreen,
        stopShareScreen,
        leaveChannel
      }}
    >
      { props.children }
    </AgoraLiveStreamingContext.Provider>
  )
}