"use client";
import React, { useEffect, useState } from "react";
import "./detail.css";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "@/services/product.service";
import Header from "../../Header/page";
import InfoSection from "../../InfoSection/index";
export default function page() {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const id = pathName.split("/").pop();
  const product1: any = useSelector(
    (state: any) => state.productReducer.productDetail
  );
  console.log(product1);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(Number(id)));
    }
  }, [dispatch, id]);

  // Format price
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };
  return (
    <>
      <Header />
      <div>
        <div className="pagination">
          <p>Home &gt; Shop &gt; Gấu bông &gt; </p>
        </div>

        {/* product section */}
        <section className="flex justify-center gap-8 w-full mx-auto">
          {/* left side */}
          <div className="img-card w-1/2 h-auto">
            <img src={product1.img} className="h-auto"></img>
          </div>
          {/* Right side */}
          <div className="product-info w-1/2">
            <h3>{product1.productname}</h3>
            <h5>
              {formatPrice(product1.price)} <del>300.000đ</del>
            </h5>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              accusantium, aspernatur provident beatae corporis veniam atque
              facilis, consequuntur assumenda, vitae dignissimos iste
              exercitationem dolor eveniet alias eos ullam nesciunt voluptatum.
            </p>
            <div className="sizes">
              <p>Size:</p>
              <select name="Size" id="size" className="size-option">
                <option value="xxl">XXL</option>
                <option value="xl">XL</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
              </select>
            </div>
            <div className="quantity">
              <input type="number" defaultValue={1} min={1} />
              <button className="buttonAddtoCart">Add to Cart</button> <br></br>
              <i className="fa-solid fa-basket-shopping"></i>
            </div>
            <div>
              <p>Delivery:</p>
              <p>
                Free standard shipping on orders over 200.000 before tax, plus
                free returns.
              </p>
              <div className="delivery">
                <p>TYPE</p> <p>HOW LONG</p> <p>HOW MUCH</p>
              </div>
              <hr />
              <div className="delivery">
                <p>Standard delivery</p>
                <p>1-4 business days</p>
                <p>45.000đ</p>
              </div>
              <hr />
              <div className="delivery">
                <p>Express delivery</p>
                <p>1 business day</p>
                <p>100.000đ</p>
              </div>
              <hr />
              <div className="delivery">
                <p>Pick up in store</p>
                <p>1-3 business days</p>
                <p>Free</p>
              </div>
            </div>
          </div>
        </section>
        {/* script tags */}
      </div>
      <InfoSection />
    </>
  );
}
