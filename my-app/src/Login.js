import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from './schemas';


const initialValues = {
    email: "",
    password: "",
}
const Login = ({ setToken }) => {
    const navigate = useNavigate();
             
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema:loginSchema,

        onSubmit: (values, action) => {
            axios.post(`${process.env.REACT_APP_API}/api/login`,values).then((res) => {
                localStorage.setItem('token',res.data.access_token);
                setToken(res.data.access_token)
                 const token = localStorage.getItem('token')
   
               if (!token) {
                   alert('Unable to login. Please try after some time.');
                   localStorage.clear();
                   navigate('/register');
               }else{
                   setTimeout(() => {
                       navigate('/dashboard');
                   }, 500);
               }
           }).catch((error) => {
                   console.error(error);
               });
              action.resetForm();
        }
    })

   
    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                                Login
                                            </p>
                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example3c">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="form3Example3c"
                                                            className="form-control"
                                                            name="email"
                                                            onChange={handleChange}
                                                            value={values.email}
                                                            onBlur={handleBlur}
                                                        />
                                                        
                                                        {errors.email && touched.email ? (<p className='text-danger'>{errors.email}</p>) : null}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="form3Example4c">
                                                            Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="form3Example4c"
                                                            className="form-control"
                                                            name='password'
                                                            onChange={handleChange}
                                                            value={values.password}
                                                            onBlur={handleBlur}
                                                        />
                                                      
                                                        {errors.password && touched.password ? (<p className='text-danger'>{errors.password}</p>) : null}
                                                    </div>
                                                </div>


                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">
                                                        Login
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp`}
                                                className="img-fluid"
                                                alt="Sample image"

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Login;