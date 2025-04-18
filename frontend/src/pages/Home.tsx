import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-primary h-full flex items-center pb-32">
      <div className="lg:max-w-5xl w-full m-auto flex justify-between items-center flex-col md:flex-row px-3">
        <div className="max-w-sm lg:max-w-md w-full p-5">
          <h1 className="my-6 text-center font-bold lg:text-6xl text-4xl">
            Your Data. Our Knowledge. Your Power
          </h1>
          <p className="text-center">
            NewBlazr is an intelligent platform that turns your data into
            answers. We combine your personal, professional, and external
            information to deliver smart, personalized insights—helping you make
            better decisions faster. Sign up now to join the waitlist!
          </p>
        </div>
        <div className="max-w-sm lg:max-w-sm w-full rounded-lg bg-white shadow-lg p-4">
          <h2 className="text-center font-bold  lg:text-2xl text-xl pb-2">{`${
            isLogin ? "Login" : "Signup"
          } Form`}</h2>
          {isLogin ? <LoginForm /> : <SignupForm />}
          {isLogin ? (
            <div className="flex items-center w-full justify-center pt-4 flex-col sm:flex-row">
              <p>Not a member?</p>
              <button
                className="bg-none p-0 border-none text-primary bg-transparent pl-2 focus:outline-none focus:border-none"
                onClick={() => setIsLogin(false)}
              >
                Signup Now
              </button>
            </div>
          ) : (
            <div className="flex items-center w-full justify-center pt-4 flex-col sm:flex-row">
              <p>Already have an account?</p>
              <button
                className="bg-none p-0 border-none text-primary bg-transparent pl-2 focus:outline-none focus:border-none"
                onClick={() => setIsLogin(true)}
              >
                Login Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
