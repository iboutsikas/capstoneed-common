import { GameSettings } from '../Store/Models/game-settings';
export const BASE_URL= "http://capstoneed-api.org:21992/v1";
export const STUDENT_URL = "http://student.capstoneed-dev.org:8080";
export const LECTURER_URL = "http://lecturer.capstoneed-dev.org:8085";
// export const BASE_URL= "http://10.10.11.228:21992/v1";
// export const STUDENT_URL = "http://10.10.11.228:8080";
// export const LECTURER_URL = "http://10.10.11.228:8085";
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
