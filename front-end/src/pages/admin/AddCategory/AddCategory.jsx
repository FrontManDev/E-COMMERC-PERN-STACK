import './AddCategory.module.css';
export default function AddCategory(){
    return(
        <div>
        <h1>Add a Category</h1>
        <form action="">
            <div className="input-form">
                <label htmlFor="">Name : </label>
                <input type="text" />
            </div>
        </form>
        </div>
    )
}