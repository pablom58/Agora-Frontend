import { createContext, Context } from 'react'
import useAgoraLiveStreaming from '../../hooks/AgoraLiveStreamingHook/useAgoraLiveStreaming'

import {
  LiveStreamingContext,
  ArgsType
} from '../../hooks/AgoraLiveStreamingHook/types'

import { AgoraLiveStreamingProvider as AgoraLiveStreamingProviderInterface } from './types'

export const AgoraLiveStreamingContext: Context<Partial<LiveStreamingContext>> = createContext<Partial<LiveStreamingContext>>({})

export const AgoraLiveStreamingProvider: AgoraLiveStreamingProviderInterface = (props: ArgsType) => {
  const {
    localStream,
    screenStream,
    audio,
    video,
    remoteStreams,
    setAudio,
    setVideo,
    toggleAudio,
    toggleVideo,
    shareScreen,
    stopShareScreen
  } = useAgoraLiveStreaming({
    appId: props.appId,
    channel: props.channel,
    clientToken: props.clientToken,
    role: props.role,
    user: props.user
  })

  return (
    <AgoraLiveStreamingContext.Provider
      value={{
        localStream,
        screenStream,
        audio,
        video,
        remoteStreams,
        setAudio,
        setVideo,
        toggleAudio,
        toggleVideo,
        shareScreen,
        stopShareScreen
      }}
    >
      { props.children }
    </AgoraLiveStreamingContext.Provider>
  )
}