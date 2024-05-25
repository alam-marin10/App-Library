import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';

function Order() {
  const context = useContext(myContext);
  const { mode } = context;

  const [confirmedItems, setConfirmedItems] = useState([]);

  useEffect(() => {
    const fetchConfirmedItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, 'orders'));
        const items = querySnapshot.docs.map(doc => doc.data());
        setConfirmedItems(items);
      } catch (error) {
        console.error('Error fetching confirmed items:', error);
      }
    };

    fetchConfirmedItems();
  }, []);

  return (
    <Layout>
      <div className="h-screen bg-gray-100 pt-5 mb-[60%]" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Confirmed Order List</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {confirmedItems.map((item, index) => {
              const { title, description, imageUrl, price } = item;
              return (
                <div key={index} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
                  <img src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                      <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{description}</h2>
                      <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Av. : {price}</h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Order;
