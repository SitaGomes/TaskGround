import { DatabaseRoomType, RoomType } from './../Types/index';
import { useEffect, useState} from "react"
import { database } from "../Database/Firebase"

import { useAuth } from './useAuth';


export function usePullRooms () {

    const [loadRoom, setLoadRoom] = useState<RoomType[]>([])
    const [loadingRoom, setLoadingRoom] = useState(true)

    const {user} = useAuth()

    useEffect(() => {

      const RoomRef = database.ref(`/rooms`)
    
      RoomRef.on("value", Room => {
  
        const rawRooms = Room.val()
  
        if (rawRooms === null) {
          setLoadingRoom(false)

          return
        }


        const rooms: DatabaseRoomType = rawRooms

        const parsedRooms = Object.entries(rooms).map(([key, value]) => {
          return{
              id: key,
              authorId: value.authorId,
              tittle: value.tittle
          }
        })

        setLoadRoom(parsedRooms.filter(task => task.authorId === user.uid))
        setLoadingRoom(false)
      })
      
      return () => {
          RoomRef.off("value")
      }

    }, [loadRoom, user.uid])
      /* Checking only when added a new room */
 
    return {loadRoom, loadingRoom}
}
