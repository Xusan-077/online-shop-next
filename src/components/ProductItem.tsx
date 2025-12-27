"use client";

import { useFavoriteStore } from "@/store/FavoriteStore";
import { IProduct } from "@/types/products";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductItem({ product }: { product: IProduct }) {
  const { favorites, toggleToFavorite } = useFavoriteStore();

  const router = useRouter();

  function goToProduct() {
    router.push(`/product/${product.id}`);
  }

  return (
    <li
      onClick={goToProduct}
      className="bg-white relative rounded-lg overflow-hidden hover:shadow-sm duration-300 flex flex-col"
    >
      <div className="relative w-full h-70 overflow-hidden bg-[#EFEFEFFF]">
        <div
          onClick={(e) => {
            e.stopPropagation();

            toggleToFavorite(product);
          }}
          className="w-7.5 h-7.5 cursor-pointer rounded-full flex items-center justify-center absolute top-2.5 right-2.5 z-10"
        >
          {favorites.find((el) => el.id == product.id) ? (
            <i className={`bi bi-heart-fill text-red-500 text-[22px]`}></i>
          ) : (
            <i className={`bi bi-heart text-[22px]`}></i>
          )}
        </div>

        <div className="flex justify-center items-center">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={220}
            className="object-contain cursor-pointer"
          />
        </div>

        <span className="absolute bottom-1 left-4 bg-gray-900/70 text-white text-[11px] px-2 py-0.5 rounded-md uppercase tracking-wide">
          {product?.category}
        </span>
      </div>

      <div className="flex flex-col p-4 flex-1">
        <div className="mb-5">
          <span className="text-[14px] font-bold text-gray-500">
            ${product?.price}
          </span>
          <h3 className="text-[14px] font-semibold text-gray-900 line-clamp-1">
            {product?.title}
          </h3>
          <p className="text-gray-500 text-[12px] mb-1 line-clamp-1">
            {product?.description}
          </p>

          <span className="text-yellow-500 text-sm font-semibold flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.32279 0.887954C6.11862 0.790604 5.88141 0.790604 5.67723 0.887954C5.50072 0.972112 5.4034 1.11823 5.35433 1.19839C5.30359 1.28126 5.25151 1.38682 5.20075 1.48972L4.12288 3.67336L1.71185 4.02577C1.59836 4.04233 1.48191 4.05933 1.38745 4.08204C1.29607 4.10402 1.12711 4.15154 0.992657 4.29346C0.837112 4.45765 0.76396 4.68325 0.793571 4.90747C0.819166 5.10129 0.928088 5.23891 0.989188 5.31033C1.05235 5.38415 1.13667 5.46625 1.21885 5.54626L2.96275 7.24481L2.55127 9.64395C2.53184 9.75707 2.51192 9.87312 2.50424 9.97001C2.49682 10.0637 2.48965 10.2392 2.583 10.411C2.69098 10.6098 2.88292 10.7492 3.10535 10.7905C3.29766 10.8261 3.4623 10.7651 3.54912 10.729C3.63889 10.6918 3.7431 10.637 3.84468 10.5835L6.00001 9.45005L8.15535 10.5835C8.25693 10.637 8.36114 10.6918 8.45091 10.729C8.53773 10.7651 8.70237 10.8261 8.89467 10.7905C9.11711 10.7492 9.30904 10.6098 9.41702 10.411C9.51037 10.2392 9.5032 10.0637 9.49578 9.97001C9.48811 9.87312 9.46818 9.75708 9.44876 9.64397L9.03727 7.24481L10.7812 5.54624C10.8634 5.46623 10.9477 5.38414 11.0108 5.31033C11.0719 5.23891 11.1809 5.10129 11.2065 4.90747C11.2361 4.68325 11.1629 4.45765 11.0074 4.29346C10.8729 4.15154 10.704 4.10402 10.6126 4.08204C10.5181 4.05933 10.4017 4.04233 10.2882 4.02577L7.87714 3.67336L6.7993 1.48976C6.74853 1.38686 6.69644 1.28127 6.6457 1.19839C6.59662 1.11823 6.4993 0.972112 6.32279 0.887954Z"
                fill="#FFB54C"
              />
            </svg>
            {product?.rating}
          </span>
        </div>

        <div>
          <button className="bg-[#7000FF] w-full p-2 rounded-lg text-white flex justify-center items-center gap-1 cursor-pointer">
            Savatga
          </button>
        </div>
      </div>
    </li>
  );
}
