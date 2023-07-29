import { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

export interface INavItems {
  title: string;
  id: number;
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>;
}
export type THourItem = {
  hour: number;
  activityId: null | string | number;
  activitySeconds: number;
};

export interface IOptionsItem {
  value: number | string;
  label: string;
}

export interface IPeriodSelectItem {
  value: number;
  label: string;
}

export interface IActivitiesItem {
  id: string;
  name: string;
  secondsToComplete: number | null;
}
