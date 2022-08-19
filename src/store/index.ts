import {applyMiddleware, createStore} from 'redux'
import reducer from './reducer'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk, {ThunkAction} from "redux-thunk";
import {UserAction} from "@/store/reducer/User";
import {ManageActions} from '@/store/reducer/Manage'

let store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))


export type RootStore = ReturnType<typeof store.getState>;
export type RootDispatch = ReturnType<typeof store.dispatch>;
export type RootAction = UserAction | ManageActions

export type RootThunkAction = ThunkAction<// 异步Action的返回值类型
    Promise<void>,
    //getState的类型
    RootStore,
    unknown,
    // dispatch的类型
    RootAction>;
export default store