import React, { useState, useEffect, useRef } from "react";
import { useSearchUserQuery } from "../../../app/redux-rtk-query/userApiEndpoint";
import { HashLoader } from "react-spinners";
import DragComponents from "./DragComponents";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [dragId, setDragId] = useState(null);
  const [isOpenSuggestion, SetIsOpenSuggestion] = useState(false);
  const { data, isLoading, error } = useSearchUserQuery(query);
  const users = data?.success ? data.data : [];

  const suggestionsRef = useRef(null); 

  // Handle input changes
  const handleOnChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") SetIsOpenSuggestion(false);
    else SetIsOpenSuggestion(true);
  };

  // Close suggestions if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        SetIsOpenSuggestion(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-5 relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleOnChange}
        className="border p-2 rounded-md w-full"
      />
      {isOpenSuggestion && (
        <ul
          ref={suggestionsRef} // Attach the ref to the suggestions container
          className="bg-white shadow-md transition-transform h-64 rounded top-12 absolute w-full mx-auto"
        >
          {isLoading && !error && <HashLoader />}
          {!isLoading && !error && users.length > 0 &&
            users.map((user) => (
              <li
                key={user._id}
                onMouseOver={() => setDragId(user._id)}
                className="flex relative hover:bg-slate-400 cursor-pointer p-2 shadow gap-2 items-center"
              >
                <img className="w-10 h-10 rounded-full relative" src={user?.photo} alt="" />
                <h2>{user?.username}</h2>
                {dragId === user._id && <DragComponents SetIsOpenSuggestion={SetIsOpenSuggestion} user={user} />}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
