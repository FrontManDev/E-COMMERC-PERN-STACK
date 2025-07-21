import { NavLink } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import style from "./AddProducts.module.css";
import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInterceptore/axiosInterceptoreToken";
import { RiUpload2Fill } from "react-icons/ri";
import { IoIosRemoveCircle } from "react-icons/io";


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
                <NavLink className={style.button} to="/adminProducts"><IoMdArrowRoundBack /></NavLink>
                <h3>Add New Product</h3>
            </div>
            <form action="" onSubmit={(e) => AddProduct(e)}>
                <div className={style.formcontainer}>
                    <div className={style.Images}>
                        <h3 className={style.ImageTitle}>Upload Product Images</h3>
                        <div className={style.fileInput}>
                            {
                                Product.Imags ?
                                    <div className={style.ImagesItems}>
                                        {
                                            Product.Imags.map((item, index) => (
                                                <div className={style.ImageItem} key={index}>
                                                    <button className={style.icon} onClick={() => SetProduct((prev) => (
                                                        {
                                                            ...prev, Imags: prev.Imags.filter((_, i) => i !== index)
                                                        }
                                                    ))}>Remove</button>
                                                    <img src={URL.createObjectURL(item)} alt="" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    : null
                            }
                            <label htmlFor="file" ><RiUpload2Fill /> Add Images {"(Only 5 )"}</label>
                            <input type="file" id="file" multiple onChange={(e) => SetProduct((prev) => ({
                                ...prev, Imags: [...prev.Imags, ...Array.from(e.target.files)]
                            }))} />
                        </div>
                    </div>
                    <div className={style.InfoGenerale}>
                        <h3>Generale Iformation</h3>
                        <div className={style.formInput}>
                            <label htmlFor="">Name </label>
                            <input type="text" placeholder="Enter Name of Product" onChange={(e) => SetProduct((prev) => ({
                                ...prev, Name: e.target.value
                            }))} />
                        </div>
                        <div className={style.formInput}>
                            <label htmlFor="">Category </label>
                            <select name="" id="" onChange={(e) => SetProduct((prev) => ({ ...prev, categoryId: e.target.value }))}>
                                {
                                    Category.map((category) => (
                                        <option value={category.id}>{category.Name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={style.formInput}>
                            <label htmlFor="">Price </label>
                            <input type="number" placeholder="Enter Price of Product" onChange={(e) => SetProduct((prev) => ({
                                ...prev, Price: e.target.value
                            }))} />
                        </div>
                        <div className={style.formInput}>
                            <label htmlFor="">Quantity </label>
                            <input type="number" placeholder="Enter Quantity of Product" onChange={(e) => SetProduct((prev) => ({
                                ...prev, Quantity: e.target.value
                            }))} />
                        </div>
                        <div className={style.formInput}>
                            <label htmlFor="">product description</label>
                            <textarea name="" id="" placeholder="Enter Description of Product" onChange={(e) => SetProduct((prev) => ({
                                ...prev, Description: e.target.value
                            }))}></textarea>
                        </div>
                        <div className={style.button}>
                            <button>Add Product</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}