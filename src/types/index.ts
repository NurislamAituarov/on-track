import { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

export interface INavItems {
  title: string;
  id: number;
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>;
}
