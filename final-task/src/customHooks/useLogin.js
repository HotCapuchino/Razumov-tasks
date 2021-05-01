import React, { useState } from 'react';

export const loginContext = React.createContext();

export const userContext = React.createContext();

export const LoginContextProvider = (props) => {
    const [loginInfo, setLoginInfo] = useState(sessionStorage.getItem('loggedin') || false);
    console.log(loginInfo);
    return (
        <loginContext.Provider value={[loginInfo, setLoginInfo]}>
            {props.children}
        </loginContext.Provider>
    );
}

export const UserContextProvider = (props) => {
    const [userInfo, setUserInfo] = useState(sessionStorage.getItem('userid') || null);

    return (
        <userContext.Provider value={[userInfo, setUserInfo]}>
            {props.children}
        </userContext.Provider>
    );
}
