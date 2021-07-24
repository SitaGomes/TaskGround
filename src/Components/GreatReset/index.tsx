import { createGlobalStyle } from "styled-components"

const Reset = createGlobalStyle`
    body{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: #A3BCF9;
        font-family: "Lora", sans-serif;
    }

    .text{
        font-size: 1.4rem;
        padding: 5px;

        color: white;
    }

    .sing-in{
        font-size: 2rem;
        margin: 25px 0px;
    }

    .button{
        border-radius: 30px;
        color: white;
        margin-top: 15px;
    }

    .flex-row{
        display: flex;
        flex-direction: column;
    }

    .align-center{
        align-items: center;
        gap: 10px;
    }

    .flex{
        display: flex;
    }

    .space-between{
        justify-content: space-between;
    }

    @media only screen and (max-width: 600px){
        .text{
            font-size: 100%;
        }
    }
`

export function GreatReset() {
    return(
        <Reset />
    )
}
