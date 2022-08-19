import React, {useEffect, useState} from 'react';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {Breadcrumb, Button, Card, DatePicker, Form, Radio, Select,} from 'antd'
import {Link} from 'react-router-dom'
import style from './index.module.scss'
import {AsyncGetAllChannels, AsyncGetArticals} from '@/store/action/ManageAction'
import {useDispatch, useSelector} from "react-redux";
import {ManageInIt} from "@/store/reducer/Manage";
import Articals from "@/pages/Layout/components/Manage/components/Articals";
import KeepAlive from "@/components/KeepAlive";

const {RangePicker} = DatePicker;
const {Option} = Select;
let status = ['全部', '草稿', '待审核', '审核通过', '审核失败']

function Index2() {
    let [Query, setQuery] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 10
    })
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(AsyncGetAllChannels())
        dispatch(AsyncGetArticals(Query))
    }, [dispatch])

    let manage = useSelector<any, ManageInIt>((v => v.Manage))

    let Finish = (e: any) => {
        dispatch(AsyncGetArticals(Query))
    }
    return (

        <div className={style.root}>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/index">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{marginBottom: 20}}
            >
                <Form
                    initialValues={{
                        status: '-1'
                    }}
                    onFinish={Finish}
                >
                    <Form.Item name="status" label="状态 ">
                        <Radio.Group onChange={(e) => {
                            setQuery({...Query, status: e.target.value === '-1' ? '' : e.target.value})
                        }}>
                            {
                                status.map((v, index) => {
                                    return <Radio value={index - 1 + ''} key={v}>{v}</Radio>
                                })
                            }
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="channel_id"
                        label="频道"
                        className='channel'
                    >
                        <Select placeholder="--请选择频道--" onChange={(v) => {

                            setQuery({...Query, channel_id: v})
                        }}>
                            {
                                manage.channels?.map(v => {
                                    return <Option value={v.id} key={v.id}>{v.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name='time'
                        label='时间'
                    >
                        <RangePicker locale={locale} onChange={(e: any) => {
                            if (e !== null) {
                                let [start, end] = e
                                let begin_pubdate = start?.format('YYYY-MM-DD')
                                let end_pubdate = end?.format('YYYY-MM-DD')
                                setQuery({
                                    ...Query,
                                    begin_pubdate,
                                    end_pubdate
                                })
                            } else {
                                setQuery({
                                    ...Query,
                                    begin_pubdate: '',
                                    end_pubdate: ''
                                })
                            }

                        }}/>

                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        筛选
                    </Button>
                </Form>
            </Card>

            <div>
                <Articals Query={Query} setQuery={setQuery}></Articals>
            </div>
        </div>
    );
}

function Index() {
    return (
        <div className={style.root}>
            <KeepAlive exact path='/index/manage' alive='/index/manage' component={Index2}></KeepAlive>
        </div>
    );
}


export default Index