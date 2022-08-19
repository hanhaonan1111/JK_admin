import React, {useEffect, useState} from 'react';
import SendOrEdit from "@/components/SendOrEdit";
import {Link, useParams} from "react-router-dom";
import {AsyncGetDetail} from "@/store/action/ManageAction";
import {useDispatch, useSelector} from "react-redux";
import {ManageInIt} from "@/store/reducer/Manage";
import {FormData} from '@/pages/Layout/components/Send'
import {Breadcrumb} from "antd";

let title = <Breadcrumb separator=">">
    <Breadcrumb.Item>
        <Link to="/index">首页</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
        <Link to="/index/manage">文章列表</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>编辑文章</Breadcrumb.Item>
</Breadcrumb>

function Index() {
    let dispatch = useDispatch()
    let params = useParams<{ id: string | undefined }>()
    useEffect(() => {
        params.id && dispatch(AsyncGetDetail(params.id))
    }, [params.id])

    let {editArtical} = useSelector<any, ManageInIt>(v => v.Manage)
    let [data, setData] = useState({} as FormData)
    useEffect(() => {
        setData({
            channel_id: editArtical.channel_id,
            title: editArtical.title,
            content: editArtical.content,
            cover: editArtical.cover?.type + '',
            images: editArtical.cover?.images
        })

    }, [editArtical.title])

    return (
        <div>
            {data.title && <SendOrEdit isSend={false} formData={data} setFormData={setData} title={title}></SendOrEdit>}
        </div>
    );
}

export default Index;