import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import useStore from "./store";
import loginUser from "./api/loginUser";
import { AxiosError } from "axios";

function LoginScreen() {
  const [setUser, setScreen] = useStore((state) => [
    state.setUser,
    state.setScreen,
  ]);
  const [form, setForm] = useState<{email: string, password: string}>({
    email: "jerico.pulvera@gmail.com",
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

      setScreen("MainScreen");
    } catch (error: AxiosError | any) {
      setErrorMessage(
        error?.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <main className="flex flex-col items-center justify-center text-black min-h-screen -mt-32 gap-2">
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
        <input
          type="text"
          id="email"
          className="text-black p-1 rounded-md border px-5 font-normal text-base w-full"
          placeholder="Email"
          autoCapitalize="none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
        ></input>
        <input
          type="password"
          id="password"
          className="text-black p-1 rounded-md border px-5 font-normal text-base w-full"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form.password}
        ></input>
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
