

import axios from 'axios';

const getToken = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicHdkIjoiMTI0IiwiaWF0IjoxNzA5Nzg1Mzk3fQ.KrFXTOI829vGZf9KdZxOYjI6FdtI2vt44NKDryiAxiQ';
};

const axiosWithToken = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
    },
});
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS';
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';

export const fetchEmployeesSuccess = (employees) => ({
    type: FETCH_EMPLOYEES_SUCCESS,
    payload: employees,
});

export const addEmployeeSuccess = (employee) => ({
    type: ADD_EMPLOYEE_SUCCESS,
    payload: employee,
});

export const updateEmployeeSuccess = (employee) => ({
    type: UPDATE_EMPLOYEE_SUCCESS,
    payload: employee,
});

export const deleteEmployeeSuccess = (index) => ({
    type: DELETE_EMPLOYEE_SUCCESS,
    payload: index,
});

export const fetchEmployees = () => {
    return async (dispatch) => {
        try {
            const response = await axiosWithToken.get('http://localhost:4000/v1/employee');
            dispatch(fetchEmployeesSuccess(response.data));
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };
};

export const addEmployee = (employee) => {
    return async (dispatch) => {
        try {
            const response = await axiosWithToken.post('http://localhost:4000/v1/employee', employee);
            dispatch(addEmployeeSuccess(response.data));
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };
};

export const updateEmployee = (employee, empid) => {
    return async (dispatch) => {
        try {
            const response = await axiosWithToken.put(`http://localhost:4000/v1/employee/${empid}`, employee);
            dispatch(addEmployeeSuccess(response.data));
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };
};

export const deleteEmployee = (empid) => {
    return async (dispatch) => {
        try {
            const response = await axiosWithToken.delete(`http://localhost:4000/v1/employee/${empid}`);
            dispatch(deleteEmployeeSuccess(response));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };
};
