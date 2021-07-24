import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { auth } from "../../Database/Firebase"
import {useAuth} from "../../Hooks/useAuth"
import { Message } from "../../Hooks/useToast"
import { Button } from "../Button"


const Container = styled.div`

    background-color: #373A4B;

    padding: 20px;

    .user-icon{
        width: 50px;
        border-radius: 30px;
    }

    

`

export function ManageRooms () {

    const {user} = useAuth()
    const history = useHistory()

    async function HandleLogOut() {
    
        try{
            await auth.signOut()
    
            Message.success("Logged Out")
            history.push("/")
        } catch (err) {
            Message.error(`Something went wrong ${err}`)
        }
        
        
    }

    return(
        <Container>
            {/* User Interface */}
            <div className="flex space-between">
                {/* User Name and Photo */}
                <div
                    className="
                        flex 
                        align-center 
                    "
                >
                    <img 
                        src={user.photo ? user.photo : "nothing" } 
                        alt="user's photo" 
                        className="user-icon"    
                    />
                    <div 
                        style={{color: "white"}}
                    >
                        {user.name}
                    </div>
                </div>

                {/* Log Out */}
                <div>
                    <Button
                        onClick={HandleLogOut}
                    >
                        Log Out
                    </Button>
                </div>
            </div>

            {/* Rooms */}
            <div>
                {/* all Rooms */}
                <div></div>

                {/* Create Room */}
                <div></div>
            </div>
        </Container>
    )
}


