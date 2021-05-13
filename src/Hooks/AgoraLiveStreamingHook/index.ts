import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react'

import AgoraRTC from 'agora-rtc-sdk'

import {
  ArgsType,
  RoleTypes,
  AgoraError,
  HandleErrorInterface,
  LocalStream,
  MediaDevicesState,
  RemoteStreamsClousureInterface,
  RemoteStreamInterface,
  ToggleMediaDeviceInterface,
  ShareScreenInterface,
  StopShareScreenInterface,
  LeaveChannelInterface
} from './types'

const CLIENT_CONFIG : AgoraRTC.ClientConfig = {
  mode: 'live',
  codec: 'vp8'
}

/**
* This is a clousure that save the remote streams in the meeting
*/
const remoteStreamsClousure : RemoteStreamsClousureInterface = (function(){
  let remoteStreams : RemoteStreamInterface[] = []

  function add(remoteStream : RemoteStreamInterface) : void {
      remoteStreams.push(remoteStream)
  }

  function remove(id : string | number) : void {
      remoteStreams = [...remoteStreams.filter((remoteStream : RemoteStreamInterface) => remoteStream.id !== id)]
  }

  function empty() : void {
      remoteStreams = []
  }

  function find(id : number | string) : boolean {
    const result: RemoteStreamInterface | undefined = remoteStreams.find((remoteStream: RemoteStreamInterface) => remoteStream.id)
    return result ? true : false
  }

  return {
    addRemoteStream: function(remoteStream : RemoteStreamInterface) : void {
        add(remoteStream)
    },
    removeRemoteStream: function(id : string | number) : void {
        remove(id)
    },
    value: function() : RemoteStreamInterface[] {
        return remoteStreams
    },
    empty : function() : void {
        empty()
    },
    find : function(id: number | string) : boolean {
      return find(id)
    }
  }
})()

