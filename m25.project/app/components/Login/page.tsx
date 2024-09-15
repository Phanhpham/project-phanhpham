"use client";
import React, { useEffect, useState } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "@/services/user.service";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
export default function page() {
  const route=useRouter();
  const user = useSelector((state: any) => state.userReducer.user);
  const dispatch = useDispatch();

  console.log(user);
  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [inputValue, setInputValue] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState({
    name: "",
    password: "",
  });
  const resetInput = () => {
    setInputValue({
      name: "",
      password: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    let validate = true;
    let newError = { ...error };
    if (!inputValue.name) {
      newError.name = "Tên không được để trống";
      validate = false;
    } else {
      newError.name = "";
    }

    // Validate password
    if (!inputValue.password) {
      newError.password = "Mật khẩu không được để trống";
      validate = false;
    } else if (inputValue.password.length < 8) {
      newError.password = "Mật khẩu phải có ít nhất 8 ký tự";
      validate = false;
    } else {
      newError.password = "";
    }

    setError(newError);
    if (validate && user.length > 0) {
      const findUser = user.find(
        (person: any) =>
          person.username === inputValue.name &&
          person.password === inputValue.password
      );
      if (findUser) {
        localStorage.setItem("user", JSON.stringify(findUser));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Dang nhap thanh cong !",
          showConfirmButton: false,
          timer: 1500,
        });
        route.push("/")
      }
    }
  };

  return (
    <div className="wrapper animated bounce">
      <h1>GIFTOS</h1>
      <hr />
      <form>
        <label id="icon" htmlFor="username">
          <i className="fa fa-user" />
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Username"
          id="username"
        />
        <br></br>
        {error.name && <span className="text-red-400">{error.name}</span>}
        {/*password
         */}
        <label id="icon" htmlFor="username">
          <i className="fa fa-key" />
        </label>
        <input
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          id="password"
        />
        <br></br>{" "}
        {error.password && (
          <span className="text-red-400">{error.password}</span>
        )}
        <button
          type="button"
          className="bg-red-400 w-52 h-9 rounded ml-7"
          onClick={handleLogin}
        >
          Sign In
        </button>
        <hr />
        <div className="crtacc">
          <a href="/components/register">Create Account</a>
        </div>
      </form>
    </div>
  );
}
