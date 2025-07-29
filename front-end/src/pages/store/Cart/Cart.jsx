import { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import AxiosInstance from '../../../axiosInterceptore/axiosInterceptoreToken';
import { jwtDecode } from 'jwt-decode';
export default function Cart() {
    const [CartItems,SetCartItem] = useState([]);
    const [Loading,SetLoading] = useState(false);
    const [Error,SetError] = useState(null);
    async function FetchCartItem() {
        try{
            SetLoading(true);
            const response = await AxiosInstance.get(`/Allcartitem/${jwtDecode(localStorage.getItem('token')).id}`);
            console.log(response);
            SetCartItem(response.data.Products);
        }catch(error){
            SetError(error.message);
        }finally{
            SetLoading(false);
        }
    }

    useEffect(()=>{
        FetchCartItem(); 
    },[]);
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
                                    <span>+</span>
                                    <input type="number" value={Item.quantity} />
                                    <span>-</span>
                                </div>
                            </div>
                            <div className={styles.ImageContainer}>
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
                        <h3>SubTotal : <span>0$</span></h3>
                        <form action="">
                            <div className={styles.shipping}>
                                <h4>Shpping</h4>
                                <div className={styles.InputRadio}>
                                    <input type="radio" name='shipping' /><label htmlFor="">0$ 7Dayes </label>
                                </div>
                                <div className={styles.InputRadio}>
                                    <input type="radio" name='shipping' /><label htmlFor="">15$ 5Dayes </label>
                                </div>
                                <div className={styles.InputRadio}>
                                    <input type="radio" name='shipping' /><label htmlFor="">30$ 2Dayes </label>
                                </div>
                            </div>
                            <div className={styles.coupponcode}>
                                <label htmlFor="">Couppon Code</label>
                                <input type="text" />
                                <h3>Total : <span>0$</span></h3>
                            </div>
                            <button className={styles.button}>Continue to chekout</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}