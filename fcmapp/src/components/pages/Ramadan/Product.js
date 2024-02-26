import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  const productFromCart = props.cart.find(
    (item) => item.id === product.id
  );
  const quantity = productFromCart ? productFromCart.quantity : 0;

  console.log(product)

  return (
    <div className="product">
      <div className="product-image-container">

        <Link to={product.src}>
          <img
            src={product.src}
            width="150"
            height="150"
            className="product-image"
            alt={product.alt}
          />
       </Link>

        {quantity > 0 && (
          <div className="product-quantity-container">
            <div className="product-quantity">{quantity}</div>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-checkout">
        <div>
          {quantity > 0 && (
            
            <button
              onClick={() => props.onProductDelete(product.id)}
              className="btn-outline product-delete"
            >
              x
            </button>
          )}
        </div>
        <button className="btn-outline" onClick={() => props.onProductAdd(product)}>
          ${product.price}
        </button>
      </div>
    </div>
  );
}
