import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';



function ProductCard() {
    const context = useContext(myContext);
    const { mode, product, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice } = context;

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    console.log(cartItems);

    const [currentPrices, setCurrentPrices] = useState(product.map(p => p.price));

    const combinedAction = async (index, product) => {
        
        const newPrices = currentPrices.map((price, i) => i === index ? price - 1 : price);
        setCurrentPrices(newPrices);

        
        dispatch(addToCart(product));
        toast.success('Added For Order');

        
        try {
            const productRef = doc(fireDB, 'product', product.id);
            await updateDoc(productRef, {
                price: newPrices[index]
            });
            toast.success('Book updated in backend');
        } catch (error) {
            console.error('Error updating document: ', error);
            //toast.error('Failed to update Book in backend');
        }
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div className="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {product.filter((obj) => obj.title.toLowerCase().includes(searchkey))
                        .filter((obj) => obj.category.toLowerCase().includes(filterType))
                        .slice(0, 8).map((item, index) => {
                            const { title, description, imageUrl, id } = item;
                            const currentPrice = currentPrices[index];

                            return (
                                <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                                    <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }} >
                                        <div onClick={() => window.location.href = `/productinfo/${id}`} className="flex justify-center cursor-pointer">
                                            <img className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out" src={imageUrl} alt="product" />
                                        </div>
                                        <div className="p-5 border-t-2">
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h1>
                                            <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>Av.-{currentPrice}</p>
                                            <div className="flex justify-center">
                                                <button type="button"
                                                    onClick={() => combinedAction(index, item)}
                                                    className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2">
                                                    Add For Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}

export default ProductCard;
