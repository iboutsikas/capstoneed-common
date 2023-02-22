import { GameSettings } from '../Store/Models/game-settings';

export const BASE_URL = process.env.CAPSTONEED_API_URL;
export const STUDENT_URL = process.env.CAPSTONEED_STUDENT_URL;
export const LECTURER_URL = process.env.CAPSTONEED_LECTURER_URL;

export const THROTTLE_TIME = 350;

export const GAME_SETTINGS_DEFAULTS: GameSettings = {
  points_log: 5,
  points_log_first_of_day: 5,
  points_peer_assessment: 50,
  points_peer_assessment_first_of_team: 20 ,
  points_project_evaluation: 50,
  points_project_evaluation_first_of_team: 20,
  max_logs_per_day: 1,
  points_project_evaluation_submitted_first_day: 120,
  points_peer_assessment_submitted_first_day: 120
};
