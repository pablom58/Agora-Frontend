import { useContext, useEffect } from 'react'
import { AgoraLiveStreamingContext } from '../../context/InteractiveLiveStreamingContext'

const SpeakersRoom = () => {

  const {
    client,
    localStream,
    audio,
    video,
    setAudio,
    setVideo
  } = useContext(AgoraLiveStreamingContext)

  //start local stream
  useEffect(() => {
    if(localStream){
      if(localStream.stream && video?.active){
        localStream.stream.play(`${localStream.id}_container`)
      }
    }
  },[localStream, video])

  return (
    <>
      {
        localStream
          ? localStream.stream ? <div id={`${localStream.id}_container`} style={{ width: '400px', height: '300px' }}></div> : <></>
          : <></>
      }
    </>
  )
}

export default SpeakersRoom