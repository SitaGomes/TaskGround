import { database } from "../Database/Firebase";
import { Message } from "./useToast";


export async function useDeleteTask (id: string | undefined, roomId: string | undefined) {

    try{
        await database.ref(`/rooms/${roomId}/tasks/${id}`).remove()

        Message.success("Task removed")
    }catch (err) {
        Message.error(`Something went wrong: ${err}`)
    }

    
}