import React from 'react'
import { registerSchema } from '../validation/validate.js'
import Input from '../../pages/Input'
import 'bootstrap/dist/css/bootstrap.min.css'
import { toast } from 'react-toastify';
import axios from 'axios'

import { useFormik } from 'formik'


function Register() {
const initialValues={
    userName:'',
    email:'',
    password:'',
};
const handelFieldChange =(event)=>{
formik.setFieldValue('image',event.target.files[0]);
}
const onSubmit= async users=>{
  //console.log(users);

  const formData=new FormData();
  formData.append("userName",users.userName);
  formData.append("email",users.email);
  formData.append("password",users.password);
  formData.append("image",users.image);
   const{data}=await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`,formData);
//console.log(data);
  if(data=='success'){
    formik.resetForm();
    toast.success('creat account succsefullt,please cheack email to log in', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
   //toast.success("user added successfully");
}
}

const formik=useFormik({
    initialValues,
    onSubmit,
    validationSchema:registerSchema

});
 const inputss=[
        {
            id:'username',
            type:'text',
            name:'userName',
            title:'user name',
            value:formik.values.userName,
        },
        {
            id:'email',
            type:'email',
            name:'email',
            title:'user email',
            value:formik.values.email,
        },
        {
            id:'password',
            type:'password',
            name:'password',
            title:'user password',
            value:formik.values.password,
        },
        {
            id:'image',
            type:'file',
            name:'image',
            title:'user image',
            onchange:handelFieldChange,
        },
    ];

    const renderInputs=inputss.map((input,index)=>
    <Input type={input.type} 
    id={input.id} 
    name={input.name} 
    title={input.title} 
    value={input.value} 
    key={index}
    onChange={input.onChange || formik.handleChange} 
    errors={formik.errors} 
    onBlur={formik.handleBlur}
    touched={formik.touched}
   />
    )
  return (
    <>
   <div className='container w-50'>
   <h2>Create Account</h2>
<form onSubmit={formik.handleSubmit} encType="multipart/form-data">
    {renderInputs}
    <button type='submit' disabled={!formik.isValid}>Signup</button>
</form>
   </div>
    </>
  )
}

export default Register