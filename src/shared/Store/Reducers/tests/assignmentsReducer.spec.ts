import { Assignment } from '../../Models/assignment';
import { assignmentsReducer } from '../assignmentsReducer';
import { AssignmentActions } from '../../Actions/assignmentActions';
import { UserActions } from '../../Actions/userActions';

describe('Reducer: Assignments', () => {
  let state: Assignment[];
  let testAssignments: Assignment[];

  beforeEach(() => {
    state = [];
    testAssignments = [
      {
        id: 3,
        start_date: "2017-01-11",
        end_date: "2017-05-12",
        name: "Assignment 76.57752187873726",
        unit_id: 2,
        href: "/assignments/3"
      },
      {
        id: 2,
        start_date: "2017-01-11",
        end_date: "2017-06-06",
        name: "Assignment 92.51456657878248",
        unit_id: 1,
        href: "/assignments/2"
      },
      {
        id: 1,
        start_date: "2017-01-11",
        end_date: "2017-06-03",
        name: "Assignment 69.62043860271753",
        unit_id: 1,
        href: "/assignments/1"
      }
    ]
  });

  it('Should return an array with the new assignments', () => {
    let action = AssignmentActions.loadAssignmentsSuccess(testAssignments)
    let actual = assignmentsReducer(state, action);

    expect(actual.length).toBe(testAssignments.length);
    expect(actual[1].name).toEqual(testAssignments[1].name);

  });

  it('should return an empty array on user logout',() => {
    let state = testAssignments;

    let action = {
      type: UserActions.USER_LOGOUT_SUCCESS
    };

    let actual = assignmentsReducer(state, action);

    expect(actual.length).toBe(0);
    expect(actual).toEqual([]);
  });

});
