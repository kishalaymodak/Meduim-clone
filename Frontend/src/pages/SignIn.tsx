import Auth from "../component/Auth";
import Quorte from "../component/Quorte";
function SignIn() {
  return (
    <div className=" flex ">
      <div className="h-screen w-full">
        <Auth type="Sign In" />
      </div>
      <div className=" hidden md:contents">
        <Quorte />
      </div>
    </div>
  );
}

export default SignIn;
