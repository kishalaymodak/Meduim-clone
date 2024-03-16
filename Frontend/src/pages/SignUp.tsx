import Auth from "../component/Auth";
import Quorte from "../component/Quorte";

function SignUp() {
  return (
    <div className="flex">
      <div className="h-screen w-full">
        <Auth type="/" />
      </div>
      <div className=" hidden md:contents">
        <Quorte />
      </div>
    </div>
  );
}

export default SignUp;
