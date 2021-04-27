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
    client,
    localStream,
    audio,
    video,
    remoteStreams,
    setAudio,
    setVideo
  } = useAgoraLiveStreaming({
    appId: props.appId,
    channel: props.channel,
    clientToken: props.clientToken,
    role: props.role
  })

  return (
    <AgoraLiveStreamingContext.Provider
      value={{
        client,
        localStream,
        audio,
        video,
        remoteStreams,
        setAudio,
        setVideo
      }}
    >
      { props.children }
    </AgoraLiveStreamingContext.Provider>
  )
}