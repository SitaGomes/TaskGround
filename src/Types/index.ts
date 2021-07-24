import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export type ChildrenProp = {
    children: ReactNode
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export type InputProps = InputHTMLAttributes<HTMLInputElement>


export type UserType = {
    /* Don't touch this mess */
    uid: string | null | undefined, 
    name: string | null | undefined,
    photo: string | null | undefined
}

export type TaskType = {
    id?: string
    content: string,
    done: boolean,
}

export type DatabaseTaskType = Record<string, {
    content: string,
    done: boolean
}>


export type AuthContextType = {
    user: {
        name: string | null | undefined,
        uid: string | null | undefined,
        photo: string | null | undefined
    },
    handleGoogleSingIn: () => Promise<void>
}
