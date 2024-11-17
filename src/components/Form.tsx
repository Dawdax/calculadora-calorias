import { categories } from "../data/categories";
import { useState } from "react";
import { Activity } from "../types";

export default function Form() {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calories: 0,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    console.log(isNumberField);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;

    return name.trim() !== "" && calories > 0;
  };

  return (
    <>
      <form className="space-y-5 bg-white shadow p-10 rounded-lg">
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
            type="number"
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
