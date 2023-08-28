import React, { useState, useEffect } from 'react';
import axios from "axios";

export function Home() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:7263/Categories").then(function (res)
        {
                console.log(res.data)
                const CategoriesArray = [];

                res.data.forEach((category) => {
                    CategoriesArray.push(
                        <button key={category.id}>{category.name}</button>
                    );
                });

                setCategories(CategoriesArray);
                console.log(CategoriesArray);
            })
    }, []);

    return (
        <div>
            <h1>The Sells Store</h1>
            {categories}
        </div>
    );

}
