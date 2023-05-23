import LoginScreen from "./LoginScreen";
import SelectTasksScreen from "./SelectTasksScreen";
import MainScreen from "./MainScreen";
import useStore from "./store";

function App() {
  const [screen] = useStore((state) => [state.screen]);

  if (screen === "SelectTasksScreen") {
    return <SelectTasksScreen />;
  }

  if (screen === "MainScreen") {
    return <MainScreen />;
  }

  return <LoginScreen />;
}

export default App;
