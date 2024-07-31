import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username: yup.string().min(5).required(),
    password: yup.string().min(4).max(12).required(),
});