import {getToken} from '@/utils/token'

export type Token = {
    token: string,
    refresh_token: string
}
export type UserAction = {
    type: 'user/setToken',
    data: {}
} | {
    type: 'user/setUserInfo',
    data: {}
}
export type userInfo = {
    id: string,
    photo: string,
    name: string,
    mobile: string,
    gender: number,
    birthday: string
}

export type StateType = {
    token: Token;
    userinfo: userInfo
}


let init: StateType = {
    token: getToken() || {token: '', refresh_token: ''},
    userinfo: {
        id: '',
        photo: '',
        name: '',
        mobile: '',
        gender: 0,
        birthday: ''
    }
}


function UserReducer(state = init, action: UserAction) {
    switch (action.type) {
        case  'user/setToken':
            return {
                ...state,
                token: {
                    ...action.data
                }
            }

        case "user/setUserInfo":
            return {
                ...state,
                userinfo: {...action.data}
            }

        default:
            return {
                ...state
            }
    }


}

export default UserReducer