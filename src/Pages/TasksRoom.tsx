import {Tittle} from "../Components/Tittle/index"
import {Container} from "../Components/Container/index"
import {MainContainer} from "../Components/MainContainer/index" 
import {Stroke} from "../Components/Strock/index" 
import {Button} from "../Components/Button/index" 
import {Input} from "../Components/Input/index"
import { Task } from "../Components/Task/index"
import { ManageRooms } from "../Components/ManageRooms/index"

import {Message, SliderMessage} from "../Hooks/useToast"
import { usePullTasks } from "../Hooks/usePullTasks"

import {database} from "../Database/Firebase"

import { FormEvent, useState } from "react"
import { useParams } from "react-router-dom"

import { TaskType, ParamsType } from "../Types"

export function TasksRoom() {
  
  const [showInput, setShowInput] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  const [newTask, setNewTask] = useState("")
  
  const {id} = useParams<ParamsType>()
  const roomId = id
  
  const {loadTask, roomTittle} = usePullTasks(roomId)

  function activateMenu() {setOpenMenu(!openMenu)}

  async function handleSendTask(e: FormEvent) {
    e.preventDefault()    
    
    if (newTask.trim() === "") return

    const OrganizedTask: TaskType = {
      content: newTask,
      done: false
    }

    try{
      await database.ref(`/rooms/${roomId}/tasks`).push(OrganizedTask)

      setNewTask("")
      Message.success("Task sent")
    } catch (err) {
      Message.error("Something went wrong")
    }
  }
  
  
  function ShowTask () {
    setShowInput(!showInput) /* Shows the contrary boolean */
  }

  return (
    <div className="flex-row">

      <div
        className={openMenu ? "hide-menu" : ""}
      >
        <ManageRooms />
      </div>

      <div
          className={openMenu ? "icon pull-menu" : "icon"}
          style={{
            margin: "20px auto",
          }}

          onClick={activateMenu}
      >
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-alt-circle-up" className="user-icon svg-inline--fa fa-arrow-alt-circle-up fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm292 116V256h70.9c10.7 0 16.1-13 8.5-20.5L264.5 121.2c-4.7-4.7-12.2-4.7-16.9 0l-115 114.3c-7.6 7.6-2.2 20.5 8.5 20.5H212v116c0 6.6 5.4 12 12 12h64c6.6 0 12-5.4 12-12z"></path>
          </svg>
      </div>

      <Container>
        <MainContainer>
          <SliderMessage />
          {/*! Upper part */}

          <Tittle>
            {roomTittle}
          </Tittle>
        
          <Button type="button" onClick={ShowTask}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" className="svg-inline--fa fa-plus-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
            </svg>
            Add Task
          </Button>

          <Stroke />

          {/*! Inputs and submit */}
          {showInput && (
            <form
              onSubmit={handleSendTask}
            >
              <Input 
                placeholder="Task's Name" 
                value={newTask}
                onChange={ e => setNewTask(e.target.value)}
              />
      
              <Button 
                type="submit" 
                style={{width: "80%"}}
              >
                Submit Task
              </Button >
              
              <Stroke /> 

            </form>
            )  
          }

          {/* Tasks */}

          {
            loadTask.map(task => {
              return(
                <Task
                  content={task.content}
                  done={task.done}
                  key={task.id}
                  id={task.id}
                  roomId={roomId}
                />
              )
            })
          }

        </MainContainer>
      </Container>    
    </div>
  );
}

