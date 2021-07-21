import {Tittle} from "../Components/Tittle/index"
import {Container} from "../Components/Container/index"
import {MainContainer} from "../Components/MainContainer/index" 
import {Stroke} from "../Components/Strock/index" 
import {Button} from "../Components/Button/index" 

export function TasksRoom() {
  return (
    <Container>
      <MainContainer>
      
        <Tittle>
          School
        </Tittle>
      
        <Button>
          Add Task
        </Button>

        <Stroke />
      
      </MainContainer>
    </Container>    
  );
}

