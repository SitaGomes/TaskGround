import { database } from "../Database/Firebase";
import { Message } from "./useToast";


export async function useDeleteRoom (roomId: string | undefined) {

    try{
        await database.ref(`/rooms/${roomId}`).remove()

        Message.success("Room removed")
    }catch (err) {
        Message.error(`Something went wrong: ${err}`)
    }

    
}