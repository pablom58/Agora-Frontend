import { ArgsType } from '../../hooks/AgoraLiveStreamingHook/types'

export interface AgoraLiveStreamingProvider {
  (props: ArgsType) : JSX.Element
}