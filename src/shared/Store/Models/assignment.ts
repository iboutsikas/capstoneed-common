import { Unit } from './unit';

export interface Assignment {
  id: number;
  start_date: string;
  end_date: string;
  name: string;
  href: string;
  unit: Unit;
}
