import React from "react";
import style from './Products.module.css'
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([]);
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    async function deleteProduct(id) {
        let confirmare = confirm("Are you sure you want to delete this product?");
        if (confirmare) {
            let result = await fetch(`http://localhost:5000/products/${id}`, {
                method: "delete",
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();

            // Update state immediately without re-fetching
            if (result) {
                setProducts(prevProducts => prevProducts.filter(item => item._id !== id));
            }
        }
    }

    async function handleSearch(e) {
        const key = e.target.value;
        setSearch(key);

        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            setProducts(result);
        } else {
            getProducts();
        }
    }

    return (
        <div id={style.product}>
            <div id={style.productList}>
                <div className={style.heading}>
                    <button
                        className={style.backbtn}
                        onClick={() => navigate('/')}
                    >
                        <IoIosArrowBack /> back
                    </button>
                    <h1 className={style.title}>Products List</h1>
                </div>

                <div className={style.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={search}
                        onChange={handleSearch}
                        className={style.searchInput}
                    />
                </div>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Company Name</th>
                            <th colSpan={2}>Description</th>
                            <th>Rating</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>{item.company}</td>
                                    <td colSpan={2}>{item.desc}</td>
                                    <td>{item.rating}</td>
                                    <td>
                                        <span style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                id={style.delbtn}
                                                onClick={() => deleteProduct(item._id)}
                                            >
                                                <MdDelete />
                                            </button>
                                            <button
                                                id={style.editbtn}
                                                onClick={() => navigate(`/UpdateProduct/${item._id}`)}
                                            >
                                                <MdEdit />
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className={style.noProducts}>
                                    No Products Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
