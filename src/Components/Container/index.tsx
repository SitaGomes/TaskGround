import styled from "styled-components"
import {ChildrenProp} from "../../Types/index"

const DivContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color:#424556;

`

export function Container({children}: ChildrenProp) {
    return(
        <DivContainer>
            {children}
        </DivContainer>
    )
}