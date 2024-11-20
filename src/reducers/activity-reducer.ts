import { Activity } from "../types";

export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-activeId";
      payload: { id: Activity["id"] };
    }
  | {
      type: "drop-activeId";
      payload: { id: Activity["id"] };
    }
  | {
      type: "restar-app";
    };

export interface ActivityState {
  activities: Activity[];
  activeId: Activity["id"];
}

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const ActivityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    //Maneja la logica para actualizar el state
    let updatedActivities: Activity[] = [];

    if (state.activeId) {
      updatedActivities = state.activities.map((act) =>
        act.id === state.activeId ? action.payload.newActivity : act
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "drop-activeId") {
    return {
      ...state,
      activities: state.activities.filter(
        (act) => act.id !== action.payload.id
      ),
    };
  }

  if (action.type === "restar-app") {
    return {
      activities: [],
      activeId: "",
    };
  }
  return state;
};
