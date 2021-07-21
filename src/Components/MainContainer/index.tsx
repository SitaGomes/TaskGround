import styled from "styled-components"
import {ChildrenProp} from "../../Types/index"

const Container = styled.main`
    text-align: center;
    background-color:#424556;
    max-width: 500px;
    width: 100%;
    padding: 8px;

    box-shadow: 13px 11px 49px rgba(0, 0, 0, 0.25);
`

export function MainContainer({children}: ChildrenProp) {
    return(
        <Container>
            {children}
        </Container>
    )
}