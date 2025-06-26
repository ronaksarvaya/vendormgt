import {GoogleLogin} from "@react-oauth/google"
import { useNavigate } from 'react-router-dom';







const Landing = () => {
    const navigate = useNavigate();
  return (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  <GoogleLogin
    onSuccess={(credentialResponse) => {
      console.log(credentialResponse);
      navigate("/home");
    }}
    onError={() => {
      console.log("login failed yaar");
    }}
  />
</div>

  )
}

export default Landing
