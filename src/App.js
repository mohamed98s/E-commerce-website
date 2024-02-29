import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './componant/Layout'
import Login from './componant/login/Login'
import Signup from './componant/signup/Signup'
import Home from './componant/home/Home'
import Categories from './componant/categories/Categories'
import Brands from './componant/brand/Brands'
import Products from './componant/products/Products'
import Notfound from './componant/Notfound'
import Cart from './componant/cart/Cart'
import { useContext, useEffect } from 'react';
import { userContext } from './UserContext';
import ProtectedRoute from './ProtectedRoute';
import ProductDetails from './componant/ProductDetails';
import Orders from './componant/Orders';
import Wishlist from './componant/Wishlist';
import Forget from './componant/Forget';
import Code from './componant/Code';
import Newpass from './componant/Newpass';



function App() {

  let {setUser, setLogin} = useContext(userContext)

  useEffect(()=>{
    if(localStorage.getItem('userToken'))
    setUser(localStorage.getItem('userToken'))
    setLogin(localStorage.getItem('userName'))
  },[])



  const routes = createBrowserRouter([
    {path:'',element:<Layout></Layout>, children:[
      {index:true,element:localStorage.getItem('userToken')?<Home></Home>:<Login></Login>},
      {path:'signup',element:<Signup></Signup>},
      {path:'forget-password',element:<Forget></Forget>},
      {path:'code',element:<Code></Code>},
      {path:'reset-password',element:<Newpass></Newpass>},
      {path:'home',element:<ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories></Categories></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands></Brands></ProtectedRoute>},
      {path:'wishlist',element:<ProtectedRoute><Wishlist></Wishlist></ProtectedRoute>},
      {path:'products',element:<ProtectedRoute><Products></Products></ProtectedRoute>},
      {path:'allorders',element:<ProtectedRoute><Orders></Orders></ProtectedRoute>},
      {path:'productDetails/:id',element:<ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'*',element:<Notfound></Notfound>}
    ]}
  ])




  return (
    <div className="App">
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
