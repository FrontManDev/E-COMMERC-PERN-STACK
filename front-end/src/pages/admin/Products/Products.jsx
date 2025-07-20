import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInterceptore/axiosInterceptoreToken";
import style from './Products.module.css';
import { FaPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
export default function Products() {
    const [Error, SetError] = useState(null);
    const [Loading, SetLoading] = useState(false);
    const [Category, SetCategory] = useState([]);
    const [Products, SetProducts] = useState([]);

    async function AllCategory() {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get('http://localhost:5000/api/allcategory');
            SetCategory(response.data.category);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }

    async function AllProducts() {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get('http://localhost:5000/api/allproducts');
            SetProducts(response.data.allproduct);
            console.log(response.data.allproduct);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }

    useEffect(() => {
        AllCategory();
        AllProducts();
    }, []);

    if (Loading) {
        return <div>...Loading</div>;
    }

    if (Error) {
        return <div>{Error}</div>;
    }

    return (
        <div className={style.productcontainer}>
            <div className={style.heading}>
                <select className={style.select}>
                    {
                        Category.map((category) => (
                            <option value={category.id} key={category.id}>
                                {category.Name}
                            </option>
                        ))
                    }
                </select>
                <NavLink to="/adminAddProducts" className={style.button}><FaPlus />Add New</NavLink>
            </div>

            <table className={style.productTable}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Added at</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Products.map((product, index) => {
                            const Image = JSON.parse(product.ProductsImage);
                            return (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={`http://localhost:5000/ProductsImage/${Image[0]}`}
                                            alt={product.Name}
                                            width={60}
                                            height={60}
                                        />
                                    </td>
                                    <td>{product.Name}</td>
                                    <td>{product.Price}</td>
                                    <td>{product.Quantity}</td>
                                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
