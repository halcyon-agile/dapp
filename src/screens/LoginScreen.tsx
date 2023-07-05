import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import useStore from "../store";
import loginUser from "../api/loginUser";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AxiosError } from "axios";
import { LogIn } from "lucide-react";

function LoginScreen() {
  const navigate = useNavigate();
  const [setUser] = useStore((state) => [state.setUser]);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email:
      import.meta.env.VITE_MODE === "DEV"
        ? "system.administrator@halcyon-pms-web.test"
        : "",
    password: "",
  });
  const [attempting, attemptingLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [form]);

  const attemptLogin = async (e: any) => {
    attemptingLogin(true);
    e.preventDefault();
    try {
      const user = await loginUser(form.email, form.password);
      setUser(user);
      navigate("/", {
        replace: true,
        state: {
          screen: "login",
        },
      });
      attemptingLogin(false);
    } catch (error: AxiosError | any) {
      console.log("error", error);
      attemptingLogin(false);
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
          <p className="text-blue-600">HARP</p>
          {/* <p className="text-sky-400">PMS</p> */}
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
            className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
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
            className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
            autoCapitalize="none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
          />
        </div>
        {attempting ? (
          <ColorRing
            visible={attempting}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          // <Button
          <button
            className="bg-sky-400 py-2 px-5 rounded-md font-medium flex flex-row gap-3 items-center self-end"
            type="submit"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>
        )}
      </form>
    </main>
  );
}

export default LoginScreen;
