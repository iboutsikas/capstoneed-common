export interface PeerAssessmentForm {
  id: number;
  iteration_id?: number;
  questions: { text: string, question_id: number }[],
  start_date?: string,
  deadline?: string,
  extension_until?: string
}
