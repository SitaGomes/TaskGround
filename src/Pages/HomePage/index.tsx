import { Button } from "../../Components/Button"
import { Tittle } from "../../Components/Tittle"

import Logo from "../../Assets/Images/Logo.png"
import HomePageImg from "../../Assets/Images/HomePage.png"


import {useHistory } from "react-router-dom"

import {useAuth} from "../../Hooks/useAuth"
import { Message } from "../../Hooks/useToast"

// @ts-ignore
import Fade from "react-reveal/Fade"

import { 
    HomeAside, 
    HomeDiv, 
    UserInfo,
    HomeLogo
} from "./style"

export function HomePage () {

    const history = useHistory()
    const {handleGoogleSingIn, user} = useAuth()

    async function GoogleSingIn () {
        
        try{
            await handleGoogleSingIn()

            Message.success(`Welcome ${user.name}`)
            history.push("/rooms")
        } catch (err) {
            Message.error(`Something went wrong ${err}`)
        }
        
    }

    return (
        <HomeDiv>
            {/* Logo and Sing in */}
            <UserInfo>
                
                <Fade left>
                    {/* logo */}
                    <HomeLogo>
                        <img src={Logo} alt="TaskGround's Logo" />
                    </HomeLogo>
                


                
                    {/* sign in */}
                    <div>
                        <Tittle>
                            Sing in
                        </Tittle>
                        <Button
                            style={{color: "white", backgroundColor: "orange"}}
                            onClick={GoogleSingIn}
                            >
                            Google
                        </Button>
                    </div>
                </Fade>
               
            </UserInfo>

            {/* Banner */}
            <HomeAside>
                <Fade right>
                    <img src={HomePageImg} alt="Banner" />
                </Fade>
            </HomeAside>
            
        </HomeDiv>

    )
}
