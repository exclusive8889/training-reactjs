import { useDispatch, useSelector } from "react-redux/es/exports";
import { loginUser } from "../../../utils/apiRequest";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./login.scss"
import authSlice from "../../../stores/slice/authSlice";
function Signin({changeAuthMode}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik =useFormik({
    initialValues:{
      username:"",
      password:"",
    },
    validationSchema:Yup.object({
      username:Yup.string().required("Reqiued"),
      password:Yup.string().required().min(6,'min 6 char')
    }),
    onSubmit:(user)=>{
      loginUser(user, dispatch, navigate);
    }
  });
 
  const err =useSelector((state)=> state.auth.error)
  
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={formik.handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>User name</label>
            <input
              id="username"
              type="text"
              
              className="form-control mt-1"
              placeholder="User name"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {
              (formik.errors.username) && (<label className="text-error">{formik.errors.username}</label>)
            }
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {
                (formik.errors.password) && (<label className="text-error">{formik.errors.password}</label>)
              }
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>
              Submit
            </button>
            <label className="text-error">{err}</label>
          </div>
         
        </div>
      </form>
    </div>
  );
}

export default Signin;
