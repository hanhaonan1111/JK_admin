export type Channel = { id: string, name: string }
export type AriticalData = {
    page: number;
    per_page: number;
    results: Artical[];
    total_count: number;
}

export type ManageInIt = {
    channels: Channel[]
    articals: AriticalData,
    editArtical: editArtical
}
export type Artical = {
    comment_count: number,
    cover: { images: string[], type: number },
    id: string,
    like_count: number,
    pubdate: string,
    read_count: number,
    status: number,
    title: string,
    cover1?: string
}
export type editArtical = {
    channel_id: number,
    content: string,
    cover: { type: number, images: string[] },
    id: string,
    pub_date: string,
    title: string,
    draft?: string
}
export type ManageActions = {
    type: 'manage/setChannels',
    data: Channel[]
} | {
    type: 'manage/setArticals'
    data: AriticalData
} | {
    type: 'manage/editArtical'
    data: editArtical
}


export let ManageInit: ManageInIt = {
    channels: [] as Channel[],
    articals: {
        page: 0,
        per_page: 10,
        results: [] as Artical[],
        total_count: 0
    },
    editArtical: {} as editArtical,

}

function Manage(state = ManageInit, action: ManageActions) {
    switch (action.type) {
        case "manage/setChannels":
            return {
                ...state,
                channels: [...action.data]
            }
        case "manage/setArticals":
            return {
                ...state,
                articals: {...action.data}
            }
        case "manage/editArtical":
            return {
                ...state,
                editArtical: {...action.data}
            }

        default:
            return {...state}
    }
}

export default Manage