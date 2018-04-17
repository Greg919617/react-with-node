import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
   const res =  await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data });
};


//const fetchUser = ()  is the argument list
// everything after => { is the function body}
//async await syntax rather than .then promises