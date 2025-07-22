import { NavLink, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import style from "./EditProducts.module.css";
import { useEffect, useState } from "react";
import AxiosInstance from "../../../axiosInterceptore/axiosInterceptoreToken";
import { RiUpload2Fill } from "react-icons/ri";

export default function EditProducts() {
    const [Loading, SetLoading] = useState(false);
    const [Error, SetError] = useState(null);
    const [AllCategory, SetAllCategory] = useState([]);
    const [Product, SetProduct] = useState({
        Name: "",
        Description: "",
        Price: "",
        Quantity: "",
        categoryId: "",
        Imags: []
    });
    const [DeleteImage, SetDeletedImage] = useState([]);
    const { id } = useParams();

    async function FetchProduct() {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get(`http://localhost:5000/api/products/${id}`);
            const data = response.data.product;
            const Images = JSON.parse(data.ProductsImage);
            SetProduct({
                Name: data.Name,
                Description: data.Description,
                Price: data.Price,
                Quantity: data.Quantity,
                categoryId: data.categoryId,
                Imags: Images
            });
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
                    UpdateProduct.append("files", file);
                }
            });

            const OldImages = Product.Imags.filter((img) => typeof img === "string");
            UpdateProduct.append("OldImages", JSON.stringify(OldImages));

            const response = await AxiosInstance.put(
                `http://localhost:5000/api/updateproducts/${id}`,
                UpdateProduct,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

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
        return <div className={style.loadingState}>...Loading</div>;
    }

    if (Error) {
        return <div className={style.errorState}>{Error}</div>;
    }

    return (
        <div className={style.EditProductContainer}>
            <div className={style.heading}>
                <NavLink className={style.button} to="/adminProducts">
                    <IoMdArrowRoundBack />
                </NavLink>
                <h3>Edit Product</h3>
            </div>

            <form onSubmit={(e) => EditProduct(e)}>
                <div className={style.formcontainer}>
                    <div className={style.Images}>
                        <h3 className={style.ImageTitle}>Product Images</h3>

                        <div className={style.ImagesItems}>
                            {Product.Imags.map((img, index) => (
                                <div className={style.ImageItem} key={index}>
                                    <span
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
                                    >remove</span>
                                    <img
                                        src={typeof img === "string"
                                            ? `http://localhost:5000/ProductsImage/${img}`
                                            : URL.createObjectURL(img)}
                                        alt="preview" />
                                </div>
                            ))}
                        </div>

                        <div className={style.fileInput}>
                            <label htmlFor="file">
                                <RiUpload2Fill /> Add More Images {"(Only 5)"}
                            </label>
                            <input
                                type="file"
                                id="file"
                                multiple
                                onChange={(e) => SetProduct((prev) => ({
                                    ...prev,
                                    Imags: [...prev.Imags, ...Array.from(e.target.files)]
                                }))}
                            />
                        </div>
                    </div>

                    <div className={style.InfoGenerale}>
                        <h3>General Information</h3>

                        <div className={style.formInput}>
                            <label>Name</label>
                            <input
                                type="text"
                                value={Product.Name}
                                onChange={(e) => SetProduct((product) => ({
                                    ...product,
                                    Name: e.target.value
                                }))}
                                placeholder="Enter Name of Product"
                            />
                        </div>

                        <div className={style.formInput}>
                            <label>Category</label>
                            <select
                                value={Product.categoryId}
                                onChange={(e) => SetProduct((product) => ({
                                    ...product,
                                    categoryId: e.target.value
                                }))}
                            >
                                {AllCategory.map((category) => (
                                    <option value={category.id} key={category.id}>
                                        {category.Name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={style.formInput}>
                            <label>Price</label>
                            <input
                                type="number"
                                value={Product.Price}
                                onChange={(e) => SetProduct((product) => ({
                                    ...product,
                                    Price: e.target.value
                                }))}
                                placeholder="Enter Price of Product"
                            />
                        </div>

                        <div className={style.formInput}>
                            <label>Quantity</label>
                            <input
                                type="number"
                                value={Product.Quantity}
                                onChange={(e) => SetProduct((product) => ({
                                    ...product,
                                    Quantity: e.target.value
                                }))}
                                placeholder="Enter Quantity of Product"
                            />
                        </div>

                        <div className={style.formInput}>
                            <label>Product Description</label>
                            <textarea
                                value={Product.Description}
                                onChange={(e) => SetProduct((product) => ({
                                    ...product,
                                    Description: e.target.value
                                }))}
                                placeholder="Enter Description of Product"
                            ></textarea>
                        </div>

                        <div className={style.button}>
                            <button type="submit">Update Product</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}