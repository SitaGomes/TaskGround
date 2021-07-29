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
    transition: ease 0.4s;

    
    .user-icon{
        width: 50px;
        border-radius: 30px;
    }
    
    .top-nav{
        position: relative;
    }

    .arrow-icon{
        position: absolute;
        bottom: 70%;
        right: 49%;
    }

    .arrow-icon-down{
        position: absolute;
        bottom: 90%;
        right: 49%;
    }
    
    .menu-up{
        position: absolute;
        top: -671px;
    }
    
    .menu-down{
        padding: 20px;
        top: 671px;
    }

    @media only screen and (max-width: 355px){

        .arrow-icon{
            bottom: 50%;
        }


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
    const [modalIsOpen, setIsOpen] = useState(false);
    const [menuDown, setMenuDown] = useState(false);


    const history = useHistory()


    const {loadRoom} = usePullRooms()

    function activateMenu () {
        setMenuDown(!menuDown)
    }

    function toDashboard () {
        history.push("/rooms")
    }

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
            <div className="top-nav">

                <nav
                    className={menuDown ? "menu-down" : "menu-up"}
                >

                    {/* User Interface */}
                    <div className="flex space-between">
                        {/* User Name and Photo */}
                        <div
                            className="
                                flex 
                                align-center 
                                cursor-pointer
                            "
                            onClick={toDashboard}
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
                            className="flex align-center flex-wrap"
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
                </nav>
            </div>
            
            <div
                 className={menuDown ? "arrow-icon" : "arrow-icon-down"}
                onClick={activateMenu}
            >
                {menuDown ? (
                    
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-alt-circle-up" className="icon svg-inline--fa fa-arrow-alt-circle-up fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm292 116V256h70.9c10.7 0 16.1-13 8.5-20.5L264.5 121.2c-4.7-4.7-12.2-4.7-16.9 0l-115 114.3c-7.6 7.6-2.2 20.5 8.5 20.5H212v116c0 6.6 5.4 12 12 12h64c6.6 0 12-5.4 12-12z"></path>
                    </svg>
                    
                ) : (
                    
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-alt-circle-down" className="icon svg-inline--fa fa-arrow-alt-circle-down fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z"></path>
                    </svg>
                    
                )}

            </div>
        </Container>
    )
}


