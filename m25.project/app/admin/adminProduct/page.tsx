"use client";
import Menu from "@/app/components/Menu";
import { storage } from "@/app/config/config";
import { Product } from "@/interface/product";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  sortProduct,
} from "@/services/product.service";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { error } from "console";
import { format } from "date-fns";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const [handleShow2, setHandleShow2] = useState(false);
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const [showed, setShowed] = useState(false);
  const [productDelete, setProductDelete] = useState<Product | null>(null);
  const handleDelete = async (id: number) => {
    await dispatch(deleteProduct(id));
    setProductDelete(null);
  };
  const [inputValue, setInputValue] = useState({
    productname: "",
    img: "",
    price: "",
    stock: "",
    created_at: "",
    updated_at: "",
  });

  const [error, setError] = useState({
    productname: "",
    img: "",
    price: "",
    stock: "",
  });
  const handleShowed = (item: Product) => {
    setShowed(true);
    setProductDelete(item);
  };
  const handleShowe = () => setHandleShow2(true);
  const handleClosese = () => setHandleShow2(false);
  const handleClosed = () => setShowed(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    let valid = true;
    if (!inputValue.productname) {
      error.productname = "Ten nguoi dung khong duoc de trong";
      valid = false;
    } else {
      error.productname = "";
    }

    if (!inputValue.price) {
      (error.price = "Gia khong duoc de trong"), (valid = false);
    } else {
      error.price = "";
    }

    if (!inputValue.stock) {
      error.stock = "So luong ton kho khong duoc de trong";
      valid = false;
    } else {
      error.stock = "";
    }

    setError({ ...error });

    if (valid) {
      await dispatch(
        addProduct({
          ...inputValue,
          productname: inputValue.productname,
          price: inputValue.price,
          stock: inputValue.stock,
          created_at: format(new Date(), "dd/MM/yyyy"),
          updated_at: "",
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
  const handleUpload = (e: any) => {
    let image: any = e.target.files[0];
    console.log(image);
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
        setInputValue({
          ...inputValue,
          img: url,
        });
      });
    });
  };

  // render spham
  const products = useSelector((state: any) => state.productReducer.product);
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  // sap xep sp
  const dispatch = useDispatch();
  const [sort, setSort] = useState();
  const handleSort = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    dispatch(sortProduct(order));
  };
  // sua spham 
  const handleUpdate = async () => {
    let valid = true;
    if (!inputValue.productname) {
      error.productname = "Ten nguoi dung khong duoc de trong";
      valid = false;
    } else {
      error.productname = "";
    }

    if (!inputValue.price) {
      (error.price = "Gia khong duoc de trong"), (valid = false);
    } else {
      error.price = "";
    }

    if (!inputValue.stock) {
      error.stock = "So luong ton kho khong duoc de trong";
      valid = false;
    } else {
      error.stock = "";
    }

    setError({ ...error });

    if (valid) {
      await dispatch(
        addProduct({
          ...inputValue,
          productname: inputValue.productname,
          price: inputValue.price,
          stock: inputValue.stock,
          created_at: format(new Date(), "dd/MM/yyyy"),
          updated_at: "",
        })
      );
      setShow(false);
    }
  };

  return (
    <div className="flex">
      <Menu />
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <i className="fa-solid fa-users mt-6 ml-5"></i>{" "}
            <span className="font-bold text-2xl mt-4">Quản lí san pham </span>
          </div>
        </div>
        <br />
        <div className="relative ">
          <Form.Select
            onChange={handleSort}
            value={sort}
            aria-label="Default select example"
            className="w-20 h-14"
          >
            <option>Sap xep theo </option>
            <option value="desc">A-Z</option>
            <option value="asc">Z-A</option>
          </Form.Select>
          <br></br>
          <input
            type="text"
            placeholder="Tìm kiếm ..."
            className="pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            // onChange={(e) => setSearch(e.target.value)}
            // value={search}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            // onClick={handleSearchName}
          />
        </div>
        <br />
        <div className="table-wrapper">
          <table width={"100%"} style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Hinh anh</th>
                <th>Ten san pham</th>
                <th>Gia san pham</th>
                <th>Ton kho</th>
                <th>Ngay tao </th>
                <th>Ngay cap nhat</th>
                <th>Chuc nang</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item: Product) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img className="w-20 " src={item.img} alt="" />
                  </td>
                  <td> {item.productname}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.created_at}</td>
                  <td>{item.updated_at}</td>
                  <td>
                    <Button variant="primary" onClick={handleShowe}>
                      Sua
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleShowed(item)}
                    >
                      Xoa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between p-3">
            <div></div>

            <Button variant="danger" onClick={handleShow}>
              Them san pham
            </Button>
          </div>

          <Modal show={handleShow2} onHide={handleClosese}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Ten san pham</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhap ten san pham "
                    autoFocus
                    name="productname"
                    onChange={handleChange}
                  />
                  {error.productname && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.productname}
                    </span>
                  )}
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Gia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="gia tien"
                    autoFocus
                    name="price"
                    onChange={handleChange}
                  />
                  {error.price && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.price}
                    </span>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>stock</Form.Label>
                  <Form.Control
                    type="stock"
                    placeholder="Nhap so luong ton kho"
                    autoFocus
                    name="stock"
                    onChange={handleChange}
                  />
                  {error.stock && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.stock}
                    </span>
                  )}
                </Form.Group>
                
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>hinh anh</Form.Label>
                  <Form.Control
                    type="file"
                    autoFocus
                    name="img"
                    onChange={handleUpload}
                  />
                  {error.img && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.img}
                    </span>
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {productDelete && (
            <Modal show={showed} onHide={handleClosed}>
              <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
              </Modal.Header>
              <Modal.Body>Bạn có chắc chắn muốn xoá không ?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleDelete(productDelete.id)}
                >
                  Xác nhận
                </Button>
              </Modal.Footer>
            </Modal>
          )}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Ten san pham</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhap ten san pham "
                    autoFocus
                    name="productname"
                    onChange={handleChange}
                  />
                  {error.productname && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.productname}
                    </span>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>gia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="gia tien"
                    autoFocus
                    name="price"
                    onChange={handleChange}
                  />
                  {error.price && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.price}
                    </span>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>stock</Form.Label>
                  <Form.Control
                    type="stock"
                    placeholder="Nhap so luong ton kho"
                    autoFocus
                    name="stock"
                    onChange={handleChange}
                  />
                  {error.stock && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.stock}
                    </span>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Chon danh muc</Form.Label>
                  <select>
                    <option value="danh muc">trang suc</option>
                    <option value="danh muc">gau bong</option>
                    <option value="danh muc">packet</option>
                    <option value="danh muc">brush and comb</option>
                  </select>
                 
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>hinh anh</Form.Label>
                  <Form.Control
                    type="file"
                    autoFocus
                    name="img"
                    onChange={handleUpload}
                  />
                  {error.img && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.img}
                    </span>
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary" onClick={handleAdd}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
