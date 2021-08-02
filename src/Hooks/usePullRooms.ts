import { DatabaseRoomType, RoomType } from './../Types/index';
import { useEffect, useState} from "react"
import { database } from "../Database/Firebase"


export function usePullRooms () {

    const [loadRoom, setLoadRoom] = useState<RoomType[]>([])

    useEffect(() => {

      const RoomRef = database.ref(`/rooms`)
    
      RoomRef.on("value", Room => {
  
        const rawRooms = Room.val()
  
        if (rawRooms === null) return

        const rooms: DatabaseRoomType = rawRooms

        const parsedRooms = Object.entries(rooms).map(([key, value]) => {
          return{
              id: key,
              authorId: value.authorId,
              tittle: value.tittle
          }
        })

        setLoadRoom(parsedRooms)
      })
      
      return () => {
          RoomRef.off("value")
      }

    }, [loadRoom])
      /* Checking only when added a new room */
 
    return {loadRoom}
}
