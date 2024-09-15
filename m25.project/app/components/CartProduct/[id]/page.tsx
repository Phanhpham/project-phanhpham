"use client";
import React, { useEffect } from "react";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartPrdouctById,
  updateProductStock,
} from "@/services/cart.service";
import { Cart } from "@/interface/product";
import { isDataView } from "util/types";
import { useParams } from "next/navigation";
export default function page() {
  const { id } = useParams();
  const cartState = useSelector((state: any) => state.cartReducer.cart);
  console.log(cartState);
  const dispatch = useDispatch();
  const account = JSON.parse(localStorage.getItem("user") || "[]");
  useEffect(() => {
    if (account.id) {
      dispatch(getCartPrdouctById(account.id));
    }
  }, [dispatch, account.id]);

  const totalPrice = cartState.reduce((total: number, cart: Cart) => {
    return total + cart.product.price * cart.product.stock;
  }, 0);

  const handleQuantityChange = (itemId: number, newStock: number) => {
    const idUser = id;

    if (newStock < 1) return;

    dispatch(updateProductStock({ itemId, stock: newStock, idUser }))
      .unwrap()
      .then(() => {
        console.log("Cap nhat thanh cong");
      })
      .catch((err: any) => console.log(err));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newStock = parseInt(e.target.value, 10);
    handleQuantityChange(id, newStock);
  };
  return (
    <>
      <div className="wrap cf">
        <h1 className="projTitle">
          Responsive Table<span>GIFTOS</span> Shopping Cart
        </h1>
        <div className="heading cf">
          <h1>My Cart</h1>
          <a href="#" className="continue">
            Continue Shopping
          </a>
        </div>
        <div className="cart">
          <ul className="tableHead">
            <li className="prodHeader">Product</li>
            <li>Quantity</li>
            <li>Total</li>
            <li>Remove</li>
          </ul>
          <ul className="cartWrap">
            {cartState.map((cart: Cart) => (
              <li className="items odd">
                <div className="infoWrap">
                  <div className="cartSection">
                    <img src={cart.product.img} alt="" className="itemImg" />
                    <p className="itemNumber">#QUE-007544-002</p>
                    <h3>{cart.product.productname}</h3>
                    <p>
                      {" "}
                      <input type="text" className="qty" />
                      <div className="flex items-center space-x-2 w-32">
                        <button
                          className="px-2 py-1 bg-gray-200"
                          onClick={() =>
                            handleQuantityChange(
                              cart.id,
                              cart.product.stock - 1
                            )
                          }
                        >
                          -
                        </button>
                        <input
                          type="text"
                          name="stock"
                          value={cart.product.stock}
                          min="1"
                          onChange={(e) => handleInputChange(e, cart.id)}
                          className="w-8 text-center"
                        />
                        <button
                          className="px-2 py-1 bg-gray-200"
                          onClick={() =>
                            handleQuantityChange(
                              cart.id,
                              cart.product.stock + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </p>
                    <p className="stockStatus"> In Stock</p>
                  </div>
                  <div className="prodTotal cartSection">
                    <p>{cart.product.price * cart.product.stock}</p>
                  </div>
                  <div className="cartSection removeWrap">
                    <a href="#" className="remove">
                      x
                    </a>
                  </div>
                </div>
              </li>
            ))}
            <li className="items even">
              <div className="special">
                <div className="specialContent">
                  Free gift with purchase!, gift wrap, etc!!
                </div>
              </div>
            </li>
            {/*<li class="items even">Item 2</li>*/}
          </ul>
        </div>
        <div className="promoCode">
          <label htmlFor="promo">Have A Promo Code?</label>
          <input type="text" name="promo" />
          <a href="#" className="btn" />
        </div>
        <div className="subtotal cf">
          <ul>
            <li className="totalRow">
              <span className="label">Subtotal</span>
              <span className="value">$35.00</span>
            </li>
            <li className="totalRow">
              <span className="label">Shipping</span>
              <span className="value">$5.00</span>
            </li>
            <li className="totalRow">
              <span className="label">Tax</span>
              <span className="value">$4.00</span>
            </li>
            <li className="totalRow final">
              <span className="label">Total</span>
              <span className="value">{totalPrice}</span>
            </li>
            <li className="totalRow">
              <a href="#" className="btn continue">
                Checkout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
