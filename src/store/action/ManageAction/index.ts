import {RootThunkAction} from "@/store";
import http from "@/utils/request";
import {AriticalData, Channel, editArtical, ManageActions} from "@/store/reducer/Manage";
import {Submit} from "@/components/SendOrEdit";
import {message} from "antd";
import history from "@/utils/history";

export function setChannels(data: Channel[]): ManageActions {
    return {
        type: 'manage/setChannels',
        data
    }
}


export function AsyncGetAllChannels(): RootThunkAction {
    return async (dispatch) => {
        let res = await http({
            url: '/channels'
        })
        dispatch(setChannels(res.data.channels))
    }
}

export type Query = {
    status?: string;
    channel_id?: string;
    begin_pubdate?: string,
    end_pubdate?: string,
    page?: number,
    per_page?: number,
}

export function setArticals(data: AriticalData): ManageActions {
    return {
        type: 'manage/setArticals',
        data
    }
}

export function AsyncGetArticals(params: Query): RootThunkAction {
    return async (dispatch) => {
        let res = await http({
            url: '/mp/articles',
            params
        })
        if (!res.data.results) return
        dispatch(setArticals(res.data))
    }
}

export function AsyncAddArtical(data: Submit): RootThunkAction {
    return async (dispatch) => {
        let res = await http({
            url: '/mp/articles',
            method: "POST",
            data
        })
        if (!res.data.id) return message.error('文章发布失败!', 1000)
        message.success('文章发布成功', 1)
        history.push('/index/manage')
    }
}

export function AsyncUpdateArtical(id: string, data: Submit): RootThunkAction {
    return async () => {
        let res = await http({
            url: '/mp/articles/' + id,
            method: "PUT",
            data
        })
        if (!res.data.id) return message.error('修改文章失败!', 1000)
        message.success('修改文章成功', 1)
        history.push('/index/manage')
    }
}

export function setArticalDetail(data: editArtical): ManageActions {
    return {
        type: 'manage/editArtical',
        data
    }
}

export function AsyncGetDetail(id: string): RootThunkAction {
    return async dispatch => {
        let res = await http({
            url: '/mp/articles/' + id
        })
        if (!res.data) return message.error('获取文章详情失败!', 1000)
        dispatch(setArticalDetail(res.data))
    }

}



