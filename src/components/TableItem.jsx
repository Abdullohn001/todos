//react icons
import { FaTrashCan } from "react-icons/fa6";
//context
import { useGlobalContext } from "../hooks/useGlobalContext";

function TableItem({ product }) {
  const { incrementAmount, decrementAmount, handleDelete } = useGlobalContext();
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-24 w-24">
              <img
                src={product.thumbnail}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{product.title}</div>
            <div className="text-sm opacity-50">{product.brand}</div>
          </div>
        </div>
      </td>
      <td className="flex items-center justify-between pt-10">
        <div>
          {(
            product.price -
            (product.price * product.discountPercentage) / 100
          ).toFixed(2)}
          <br />
          <span className="badge badge-ghost badge-sm opacity-50 line-through mt-1">
            $ {product.price} Old Price
          </span>
        </div>
        <span className="w-24 text-center py-[1px] bg-red-400 rounded-[25px] text-white">
          Sale {product.discountPercentage}%
        </span>
      </td>
      <td>
        <div className="flex items-center gap-3 pl-5">
          <button
            onClick={() => incrementAmount(product.id)}
            className="btn btn-accent btn-sm "
          >
            +
          </button>
          <p>
            {product.amount == 0 ? handleDelete(product.id) : product.amount}
          </p>
          <button
            disabled={product.amount == 0 && true}
            onClick={() => decrementAmount(product.id)}
            className="btn btn-accent btn-sm"
          >
            -
          </button>
        </div>
      </td>
      <th>
        <button
          onClick={() => handleDelete(product.id)}
          className="btn btn-neutral transition-colors hover:text-red-500 hover:btn-ghost "
        >
          {" "}
          <FaTrashCan className="w-4 h-4" />
        </button>
      </th>
    </tr>
  );
}

export default TableItem;
