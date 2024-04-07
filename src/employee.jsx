import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchEmployees, addEmployee, deleteEmployee } from './employeeAction';
import AddEmployeeModal from './addEmployeeModal';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Employee = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employee.employees);

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch]);

    const handleAdd = (formData) => {
        const confirmed = window.confirm('Are you sure you want to submit this form?');
        if (confirmed) {
            try {
                dispatch(addEmployee(formData)).then((res) => {
                    dispatch(fetchEmployees())
                });
            } catch (error) {
                console.error('Error adding employee:', error);
            }
        }

    };

    const handleDelete = (index) => {
        const confirmed = window.confirm('Are you sure you want to delete?');
        if (confirmed) {
            try {
                dispatch(deleteEmployee(index)).then((res) => {
                    dispatch(fetchEmployees())
                });
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }

    };

    return (
        <div>
            <h1>Employee Management APP</h1>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>Add Employee</Button>
            <AddEmployeeModal open={openModal} handleClose={handleCloseModal} handleAdd={handleAdd} />

            <hr />
            <h2>Employees</h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee, index) => (
                            <TableRow key={employee._id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.age}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.dateOfBirth}</TableCell>
                                <TableCell>{`${employee.address?.street}, ${employee.address?.city}, ${employee.address?.state}, ${employee.address?.zip}`}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(employee._id)}>Delete</Button>
                                    {/* Update button can be added here */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Employee;
