
import { useAuth } from "react-oidc-context";
import toast from "react-hot-toast";
export default function useOidcAuth() {
  const auth = useAuth();

  function signIn() {
    return auth.signinRedirect();
  }

  function signOut() {
    return auth.removeUser();
  }

  return {
    ...auth,
    signIn,
    signOut,
  };
}
