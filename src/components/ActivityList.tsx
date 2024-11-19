import { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo } from "react";

interface ListProps {
  activities: Activity[];
}

export default function ActivityList({ activities }: ListProps) {
  const CategoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((categ) => (categ.id === category ? categ.name : "")),
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      {activities.map((item) => (
        <div
          key={item.id}
          className="flex justify-between p-5 mt-5 bg-white border rounded-lg shadow"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 p-2 rounded-lg text-white uppercase font-bold ${
                item.category === 1 ? "bg-lime-500" : "bg-orange-500"
              }`}
            >
              {CategoryName(+item.category)}
            </p>
            <p className="text-2xl font-bold pt-2">{item.name}</p>

            <p className="font-bold text-4xl text-lime-500">
              {item.calories} {""} Calorías{" "}
            </p>
          </div>
          <div>
            <p>Acción</p>
          </div>
        </div>
      ))}
    </>
  );
}
