import React, { useState, createContext } from "react";
import { Row, Col, Button, Alert } from 'react-bootstrap';
import axios from "axios";
import { Link ,useHistory} from "react-router-dom";

import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from '../../../hooks/useAuth';
import useScriptRef from '../../../hooks/useScriptRef';
import { BASE_URL } from "../../../config/constant";
const FirebaseLogin = ({ className, ...rest }) => {
  const scriptedRef = useScriptRef();


  const { firebaseEmailPasswordSignIn, firebaseGoogleSignIn } = useAuth();
    const [email,setEmail] = useState("admin@vul.hunter")
    const [password,setPassword] = useState("P@$$w0rd!@#$%^&*().com");
    console.log(password,email);
    const history = useHistory()
     const handleLogin =(e)=>{
      e.preventDefault()
      const data = {email:email,
        password:password}
      axios.post('http://185.213.27.86:5000/api/v1/auth/login',data).then(res=>{
        localStorage.setItem("token",res.data.session_id)
        history.push(BASE_URL)
      })
     }
   
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: 'admin@vul.hunter',
          password: 'P@$$w0rd!@#$%^&*().com',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await firebaseEmailPasswordSignIn(values.email, values.password);

            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(true);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                error={touched.email && errors.email}
                label="Email Address / Username"
                name="email"
                onBlur={handleBlur}
                onChange={e=>setEmail(e.target.value)}
                value={email}
              />
              {touched.email && errors.email && <small class="text-danger form-text">{errors.email}</small>}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                error={touched.password && errors.password}
                name="password"
                // onBlur={handleBlur}
                onChange={e=>setPassword(e.target.value)}
                type="password"
                value={password}
              />
              {touched.password && errors.password && <small class="text-danger form-text">{errors.password}</small>}
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Save credentials.
              </label>
            </div>

            <Row>
              <Col mt={2}>
                <Button className="btn-block" color="primary" onClick={handleLogin}  size="large" type="submit" variant="primary">
                  Signin
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
      <hr />
    </React.Fragment>
  );
};

export default FirebaseLogin;
