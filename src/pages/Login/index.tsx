import style from './index.module.scss'
import {Button, Card, Checkbox, Form, Input} from 'antd';
import logo from '@/assets/imgs/logo.png'
import {useDispatch} from "react-redux";
import {AsyncGetToken} from '@/store/action/UserActions'
import {useLocation} from "react-router-dom";

function Index() {
    let location = useLocation<{ from: string | undefined }>()
    let dispatch = useDispatch()
    let SubmitForm = ({mobile, code}: { mobile: string; code: string, remember: boolean }) => {
        let data = {mobile, code}
        dispatch(AsyncGetToken(data, location.state?.from))
    }


    return (
        <div className={style.root}>
            <div className="login">
                <Card className="login-container">
                    <img className="login-logo" src={logo} alt=''/>
                    <Form
                        name="basic"
                        initialValues={{mobile: 13513725838, code: '246810', remember: true}}
                        autoComplete="off"
                        onFinish={SubmitForm}
                    >
                        <Form.Item
                            name="mobile"
                            validateTrigger={'onBlur'}
                            rules={[
                                {required: true, message: '手机号码不能为空!'},
                                {pattern: /^1[3-9]\d{9}$/, message: '手机号码格式有误!'}
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="code"
                            validateTrigger={'onBlur'}
                            rules={[
                                {required: true, message: '密码不能为空!'},
                                {pattern: /\w{6,14}/, message: '密码必须是6到14位!'}
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                            <Checkbox>我已阅读相关协议</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block={true}>
                                登&nbsp;&nbsp;&nbsp;陆
                            </Button>
                        </Form.Item>
                    </Form>


                </Card>
            </div>
        </div>
    );
}

export default Index;