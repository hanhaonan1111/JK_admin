import http from "@/utils/request";
import {Token, UserAction, userInfo} from '@/store/reducer/User'
import {message} from "antd";
import history from '@/utils/history'
import {setToken} from "@/utils/token";
import {RootThunkAction} from "@/store";

export function SetToken(data: Token): UserAction {
    return {
        type: 'user/setToken',
        data
    }
}


export function AsyncGetToken(data: { mobile: string; code: string }, from: string | undefined): RootThunkAction {
    return async (dispatch) => {
        let res = await http({
            url: '/authorizations',
            data,
            method: "POST"
        })


        if (res.data) {
            message.success('欢迎回来!', 1)
            await setToken(res.data)
        }
        await dispatch(SetToken(res.data))

        if (from) {
            history.replace(from)
        } else {
            history.push('/index')
        }


    }
}

export function SetUserInfo(data: userInfo): UserAction {
    return {
        type: 'user/setUserInfo',
        data
    }
}

export function AsyncGetUserData(): RootThunkAction {
    return async (dispatch) => {
        let {data} = await http({
            url: '/user/profile'
        })
        if (data) {
            dispatch(SetUserInfo(data))
        } else {
            message.error('获取用户信息失败!', 1)
            //    TODO 试下refresh_token可用不可用 若不可用 清除Token 去重新登陆
            //      TODO 可用 更新Token
        }
    }
}

