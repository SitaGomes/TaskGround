import { FormEvent, useState } from "react"
import { useHistory} from "react-router-dom"
import Modal from 'react-modal';

import styled from "styled-components"

import {auth, database } from "../Database/Firebase"

import {useAuth} from "../Hooks/useAuth"
import { Message } from "../Hooks/useToast"
import { usePullRooms } from "../Hooks/usePullRooms";

import {RoomType} from "../Types"

import { Button } from "../Components/Button"
import {Input} from "../Components/Input"
import {Room} from "../Components/Room"
import { Tittle } from "../Components/Tittle";

import BgImage from "../Assets/Images/bgImage3.jpg"
import TodoImage from "../Assets/Svg/TodoImage.svg"

// @ts-ignore
import Fade from "react-reveal/Fade"
import { LoadindIcon } from "../Components/LoadingIcon";

const Container = styled.div`

    background-color: #373A4B;


    height: 100vh;

    .trash-icon{
        width: 20px;
    }

    .user-bg-image{
        background-image: url(${BgImage});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        height: 40vh;
        padding: 0px;
    }

    .user-info{
        display: flex;
        justify-content: center;
        align-items: center;

        flex-direction: column;
    
        gap: 15px;

        font-size: 2rem;

    }

    .user-icon{
        width: 150px;
        border-radius: 30rem;
    }

    .mapped-rooms{
        margin: 15px;

        font-size: 1.5rem;
        
        gap: 15px;
        
        display: flex;
        align-items: center;
        justify-content: center;   
    }

    .link-rooms{
        text-decoration: none;
        color: #8faefd;

        :hover{
            filter: brightness(150%);
        }
    }

    .pd{
        padding: 20px;
    }

`


Modal.setAppElement('#root');
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: "100px 150px",
      borderRadius: "8px",
      backgroundColor: "#373A4B",
      border: "none"
    },
    overlay: {
        backgroundColor: '#0000007f',
    },
};

export function Dashboard () {

    const {user, handleIsAuth} = useAuth()
    const [roomTittle, setRoomTittle] = useState("")

    const [createRoomModal, setCreateRoomModal] = useState(false);

    const {loadRoom, loadingRoom} = usePullRooms()

    const history = useHistory()

    async function HandleLogOut() {
        
        try{
            await auth.signOut()
            
            localStorage.removeItem(`${user.uid}`)
            handleIsAuth(false)
            
            Message.success("Logged Out")
            history.push("/")
        } catch (err) {
            Message.error(`Something went wrong -- ${err}`)
        }
        
    }


    async function HandleCreateRoom(e: FormEvent) {
        e.preventDefault()

        if (roomTittle.trim() === "") return Message.error("Tittle missing")

        const room: RoomType = {
            tittle: roomTittle,
            authorId: user?.uid,
            tasks: {
                "greeetings": {
                    content: "Write your first task",
                    done: false
                }
            }
        }

        try{
            await database.ref("/rooms").push(room)


            setRoomTittle("")
            closeCreateRoomModal()
            Message.success("Room created successfuly")
        } catch (err) {

            Message.error(`Something went wrong -- ${err}`)
        }

    }

    function openCreateRoomModal() {
        setCreateRoomModal(true);
    }


    function closeCreateRoomModal() {
        setCreateRoomModal(false);
    }


    return(
        <Fade>

            <Container>
            
                {/* User's Information */}
                <div className="user-bg-image pd">
                    {/* Log Out */}
                    <div>
                        <Button
                            style={{marginRight: "0px"}}
                            onClick={HandleLogOut}
                        >
                            Logout
                        </Button>
                    </div>

                    {/* User's Name and Photo */}
                    <div
                        className="user-info"
                    >
                        <img 
                            src={user.photo ? user.photo : "nothing"} 
                            alt="user's info" 
                            className="user-icon"
                        />
                        {user.name}
                    </div>
                </div>
                

                {/* Rooms Settings */}
                <div className="pd">
                    {/* All Rooms and Create Room  */}
                    <div
                        className="
                            flex
                            align-center
                            space-between
                        "
                    >
                        <div
                            style={{fontSize: "1.3rem"}}
                        >
                            All Rooms:
                        </div>

                        <div>
                            <Button
                                onClick={openCreateRoomModal}
                            >
                                Create Room
                            </Button>

                            <Modal
                                isOpen={createRoomModal}
                                onRequestClose={closeCreateRoomModal}
                                style={customStyles}
                                contentLabel="Create Room"
                            >
                                <div
                                    className="
                                        flex
                                        align-center
                                        flex-column
                                        justify-center
                                    "
                                >
                                    <form
                                        onSubmit={HandleCreateRoom}
                                    >
                                        <Tittle>
                                            Room's name:
                                        </Tittle>

                                        <Input 
                                            style={{width: "100%"}} 
                                            placeholder="Tittle"
                                            onChange={ e => setRoomTittle(e.target.value)}
                                        />

                                        <Button>
                                            Submit
                                        </Button>
                                    </form>

                                </div>
                            </Modal>

                        </div>
                    </div>


                    {/* Data still loading */}
                    {loadingRoom ? (
                        <div>
                            <LoadindIcon></LoadindIcon>
                        </div>
                    ) : (
                        <div>
                            {/* Mapped Rooms */}
                            {(loadRoom.length === 0) ? (
                                <div
                                    className="flex justify-center align-center column"
                                >
                                    <h1>Create a room</h1>
                                    <img src={TodoImage} alt="Create a room" style={{maxWidth: "500px", width: "100%" }} />
                                </div>
                            ) : (
                                <div>
                                    {loadRoom.map(room => {
                                        return(
                                            <Fade left >
                                                <Room 
                                                    key={room.id}
                                                    id={room.id}
                                                    tittle={room.tittle}
                                                />
                                            </Fade>
                                        )
                                    })}
                                </div>
                            )}
                        </div> 
                    )}     

                </div>
            </Container>
        </Fade>
    )
}


