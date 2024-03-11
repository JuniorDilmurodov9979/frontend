import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../../Api/api";

export function Login() {
  const postLogin = async () => {
    await api.user({
      url: "/user/login",
      formData: {
        email: "",
        password: "",
      },
    });
  };

  return (
    <div className=" mx-auto">
      <div className="flex items-center">
        <div className="wrapper__register w-[576px]"></div>
        <div className="flex flex-col ml-[112px] mt-[75px] ">
          <h2 className="font-black text-4xl text-[#fff] mb-3 ">Sign in</h2>
          <div className="flex gap-1">
            <p className="text-sm text-[#fff] ">Do not you have an account?</p>
            <Link to="/register" className="text-sm text-[#549FF9] ">
              Sign up
            </Link>
          </div>
          <form className="flex flex-col w-[330px] gap-4 mt-5 ">
            <input
              className="block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] "
              type="email"
              placeholder="Email"
            />
            <input
              className="block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] "
              type="password"
              placeholder="Password"
            />
            <button
              className="text-[#000] font-medium text-lg py-2 text-center bg-[#fff] rounded-3xl mt-4 "
              type="submit"
            >
              Next Step
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
