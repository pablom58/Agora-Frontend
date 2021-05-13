import { useState, useEffect } from 'react'
import { AgoraLiveStreamingProvider } from '../../context/InteractiveLiveStreamingContext'
import { RoleTypes } from '../../Hooks/AgoraLiveStreamingHook/types'
import AudienceRoom from '../../components/AudienceRoom'
import { ENTRYPOINT } from '../../config'
import { SocketProvider } from '../../context/SocketContext'

type Data = {
  token: string
  uid: number
  scid: number
  channel: string
  appId: string
  screenToken: string
}

const InteractiveLiveStreamingAudience = () => {

  const [laoding, setLoading] = useState(false)

  const [data, setData] = useState<Data>({
    token: '',
    uid: 0,
    scid: 0,
    channel: '',
    appId: '',
    screenToken: '',
  })

  useEffect(() => {
    setLoading(true)
    fetch(`${ENTRYPOINT}/agora/channel/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role: RoleTypes.AUDIENCE,
        channel: 'pmvs-channel'
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
              role={RoleTypes.AUDIENCE}
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
                <AudienceRoom />
              </SocketProvider>
            </AgoraLiveStreamingProvider>
          )
          : <></>
      }
    </>
  )
}

export default InteractiveLiveStreamingAudience