import { Button } from "../Components/Button"
import { HomeContainer } from "../Components/HomeContainer/index"
import { LogInContainer } from "../Components/LogInContainer"
import { Stroke } from "../Components/Strock"
import { Tittle } from "../Components/Tittle"

import { Link, useHistory } from "react-router-dom"

import {useAuth} from "../Hooks/useAuth"
import { Message } from "../Hooks/useToast"

export function HomePage () {

    const history = useHistory()
    const {handleGoogleSingIn} = useAuth()

    async function GoogleSingIn () {
        
        try{
            await handleGoogleSingIn()

            Message.success("Loged In")
            history.push("/rooms")
        } catch (err) {
            Message.error(`Something went wrong ${err}`)
        }
        
    }

    return (
        <HomeContainer>
            <div
            >
                <Tittle>
                    TaskGround
                </Tittle>

                <Stroke />
            </div>

            <LogInContainer>
                <div className="text">
                    Manage, Organize and Create your tasks
                    with a simple interface. 
                </div>

                <div 
                    className="sing-in"
                >
                    Sign in
                </div>

                <Button
                    className="button"
                    style={
                        {   
                            backgroundColor: "orange", 
                        }
                    }
                    onClick={GoogleSingIn}
                >
                    Google
                </Button>

                {/* <Button
                    className="button"
                    style={
                        {   
                            backgroundColor: "blue", 
                        }
                    }
                >
                    Facebook
                </Button> */}
            </LogInContainer>

        </HomeContainer>
    )
}
