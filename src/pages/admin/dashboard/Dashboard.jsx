import React, { useContext, useEffect, useState } from 'react';
import { FaUserTie, FaBook, FaShoppingCart } from 'react-icons/fa'; 
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';
import { fireDB } from '../../../fireabase/FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

function Dashboard() {
    const context = useContext(myContext);
    const { mode } = context;

    const [totalBooks, setTotalBooks] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0); // State to store total products

    useEffect(() => {
        const unsubscribeBooks = onSnapshot(collection(fireDB, 'products'), (snapshot) => { // Fetch data from 'products' collection
            setTotalProducts(snapshot.docs.length); // Set total number of products
        });

        const unsubscribeOrders = onSnapshot(collection(fireDB, 'orders'), (snapshot) => {
            setTotalOrders(snapshot.size); 
        });

        const unsubscribeUsers = onSnapshot(collection(fireDB, 'users'), (snapshot) => {
            const users = snapshot.docs.map(doc => doc.data());
            setTotalUsers(users.filter(user => !user.isAdmin).length); 
        });

        return () => {
            unsubscribeBooks();
            unsubscribeOrders();
            unsubscribeUsers();
        };
    }, []);

    return (
        <Layout>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    <div className="flex flex-wrap -m-4 text-center justify-center">
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                                    <FaBook size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>{totalProducts}</h2>
                                <p className="text-purple-500 font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Books</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                                    <FaShoppingCart size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>{totalOrders}</h2>
                                <p className="text-purple-500 font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Order</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>{totalUsers}</h2>
                                <p className="text-purple-500 font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Users</p>
                            </div>
                        </div>
                    </div>
                </div>
                <DashboardTab />
            </section>
        </Layout>
    );
}

export default Dashboard;
