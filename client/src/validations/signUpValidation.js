import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').min(7, 'Email must be at lest 7 characters').required('Email is required'),
    username: yup.string().min(5, 'Username must be at least 5 characters').required('Username is required'),
    fullName: yup.string().required('Full Name is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').max(12, 'Password cannot exceed 12 characters').required('Password is required'),
});
