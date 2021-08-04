import { Button } from "../../Components/Button"
import { Tittle } from "../../Components/Tittle"

import Logo from "../../Assets/Images/Logo.png"
import HomePageImg from "../../Assets/Images/HomePage.png"


import {useHistory } from "react-router-dom"

import {useAuth} from "../../Hooks/useAuth"
import { Message } from "../../Hooks/useToast"

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
            {/* Banner */}
            {/* Logo and Sing in */}
            <UserInfo>
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
            </UserInfo>

            <HomeAside>
                <img src={HomePageImg} alt="Banner" />
            </HomeAside>
            
        </HomeDiv>
    )
}
