import { AgoraLiveStreamingProvider } from '../../context/InteractiveLiveStreamingContext'
import { RoleTypes } from '../../hooks/AgoraLiveStreamingHook/types'
import SpeakersRoom from '../../components/SpeakersRoom'

const InteractiveLiveStreamingHost = () => {
  return (
    <AgoraLiveStreamingProvider
      appId='b1a1950126384c31b267e2380084d313'
      channel='pmvs-channel'
      clientToken='006b1a1950126384c31b267e2380084d313IACfElZiZu7PgW/nRDjY0RoN7d+IXVYUnr1sNcjj8FVohtWwQKsAAAAAEACkGjsKpe+LYAEAAQCl74tg'
      role={RoleTypes.HOST}
      user={{
        name: 'Pablo Villamizar'
      }}
    >
      <SpeakersRoom />
    </AgoraLiveStreamingProvider>
  )
}

export default InteractiveLiveStreamingHost