import { createGlobalStyle } from "styled-components"

const Reset = createGlobalStyle`
    body{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: #A3BCF9;
        font-family: "Lora", sans-serif;
    }

    .cursor-pointer{
        cursor: pointer;

        :hover{
            filter: opacity(0.8);
        }
    }

    .icon{
        width: 40px;
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

    .column{
        flex-direction: column;
    }

    .row{
        flex-direction: row
    }

    .align-center{
        align-items: center;
        gap: 10px;
    }

    .flex{
        display: flex;
    }

    .flex-wrap{
        flex-wrap: wrap;
    }

    .space-between{
        justify-content: space-between;
    }

    .justify-center{
        justify-content: center;
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
