import { useContext, useEffect } from 'react'
import { AgoraLiveStreamingContext } from '../../context/InteractiveLiveStreamingContext'

import StreamBox from '../../components/StreamBox'

import {
  ContainerLayout1,
  StreamBoxContainerLayout1,
  ActionButtonsContainerLayout1,
  TotalSpeakers
} from './styles'

const SpeakersRoom = () => {

  const {
    localStream,
    screenStream,
    video,
    audio,
    remoteStreams,
    toggleAudio,
    toggleVideo,
    shareScreen,
    stopShareScreen
  } = useContext(AgoraLiveStreamingContext)

  //start local stream
  useEffect(() => {
    if(localStream){
      if(localStream.stream && video?.active){
        localStream.stream.play(`${localStream.id}_container`)
      }
    }
  },[localStream, video])

  //start local stream
  useEffect(() => {
    if(screenStream){
      if(screenStream.stream){
        screenStream.stream.play(`${screenStream.id}_container`)
      }
    }
  },[screenStream])

  return (
    <ContainerLayout1>
      <StreamBoxContainerLayout1>
        <TotalSpeakers>{ localStream && localStream.stream && remoteStreams ? remoteStreams.length + 1 : remoteStreams?.length }</TotalSpeakers>
        {
          localStream
            ? localStream.stream 
              ? <StreamBox 
                  key={localStream.id}
                  id={localStream.id}
                  audio={video?.active}
                  video={audio?.active}
                  stream={localStream.stream}
                /> 
              : <></>
            : <></>
        }
        {
          screenStream
            ? screenStream.stream 
              ? <StreamBox 
                  key={screenStream.id}
                  id={screenStream.id}
                  audio={true}
                  video={true}
                  stream={screenStream.stream}
                /> 
              : <></>
            : <></>
        }
      </StreamBoxContainerLayout1>
      <ActionButtonsContainerLayout1>
        <button onClick={toggleAudio} >Audio</button>
        <button onClick={toggleVideo} >video</button>
        <button onClick={shareScreen} >share screen</button>
        <button onClick={stopShareScreen} >stop sharing</button>
      </ActionButtonsContainerLayout1>
    </ContainerLayout1>
  )
}

export default SpeakersRoom