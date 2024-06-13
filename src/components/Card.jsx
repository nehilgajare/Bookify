import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const [url, setURL] = useState(null);
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then(url => setURL(url));
  }, [firebase, props.imageURL]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-700 transition-transform duration-300 transform hover:scale-105 m-4 flex flex-col">
      <div className="w-full h-64 overflow-hidden border-gray-500">
        <img className="w-full h-full object-scale-down" src={url} alt={props.name} />
      </div>
      <div className="flex-grow px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">{props.name}</div>
        <p className="text-gray-900 text-base">
          This book has a title <span className="font-semibold">{props.name}</span> and this book is sold by <span className="font-semibold">{props.displayName}</span> and this costs <span className="font-semibold">${props.price}</span>.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={() => navigate(props.link)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default BookCard;
