import { createAction, props } from "@ngrx/store";

export const setDateRange = createAction(
  "[Set Date Range] Set Date Range",
  props<{ dateRange: string[] }>()
);
