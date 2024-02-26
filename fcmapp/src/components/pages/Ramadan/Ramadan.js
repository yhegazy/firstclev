import React from 'react'
import Product from './Product';
import { db, storage } from '../../../appwrite/appwriteConfig';

import './index.css'

const Ramadan = () => {
  const [products, setProducts] = React.useState([])
  const [loadingPage, setLoadingPage] = React.useState(true) 

  const url = "https://cloud.appwrite.io/v1/"
  const dir = "storage/buckets/products/files/"
  
  React.useEffect(() => {
    const handleGetData = async() => {                                      
      const productList = await db.listDocuments("fcmdb", "products")
      const getProduct = await storage.listFiles("products")

      productList.documents.map((product) => 
        getProduct.files.filter((file) => 
          file.$id === product.$id &&  
            setProducts(prev => 
            [
              ...prev, 
              {
                id: product.$id,
                name: product.name,
                description: product.description,
                price: product.price,
                src: url + dir + `${product.$id}/view?project=6585ce45185a5ef8b25e`, 
                alt: file.name,
              }
            ]
          )
        )
      )
    
    setLoadingPage(false)
  }

    handleGetData() 
  },[]) 

  const [cart, setCart] = React.useState(function () {
    let savedCart = [];
    try {
      savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      savedCart = [];
    }
    return savedCart;
  });

  const handleProductDelete = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  }

  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  return <>
    <div className="products-layout">
      <h1>Ramadan Planners 2024</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
        {loadingPage && <p>Loading...</p>}
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              cart={cart}
              onProductAdd={handleProductAdd}
              onProductDelete={handleProductDelete}
            />
          );
        })}
      </div>
    </div>
    {/* {loadingPage ? <p>Loading...</p> : <ProductsList products={products} />} */}
  </>
}

export default Ramadan