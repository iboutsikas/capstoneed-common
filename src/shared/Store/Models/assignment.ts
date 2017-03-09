import { Unit } from './unit';
import { Iteration } from './iteration';

export interface Assignment {
  id: number;
  start_date: string;
  end_date: string;
  name: string;
  href?: string;
  unit?: Unit;
  unit_id?: number;
  iterations?: Iteration[];
}
