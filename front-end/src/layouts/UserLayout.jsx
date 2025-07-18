export default function UserLayout() {
    return (
        <div>
            <button onClick={() => {
                localStorage.removeItem("token");

            }}>Logout</button>
        </div>
    )
}