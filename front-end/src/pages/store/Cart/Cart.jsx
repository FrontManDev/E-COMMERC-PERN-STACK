import styles from './Cart.module.css';
export default function Cart() {
    const cartItems = [
        {
            id: 1,
            name: "iPhone 16 Pro",
            price: 999,
            quantity: 1,
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096"
        },
        {
            id: 2,
            name: "MacBook Air M2",
            price: 1099,
            quantity: 1,
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665"
        },
        {
            id: 3,
            name: "Apple Watch Series 9",
            price: 399,
            quantity: 2,
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361"
        },
        {
            id: 4,
            name: "AirPods Pro (2nd Gen)",
            price: 249,
            quantity: 1,
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361"
        }
    ];
    return (
        <div className={styles.Cart}>
            <h1>Shpping Cart</h1>
            <div className={styles.CartContainer}>
                <div className={styles.CartProduct}>
                    {
                        cartItems.map((Item) =>
                        (<div className={styles.CartItem}>
                            <div className={styles.CartItemInfo}>
                                <h2>{Item.name}</h2>
                                <p>{Item.price}$</p>
                                <div className={styles.CartItemAction}>
                                    <span>+</span>
                                    <input type="number" value={Item.quantity} />
                                    <span>-</span>
                                </div>
                            </div>
                            <div className={styles.ImageContainer}>
                                <img src={Item.image} alt="" />
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