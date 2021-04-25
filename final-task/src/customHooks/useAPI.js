import React, { useContext } from 'react';
import {API} from '../utils/API';

const api = new API();
const apiContext = React.createContext(api);

function useAPI() {
    return useContext(apiContext);
}

export {useAPI};