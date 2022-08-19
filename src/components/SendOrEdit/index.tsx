import React, {useEffect, useState} from 'react';
import styles from './index.module.scss'
import {PlusOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {Button, Card, Form, Input, message, Radio, Select, Upload} from 'antd'
import {useParams} from 'react-router-dom'
import {Option} from "antd/es/mentions";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import type {UploadFile} from 'antd/es/upload/interface';
import {useDispatch, useSelector} from "react-redux";
import {editArtical, ManageInIt} from "@/store/reducer/Manage";
import {AsyncAddArtical, AsyncUpdateArtical, setArticalDetail} from "@/store/action/ManageAction";
import {FormData} from "@/pages/Layout/components/Send";


type PropType = {
    isSend: boolean,
    formData: FormData,
    setFormData: (x: any) => void,
    title: React.ReactNode
}

export type Submit = {
    title?: string | null,
    channel_id?: string | null,
    content?: string | null,
    cover?: {
        type: number,
        images: string[]
    },
    draft?: boolean
}

function Index({isSend, formData, setFormData, title}: PropType) {
    useEffect(() => {
        return () => {
            dispatch(setArticalDetail({} as editArtical))
        }
    }, [isSend])
    let dispatch = useDispatch()
    let {channels} = useSelector<any, ManageInIt>(v => v.Manage)
    // 只能上传图片格式的文件!
    const props: UploadProps = {
        beforeUpload: file => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                message.error(`${file.name} is not a png file`);
            }
            return isPNG || Upload.LIST_IGNORE;
        },
    };
    let init = formData.images ? formData.images.map((v, i) => {
        return {uid: v, name: v, url: v}
    }) : []
    const [fileList, setFileList] = useState<UploadFile[]>(init)

    let onUploadChange: UploadProps['onChange'] = (info) => {
        setFileList([...info.fileList])
    }
    let params = useParams<{ id: string }>()
    let Finish = (v: any) => {
        if (+formData.cover !== fileList.length) {
            return message.error('请上传封面')
        }
        let urls = fileList.map(v => {
            if (v.url) {
                return v.url
            }
            return v.response.data.url
        })
        let submit: Submit = {
            title: v.title,
            channel_id: v.channel_id,
            content: v.content,
            cover: {
                type: urls.length,
                images: urls
            },
            draft: formData.draft
        }

        if (isSend) {
            dispatch(AsyncAddArtical(submit))
        } else {
            dispatch(AsyncUpdateArtical(params.id, submit))
        }
    }
    return (
        <div className={styles.root} id='com'>
            <Card
                title={title}
            >

                <Form
                    autoComplete="off"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 8}}
                    initialValues={formData}
                    onFinish={Finish}
                >
                    <Form.Item
                        name='title'
                        label='标题'
                        rules={[{required: true, message: '此项目为必填项!'}]}
                    >
                        <Input placeholder='请输入文章标题'/>
                    </Form.Item>

                    <Form.Item
                        name='channel_id'
                        label='频道'
                        rules={[{required: true, message: '此项目为必填项!'}]}
                    >
                        <Select placeholder='--*选择所属频道*--'>
                            {
                                channels.map(v => {
                                    return <Option value={v.id} key={v.id}>{v.name}</Option>
                                })
                            }

                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='cover'
                        label='封面'
                        rules={[{required: true, message: '此项目为必填项!'}]}
                    >
                        <Radio.Group value='cover' onChange={(e) => {
                            setFormData({...formData, cover: e.target.value})

                            if (fileList.length > e.target.value) {
                                setFileList(fileList.slice(0, e.target.value))
                            }
                        }}>
                            <Radio value='1'>单图</Radio>
                            <Radio value='3'>三图</Radio>
                            <Radio value='0'>无图</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        +formData.cover > 0 && <Upload
                            {...props}
                            className="avatar-uploader"
                            name="image"
                            listType="picture-card"
                            action="http://geek.itheima.net/v1_0/upload"
                            maxCount={+formData.cover}
                            fileList={fileList}
                            onChange={onUploadChange}
                        >
                            {
                                // 1                    1
                                +formData.cover > fileList.length && (<div style={{marginTop: 15}}>
                                    <PlusOutlined/>
                                </div>)
                            }
                        </Upload>
                    }


                    <Form.Item
                        name='content'
                        label='内容'
                        rules={[{required: true, message: '此项目为必填项!'}]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                            onChange={(value) => {

                            }}

                        />
                    </Form.Item>

                    <Form.Item label='' style={{margin: '90px 220px', width: '800px'}}>
                        <Button htmlType='submit' type='primary'
                                size='large'
                                onClick={() => {
                                    setFormData({...formData, draft: false})
                                }}
                                style={{marginRight: '60px'}}
                        >提交</Button>
                        {
                            isSend && <Button
                                size='large'
                                onClick={() => {
                                    setFormData({...formData, draft: true})
                                }}
                                htmlType='submit'>存入草稿
                            </Button>
                        }

                    </Form.Item>

                </Form>
            </Card>
        </div>
    );
}

export default Index;