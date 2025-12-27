"use client";

import ProductCartItem from "@/components/ProductCartItem";
import { useCartsStore } from "@/store/CartStore";
import Link from "next/link";

export default function Basket() {
  const { carts } = useCartsStore();

  const totalPrice = carts.reduce(
    (total, el) => total + el.price * (el.count || 1),
    0
  );

  return (
    <section>
      <div className="container">
        {/* <h2 className="flex items-center cursor-pointer my-10">
          <span className="text-[28px] font-bold">Basket Products</span>
        </h2> */}

        {carts.length ? (
          <div className="grid grid-cols-[1fr_30%] gap-6">
            <ul className="flex flex-col">
              {carts.map((product) => (
                <ProductCartItem key={product.title} product={product} />
              ))}
            </ul>

            <div className="w-wull rounded-lg border-gray-300 border flex flex-col shadow-sm p-[25px_20px] h-75">
              <h3 className="savat__summary-title text-[16px] font-semibold mb-5">
                Buyurtmangiz
              </h3>
              <div className="savat__summary-products flex items-center justify-between mb-10">
                <p className="">Mahsulotlar ({carts.length})</p>
                <p className="">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="savat__summary-total mb-auto">
                <h2 className="savat__summary-label mb-2.5 font-semibold">
                  Jami
                </h2>
                <p className="savat__summary-price flex justify-end text-lg font-bold">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <button className="savat__summary-btn text-white cursor-pointer font-semibold bg-[#7000FF] p-[8px_0] w-full rounded-lg mt-4 hover:bg-[#5c00cc] transition-all">
                Rasmiylashtirishga o‘tish
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center my-37.5">
            <img
              className="savat__empty-img"
              src="https://uzum.uz/static/img/shopocat.490a4a1.png"
              alt="empty-cart"
              width={150}
              height={150}
            />

            <p className="savat__empty-title text-[1.375rem] mt-6 font-semibold mb-3">
              Your Basket is empty
            </p>

            <p className="savat__empty-text mb-6 text-center max-w-md">
              You have not added any products to your Basket list yet.
            </p>

            <Link
              className="savat__empty-link bg-[#E6E8ED] text-gray-800 rounded-lg p-[10px_20px]"
              href="/"
            >
              Go to Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
