import React, { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import moment from "moment";

interface AuthInterface {
    isAuthenticated: boolean;
    saveUserToken: (token: string) => void;
    removeUserToken: () => void;
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

    const isLocalUserTokenValid = (token: string) => {
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        return decodedToken && moment().isBefore(moment.unix(decodedToken.exp as number));
    };

    const getUserToken = () => {
        return localStorage.getItem("bwm_user_token") ?? "";
    };

    const saveUserToken = (token: string) => {
        localStorage.setItem("bwm_user_token", token);
        setAuthenticated(isLocalUserTokenValid(getUserToken()));
    };

    const removeUserToken = () => {
        localStorage.removeItem("bwm_user_token");
        setAuthenticated(isLocalUserTokenValid(getUserToken()));
    };

    useEffect(() => {
        setAuthenticated(isLocalUserTokenValid(getUserToken()));
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, saveUserToken, removeUserToken}}>
            {props.children}
        </AuthContext.Provider>
    );
}