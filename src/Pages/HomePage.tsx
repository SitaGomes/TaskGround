import { Button } from "../Components/Button"
import { HomeContainer } from "../Components/HomeContainer/index"
import { LogInContainer } from "../Components/LogInContainer"
import { Stroke } from "../Components/Strock"
import { Tittle } from "../Components/Tittle"

import {auth, firebase} from "../Database/Firebase"

import {useHistory} from "react-router-dom"

export function HomePage () {
    const history = useHistory()

    async function handleGoogleSingIn() {
        const Provider = new firebase.auth.GoogleAuthProvider

        await auth.signInWithPopup(Provider)

        history.push("/rooms")
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
                    onClick={handleGoogleSingIn}
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
