import { TaskType } from '../Types/index';
import { useEffect, useState } from "react"
import { database } from "../Database/Firebase"
import { DatabaseTaskType } from "../Types"


export function useRoom () {

    const [loadTask, setLoadTask] = useState<TaskType[]>([])

    useEffect(() => {

        const RoomRef = database.ref(`/rooms/room/`)
    
        RoomRef.once("value", Room => {
    
          const room = Room.val()
    
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
    
        })
        
        return () => {
            RoomRef.off("value")
        }

    }, [loadTask])

    return { loadTask }
    
}


