import styled from "styled-components"

import {ButtonProps} from "../../Types/index"

const Botao = styled.button`
    background-color: #4B4F62;
    color: #A3BCF9;

    font-size: 1.2em;
    font-family: "Lora", sans-serif;
    
    padding: 10px;

    border: none;
    border-radius: 8px;

    display: flex;
    justify-content: center;

    margin: 8px auto;
    align-items: center;

    gap: 5px;

    transition: ease-in 0.4s;

    :hover{
        filter: brightness(115%);
    }

    svg{
        width: 20px;
    }
`

export function Button (props: ButtonProps) {
    return (
        <Botao {...props} />
    )
}


