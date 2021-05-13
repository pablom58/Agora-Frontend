import { useState, useEffect } from 'react'
import { AgoraLiveStreamingProvider } from '../../context/InteractiveLiveStreamingContext'
import { SocketProvider } from '../../context/SocketContext'
import { RoleTypes } from '../../Hooks/AgoraLiveStreamingHook/types'
import SpeakersRoom from '../../components/SpeakersRoom'
import { ENTRYPOINT } from '../../config'

type Data = {
  token: string
  uid: number
  scid: number
  channel: string
  appId: string
  screenToken: string
}

const InteractiveLiveStreamingHost = () => {
  const [laoding, setLoading] = useState(false)

  const [data, setData] = useState<Data>({
    token: '',
    uid: 0,
    scid: 0,
    channel: '',
    appId: '',
    screenToken: ''
  })

  useEffect(() => {
    setLoading(true)
    fetch(`${ENTRYPOINT}/agora/channel/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role: RoleTypes.HOST,
        channel: 'room-1'
      })
    })
      .then(response => response.json())
      .then(response => {
        if(response.status === 200){
          const { token, uid, channel, appId, screenToken, scid } = response.data
          setData({ token, uid, channel, appId, screenToken, scid })
          setLoading(false)
        }
      })
      .catch(error => console.error(error))
  },[])

  if(laoding) return <p>Loading...</p>

  return (
    <>
      {
        data.token && data.token !== ''
          ? (
            <AgoraLiveStreamingProvider
              appId={data.appId}
              channel={data.channel}
              clientToken={data.token}
              screenToken={data.screenToken}
              role={RoleTypes.HOST}
              user={{
                name: 'Pablo Villamizar',
                id: data.uid
              }}
              screen={{
                name: 'Pablo Villamizar Screen Shared',
                id: data.scid
              }}
            >
              <SocketProvider>
                <SpeakersRoom />
              </SocketProvider>
            </AgoraLiveStreamingProvider>
          )
          : <></>
      }
    </>
  )
}

export default InteractiveLiveStreamingHost