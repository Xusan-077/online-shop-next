"use client";

import ProductItem from "@/components/ProductItem";
import { useFavoriteStore } from "@/store/FavoriteStore";
import Link from "next/link";

export default function Favorites() {
  const { favorites } = useFavoriteStore();

  return (
    <section className="">
      <div className="container">
        <h2 className="flex items-center cursor-pointer my-10">
          <span className="text-[28px] font-bold">Favorite Products</span>
        </h2>
        {favorites.length === 0 && (
          <div className="flex flex-col items-center my-37.5">
            <img
              className="savat__empty-img"
              src="https://uzum.uz/static/img/shopocat.490a4a1.png"
              alt="empty-cart"
              width={150}
              height={150}
            />

            <p className="savat__empty-title text-[1.375rem] mt-6 font-semibold mb-3">
              Your favorite list is empty
            </p>

            <p className="savat__empty-text mb-6 text-center max-w-md">
              You have not added any products to your favorite list yet.
            </p>

            <Link
              className="savat__empty-link bg-[#E6E8ED] text-gray-800 rounded-lg p-[10px_20px]"
              href="/"
            >
              Go to Products
            </Link>
          </div>
        )}
        <ul className="grid grid-cols-4 gap-10">
          {favorites.map((product) => (
            <ProductItem
              key={`${product.title}-${product.category}`}
              product={product}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
