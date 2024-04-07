import { FETCH_EMPLOYEES_SUCCESS, ADD_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_SUCCESS, UPDATE_EMPLOYEE_SUCCESS } from './employeeAction';

const initialState = {
    employees: [],
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.payload,
            };
        case ADD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: [...state.employees, action.payload],
            };
        case UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: [...state.employees, action.payload],
            };
        case DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employees: state.employees.filter((employee, index) => index !== action.payload),
            };
        default:
            return state;
    }
};

export default employeeReducer;
