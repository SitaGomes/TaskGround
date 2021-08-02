import Modal from "react-modal"
import { useState } from "react";
import { Link } from "react-router-dom";


import { Button } from "../Button";
import { Tittle } from "../Tittle";

import { RoomType } from "../../Types";

import { useDeleteRoom } from "../../Hooks/useDeleteRoom";
import { Message } from "../../Hooks/useToast";


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


export function Room({id, tittle}: RoomType) {

    const [delRoomModal, setDelRoomModal] = useState(false)

    function openDelRoomModal() {
        setDelRoomModal(true);
    }

    function closeDelRoomModal() {
        setDelRoomModal(false);
    }


    function HandleDeleteTask(roomId: string | undefined) {
        
        try{
            useDeleteRoom(roomId)
    
            Message.success("Room deleted")
        } catch(err) {
            Message.error(`Something went wrong -- ${err}`)
        }

        closeDelRoomModal()
    }


    return(
        <div 
            className="
                mapped-rooms
            "
            key={id}         
        >
            <Link 
                to={`/rooms/${id}`}
                className="link-rooms"
            >
                {tittle}
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

                    <div
                        className="flex"
                        style={{gap: "50px"}}
                    >
                        <Button
                            onClick={() => HandleDeleteTask(id)}
                        >
                            Yes
                        </Button>

                        <Button
                            onClick={closeDelRoomModal}
                        >
                            No
                        </Button>
                    </div>

                </div>
            </Modal>
        </div>
    )

}