import { FormEvent, useState } from "react"
import { Link, useHistory} from "react-router-dom"
import Modal from 'react-modal';

import styled from "styled-components"

import {auth, database } from "../Database/Firebase"

import {useAuth} from "../Hooks/useAuth"
import { Message } from "../Hooks/useToast"
import { usePullRooms } from "../Hooks/usePullRooms";

import {RoomType} from "../Types"

import { Button } from "../Components/Button"
import {Input} from "../Components/Input"

import BgImage from "../Assets/Images/bgImage3.jpg"
import { Tittle } from "../Components/Tittle";
import { useDeleteRoom } from "../Hooks/useDeleteRoom";

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

const DelRoomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: "30px 10px",
      borderRadius: "8px",
      backgroundColor: "#373A4B",
      border: "none"
    },
    overlay: {
        backgroundColor: '#0000007f',
    },
}


export function Dashboard () {

    const {user, handleIsAuth} = useAuth()
    const [roomTittle, setRoomTittle] = useState("")

    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [delRoomModal, setDelRoomModal] = useState(false)

    const {loadRoom} = usePullRooms()

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

    async function HandleDeleteTask(roomId: string | undefined) {
        
        try{
            await useDeleteRoom(roomId)
    
            Message.success("Room deleted")
        } catch(err) {
            Message.error(`Something went wrong -- ${err}`)
        }

        closeDelRoomModal()
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
    
    function openDelRoomModal() {
        setDelRoomModal(true);
    }


    function closeCreateRoomModal() {
        setCreateRoomModal(false);
    }

    function closeDelRoomModal() {
        setDelRoomModal(false);
    }



    return(
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

                {/* Mapped Rooms */}
                <div>
                    {loadRoom.map(room => {
                        return(
                            <div className="
                                    mapped-rooms
                                "         
                            >
                                <Link 
                                    to={`/rooms/${room.id}`}
                                    className="link-rooms"
                                    key={room.id}
                                >
                                    {room.tittle}
                                </Link>

                                <div 
                                    onClick={openDelRoomModal}
                                    className="cursor-pointer trash-icon"
                                >
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" className="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                                    </svg>
                                </div>

                                <Modal
                                    isOpen={delRoomModal}
                                    onRequestClose={closeDelRoomModal}
                                    style={DelRoomStyles}
                                    contentLabel="Delete Room"
                                >
                                    <div
                                        className="
                                            flex
                                            align-center
                                            column
                                            justify-center
                                        "
                                    >
                                        <Tittle>
                                            Do you want to delete this room?
                                        </Tittle>

                                        <form
                                            className="flex"
                                            style={{gap: "50px"}}
                                        >
                                            <Button
                                                onClick={() => HandleDeleteTask(room.id)}
                                            >
                                                Yes
                                            </Button>

                                            <Button
                                                onClick={closeDelRoomModal}
                                            >
                                                No
                                            </Button>
                                        </form>

                                    </div>
                                </Modal>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Container>
    )
}


