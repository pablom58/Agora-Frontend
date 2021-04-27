import { useContext, useEffect } from 'react'
import { AgoraLiveStreamingContext } from '../../context/InteractiveLiveStreamingContext'

import StreamBox from '../StreamBox'

import { RemoteStreamInterface } from '../../hooks/AgoraLiveStreamingHook/types'

const AudienceRoom = () => {

  const {
    client,
    localStream,
    audio,
    video,
    remoteStreams,
    setAudio,
    setVideo
  } = useContext(AgoraLiveStreamingContext)

  //create boxes to run remote streams
  const handleRemoteStream = (remoteStream : RemoteStreamInterface) => {

    let remoteId : string | number = remoteStream.id

    if(localStream && remoteId !== localStream.id)
        return <StreamBox 
                    key={remoteId}
                    id={remoteId}
                    audio={true}
                    video={true}
                    stream={remoteStream.stream}
                />
    
    return <></>
  }

  return (
    <>
      {
        remoteStreams?.map((remoteStream : RemoteStreamInterface) => handleRemoteStream(remoteStream))
      }
    </>
  )
}

export default AudienceRoom