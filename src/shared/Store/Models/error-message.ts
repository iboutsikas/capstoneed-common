export interface ErrorMessage {
  type: ErrorType;
  message: string;
}

export enum ErrorType {
  User,
  Project,
  Unit,
  Assignment,
  LogEntry,
  Iteration,
  Question,
  PeerAssessmentForm
}
