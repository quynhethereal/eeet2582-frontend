import { useAuth } from "react-oidc-context";
export default function useOidcAuth() {
  const auth = useAuth();

  function signIn() {
    return auth.signinRedirect();
  }

  function signOut() {
    localStorage.clear();
    return auth.removeUser();
  }

  return {
    ...auth,
    signIn,
    signOut,
  };
}
