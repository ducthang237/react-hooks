import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

import { productService } from '@/services';

function List({ match }) {
    const { path } = match;
    const [products, setProducts] = useState(null);

    const fetchData = (pageNumber = 1) => {
        productService.getAll(pageNumber).then(res => {
            setProducts(res.data);
        });
    };

    useEffect(() => {
        fetchData();
    }, [])

    // useEffect(() => {
    //     productService.getAll().then(res => {
    //         setProducts(res.data.data);
    //     });
    // }, []);

    function deleteProduct(id) {
        if (confirm("Are you sure you want to delete this item?") == true) {
            setProducts(products.map(x => {
                if (x.id === id) { x.isDeleting = true; }
                return x;
            }));
            productService.delete(id).then(() => {
                setProducts(products => products.filter(x => x.id !== id));
            });
        }
    }

    return (
        <div>
            <h1>Products</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add product</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '40%' }}>Name</th>
                        <th style={{ width: '50%' }}>Detail</th>
                        <th style={{ width: '10%' }}>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.data && products.data.map(product =>
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.detail}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${product.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteProduct(product.id)} className="btn btn-sm btn-danger btn-delete-product" disabled={product.isDeleting}>
                                    {product.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!products &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {products && products.data && !products.data.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No products To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <div>
                <Pagination
                    activePage={products?.current_page ? products?.current_page : 0}
                    itemsCountPerPage={products?.per_page ? products?.per_page : 0 }
                    totalItemsCount={products?.total ? products?.total : 0}
                    onChange={(pageNumber) => {
                        fetchData(pageNumber)
                    }}
                    pageRangeDisplayed={5}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
            </div>
        </div>
    );
}

export { List };