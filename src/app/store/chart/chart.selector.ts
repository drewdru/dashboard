import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChartState } from "./chart.state";

export const selectChartState = createFeatureSelector<ChartState>("chart");
export const selectChartDateRange = createSelector(
  selectChartState,
  (state: ChartState) => state?.dateRange
);
