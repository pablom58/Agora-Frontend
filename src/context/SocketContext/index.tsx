import { createContext, Context, useContext } from 'react'
import { AgoraLiveStreamingContext } from '../InteractiveLiveStreamingContext'
import { useSocket } from '../../Hooks/useSocket'

import {
  SocketData
} from '../../Hooks/useSocket/types'

import { SocketProvider as SocketProviderInterface } from './types'

export const SocketContext: Context<Partial<SocketData>> = createContext<Partial<SocketData>>({})

export const SocketProvider: SocketProviderInterface = (props: any) => {
  const { channel, role, leaveChannel } = useContext(AgoraLiveStreamingContext)
  
  const { socket, online, emitEvent } = useSocket({ 
    channel: channel ? channel : '', 
    role: role ? role : '',
    leaveChannel
  })

  return (
    <SocketContext.Provider
      value={{
        socket,
        online,
        emitEvent
      }}
    >
      { props.children }
    </SocketContext.Provider>
  )
}