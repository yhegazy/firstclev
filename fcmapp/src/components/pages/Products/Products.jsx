import React from 'react'
import Product from './Product';
import { db, storage } from '../../../appwrite/appwriteConfig';

import './index.css'

const Products = () => {
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
  {loadingPage && <p>Loading...</p>}
  <div className='w-full flex flex-col items-center'>
    <div className="pb-8">
      <p className="text-4xl font-semibold inline border-b-4 border-lime-600"> Ramadan Planner 2024 - Purchase Page</p>
    </div>
    {products.length > 0 ? [<div className="pb-8">
      <p className="text-2xl font-normal inline "> Take a look at our merchandise</p>
    </div>,
    <div>
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
      })
      }  
    </div>,
    <button className="bg-emerald-600 hover:bg-white hover:text-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded text-xl outline outline-1 outline-black" >
      Complete your order today!
    </button>
    ]
  : <p>Store is empty.</p>}
  </div>
  </>
}

export default Products