import { FaPlus } from "react-icons/fa6";
import style from "./Category.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosInstance from '../../../axiosInterceptore/axiosInterceptoreToken';
export default function Category() {
    const [Category, SetCategory] = useState([]);
    const [AddCategory, SetAddCategory] = useState("");
    const [ShowInput, SetShowInput] = useState(false);
    const [Error, SetError] = useState(null);
    const [Loading, SetLoading] = useState(false);
    async function FetchCategory() {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get('http://localhost:5000/api/allcategory');
            console.log(response);
            SetCategory(response.data.category);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    async function DeleteCategory(id) {
        try {
            SetLoading(true);
            const response = await AxiosInstance.delete(`http://localhost:5000/api/deletcategory/${id}`);
            console.log(response);
            FetchCategory();
        } catch (error) {
            SetError(error.message);
        }finally{
            SetLoading(false);
        }
    }
    async function ADDCATEGORY() {
        try{
            SetLoading(true);
            const response = await AxiosInstance.post("http://localhost:5000/api/category", { Name: AddCategory });
            console.log(response);
            FetchCategory();
        }catch(error){
            SetError(error.message);
        }finally{
            SetLoading(false);
        }
    }
    useEffect(() => {
        FetchCategory();
    }, []);
    return (
        <div className={style.CategoryContainer}>
            <div className={style.heading}>
                <h3>Category</h3>
                {
                    ShowInput ? <>
                    <input type="text" onChange={(e) => SetAddCategory(e.target.value)} placeholder="Enter Name Of Category" /> 
                    <button onClick={()=>{
                        if(AddCategory.trim()){
                            ADDCATEGORY();
                            SetShowInput(false);
                        }else{
                            SetShowInput(false);
                        }
                    } }className={style.button}>Add New</button>
                    </> :
                    <button onClick={()=>{SetShowInput(!ShowInput)}} className={style.button}>Add it</button>
                }

            </div>
            <table className={style.category}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>createdAt</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Category ? Category.map((cate, index) => (
                            <tr key={index}>
                                <td>{cate.Name}</td>
                                <td>{new Date(cate.createdAt).toLocaleDateString()}</td>
                                <td><button onClick={() => DeleteCategory(cate.id)}>delete</button></td>
                            </tr>
                        )) :
                            <tr>
                                <td colSpan={3} className={style.TdCenter}>Not Category Found</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}