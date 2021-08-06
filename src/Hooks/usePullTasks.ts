import { RoomType, TaskType } from '../Types/index';
import { useEffect, useState } from "react"
import { database } from "../Database/Firebase"
import { DatabaseTaskType } from "../Types"

export function usePullTasks (roomId: string | undefined) {

    const [loadingTask, setLoadingTask] = useState(true)
    const [loadTask, setLoadTask] = useState<TaskType[]>([])
    const [roomTittle, setRoomTittle] = useState("" as string | undefined)

    useEffect(() => {

        const RoomRef = database.ref(`/rooms/${roomId}`)
    
        RoomRef.on("value", Room => {
    
          const room: RoomType = Room.val()
          
          const {tittle} = room
          
          setRoomTittle(tittle)
          
          if(!room.tasks) return

          const tasks: DatabaseTaskType = room.tasks

          const parsedTasks = Object.entries(tasks).map(([key, value]) => {
            return {
              id: key,
              content: value.content,
              done: value.done
            }
          })
          /* Transforming an Object into an Array */
    
          setLoadTask(parsedTasks)
          setLoadingTask(false)
    
        })
        
        return () => {
            RoomRef.off("value")
        }

    }, [roomId, loadTask])

  return { loadTask, roomTittle, loadingTask}
    
}


