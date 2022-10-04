import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlayer } from '../api'
import { io } from "socket.io-client";

const socket = io("http://localhost:5050", {
  transports: ['websocket'],
  jsonp: false
})
 
const useListener = () => {
    const player = useSelector( state => state.player )
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('player-changed', data => {
            if(player && player._id.toString() === data.toString()){
                console.log("player changed")
                dispatch( getPlayer( player._id ) )
            }
        })
    }, [player])

    return []
}

export default useListener
