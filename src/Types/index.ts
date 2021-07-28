import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { RouteProps } from "react-router-dom";

export type ChildrenProp = {
    children: ReactNode
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export interface ProtectedRouteType extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isAuth: boolean;
}

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
    roomId?: string
}

export type RoomType = {
    id?: string,
    tittle?: string,
    authorId?: string | null | undefined,
    tasks?: {}
}

export type DatabaseTaskType = Record<string, {
    content: string,
    done: boolean
}>

export type DatabaseRoomType = Record<string, {
    tittle: string,
    authorId?: string | null | undefined
}>


export type AuthContextType = {
    user: {
        name: string | null | undefined,
        uid: string | null | undefined,
        photo: string | null | undefined
    },
    isAuth: boolean,
    handleGoogleSingIn: () => Promise<void>,
    handleIsAuth: (state: boolean) => void,
}

export type ParamsType = {
    id: string | undefined
}
