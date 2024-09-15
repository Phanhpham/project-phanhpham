"use client";
import React from "react";
import Link from "next/link";
import "./adminHome.scss";
import { useRouter } from "next/navigation";
import Menu from "@/app/components/Menu";
// import { useRouter } from "next/router";

export default function AdminHome() {
  const navigate = useRouter();
  const handleLogOut = () => {
    // const logout = confirm("chắc chắn muốn đăng xuất?");
    // if (logout) {
    navigate.push("/login-admin");
    // }
  };

  // const route=useRouter();

  return (
    <div style={{ display: "flex" }}>
      <Menu />

      <div className="main-content-admin">
        <div className="header-wrapper">
          <div className="header-title">
            <div className="title">
              <span>GIFTOY</span>
              <h2>Trang chủ</h2>
            </div>
          </div>
          <div className="user-info">
            <div className="search-box">
              <i className="fa-solid fa-search"></i>
              <input type="text" placeholder="Tìm kiếm ở đây" />
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV1mHHzOnO1BG__4Ai6GlaZpfRztsrQM1fols7meZqlY6arSu0mvtlHSArvUHZRquwnA0&usqp=CAU"
              alt=""
            />
          </div>
        </div>

        <div className="card-container">
          <h3 className="main-title">Dữ liệu hôm nay</h3>
          <div className="card-wrapper">
            <div className="payment-card light-red">
              <div className="card-header">
                <div className="amount">
                  <span className="title">Payment amount </span>
                  <span className="amount-value">500.000</span>
                </div>
                <i className="fas fa-dollar-sign icon"></i>
              </div>
              <span className="card-detail">**** **** **** 3484</span>
            </div>
            <div className="payment-card light-purple">
              <div className="card-header">
                <div className="amount">
                  <span className="title">Payment amount </span>
                  <span className="amount-value">500.000</span>
                </div>
                <i className="fas fa-dollar-sign icon dark-purple"></i>
              </div>
              <span className="card-detail">**** **** **** 3484</span>
            </div>

            <div className="payment-card light-green">
              <div className="card-header">
                <div className="amount">
                  <span className="title">Payment amount </span>
                  <span className="amount-value">500.000</span>
                </div>
                <i className="fas fa-dollar-sign icon dark-green"></i>
              </div>
              <span className="card-detail">**** **** **** 3484</span>
            </div>

            <div className="payment-card light-blue">
              <div className="card-header">
                <div className="amount">
                  <span className="title">Payment amount </span>
                  <span className="amount-value">500.000</span>
                </div>
                <i className="fas fa-dollar-sign icon dark-blue"></i>
              </div>
              <span className="card-detail">**** **** **** 3484</span>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <h3 className="main-title">Bảng thống kê</h3> <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên tài khoản</th>
                  <th>Mật khẩu</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái hoạt động</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>phanh2005</td>
                  <td>phanh123</td>
                  <td>24/07/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>ha2005</td>
                  <td>ha123</td>
                  <td>21/05/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>hai2005</td>
                  <td>hai123</td>
                  <td>30/05/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
