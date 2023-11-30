import React from 'react';
import { logInSchema} from '../validation/validate.js';
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Login({saveCurrentuser}) {
const navigate=useNavigate();
    const initialValues={
        email:'',
        password:'',
    };
    const onSubmit = async (users) => {
       
        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`, users);
        if (data == 'success')
            localStorage.setItem("userToken", data.token);
            saveCurrentuser();
            toast.success('log in succsefullt', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        navigate('/home');

    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: logInSchema
    });
    const inputss = [
        {
            id: 'email',
            type: 'email',
            name: 'email',
            title: 'user email',
            value: formik.values.email,
        },
        {
            id: 'password',
            type: 'password',
            name: 'password',
            title: 'user password',
            value: formik.values.password,
        },
    ];

    const renderInputs = inputss.map((input, index) => <Input type={input.type}
        id={input.id}
        name={input.name}
        title={input.title}
        value={input.value}
        key={index}
        onChange={formik.handleChange}
        errors={formik.errors}
        onBlur={formik.handleBlur}
        touched={formik.touched} />
    );
    return (
        <>
            <div className='container w-50'>
                <h2>login</h2>
                <form onSubmit={formik.handleSubmit}>
                    {renderInputs}
                    <button type='submit' disabled={!formik.isValid}>Login</button>
                </form>
            </div>
        </>
    );
}
