import React, {useEffect, useState} from 'react';
import styles from './index.module.scss'
import SendOrEdit from "@/components/SendOrEdit";
import {AsyncGetAllChannels} from "@/store/action/ManageAction";
import {useDispatch} from "react-redux";
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";

export type FormData = {
    title: null | string,
    channel_id: null | number,
    content: null | string,
    cover: string,
    draft?: boolean,
    images?: string[]
}

let title = <Breadcrumb separator=">">
    <Breadcrumb.Item>
        <Link to="/index">首页</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>发布文章</Breadcrumb.Item>
</Breadcrumb>

function Index() {
    let dispatch = useDispatch()
    let [formData, setFormData] = useState({
        title: null,
        channel_id: null,
        content: null,
        cover: '1',
        draft: false
    })
    useEffect(() => {
        dispatch(AsyncGetAllChannels())
    }, [dispatch])
    return (
        <div className={styles.root}>
            <SendOrEdit isSend={true} formData={formData} setFormData={setFormData} title={title}/>
        </div>
    );
}

export default Index;