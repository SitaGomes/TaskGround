import { createGlobalStyle } from "styled-components"

const Reset = createGlobalStyle`
    body{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: #A3BCF9;
        font-family: "Lora", sans-serif;
    }

`

export function GreatReset() {
    return(
        <Reset />
    )
}
