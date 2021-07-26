import styled from "styled-components"
import { database } from "../../Database/Firebase"
import { useDeleteTask } from "../../Hooks/useDeleteTask"
import { Message } from "../../Hooks/useToast"
import { TaskType } from "../../Types"

const Section = styled.section`
    margin: 15px auto;
    padding: 8px;

    border: 1px solid white;
    border-radius: 8px;

    width: 85%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .text{
        font-size: 1.2rem;
    }

    svg{
        width: 20px;
    }

    .cursor{
        cursor: pointer;
    }

    :hover{
        filter: brightness(130%);
    }



    /* Customize the label (the container) */
    .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 25px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }

    /* Hide the browser's default checkbox */
    .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
    background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
    background-color: #2196F3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
    display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    }


` 


export function Task ({content, done, id, roomId}: TaskType) {
    
    
    async function TaskDone() {

        try{
            await database.ref(`/rooms/${roomId}/tasks/${id}`).update({
                done: !done
            })
      
            
            if (done === false) return Message.success("Congratulations!")

          } catch (err) {
            Message.error("Something went wrong")
          }

    } 
    
    function HandleDeleteTask () {
        useDeleteTask(id, roomId)
    }
    
    return(
        <Section>
            <div
            >
                <label className="container" >
                    <input type="checkbox" defaultChecked={done} onChange={TaskDone} />
                    <span className="checkmark"></span>
                </label>    
            </div>

            <div className="text">
                {content}
            </div>

            <div 
                onClick={HandleDeleteTask}
                className="cursor"
            >
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" className="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                </svg>
            </div>
        </Section>
    )
}

