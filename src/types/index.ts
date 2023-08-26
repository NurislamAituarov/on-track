import { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

export interface INavItems {
  title: string;
  id: number;
  // icon: FunctionalComponent<HTMLAttributes & VNodeProps>;
  icon: string;
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

// Form type

export interface IValidators {
  required: () => boolean;
  minLength?: any;
}

export interface IField {
  validators: IValidators;
  value: string;
  valid?: boolean;
  errors?: IErrors;
  touched?: boolean;
  blur?: () => void;
}

export interface IForm {
  email: IField;
  password: IField;
  valid: boolean;
}

export interface IErrors {
  required?: boolean;
  minLength?: boolean;
}

export type UpdateTimelineItemActivityFunction = (timelineItem: THourItem, second: number) => void;
