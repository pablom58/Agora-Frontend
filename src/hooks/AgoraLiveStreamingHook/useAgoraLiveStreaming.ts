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
  RemoteStreamInterface
} from './types'

import { v4 } from 'uuid'

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
    }
  }
})()

const useAgoraLiveStreaming = (Args: ArgsType) => {

  //this is the client object that handles the video streaming
  const client : AgoraRTC.Client = useMemo(() => AgoraRTC.createClient(CLIENT_CONFIG),[])

  //user id built from the user information, this will be use as id of the client stream
  const userId : string = useMemo(() => btoa(JSON.stringify({
    userId: v4()
  })),[])

  //user screen id built from the user information, this will be use as id of the client stream
  const screenId : string = useMemo(() => btoa(JSON.stringify({
    userId: v4()
  })),[])

  //local stream of the user
  const [ localStream , setLocalStream ] = useState<LocalStream>({
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
    userId
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

        remoteStreamsClousure.addRemoteStream({
            id: remoteId,
            stream: remoteStream
        })

        setRemoteStreams([...remoteStreamsClousure.value()])
    })
  },[client])

  return {
    client,
    localStream,
    audio,
    video,
    remoteStreams,
    setAudio,
    setVideo
  }
}

export default useAgoraLiveStreaming