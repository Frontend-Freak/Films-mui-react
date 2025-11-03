import { createStore} from "redux";
import { authReducer } from './reducers/auth-reducer'



export const store = createStore(authReducer)