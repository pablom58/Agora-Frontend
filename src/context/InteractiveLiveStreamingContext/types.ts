import { ArgsType } from '../../Hooks/AgoraLiveStreamingHook/types'

export interface AgoraLiveStreamingProvider {
  (props: ArgsType) : JSX.Element
}