import { Action, createReducer, on } from "@ngrx/store";
import { setDateRange } from "./chart.actions";
import { ChartState } from "./chart.state";

export const initialState: ChartState = {
  dateRange: ["Jan", "Dec"],
};

const _chartReducer = createReducer(
  initialState,
  on(setDateRange, (state, { dateRange }) => {
    return { ...state, dateRange }
  })
);

export function chartReducer(state: ChartState | undefined, action: Action) {
  return _chartReducer(state, action);
}