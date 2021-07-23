import { ButtonHTMLAttributes, DOMElement, InputHTMLAttributes, ReactNode, ReactSVGElement } from "react";

export type ChildrenProp = {
    children: ReactNode
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>


export type InputProps = InputHTMLAttributes<HTMLInputElement>

export type TaskType = {
    id?: string
    content: string,
    done: boolean,
}

export type DatabaseTaskType = Record<string, {
    content: string,
    done: boolean
}>
