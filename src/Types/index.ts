import { ButtonHTMLAttributes, ReactNode } from "react";

export type ChildrenProp = {
    children: ReactNode
}

export type ButtonProps = {
    props?: ButtonHTMLAttributes<HTMLButtonElement>,
    children: ReactNode
}