import { Unit } from './unit';
import { Iteration } from './iteration';
import { PeerAssessmentForm } from './peer-assessment-form';

export interface Assignment {
  id: number;
  start_date: string;
  end_date: string;
  name: string;
  href?: string;
  unit?: Unit;
  unit_id?: number;
  pa_form?: PeerAssessmentForm;
  iterations?: Iteration[];
  iterations_attributes?: Iteration[];
}
