import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const ViewOrderDetails = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
  }, [firebase, params.bookId]);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            const data = order.data();
            return (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h5 className="text-xl font-semibold text-gray-900">Order By: {data.displayName}</h5>
                <h6 className="text-lg text-gray-700 mt-2">Quantity: {data.qty}</h6>
                <p className="text-gray-600 mt-1">Email ID: {data.userEmail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
