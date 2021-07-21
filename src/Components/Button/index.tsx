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

    margin-bottom: 8px;

    display: flex;
    margin: 0 auto;
    align-items: center;

    gap: 5px;

    :hover{
        filter: drop-shadow(6px 7px 8px rgba(2, 2, 2, 0.19));
    }

    svg{
        width: 20px;
    }
`

export function Button ({props, children}: ButtonProps) {
    return (
        <Botao {...props}>
            {children}
        </Botao>
    )
}


