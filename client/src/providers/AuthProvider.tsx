import React, { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import moment from "moment";

interface AuthInterface {
    isAuthenticated: boolean;
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
        return localStorage.getItem("bwm_user_token") ?? "";
    };

    const saveLocalUserToken = (token: string): void => {
        localStorage.setItem("bwm_user_token", token);
        setAuthenticated(isLocalUserTokenValid(getLocalUserToken()));
    };

    const removeLocalUserToken = (): void => {
        localStorage.removeItem("bwm_user_token");
        setAuthenticated(isLocalUserTokenValid(getLocalUserToken()));
    };

    useEffect(() => {
        setAuthenticated(isLocalUserTokenValid(getLocalUserToken()));
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, saveLocalUserToken, removeLocalUserToken}}>
            {props.children}
        </AuthContext.Provider>
    );
}