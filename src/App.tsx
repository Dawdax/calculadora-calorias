import Form from "./components/Form";
import { useReducer } from "react";
import { ActivityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";

function App() {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);

  return (
    <>
      <header className="bg-lime-600">
        <div className="max-w-4xl mx-auto flex justify-evenly">
          <h1 className="text-center tex-lg font-bold text-white uppercase">
            Contador de calorias
          </h1>
          <h2>hj</h2>
        </div>
      </header>

      <section className="bg-lime-500 py-5 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} />
        </div>
      </section>
      <section className="p-5 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} />
      </section>
    </>
  );
}

export default App;
