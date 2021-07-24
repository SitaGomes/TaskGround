import styled from "styled-components";
import { ChildrenProp } from "../../Types";

const Container = styled.div`
    
    background: linear-gradient(180deg, rgba(81, 109, 131, 0.74) 0%, rgba(69, 69, 69, 0) 100%);
    
    max-width: 600px;
    width: 80%;

    text-align: center;

    border-radius: 8px;
    padding: 7px;

`

export function LogInContainer ({children}: ChildrenProp) {

    return(
        <Container>
            {children}
        </Container>
    )
}