import { NavLink } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import style from "./AddProducts.module.css";
import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInterceptore/axiosInterceptoreToken";
import { MdDeleteForever } from "react-icons/md";

export default function AddProducts() {

    const [Error, SetError] = useState(null);
    const [Loading, SetLoading] = useState(false);
    const [Category, SetCategory] = useState([]);
    const [Product, SetProduct] = useState({ Name: "", Description: "", Price: "", Quantity: "", categoryId: "", Imags: [] })
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
    async function AddProduct(e) {
        e.preventDefault();
        try {
            SetLoading(true);
            const AddProduct = new FormData();
            AddProduct.append("Name", Product.Name);
            AddProduct.append("Description", Product.Description);
            AddProduct.append("Price", Product.Price);
            AddProduct.append("Quantity", Product.Quantity);
            AddProduct.append("categoryId", Product.categoryId);
            Product.Imags.forEach((file) => {
                AddProduct.append("files", file);
            })
            const reponse = await AxiosInstance.post('http://localhost:5000/api/addproducts', AddProduct, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(reponse);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    useEffect(() => {
        AllCategory();
    }, []);

    if (Loading) {
        return <div>...Loading</div>;
    }

    if (Error) {
        return <div>{Error}</div>;
    }

    return (
        <div className={style.AddProductContainer}>
            <div className={style.heading}>
                <h2>Add-New Product</h2>
                <NavLink className={style.button} to="/adminProducts"><IoMdArrowRoundBack /> Back</NavLink>
            </div>
            <form className={style.formcontainer} onSubmit={(e) => AddProduct(e)}>
                <div className={style.formFlex}>
                    <div className={style.formInput}>
                        <label>Product Name</label>
                        <input type="text" onChange={(e) => SetProduct((product) => ({ ...product, Name: e.target.value }))} />
                    </div>
                    <div className={style.formInput}>
                        <label htmlFor="">Category</label>
                        <select name="" id="" onChange={(e) => SetProduct((product) => ({ ...product, categoryId: e.target.value }))}>
                            {
                                Category.map((category) => (
                                    <option value={category.id} key={category.id}>
                                        {category.Name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className={style.formFlex}>
                    <div className={style.formInput}>
                        <label>Product Price</label>
                        <input type="number" onChange={(e) => SetProduct((product) => ({ ...product, Price: e.target.value }))} />
                    </div>
                    <div className={style.formInput}>
                        <label>Product Quantity</label>
                        <input type="number" onChange={(e) => SetProduct((product) => ({ ...product, Quantity: e.target.value }))} />
                    </div>
                </div>
                <div className={style.formFlex}>
                    <div className={style.formInput}>
                        <label>Product Description</label>
                        <textarea name="" id="" onChange={(e) => SetProduct((product) => ({ ...product, Description: e.target.value }))}></textarea>
                    </div>
                    <div className={`${style.formInput} ${style.fileinput}`}>
                        <label htmlFor="file">Upload Images</label>
                        <input type="file" multiple onChange={(e) => SetProduct((prev) => ({
                            ...prev, Imags: [...prev.Imags, ...Array.from(e.target.files)]
                        }))} id="file" />
                    </div>
                </div>
                <div className={style.Images}>
                    {Product.Imags.map((img, index) => (
                        <div className={style.Imag} key={index}>
                            <MdDeleteForever
                                className={style.icon}
                                onClick={() => SetProduct((prev) => ({ ...prev, Imags: prev.Imags.filter((_, i) => i !== index) }))}
                            />
                            <img
                                src={URL.createObjectURL(img)}
                                alt="preview"
                                width={100}
                            />
                        </div>
                    ))}
                </div>

                <button>Add Product</button>
            </form>
        </div>
    )
}