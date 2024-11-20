import { TrophyIcon } from "@heroicons/react/24/outline";
import { Activity } from "../types";
import { useMemo } from "react";
import CalorieDisplay from "./CalorieDisplay";

interface CalorieTrakerProps {
  activities: Activity[];
}

export default function CalorieTraker({ activities }: CalorieTrakerProps) {
  //Contadores

  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const DeficitTotal = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );

  return (
    <>
      <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-white text-center">
        Resumen de calorías
        <TrophyIcon className="w-6 h-8" />
      </h2>
      <div className="flex flex-col items-center md:flex-row md: justify-between gap-5 mt-5">
        <CalorieDisplay
          calories={caloriesConsumed}
          text="Consumidas"
          color="text-lime-500"
        />
        <CalorieDisplay
          calories={DeficitTotal}
          text="Déficit calórico"
          color=""
        />
        <CalorieDisplay
          calories={caloriesBurned}
          text="Quemadas"
          color="text-orange-500"
        />
      </div>
    </>
  );
}
