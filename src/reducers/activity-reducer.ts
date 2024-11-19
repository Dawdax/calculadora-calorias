import { Activity } from "../types";

export type ActivityActions = {
  type: "save-activity";
  payload: { newActivity: Activity };
};

interface ActivityState {
  activities: Activity[];
}

export const initialState: ActivityState = {
  activities: [],
};

export const ActivityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    //Maneja la logica para actualizar el state

    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity],
    };
  }
  return state;
};
