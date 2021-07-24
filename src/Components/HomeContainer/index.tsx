import styled from "styled-components"
import {ChildrenProp} from "../../Types/index"
import bgImage from "../../Assets/Images/montain.jpg"

const DivContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    
    background-image: url(${bgImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

`

export function HomeContainer({children}: ChildrenProp) {
    return(
        <DivContainer>
            {children}
        </DivContainer>
    )
}