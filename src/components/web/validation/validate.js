import * as yup from'yup';
export const registerSchema=yup.object({
    userName:yup.string().required("user name is required").min(3,"must be at least3 character").max(30,"must be at most 30character"),
    email:yup.string().required("email is required").email(),
    password:yup.string().required("password is requiered").min(3,"must be at least3 character").max(30,"must be at most 30character")

});
export const logInSchema=yup.object({
    email:yup.string().required("email is required").email(),
    password:yup.string().required("password is requiered").min(3,"must be at least3 character").max(30,"must be at most 30character")

});