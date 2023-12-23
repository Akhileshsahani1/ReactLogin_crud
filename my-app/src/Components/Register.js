import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { signUpSchema } from '../schemas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
}
const Register = () => {
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({

        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values,action) => {
            axios.post(`${process.env.REACT_APP_API}/api/register`, values).then((res) => {
                      if(res.data.status==true)
                      {
                         toast.success(res.data.message);
                      }
                 
            }).catch((error) => {
                if (error.response.status === 401) {
                    localStorage.clear();
                    navigate("/");
                } else {
                    console.log(error);
                }
                    toast.success(error);
                });
                action.resetForm();
        }
    }); 
 
    
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
                                                Sign up
                                            </p>
                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example1c">
                                                             Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control"
                                                            name='name'
                                                            onChange={handleChange}
                                                            value={values.name}
                                                            onBlur={handleBlur}
                                                        />
                                                       
                                                        {errors.name && touched.name?(<p className='form-error text-danger'>{errors.name}</p>):null}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="fas fa-envelope fa-lg me-3 fa-fw" />
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
                                                     
                                                        {errors.email && touched.email?(<p className='form-error text-danger'>{errors.email}</p>):null}
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="fas fa-lock fa-lg me-3 fa-fw" />
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
                                                       
                                                        {errors.password && touched.password?(<p className='form-error text-danger'>{errors.password}</p>):null}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="fas fa-lock fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="">
                                                            confirm Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                           
                                                            className="form-control"
                                                            name='confirm_password'
                                                            onChange={handleChange}
                                                            value={values.confirm_password}
                                                            onBlur={handleBlur}
                                                        />
                                                       

                                                        {errors.confirm_password && touched.confirm_password?(<p className='form-error text-danger'>{errors.confirm_password}</p>):null}
                                                    </div>
                                                </div>


                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">
                                                        Register
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
          <ToastContainer />
        </div>
    );
};

export default Register;