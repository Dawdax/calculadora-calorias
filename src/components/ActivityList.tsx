import { Activity } from "../types";
import { categories } from "../data/categories";
import { Dispatch, useMemo } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";

interface ListProps {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
}

export default function ActivityList({ activities, dispatch }: ListProps) {
  const CategoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((categ) => (categ.id === category ? categ.name : "")),
    [activities]
  );

  const isEmpyActivities = useMemo(() => activities.length === 0, [activities]);

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      {isEmpyActivities ? (
        <p className="text-center font-bold text-xl pt-5">
          No hay actividades aún
        </p>
      ) : (
        activities.map((item) => (
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
            <div className="flex gap-5 items-center">
              <button
                onClick={() => {
                  dispatch({ type: "set-activeId", payload: { id: item.id } });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <PencilSquareIcon className="h-8 w-8  text-gray-500" />
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "drop-activeId", payload: { id: item.id } })
                }
              >
                <TrashIcon className="h-8 w-8  text-red-600" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
