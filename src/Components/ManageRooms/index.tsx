import { FormEvent, useState } from "react"
import { Link, useHistory} from "react-router-dom"
import Modal from 'react-modal';

import styled from "styled-components"

import { auth, database } from "../../Database/Firebase"

import {useAuth} from "../../Hooks/useAuth"
import { Message } from "../../Hooks/useToast"
import { usePullRooms } from "../../Hooks/usePullRooms";

import {RoomType } from "../../Types"

import { Button } from "../Button"
import {Stroke} from "../Strock"
import { Tittle } from "../Tittle"
import {Input} from "../Input"


const Container = styled.div`

    background-color: #373A4B;

    padding: 20px;

    .user-icon{
        width: 50px;
        border-radius: 30px;
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


export function ManageRooms () {

    const {user, handleIsAuth} = useAuth()
    const [roomTittle, setRoomTittle] = useState("")
    const history = useHistory()

    const [modalIsOpen, setIsOpen] = useState(false);

    const {loadRoom} = usePullRooms()

    async function HandleLogOut() {
    
        try{
            await auth.signOut()
            
            localStorage.removeItem(`${user.uid}`)
            handleIsAuth(false)
            
            Message.success("Logged Out")
            history.push("/")
        } catch (err) {
            Message.error(`Something went wrong ${err}`)
        }
        
    }


    async function HandleCreateRoom(e: FormEvent) {
        e.preventDefault()

        if (roomTittle.trim() === "") return Message.error("Tittle missing")

        const room: RoomType = {
            tittle: roomTittle,
            authorId: user?.uid,
            tasks: {
                content: "Write your first task",
                done: false
            }
        }

        try{
            await database.ref("/rooms").push(room)


            setRoomTittle("")
            closeModal()
            Message.success("Room created successfuly")

        } catch (err) {
            
            Message.error(`Something went wrong -- ${err}`)
        }

    }

    function openModal() {
        setIsOpen(true);
    }
 
    function closeModal() {
        setIsOpen(false);
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
                        alt="users" 
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
                        Logout
                    </Button>
                </div>
            </div>

            <Stroke />

            {/* Rooms */}
            <div
                className="
                    flex 
                    space-between
                    align-center
                "
            >
                {/* all Rooms */}
                <div
                    style={{
                            color: "white", 
                            fontSize: "1.2rem",
                        }}
                    className="flex align-center"
                >
                    Rooms:
                    {loadRoom.map(room => {
                        return(
                            <Link 
                                to={`/rooms/${room.id}`}
                                style={{textDecoration: "none", color: "#A3BCF9"}}
                                key={room.id}
                            >
                                {room.tittle}
                            </Link>
                        )
                    })}
                </div>

                {/* Create Room */}
                <div>
                    <Button
                        onClick={openModal}
                    >
                        Create Room
                    </Button>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
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
        </Container>
    )
}


