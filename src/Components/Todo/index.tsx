import styled from "styled-components"
import { TaskType } from "../../Types"

const Section = styled.section`

` 


export function Todo ({content, done}: TaskType) {
    return(
        <Section>
            {content}
        </Section>
    )
}

