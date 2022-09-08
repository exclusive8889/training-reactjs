
import { useDispatch,useSelector } from "react-redux";
import { registerFailed } from "../../../stores/slice/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ApiClient } from "../../../request/request";
function Register({ changeAuthMode }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmpw: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Reqiued"),
      password: Yup.string().required("Reqiued").min(6, "min 6 char"),
      confirmpw: Yup.string()
        .required("Reqiued")
        .oneOf([Yup.ref("password"), null], "password must match"),
    }),
    onSubmit: (user) => {},
  });

  const handleRegister = (e) => {
    e.preventDefault();
    ApiClient.post("/auth/register", {
      username: formik.values.username,
      password: formik.values.password,
    })
      .then((res) => {
        res.status === 201 ? alert("Success") : alert("failed");
      })
      .catch((error) => {
        dispatch(registerFailed(error.response.data.message));
      });
  };
  const errorRegister =useSelector((state)=> state.auth.errorRegister)
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Usename</label>
            <input
              id="username"
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && (
              <label className="text-error">{formik.errors.username}</label>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="password"
              type="password"
              className="form-control mt-1"
              placeholder="Email Address"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <label className="text-error">{formik.errors.password}</label>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              id="confirmpw"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={formik.values.confirmpw}
              onChange={formik.handleChange}
            />
            {formik.errors.confirmpw && (
              <label className="text-error">{formik.errors.confirmpw}</label>
            )}
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formik.isValid}
              onClick={handleRegister}
            >
              Submit
            </button>
            <label className="text-error">{errorRegister}</label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
