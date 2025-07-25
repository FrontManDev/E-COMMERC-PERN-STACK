import React from 'react';
import styles from './Home.module.css';
import { FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";

export default function Home() {
    const featuredProducts = [
        {
            id: 1,
            name: 'Smart TV 4K',
            category: 'Electronics',
            price: 599.99,
            image: 'https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 2,
            name: 'Blender Pro',
            category: 'Cookware',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 3,
            name: 'Wireless Headphones',
            category: 'Electronics',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 4,
            name: 'Non-Stick Cookware Set',
            category: 'Cookware',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
    ];

    return (
        <div className={styles.home}>
            <div className={styles.hero}>
                <div className={styles.heroInfo}>
                    <h1>Wellcome to <span>E-Shope</span> Store</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nobis aut consectetur quas dolores facere,
                        facere excepturi similique!
                    </p>
                    <button>Shop Now</button>
                </div>
            </div>
            <div className={styles.NewTestPocuts}>
                <h1>New Taste Products</h1>
                <div className={styles.products} >
                    {
                        featuredProducts.map((product) => (

                            <div className={styles.product}>
                                <div className={styles.article}>
                                    <img src={product.image} alt="" />
                                    <div className={styles.buttons}>
                                        <button><FiShoppingCart /></button>
                                        <button><MdOutlineFavoriteBorder /></button>
                                        <button><FaRegEye /></button>
                                    </div>
                                </div>
                                <div className={styles.information}>
                                    <h3>Blender Pro</h3>
                                    <h3>120$</h3>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.Categories}>
                <h1>Browser By Category</h1>
                <div className={styles.category}>
                    <div className={styles.cate}>
                        <img src="https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="" />
                        <div className={styles.cateinfo}>
                            <h2>Phone</h2>
                            <button>Shope Know</button>
                        </div>
                    </div>
                    <div className={styles.cate}>
                        <img src="https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="" />
                        <div className={styles.cateinfo}>
                            <h2>Phone</h2>
                            <button>Shope Know</button>
                        </div>
                    </div>
                    <div className={styles.cate}>
                        <img src="https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="" />
                        <div className={styles.cateinfo}>
                            <h2>Phone</h2>
                            <button>Shope Know</button>
                        </div>
                    </div>
                    <div className={styles.cate}>
                        <img src="https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="" />
                        <div className={styles.cateinfo}>
                            <h2>Phone</h2>
                            <button>Shope Know</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}