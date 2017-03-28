export interface PeerAssessment {
  submitted_for_id: number;
  answers: PeerAssessmentAnswer[];
  pa_form_id: number;
}

export interface PeerAssessmentAnswer {
  answer: string | number;
  question_id: number;
}
