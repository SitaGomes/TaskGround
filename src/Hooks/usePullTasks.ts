import { TaskType } from '../Types/index';
import { useEffect, useState } from "react"
import { database } from "../Database/Firebase"
import { DatabaseTaskType } from "../Types"
import { idText } from 'typescript';

export function usePullTasks (roomId: string | undefined) {

    const [loadTask, setLoadTask] = useState<TaskType[]>([])

    useEffect(() => {

        const RoomRef = database.ref(`/rooms/${roomId}`)
    
        RoomRef.on("value", Room => {
    
          const room = Room.val()
          
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
    
        })
        
        return () => {
            RoomRef.off("value")
        }

    }, [loadTask])

    return { loadTask }
    
}


