import { useContext } from 'react'
import { AgoraLiveStreamingContext } from '../../context/InteractiveLiveStreamingContext'

import StreamBox from '../StreamBox'

import { RemoteStreamInterface } from '../../hooks/AgoraLiveStreamingHook/types'

import {
  ContainerLayout1,
  StreamBoxContainerLayout1,
  ActionButtonsContainerLayout1,
} from './styles'

const AudienceRoom = () => {

  const {
    localStream,
    remoteStreams,
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
    <ContainerLayout1>
      <StreamBoxContainerLayout1>
        {
          remoteStreams?.map((remoteStream : RemoteStreamInterface) => handleRemoteStream(remoteStream))
        }
      </StreamBoxContainerLayout1>
      <ActionButtonsContainerLayout1>
        <button onClick={() => alert('Reaction 1')} >Reaction 1</button>
        <button onClick={() => alert('Reaction 2')} >Reaction 2</button>
        <button onClick={() => alert('Reaction 3')} >Reaction 3</button>
        <button onClick={() => alert('Reaction 4')} >Reaction 4</button>
      </ActionButtonsContainerLayout1>
    </ContainerLayout1>
  )
}

export default AudienceRoom