import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import useStore from "./store";
import loginUser from "./api/loginUser";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

function LoginScreen() {
  const navigate = useNavigate();
  const [setUser] = useStore((state) => [state.setUser, state.setScreen]);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "system.administrator@halcyon-pms-web.test",
    password: "secret",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [form]);

  const attemptLogin = async (e: any) => {
    e.preventDefault();
    try {
      const user = await loginUser(form.email, form.password);
      setUser(user);
      navigate("/", {
        replace: true,
      });
    } catch (error: AxiosError | any) {
      console.log("error", error);
      setErrorMessage(
        error?.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <main className="flex flex-col items-center justify-center text-black min-h-screen -mt-32 gap-2 p-14">
      <div className="items-center justify-center font-mono text-sm px-10 pt-8 flex flex-row">
        <img src={logo} style={{ height: 25, width: 75 }} alt="Logo" />
        <div className="left-0 top-0 w-full justify-center text-4xl flex-1 font-bold flex flex-row ml-4">
          <p className="text-blue-600">HA-</p>
          <p className="text-sky-400">PMS</p>
        </div>
      </div>
      <div
        className={`bg-red-500 text-white text-center p-2 rounded-md w-full h-10 ${
          errorMessage ? "visible" : "invisible"
        }`}
      >
        {errorMessage}
      </div>
      <form
        className="flex flex-col bg-white w-full text-white items-center justify-center max-w-lg gap-4"
        onSubmit={attemptLogin}
      >
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="email"
            className="text-black font-medium text-sm self-start"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            className="text-black p-1 rounded-md border px-3 font-normal text-base text-sm w-full mt-1.5"
            autoCapitalize="none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="password"
            className="text-black font-medium text-sm self-start"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            className="text-black p-1 rounded-md border px-3 font-normal text-base text-sm w-full mt-1.5"
            autoCapitalize="none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
          />
        </div>
        <button
          className="bg-sky-400 py-2 px-10 rounded-md font-medium"
          type="submit"
        >
          Login
        </button>
      </form>
    </main>
  );
}

export default LoginScreen;
