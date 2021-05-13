import { useState, useEffect } from 'react'
import { AgoraLiveStreamingProvider } from '../../context/InteractiveLiveStreamingContext'
import { RoleTypes } from '../../Hooks/AgoraLiveStreamingHook/types'
import SpeakersRoom from '../../components/SpeakersRoom'
import { ENTRYPOINT } from '../../config'

type Data = {
  token: string
  uid: number
  channel: string
  appId: string
}

const InteractiveLiveStreamingHost = () => {
  const [laoding, setLoading] = useState(false)

  const [data, setData] = useState<Data>({
    token: '',
    uid: 0,
    channel: '',
    appId: '',
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
        channel: 'pmvs-channel'
      })
    })
      .then(response => response.json())
      .then(response => {
        if(response.status === 200){
          const { token, uid, channel, appId } = response.data
          setData({ token, uid, channel, appId })
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
              role={RoleTypes.HOST}
              user={{
                name: 'Pablo Villamizar',
                id: data.uid
              }}
            >
              <SpeakersRoom />
            </AgoraLiveStreamingProvider>
          )
          : <></>
      }
    </>
  )
}

export default InteractiveLiveStreamingHost