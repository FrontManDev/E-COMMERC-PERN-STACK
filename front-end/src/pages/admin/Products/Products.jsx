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

    async function ProductByCategory(id) {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get(`http://localhost:5000/api/proudctbycategory/${id}`);
            console.log(response);
            SetProducts(response.data.product);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }

    }
    async function DeleteProduct(id) {
        try {
            SetLoading(true);
            const response = await AxiosInstance.delete(`http://localhost:5000/api/deleteproduct/${id}`);
            console.log(response);
            AllProducts();
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
        return <div className={style.Loading}>...Loading</div>;
    }

    if (Error) {
        return <div className={style.Error}>{Error}</div>;
    }

    return (
        <div className={style.productcontainer}>
            <div className={style.heading}>
                <select
                    className={style.select}
                    onChange={(e) => ProductByCategory(e.target.value)}
                >
                    {Category.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.Name}
                        </option>
                    ))}
                </select>

                <NavLink to="/admin/AddProducts" className={style.button}><FaPlus />Add New</NavLink>
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
                        Products.length > 0 ? Products.map((product, index) => {
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
                                        <NavLink to={`/admin/editproduct/${product.id}`}>Edit</NavLink>
                                        <button onClick={() => DeleteProduct(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }) :
                            <tr><td colSpan={6} className={style.TdCenter}>No products found</td></tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
