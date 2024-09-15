import React from "react";

export default function page() {
  return (
    <>
    <div className="flex gap-48 ml-14">
      <div>
        <div className="text-red-500 text-8xl ml-[80px] mt-[50px]">FOODIE</div>
        <div className="text-green-400 text-4xl ml-[120px] mt-[20px]">
          Welcome Back !
        </div>
        <p className="text-gray-300 ml-[80px] mt-[10px]">
          Sign in with your email address and Password
        </p>
        <p className="text-black ml-[80px] mt-[10px]">Email</p>
        <input
          className="w-80 h-10 border-2 ml-20 mt-2"
          type="text"
          placeholder="email"
        />
        <p className="text-black ml-[80px] mt-[10px]">Password</p>
        <input
          className="w-80 h-10 border-2 ml-20 mt-2"
          type="text"
          placeholder="password"
        />
        <p className="text-black ml-[80px] mt-[10px]">Confirm Password</p>
        <input
          className="w-80 h-10 border-2 ml-20 mt-2"
          type="text"
          placeholder="confirm password"
        />
        <div className="flex">
          <input className="ml-20 mt-3" type="checkbox" />
          <p className="ml-[60px] mt-3 ">Remember me</p>
        </div>
        <button className="bg-green-400 w-80 h-10 ml-[80px] mt-[10px] ">Sign in </button>
      </div>
      <div>
        <img className="h-[550px] w-[500px] mt-11" src="https://i.pinimg.com/564x/c8/11/e1/c811e16e296b7830943b90943a3d5c51.jpg"></img>
      </div>
      </div>
    </>
  );
}
