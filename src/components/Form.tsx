import { categories } from "../data/categories";
import { useState, Dispatch, useEffect } from "react";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";
import { v4 as uuidv4 } from "uuid";

interface FormProps {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
}

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateAct) => stateAct.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    // Validar solo números para campos numéricos
    if (isNumberField && !/^\d*$/.test(e.target.value)) {
      return;
    }
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;

    return name.trim() !== "" && calories > 0;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white shadow p-10 rounded-lg"
      >
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="font-bold">
            Categoría:
          </label>
          <select
            id="category"
            value={activity.category}
            onChange={handleChange}
            className="border border-x-slate-300 p-2 rounded-lg w-full bg-white "
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold">
            Actividad:
          </label>
          <input
            id="name"
            type="text"
            value={activity.name}
            onChange={handleChange}
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ejemplo: Jugo de naranaja, Bicicleta, Pesas, Manzana"
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories" className="font-bold">
            Calorías:
          </label>
          <input
            value={activity.calories}
            onChange={handleChange}
            id="calories"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ejemplo: 200"
          />
        </div>
        <input
          disabled={!isValidActivity()}
          type="submit"
          className="bg-cyan-700 hover:bg-cyan-900 w-full font-bold uppercase text-white cursor-pointer disabled:opacity-15"
          value={`Guardar ${activity.category === 1 ? "Comida" : "Ejercicio"}`}
        ></input>
      </form>
    </>
  );
}
