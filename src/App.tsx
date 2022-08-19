import {Redirect, Router, Switch} from 'react-router-dom'
import Login from '@/pages/Login'
import history from '@/utils/history'
import {Provider} from 'react-redux'
import store from '@/store'
import Layout from "@/pages/Layout";
import AuthRoute from '@/components/AuthRoute'
import KeepAlive from "@/components/KeepAlive";

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <div className="App">
                    <KeepAlive alive='/login' path='/login' component={Login} exact={true}></KeepAlive>

                    <Switch>
                        <Redirect to='/index' from='/' exact/>
                        <AuthRoute path='/index' component={Layout}></AuthRoute>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
