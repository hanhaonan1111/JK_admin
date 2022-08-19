import React, {useEffect} from 'react';
import type {PaginationProps} from 'antd';
import {Button, Card, Pagination, Space, Table, Tag} from "antd";
import img404 from "@/assets/imgs/error.png";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {ManageInIt} from "@/store/reducer/Manage";
import style from './index.module.scss'
import {AsyncGetArticals} from "@/store/action/ManageAction";
import history from "@/utils/history";

const columns = [
    {
        title: '封面',
        dataIndex: 'cover1',
        render: (cover: string) => {
            return <img src={cover || img404} width={200} height={150} alt=""/>
        }
    },
    {
        title: '标题',
        dataIndex: 'title',
        width: 220
    },
    {
        title: '状态',
        dataIndex: 'status',
        render: (data: number) => {
            if (data === 0) {
                return <Tag color="orange">草稿</Tag>
            } else if (data === 1) {
                return <Tag color="blue">待审核</Tag>
            } else if (data === 2) {
                return <Tag color="green">审核通过</Tag>
            }
            return <Tag color="pink">审核失败</Tag>
        }
    },
    {
        title: '发布时间',
        dataIndex: 'pubdate'
    },
    {
        title: '阅读数',
        dataIndex: 'read_count'
    },
    {
        title: '评论数',
        dataIndex: 'comment_count'
    },
    {
        title: '点赞数',
        dataIndex: 'like_count'
    },
    {
        title: '操作',
        render: (data: any) => {
            return (
                <Space size="middle">
                    <Button type="primary"
                            shape="circle"
                            onClick={() => {
                                history.push('/index/manage/' + data.id)
                            }}
                            icon={<EditOutlined/>}
                    />
                    <Button
                        type="primary"
                        danger
                        shape="circle"
                        icon={<DeleteOutlined/>}
                    />
                </Space>
            )
        }
    }
]
type Q = {
    status: string,
    channel_id: string,
    begin_pubdate: string,
    end_pubdate: string,
    page: number,
    per_page: number
}

function Index({Query, setQuery}: { Query: Q, setQuery: (x: Q) => void }) {
    let {articals} = useSelector<any, ManageInIt>((v) => v.Manage)
    let dispatch = useDispatch()
    let data2 = articals.results.map(v => {
        if (v.cover.type > 0) {
            v.cover1 = v.cover.images[0]
        } else {
            v.cover1 = img404
        }
        return v
    })
    useEffect(() => {
        dispatch(AsyncGetArticals(Query))
    }, [Query.page, Query.per_page])
    let ChangePage: PaginationProps['onChange'] = (page, pageSize) => {
        setQuery({...Query, page: page ? page : 1, per_page: pageSize ? pageSize : 10})
    }
    return (
        <Card title={`根据筛选条件共查询到 ${articals?.total_count} 条结果：`} className={style.root}>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data2}
                className='table'
            />
            <Pagination
                defaultCurrent={1}
                total={Math.ceil(articals?.total_count / 10)}
                className='page'
                onChange={ChangePage}
            />
        </Card>
    );
}

export default Index;