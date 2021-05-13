import { useState , useEffect , useMemo, useCallback } from 'react'
import io from 'socket.io-client'
import { SOCKET_ENTRYPOINT } from '../../config'
import { useHistory } from 'react-router-dom'

import {
  UseSocket,
  ArgsType,
  Events,
  emitEventInterface
} from './types'

import { RoleTypes } from '../AgoraLiveStreamingHook/types'

export const useSocket: UseSocket = (Args: ArgsType) => {
    const socket: SocketIOClient.Socket = useMemo(() => io.connect(SOCKET_ENTRYPOINT,{
        transports: ['websocket']
    }),[])

    const history = useHistory()

    const channel: string = useMemo(() => Args.channel, [Args.channel])
    const role: string = useMemo(() => Args.role, [Args.role])

    const [online,setOnline] = useState<boolean>(false)

    const emitEvent: emitEventInterface = useCallback((event: Events) => {
        console.log({ channel: role === RoleTypes.HOST ? `${channel}-audience` : channel },event)
        socket.emit(event,{ channel: role === RoleTypes.HOST ? `${channel}-audience` : channel })
    },[socket, channel, role])

    useEffect(() => {
        setOnline(socket.connected)
    },[socket])

    useEffect(() => {
        socket.on('connect', () => {
            setOnline(true)
            socket.emit('join-channel',{ channel: role === RoleTypes.HOST ? channel : `${channel}-audience` })
        })
    },[socket, channel, role])

    useEffect(() => {
        socket.on('disconnect',() => setOnline(false))
    },[socket])

    useEffect(() => {
        socket.on(Events.ALERT,(data: { message: string }) => alert(data.message))
    },[socket])

    useEffect(() => {
        socket.on(Events.BREAKOUT_ROOMS,() => {
            alert('break')
            if(Args.leaveChannel){
                Args.leaveChannel()

                history.push('/room-1')
            }
        })
    },[socket, Args])

    return {
        socket,
        online,
        emitEvent
    }
}