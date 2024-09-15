"use client";
import {
  addUser,
  getAllUser,
  searchName,
  sortUser,
  updateUserStatus,
} from "@/services/user.service";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Form, Modal } from "react-bootstrap";
import { AddUser, Admin } from "@/interface/admin";
import { create } from "domain";
import { format } from "date-fns";
import Menu from "@/app/components/Menu";

export default function page() {
  const [selectUserId, setSelectUserId] = useState<number | null>(null);
  const [shows, setShows] = useState(false);
  const [showUnBlock, setShowUnBlock] = useState(false);

  const handleCloseUnBlockModal = () => {
    setShowUnBlock(false);
    setSelectUserId(null)
  }

  const handleCloseBlockModal = () => {
    setShows(false);
    setSelectUserId(null);
  };
  const handleShowsBlockModal = (userId: number) => {
    setShows(true);
    setSelectUserId(userId);
  };

  const handleShowsUnBlockModal = (userId: number) => {
    setShowUnBlock(true);
    setSelectUserId(userId)
  }
  const handleSort = (sort: string) => {
    dispatch(sortUser(sort));
  };
  const [inputValue, setInputValue] = useState<AddUser>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.userReducer.user);
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const [search, setSearch] = useState("");
  const handleSearchName = () => {
    dispatch(searchName(search));
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    let valid = true;
    if (!inputValue.username) {
      error.username = "Ten nguoi dung khong duoc de trong";
      valid = false;
    } else {
      error.username = "";
    }

    if (!inputValue.email) {
      (error.email = "Email khong duoc de trong"), (valid = false);
    } else {
      error.email = "";
    }

    if (!inputValue.password) {
      error.password = "Mat khau khong duoc de trong";
      valid = false;
    } else {
      error.password = "";
    }

    if (!inputValue.confirmPassword) {
      error.confirmPassword = "Xac nhan khong duoc de trong";
      valid = false;
    } else if (inputValue.password !== inputValue.confirmPassword) {
      error.confirmPassword = "Mat khau khong khop";
      valid = false;
    } else {
      error.confirmPassword = "";
    }

    setError({ ...error });

    if (valid) {
      await dispatch(
        addUser({
          username: inputValue.username,
          email: inputValue.email,
          img: "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=VVXDQ2ftWTsQ7kNvgEsTadt&_nc_ht=scontent.fhan18-1.fna&_nc_gid=AXp3jmeNWjNNYIBHePTAf1C&oh=00_AYDz8-sNB58RG9XND9CXST7E2TwhmKQT842F2Wnbd1CajQ&oe=6701DFBA",
          password: inputValue.password,
          confirm: inputValue.confirmPassword,
          created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        })
      );
      setShow(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleBlock = (e: any) => {
    e.preventDefault();
    if (selectUserId !== null) {
      console.log("Blocking user ID:", selectUserId);
      dispatch(updateUserStatus({ id: selectUserId, status: false}));
      handleCloseBlockModal();
    }
  };

  const handleUnBlock = (e: any) => {
    e.preventDefault();
    if (selectUserId !== null) {
      console.log("Blocking user ID:", selectUserId);
      dispatch(updateUserStatus({ id: selectUserId, status: true}));
      handleCloseUnBlockModal();
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ten nguoi dung</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhap ten nguoi dung"
                autoFocus
                name="username"
                onChange={handleChange}
              />
              {error.username && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.username}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="name@example.com"
                autoFocus
                name="email"
                onChange={handleChange}
              />
              {error.username && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.username}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mat khau</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhap mat khau"
                autoFocus
                name="password"
                onChange={handleChange}
              />
              {error.password && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.password}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Xac nhan mat khau</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhap xac nhan mat khau"
                autoFocus
                name="confirmPassword"
                onChange={handleChange}
              />
              {error.confirmPassword && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.confirmPassword}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="flex">
        <Menu />
        <div className="w-full">
          <div className="flex justify-between">
            <div>
              <i className="fa-solid fa-users mt-6 ml-5"></i>{" "}
              <span className="font-bold text-2xl mt-4">Quản lí tài khoản</span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                className="pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                onClick={handleSearchName}
              />
            </div>
          </div>
          <br />
          <div className="flex justify-between">
            <Form.Select
              onChange={(e) => handleSort(e.target.value)}
              aria-label="Default select example"
              className="w-20 h-14"
            >
              <option>Sap xep theo </option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </Form.Select>
          </div>
          <br />
          <div className="table-wrapper">
            <table width={"100%"} style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hinh anh</th>
                  <th>Ten nguoi dung</th>
                  <th>Email</th>
                  <th>So dien thoai</th>
                  <th>Ngay tao </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {userState.map((user: any) => {
                  return (
                    <tr style={{ opacity: user.status === false ? 0.5 : 1 }}>
                      <td>{user.id}</td>
                      <td style={{ textAlign: "center" }}>
                        <img src={user.avatar} alt="" width={50} height={50} />
                      </td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.created_at}</td>
                      <td>
                        <Button variant="primary">Xem</Button>{" "}
                        {user.status === false ? (
                          <Button
                            variant="success"
                            onClick={() => handleShowsUnBlockModal(user.id)}
                          >
                            Bo chan
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() => handleShowsBlockModal(user.id)}
                          >
                            Chan
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <Modal show={shows} onHide={handleCloseBlockModal} >
                <Modal.Header closeButton>
                  <Modal.Title>Xác nhận chặn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Bạn có muốn chặn tài khoản này?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseBlockModal}>
                    Dóng
                  </Button>
                  <Button variant="primary" onClick={handleBlock}>
                    Chặn
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal show={showUnBlock} onHide={handleCloseUnBlockModal} >
                <Modal.Header closeButton>
                  <Modal.Title>Xác nhận bỏ chặn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Bạn có muốn bỏ chặn tài khoản này?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseUnBlockModal}>
                    Dóng
                  </Button>
                  <Button variant="primary" onClick={handleUnBlock}>
                    Bỏ chặn
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

            <div className="flex justify-between p-3">
              <div></div>
              <Button variant="danger" onClick={handleShow}>
                Them nguoi dung
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
