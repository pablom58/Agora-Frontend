import { AgoraLiveStreamingProvider } from '../../context/InteractiveLiveStreamingContext'
import { RoleTypes } from '../../hooks/AgoraLiveStreamingHook/types'
import AudienceRoom from '../../components/AudienceRoom'

const InteractiveLiveStreamingAudience = () => {
  return (
    <AgoraLiveStreamingProvider
      appId='b1a1950126384c31b267e2380084d313'
      channel='pmvs-channel'
      clientToken='006b1a1950126384c31b267e2380084d313IADIg6mrY5CD1xuZBL4isSgVTJQ27V4mMCTLmNLEdzjx+9WwQKsAAAAAEACkGjsKI6GJYAEAAQAjoYlg'
      role={RoleTypes.AUDIENCE}
    >
      <AudienceRoom />
    </AgoraLiveStreamingProvider>
  )
}

export default InteractiveLiveStreamingAudience