import NonAuthorizedRoutes from "./NonAuthorizedRoutes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthorizedRoutes from "./AuthorizedRoutes";
function Routes() {
  const navigate = useNavigate();
  const accToken = () => {
    return localStorage.getItem("accessToken");
  };
  const accessToken = accToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/sign-in");
    }
  
  }, [accessToken]);
  return (
    <>
      {!accessToken ? (
        <NonAuthorizedRoutes />
      ) : (
        <AuthorizedRoutes isAuthenticated={!!accessToken} />
      )}
    </>
  );
}

export default Routes;
