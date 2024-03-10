import { Link } from "react-router-dom";

import { X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import googleLogo from "../../assets/google.svg";
import loginImg from "../../assets/imgs/login-graphic.png";
import signup from "../../assets/imgs/signup-graphic.png";

export function Authentication({ method }: { method: string }) {
  const loginView = {
    name: "login",
    img: loginImg,
    header: "Login to Continue",
    subheader: "New to TimeFlex?",
    button: "Log in",
  };

  const signupView = {
    name: "signup",
    img: signup,
    header: "Let's get started",
    subheader: "Already have an account?",
    button: "Signup with Email",
  };

  const view = method === "login" ? loginView : signupView;

  return (
    <div className="fixed inset-0 z-50 grid h-full w-full grid-cols-12 overflow-hidden bg-[#f8f8fb]">
      <div className="col-span-5">
        <div
          style={{
            backgroundImage: `url(${view.img})`,
          }}
          className="flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat"
        >
          <img
            src="https://static.lightxeditor.com/assets/images/logo-login.png"
            alt=""
          />
        </div>
      </div>
      <div className="col-span-7 pr-3">
        <div className="relative h-full w-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-4 hover:bg-[#f0f0f9]"
          >
            <X size={21} />
          </Button>

          <div className="mx-auto flex h-full max-w-[500px] flex-col justify-center gap-11">
            <div>
              <h1 className="mb-2 text-3xl font-semibold">{view.header}</h1>
              <div className="text-base">
                <span className="text-gray-400">{view.subheader}</span>
                <Link
                  to={`/login?view=${
                    view.name === "login" ? "signup" : "login"
                  }`}
                  className="ml-2 font-semibold"
                >
                  {view.name === "login" ? "Sign Up" : "Login"}
                </Link>
              </div>
            </div>

            <div>
              {/* Login with google */}
              <div className="relative border-b pb-8">
                <a
                  href="http://localhost:8000/auth/google"
                  className="inline-flex items-center gap-3 rounded-full border px-6 py-2 hover:border-[#d4e4fc] hover:bg-[#f6f7fb]"
                >
                  <img src={googleLogo} alt="Google logo" className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </a>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#f8f8fb] px-2 text-xs font-medium text-slate-400">
                  OR
                </span>
              </div>

              <div className="mt-11 flex flex-col gap-9">
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email address"
                      className="rounded-xl bg-[#efeff4] px-6 py-4 text-sm font-medium text-black outline-none"
                    />
                    <p className="mt-1 hidden text-xs text-[#e20e33]">
                      Please enter a valid email address
                    </p>
                  </div>

                  {view.name === "login" && (
                    <div className="flex flex-col">
                      <div className="mb-2 flex justify-between text-sm font-medium">
                        <label htmlFor="password">Password</label>
                        <a href="">Forgot Password?</a>
                      </div>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter email address"
                        className="rounded-xl bg-[#efeff4] px-6 py-4 text-sm font-medium text-black outline-none"
                      />
                      <p className="mt-1 hidden text-xs text-[#e20e33]">
                        Please enter a valid password.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start gap-9">
                  <p className="hidden rounded-lg bg-red-100 px-3 py-5 text-xs text-[#e20e33]">
                    Username or password that you have entered doesn't match any
                    account.
                  </p>
                  <button className="rounded-xl bg-black px-6 py-3 text-white">
                    {view.button}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
