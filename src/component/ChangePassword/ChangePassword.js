import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ApiClient } from "../../request/request";
import { loginUser } from "../../utils/apiRequest";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./ChangePassword.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [usename, setusername] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const user = {
      username: usename,
      newPassword: password,
    };
    const newUser = {
      username: usename,
      password: password,
    };
    await ApiClient.patch(`/api/users/${localStorage.getItem("id")}`, user)
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          loginUser(newUser, dispatch, navigate);
          alert("Success");
        }
      })
      .catch((err) => {});
  };
  return (
    <>
      <button onClick={handleShow}>Change information</button>
      <Modal show={show} onHide={handleClose}>
        <div className={cx("wrap-changepw")}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                onChange={(e) => setusername(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={handleChangePassword}
            >
              Update
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
}
export default ChangePassword;
