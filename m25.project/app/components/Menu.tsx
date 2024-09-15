// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
// import { Button, Form } from "react-bootstrap";

export default function Menu() {
  return (
    <div className="flex">
      <div>
        <div className="bg-pink-300 w-72 h-[1020px]">
          <li>
            <h1 className="text-red-500 text-5xl ml-[40px] font-bold">
              GIFTOS
            </h1>
            <div className="flex">
              <i className="fa-solid fa-house mt-[60px] ml-[30px]"></i>
              <p className="text-xl ml-[30px] mt-[55px]">Trang chủ</p>
            </div>
            <div className="flex">
              <i className="fa-solid fa-user mt-[60px] ml-[30px]"></i>
              <a href="/admin/adminUser"className="text-xl ml-[30px] mt-[55px]">Quản lí tài khoản</a>
            </div>

            <div className="flex">
              <i className="fa-solid fa-burger mt-[60px] ml-[30px]"></i>
              <a href="/admin/adminProduct" className="text-xl ml-[30px] mt-[55px]">Quản lí sản phẩm</a>
            </div>
            <div className="flex">
              <i className="fa-solid fa-list mt-[60px] ml-[30px]"></i>
              <a href="/admin/adminCategory" className="text-xl ml-[30px] mt-[55px]">Quản lí danh mục</a>
            </div>
            <div className="flex">
              <i className="fa-solid fa-right-from-bracket mt-[60px] ml-[30px]"></i>
              <p className="text-xl ml-[30px] mt-[55px]">Đăng xuất</p>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
}
