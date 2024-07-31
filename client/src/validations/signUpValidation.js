import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    email: yup.string().email().min(7).required(),
    username: yup.string().min(5).required(),
    fullName: yup.string().required(),
    password: yup.string().min(4).max(12).required(),
});
