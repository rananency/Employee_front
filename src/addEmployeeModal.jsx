import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addEmployee, fetchEmployees, updateEmployee } from './employeeAction';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const AddEmployeeModal = ({ open, handleClose, employeeData }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        dateOfBirth: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        photo: null,
    });
    const [emailError, setEmailError] = useState(false);
    const [dateOfBirthError, setDobError] = useState(false);

    useEffect(() => {
        if (employeeData._id) {
            setFormData(employeeData)
        } else {
            setFormData({
                name: '',
                age: '',
                email: '',
                dateOfBirth: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zip: ''
                },
                photo: null,
            })
        }
    }, [employeeData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'email') {
            setEmailError(!validateEmail(value));
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isFutureDate = (dateString) => {
        const selectedDate = new Date(dateString);
        const currentDate = new Date();
        return selectedDate > currentDate;
    };

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value
            }
        }));
    };
    const handlePhotoChange = (event) => {
        console.log("files", event.target.files[0])
        setFormData(prevState => ({
            ...prevState,
            photo: event.target.files[0]
        }));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.email || !formData.dateOfBirth) {
            return;
        }

        if (!validateEmail(formData.email)) {
            setEmailError(true);
            return;
        }

        if (isFutureDate(formData.dateOfBirth)) {
            setDobError(true);
            return;
        }
        if (employeeData._id) {
            dispatch(updateEmployee(formData, employeeData._id));
        }
        else {
            dispatch(addEmployee(formData));
        }
        dispatch(fetchEmployees())
        handleClose();
        setFormData({
            name: '',
            age: '',
            email: '',
            dateOfBirth: '',
            address: {
                street: '',
                city: '',
                state: '',
                zip: ''
            },
            photo: null,
        });
        setEmailError(false);
        setDobError(false);
    };

    const hasError = emailError || dateOfBirthError || !formData.name || !formData.email || !formData.dateOfBirth;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                <DialogContent>
                    <form className={classes.root}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={emailError}
                            helperText={emailError ? 'Invalid email address' : ''}
                        />
                        <TextField
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            fullWidth
                            error={dateOfBirthError}
                            helperText={dateOfBirthError ? 'Date of birth cannot be a future date' : ''}
                        />
                        <TextField
                            label="Street"
                            name="street"
                            type='text'
                            value={formData.address.street}
                            onChange={handleAddressChange}
                            fullWidth
                        />
                        <TextField
                            label="City"
                            name="city"
                            value={formData.address.city}
                            onChange={handleAddressChange}
                            fullWidth
                        />
                        <TextField
                            label="State"
                            name="state"
                            value={formData.address.state}
                            onChange={handleAddressChange}
                            fullWidth
                        />
                        <TextField
                            label="Zipcode"
                            name="zip"
                            value={formData.address.zip}
                            onChange={handleAddressChange}
                            fullWidth
                        />
                        <TextField
                            label="photo"
                            type="file"
                            name="photo"
                            // value={formData.photo}
                            onChange={handlePhotoChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" disabled={hasError}>
                        {employeeData._id ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddEmployeeModal;
