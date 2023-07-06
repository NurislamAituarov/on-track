import { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

export interface INavItems {
  title: string;
  id: number;
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>;
}
export type THourItem = {
  hour: number;
};

export interface IPeriodSelectItem {
  value: number;
  label: string;
}

export interface IActivitiesItem {
  id: string;
  name: string;
  secondsToComplete: number;
}
