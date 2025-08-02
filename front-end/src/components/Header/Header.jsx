import { useEffect, useState } from 'react';
import { FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import { IoIosClose } from "react-icons/io";
import styles from './header.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { SetCartItems } from '../../redux/slices/cartSlice';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import AxiosInstance from '../../axiosInterceptore/axiosInterceptoreToken';
export default function Header() {
  const dispatch = useDispatch();
  const Cartcount = useSelector(state => state.cart.count);
  const WishListCount = useSelector(state => state.wishlist.count);
  const [Show, SetShow] = useState(false);
  async function fetchCart() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const userId = jwtDecode(token).id;
      const res = await AxiosInstance.get(`/Allcartitem/${userId}`);
      dispatch(SetCartItems(res.data.ProdcutInCartItem));
    } catch (err) {
      console.error('Failed to fetch cart items:', err);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <header className={styles.header}>
      <h2>E-Shope</h2>
      <ul className={Show ? styles.active : null}>
        <li>
          <NavLink to='/Store'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/Store/Products'>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to='/Store/Contact_us'>
            Contact_us
          </NavLink>
        </li>
      </ul>
      <div className={styles.actions}>
        <NavLink to='/Store/Wishlist'><span><MdOutlineFavoriteBorder /><sup>{WishListCount}</sup></span></NavLink>
        <NavLink to='/Store/Cart'><span><FiShoppingCart /><sup>{Cartcount}</sup></span></NavLink>
        <NavLink to='/'><span><FiUser /> Login</span></NavLink>
      </div>
      <div className={styles.menu}>
        {Show ?
          <IoIosClose className={styles.icon} onClick={() => SetShow(!Show)} /> :
          <FiMenu className={styles.icon} onClick={() => SetShow(!Show)} />}
      </div>
    </header>
  )
}