import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <div className="card glass w-full">
      <Link to={`/singleProduct/${product.id}`} className="mx-auto">
        <img className="w-48 lg:w-40" src={product.thumbnail} alt="car!" />
      </Link>
      <div className="card-body w-full">
        <h2 className="card-title text-center mb-5 font-bold font-serif h-5">
          {product.title}
        </h2>
        <p className="line-clamp-1 text-center mb-5">{product.description} </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="flex items-center gap-7">
              {" "}
              <span className="opacity-50 line-through text-[12px]">
                {product.price}$
              </span>
              <span className="bg-[#FF3090] text-white text-[12px] px-3 rounded-lg italic select-none">
                Sale
              </span>
            </p>
            <p>
              {(
                product.price -
                (product.price * product.discountPercentage) / 100
              ).toFixed(2)}
              $
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1">
              <i className="fa-solid fa-star text-yellow-400"></i> {product.rating}
            </p>
          </div>
        </div>
        <div className="card-actions justify-center ">
          <Link
            to={`/singleProduct/${product.id}`}
            type="button"
            className="btn btn-block tracking-[2px] btn-info font-serif font-semibold"
          >
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
