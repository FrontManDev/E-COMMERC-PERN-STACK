import { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import AxiosInstance from '../../../axiosInterceptore/axiosInterceptoreToken';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { SetCartItems } from '../../../redux/slices/cartSlice';
import { TiDeleteOutline } from "react-icons/ti";
export default function Cart() {
    const Dispatch = useDispatch();
    const CartItems = useSelector(state => state.cart.items);
    const [Error, SetError] = useState(null);
    const [shipping, Setshipping] = useState(0);
    async function FetchCartItem() {
        try {

            const response = await AxiosInstance.get(`/Allcartitem/${jwtDecode(localStorage.getItem('token')).id}`);
            console.log(response);
            Dispatch(SetCartItems(response.data.ProdcutInCartItem));
        } catch (error) {
            SetError(error.message);
        }
    }
    async function MinuseFromCart(ProductId) {
        try {
            const response = await AxiosInstance.post('/minusfromcart', { ProductId, UserId: jwtDecode(localStorage.getItem('token')).id });
            console.log(response);
            FetchCartItem();
        } catch (error) {
            SetError(error.message);
        }
    }
    async function DeleteFromCart(ProductId) {
        try {
            const response = await AxiosInstance.delete('/deletefromcart', { data: { ProductId, UserId: jwtDecode(localStorage.getItem('token')).id } });
            console.log(response);
            FetchCartItem();
        } catch (error) {
            SetError(error.message);
        }
    }
    async function AddToCart(id) {
        try {
            const response = await AxiosInstance.post('/addtocart', {
                ProductId: id,
                UserId: jwtDecode(localStorage.getItem('token')).id
            });
            console.log(response);
            FetchCartItem();
        } catch (error) {
            SetError(error.message);
        }
    }
    const Subtotal = CartItems.reduce((total, item) => total + (item.Price * item.QuantityInCart), 0);
    const Total = Subtotal + shipping;
    useEffect(() => {
        FetchCartItem();
    }, []);
    if (Error) {
        return (
            <div>
                {Error}
            </div>
        )
    }
    return (
        <div className={styles.Cart}>
            <h1>Shpping Cart</h1>
            <div className={styles.CartContainer}>
                <div className={styles.CartProduct}>
                    {
                        CartItems.map((Item) =>
                        (<div className={styles.CartItem}>
                            <div className={styles.CartItemInfo}>
                                <h2>{Item.Name}</h2>
                                <p>{Item.Price}$</p>
                                <div className={styles.CartItemAction}>
                                    <span onClick={() => AddToCart(Item.id)}>+</span>
                                    <input type="number" value={Item.QuantityInCart} readOnly />
                                    <span onClick={() => MinuseFromCart(Item.id)}>-</span>
                                </div>
                            </div>
                            <div className={styles.ImageContainer}>
                                <TiDeleteOutline className={styles.icon} onClick={() => DeleteFromCart(Item.id)} />
                                <img src={`http://localhost:5000/ProductsImage/${JSON.parse(Item.ProductsImage)[0]}`} alt="" />
                            </div>
                        </div>
                        )
                        )
                    }
                </div>
                <div className={styles.OrderBox}>
                    <h2>Order Summary</h2>
                    <div className={styles.OrderInfo}>
                        <h3>SubTotal : <span>{Subtotal}$</span></h3>
                        <form action="">
                            <div className={styles.shipping}>
                                <h4>Shpping</h4>
                                <div className={styles.InputRadio}>
                                    <input type="radio" name='shipping' value={0} onChange={(e) => Setshipping(Number(e.target.value))} /><label htmlFor="">0$ 7Dayes </label>
                                </div>
                                <div className={styles.InputRadio}>
                                    <input type="radio" name='shipping' value={15} onChange={(e) => Setshipping(Number(e.target.value))} /><label htmlFor="">15$ 5Dayes </label>
                                </div>
                                <div className={styles.InputRadio}>
                                    <input type="radio" name='shipping' value={30} onChange={(e) => Setshipping(Number(e.target.value))} /><label htmlFor="">30$ 2Dayes </label>
                                </div>
                            </div>
                            <div className={styles.coupponcode}>
                                <label htmlFor="">Couppon Code</label>
                                <input type="text" />
                                <h3>Total : <span>{Total}$</span></h3>
                            </div>
                            <button className={styles.button}>Continue to chekout</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}