import { createContext, ReactNode, useContext } from "react";

import * as AuthSession from "expo-auth-session";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextDataProps {
  user: UserProps;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextDataProps);

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: "123amor",
    name: "Jessiquinha",
    email: "jessiquita@Linda.com",
    photo: "https://avatars.githubusercontent.com/u/99851511?v=4",
  };

  async function signInWithGoogle() {
    try {
      const CLIENT_ID =
        "105996311066-8kf0sot0v1cj3t1deikhmpckrq26k1n8.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@eversonv4/app2_goFinance";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });

      console.log(response);
    } catch (error: any) {
      throw new Error("mensagem de erro", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContext, AuthProvider, useAuth };
