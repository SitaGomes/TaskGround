import { HTMLAttributes } from "react"
import styled from "styled-components"

const Barrinha = styled.hr`
    width: 87%;
    border-bottom: 1px solid white;

    margin: 14px auto;
`

export function Stroke (props: HTMLAttributes<HTMLElement>) {
    return(
        <Barrinha {...props} />
    )
}
