import styled from "styled-components";
import {InputProps} from "../../Types/index"

const Inputs = styled.input`
    border: 2px solid grey;

    padding: 5px;
    margin: 7px 0px;
    border-radius: 8px;

    width: 80%;

    color: #A3BCF9;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;

    background-color: #42455013;

    :hover{
        filter: brightness(130%);
    }

`

export function Task(props: InputProps) {
    
    return (
        <div>
            <Inputs {...props}/>
        </div>
    )
}

