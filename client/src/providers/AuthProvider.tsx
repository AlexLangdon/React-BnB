import React, { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import moment from "moment";

interface AuthInterface {
    isAuthenticated: boolean;
    getUserName: () => string;
    saveLocalUserToken: (token: string) => void;
    removeLocalUserToken: () => void;
}

const AuthContext = React.createContext<AuthInterface>({} as AuthInterface);

export const useAuth = (): AuthInterface => {
    return useContext(AuthContext);
};

type Props = {
    children: React.ReactChild | React.ReactChild[];
};

export function AuthProvider(props: Props): JSX.Element {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    const isLocalUserTokenValid = (token: string): boolean => {
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        return decodedToken && moment().isBefore(moment.unix(decodedToken.exp as number));
    };

    const getLocalUserToken = (): string => {
        return localStorage.getItem("react_bnb_user_token") ?? "";
    };

    const saveLocalUserToken = (token: string): void => {
        localStorage.setItem("react_bnb_user_token", token);
        setAuthenticated(isLocalUserTokenValid(getLocalUserToken()));
    };

    const removeLocalUserToken = (): void => {
        localStorage.removeItem("react_bnb_user_token");
        setAuthenticated(isLocalUserTokenValid(getLocalUserToken()));
    };

    const getUserName = (): string => {
        const token = getLocalUserToken();
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        return decodedToken.username;
    };

    useEffect(() => {
        setAuthenticated(isLocalUserTokenValid(getLocalUserToken()));
    }, []);

    const value: AuthInterface = {
        isAuthenticated, 
        getUserName, 
        saveLocalUserToken, 
        removeLocalUserToken
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}