import { NavLink, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import style from "../AddProducts/AddProducts.module.css";
import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInterceptore/axiosInterceptoreToken";
import { MdDeleteForever } from "react-icons/md";
export default function EditProducts() {
    const [Loading, SetLoading] = useState(false);
    const [Error, SetError] = useState(null);
    const [AllCategory, SetAllCategory] = useState([]);
    const [Product, SetProduct] = useState({ Name: "", Description: "", Price: "", Quantity: "", categoryId: "", Imags: [] });
    const [DeleteImage, SetDeletedImage] = useState([]);
    const { id } = useParams();
    async function FetchProduct() {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get(`http://localhost:5000/api/products/${id}`);
            console.log(response);
            const data = response.data.product;
            const Images = JSON.parse(data.ProductsImage);
            SetProduct({
                Name: data.Name,
                Description: data.Description,
                Price: data.Price,
                Quantity: data.Quantity,
                categoryId: data.categoryId,
                Imags: Images
            })
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    async function FetchAllCategory() {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get('http://localhost:5000/api/allcategory');
            SetAllCategory(response.data.category);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    async function EditProduct(e) {
        e.preventDefault();
        try {
            SetLoading(true);
            const UpdateProduct = new FormData();
            UpdateProduct.append("Name", Product.Name);
            UpdateProduct.append("Description", Product.Description);
            UpdateProduct.append("Price", Product.Price);
            UpdateProduct.append("Quantity", Product.Quantity);
            UpdateProduct.append("categoryId", Product.categoryId);
            UpdateProduct.append("DeletedImages", JSON.stringify(DeleteImage));
            Product.Imags.forEach((file) => {
                if (typeof file !== "string") {
                    UpdateProduct.append("file", file);
                }
            });
            const OldImages = Product.Imags.filter((img) => typeof img === "string");
            UpdateProduct.append("OldImages", JSON.stringify(OldImages));
            const response = await AxiosInstance.put(`http://localhost:5000/api/updateproducts/${id}`,
                UpdateProduct, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Product updated:", response.data);
            alert("Product updated successfully");
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    useEffect(() => {
        FetchProduct();
        FetchAllCategory();
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
            <form className={style.formcontainer} onSubmit={(e) => EditProduct(e)}>
                <div className={style.formFlex}>
                    <div className={style.formInput}>
                        <label>Product Name</label>
                        <input type="text" value={Product.Name} onChange={(e) => SetProduct((product) => ({ ...product, Name: e.target.value }))} />
                    </div>
                    <div className={style.formInput}>
                        <label htmlFor="">Category</label>
                        <select name="" id="" value={Product.categoryId} onChange={(e) => SetProduct((product) => ({ ...product, categoryId: e.target.value }))}>
                            {
                                AllCategory.map((category) => (
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
                        <input type="number" value={Product.Price} onChange={(e) => SetProduct((product) => ({ ...product, Price: e.target.value }))} />
                    </div>
                    <div className={style.formInput}>
                        <label>Product Quantity</label>
                        <input type="number" value={Product.Quantity} onChange={(e) => SetProduct((product) => ({ ...product, Quantity: e.target.value }))} />
                    </div>
                </div>
                <div className={style.formFlex}>
                    <div className={style.formInput}>
                        <label>Product Description</label>
                        <textarea name="" id="" value={Product.Description} onChange={(e) => SetProduct((product) => ({ ...product, Description: e.target.value }))}></textarea>
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
                                onClick={() => {
                                    if (typeof img === "string") {
                                        SetDeletedImage((prev) => [...prev, img]);
                                    }
                                    SetProduct((prev) => ({
                                        ...prev,
                                        Imags: prev.Imags.filter((_, i) => i !== index)
                                    }));
                                }}
                            />

                            <img
                                src={typeof img === "string" ? `http://localhost:5000/ProductsImage/${img}` : URL.createObjectURL(img)}
                                alt="preview"
                                width={100}
                            />
                        </div>
                    ))}
                </div>
                <button>Edit Product</button>
            </form>
        </div>
    )
}