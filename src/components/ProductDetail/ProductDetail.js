import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(productsKey => productsKey.key === productKey);
    // console.log(product);
    return (
        <div>
            <h2 className="text-center">Your Product Detail</h2>
            <Product showAddToCard={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;