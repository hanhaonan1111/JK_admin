import {Token} from "@/store/reducer/User";

export const KEY = 'JK_Admin'

export function getToken(): Token {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}

export function setToken(data: Token) {
    return localStorage.setItem(KEY, JSON.stringify(data))
}

export function hasToken() {
    return !!getToken().token
}