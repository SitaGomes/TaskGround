import styled from "styled-components"
import {ChildrenProp} from "../../Types/index"

const Titulo = styled.h1`
    font-family: 'Ubuntu', sans-serif;
    font-size: 3.5rem;
    margin: 15px;

    @media only screen and (max-width: 400px){
        font-size: 2.8rem;
    }
`

export function Tittle ({children}: ChildrenProp) {
    return(
       <Titulo>
           {children}
       </Titulo>
    )
}