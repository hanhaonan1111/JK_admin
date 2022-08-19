import {Layout, Menu, MenuProps, message, Popconfirm} from 'antd'
import style from './index.module.scss'
import {Switch, useHistory, useLocation} from "react-router-dom";
import Home from './components/Index'
import Send from './components/Send'
import Manage from './components/Manage'
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AsyncGetUserData, SetToken} from "@/store/action/UserActions";
import {BookFilled, ContainerFilled, EyeTwoTone, LogoutOutlined} from '@ant-design/icons';
import {setToken} from "@/utils/token";
import {StateType, Token} from "@/store/reducer/User";
import KeepAlive from "@/components/KeepAlive";
import AuthRoute from "@/components/AuthRoute";
import Edit from "@/pages/Layout/components/Edit";

const {Header, Sider} = Layout

const items = [
    {label: '数据概览', key: '1', icon: <EyeTwoTone/>},
    {label: '内容管理', key: '2', icon: <ContainerFilled/>},
    {label: '发布文章', key: '3', icon: <BookFilled/>},
]
let urls = ['/index', '/index/manage', '/index/send']


function Index() {
    let location = useLocation()
    let box = useRef<HTMLDivElement>(null)
    let [now, setNow] = useState('')
    useEffect(() => {
        console.log(box)
        box.current && box.current.scrollTo({
            top: Math.random(),
            behavior: 'smooth'
        })
    }, [location.pathname])

    useEffect(() => {
        let route = location.pathname
        let is = new RegExp(/\/index\/manage\/\w+/)
        if (is.test(route)) {
            urls[1] = route
        }
        let index = urls.findIndex(v => v === route)
        index += 1
        setNow('' + index)

    }, [])

    let dispatch = useDispatch()
    let history = useHistory()
    useEffect(() => {
        dispatch(AsyncGetUserData())
    }, [dispatch])
    // TODO
    let {userinfo} = useSelector<any, StateType>((v) => v.User)

    useEffect(() => {
        history.push(urls[+now - 1])
    }, [now])
    const onClick: MenuProps['onClick'] = (e) => {

        setNow(e.key)
    }

    const onConfirm = () => {
        setToken({} as Token)
        dispatch(SetToken({} as Token))
        history.push('/login')
        message.success(
            '退出成功!', 1)
    }
    return (
        <Layout className={style.root}>
            <Header className="header">
                <div className="logo"/>
                {/* + 用户信息 */}
                <div className="user-info">
                    <span className="user-name">{userinfo.name}</span>
                    <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    {/* + 菜单 */}
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={[now]}
                        items={items}
                        onClick={onClick}
                        style={{height: '100%', borderRight: 0}}
                    >
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{padding: 20}} ref={box}>
                    {/*    路由展示区  */}
                    <KeepAlive path='/index/send' alive='/index/send' component={Send}></KeepAlive>
                    <KeepAlive path='/index/manage' alive='/index/manage' component={Manage}></KeepAlive>
                    <Switch>
                        <AuthRoute exact path='/index' component={Home}></AuthRoute>
                        <AuthRoute exact path='/index/manage/:id' component={Edit}></AuthRoute>
                    </Switch>

                </Layout>
            </Layout>
        </Layout>
    );
}

export default Index;