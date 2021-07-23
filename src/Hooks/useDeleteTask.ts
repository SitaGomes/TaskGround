import { database } from "../Database/Firebase";
import { Message } from "./useToast";


export async function useDeleteTask (id: string | undefined) {

    try{
        await database.ref(`/rooms/room/tasks/${id}`).remove()

        Message.success("Task removed")
    }catch (err) {
        Message.error(`Something went wrong: ${err}`)
    }

    
}