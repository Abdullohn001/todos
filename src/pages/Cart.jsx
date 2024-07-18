//context
import { useGlobalContext } from "../hooks/useGlobalContext";
//images
import Empty from "../assets/empty.svg";
//components
import { TableItem } from "../components";

function Cart() {
  const { products, totalProducts, totalPrice, addToCard } = useGlobalContext();
  if (products.length === 0) {
    return (
      <div className="flex items-center text-6xl tracking-[2px] font-bold font-serif gap-32">
        <img src={Empty} alt="" />
        <h2>No products available 😒</h2>
      </div>
    );
  }
  return (
    <div className="h-lvh">
      <div className="overflow-x-auto card glass px-7 pt-5 pb-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Title</th>
              <th>Price</th>
              <th>Change Amount</th>
              <th>
                {" "}
                <p>Delete</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((product) => {
              return <TableItem key={product.id} product={product} />;
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Total Price ${totalPrice.toFixed(2)}</th>
              <th>Change Amount</th>
              <th>
                {" "}
                <button className="btn btn-ghost btn-xs">
                  Delete Selected
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Cart;
