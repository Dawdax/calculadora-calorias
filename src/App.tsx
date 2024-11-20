import { XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useReducer } from "react";
import ActivityList from "./components/ActivityList";
import Form from "./components/Form";
import { ActivityReducer, initialState } from "./reducers/activity-reducer";
import CalorieTraker from "./components/CalorieTraker";

function App() {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = () =>
    useMemo(() => state.activities.length > 0, [state.activities]);

  return (
    <>
      <header className="bg-lime-600">
        <div className="max-w-4xl mx-auto flex justify-evenly items-center">
          <h1 className="text-center text-2xl font-bold text-white uppercase">
            Contador de calorias
          </h1>
          <button
            className="disabled:opacity-20 disabled:hover:bg-red-500 flex gap-2 items-center m-2 p-2 bg-red-500 rounded-lg text-white uppercase hover:bg-gray-900 "
            onClick={() => dispatch({ type: "restar-app" })}
            disabled={!canRestartApp()}
          >
            Eliminar Datos
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <section className="bg-lime-500 p-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 p-5">
        <div className="max-w-4xl mx-auto px-10">
          <CalorieTraker activities={state.activities} />
        </div>
      </section>

      <section className="p-5 mx-auto max-w-4xl">
        <ActivityList dispatch={dispatch} activities={state.activities} />
      </section>
    </>
  );
}

export default App;