const useAgoraLiveStreaming = (Args: ArgsType) => {
  //this is the client object that handles the video streaming
  const client : AgoraRTC.Client = useMemo(() => AgoraRTC.createClient(CLIENT_CONFIG),[])

  //user id built from the user information, this will be use as id of the client stream
  const userId : number = useMemo(() => Args.user.id || 0,[Args.user.id])

  //this is the screen client that handles the share screen streaming
  const screen : AgoraRTC.Client = useMemo(() => AgoraRTC.createClient(CLIENT_CONFIG),[])

  //user screen id built from the user information, this will be use as id of the client stream
  const screenId : number = useMemo(() => Args.screen.id || 0, [Args.screen.id])

  //local stream of the user
  const [ localStream , setLocalStream ] = useState<LocalStream>({
    id: 0
  })

  //local share screen stream of the user
  const [ screenStream , setScreenStream ] = useState<LocalStream>({
    id: 0
  })

  //audio information, is use to know if the user disable or enable audio
  const [ audio , setAudio ] = useState<MediaDevicesState>({
    toggle: true,
    active: true
  })

  //audio information, is use to know if the user disable or enable audio
  const [ video , setVideo ] = useState<MediaDevicesState>({
    toggle: true,
    active: true
  })

  //remoteStreams states, this is use to handle the status by the hook
  const [ remoteStreams , setRemoteStreams ] = useState<RemoteStreamInterface[]>([])

  //callback to handle errors
  const handleError : HandleErrorInterface = useCallback((error : AgoraError | string) => {
    console.error(`Somthing wrong: ${error}`)
  },[])

  //eneable or disable microphone
  const toggleAudio : ToggleMediaDeviceInterface = useCallback(() => {
    if(audio.toggle){
      if(!audio.active){
        localStream.stream?.enableAudio()
      }else{
        localStream.stream?.disableAudio()
      }
    }

    setAudio({
      ...audio,
      active: !audio.active
    })
  },[audio, localStream])

  //eneable or disable camera
  const toggleVideo : ToggleMediaDeviceInterface = useCallback(() => {
    if(video.toggle){
      if(!video.active){
        localStream.stream?.enableVideo()
      }else{
        localStream.stream?.disableVideo()
      }
    }

    setVideo({
      ...video,
      active: !video.active
    })
  },[video, localStream.stream])

  //share screen
  const shareScreen : ShareScreenInterface = useCallback(() => {
    screen.init(Args.appId, () => {
      screen.join(Args.screenToken,Args.channel,screenId,undefined,(uid : number) => {
        const stream : AgoraRTC.Stream = AgoraRTC.createStream({
          streamID: uid,
          audio: false,
          video: false,
          screen: true,
        })
        
        stream.init(() => {
          screen.publish(stream)  
          setScreenStream({
              id: uid,
              stream
          })                  
        },handleError)                
      })
    })
  },[
    screen,
    setScreenStream,
    Args.appId,
    Args.screenToken,
    Args.channel,
    handleError,
    screenId
  ])

  //stop share screen
  const stopShareScreen : StopShareScreenInterface = useCallback(() => {
    screen.leave(() => {
      if(screenStream.stream){
        screenStream.stream.stop()
        screen.unpublish(screenStream.stream)
        screenStream.stream.close()

        let container = document.getElementById(`${screenStream!.id}_container`)

        setScreenStream({
          id: 0
        })

        if(container)
            container.remove()
      }
    })
  },[screen, screenStream])

  const leaveChannel : LeaveChannelInterface = useCallback(() => {
    client.leave(() => {

        //if the user is sharing screen, stop sharing
        if(screenStream.stream){
          screen.leave(() => {
            if(screenStream.stream){
              screenStream.stream.stop()
              screen.unpublish(screenStream!.stream!)
              screenStream.stream.close()

              let container = document.getElementById(`${screenStream!.id}_container`)

              if(container)
                  container.remove()
            }
          })
        }

        if (localStream.stream) {
          localStream.stream.stop()
          client.unpublish(localStream.stream)
          localStream.stream.close()

          let container = document.getElementById(`${localStream!.id}_container`)
          
          if(container)
              container.remove()

          remoteStreamsClousure.empty()
        }
    })
}, [
  client,
  screen,
  localStream,
  screenStream,
])

  //setting client role
  useEffect(() => {
    if(client) client.setClientRole(Args.role)
  },[client, Args.role])

  //Get the information about the media devices of the user
  //To know if the machine has audio or video devices
  //Then initialize client and join the channel
  useEffect(() => {
    AgoraRTC.getDevices((devices: AgoraRTC.MediaDeviceInfo[]) => {
      let hasAudio : AgoraRTC.MediaDeviceInfo[] = devices.filter((device : AgoraRTC.MediaDeviceInfo) => device.kind === 'audioinput')
      let hasVideo : AgoraRTC.MediaDeviceInfo[] = devices.filter((device : AgoraRTC.MediaDeviceInfo) => device.kind === 'videoinput')

      setAudio({
        toggle: hasAudio.length > 0,
        active: hasAudio.length > 0
      })

      setVideo({
        toggle: hasVideo.length > 0,
        active: hasVideo.length > 0
      })

      client.init(Args.appId, () => {
        client.join(Args.clientToken, Args.channel, userId, undefined, (uid: number) => {
          if(Args.role === RoleTypes.HOST){
            const stream : AgoraRTC.Stream = AgoraRTC.createStream({
              streamID: uid,
              audio: hasAudio.length > 0,
              video: hasVideo.length > 0,
              screen: false
            })

            stream.init(() => {
              client.publish(stream)
              setLocalStream({
                id: uid,
                stream
              })
            }, handleError)
          }
        })
      })
    })
  }, [
    client,
    Args.appId,
    Args.channel,
    Args.clientToken,
    Args.role,
    handleError,
    userId,
    Args.user.id
  ])

  //dispatched when a new stream is detected
  useEffect(() => {
    client.on('stream-added', (event: any) => {
        let stream : AgoraRTC.Stream = event.stream
        let streamId : string | number = stream.getId()

        if(streamId !== userId && streamId !== screenId)
            client.subscribe(stream,undefined,handleError)

    })
  },[client, screenId, userId, handleError])

  //dispatched when a new stream is subscribed to the meeting
  useEffect(() => {
    client.on('stream-subscribed', (event: any) => {
        let remoteStream : AgoraRTC.Stream = event.stream
        let remoteId : string | number = remoteStream.getId()
        
        if(!remoteStreamsClousure.find(remoteId)){
          remoteStreamsClousure.addRemoteStream({
            id: remoteId,
            stream: remoteStream
          })
        }

        setRemoteStreams([...remoteStreamsClousure.value()])
    })
  },[client])

  //dispatched when a stream is removed from the meeting
  useEffect(() => {
    client.on('stream-removed',(event: any) => {
        let remoteStreamId : string = event.stream.getId()

        remoteStreamsClousure.removeRemoteStream(remoteStreamId)

        setRemoteStreams([...remoteStreamsClousure.value()])
    })
  },[client])

  //dispatched when an user leave the meeting
  useEffect(() => {
    client.on('peer-leave',(event: any) => {
        let remoteStreamId : string = event.uid

        remoteStreamsClousure.removeRemoteStream(remoteStreamId)

        setRemoteStreams([...remoteStreamsClousure.value()])
    })
  },[client])

  return {
    localStream,
    screenStream,
    audio,
    video,
    remoteStreams,
    channel: Args.channel,
    role: Args.role,
    setAudio,
    setVideo,
    toggleAudio,
    toggleVideo,
    shareScreen,
    stopShareScreen,
    leaveChannel
  }
}

export default useAgoraLiveStreaming