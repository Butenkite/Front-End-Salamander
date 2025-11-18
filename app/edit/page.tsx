"use client";

import React, { useState } from 'react';

export default function Page({videoList}) {

    const [color, setColor] = useState('#ffffff'); // Initial color

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };


    return(
    <main>
        <nav>
            <h1>Salamander Finder</h1>
            <button>home</button>
        </nav>
        <body>
            <div id = "images">
                <img src="/squares.jpg" alt="image of four squares"/>
                <img src="/binarized.png" alt="binarized" />
            </div>
            <div id = "stats">
                <input type = "color"
                value={color}
                onChange={handleColorChange}
                />
                <p>Selected Color: {color}</p>
                <div>
                    <input type="range" id="threshold" name="threshold" min="0" max="100" />
                        <label htmlFor="threshold">Threshold</label>
                </div>  
            </div>
        </body>
    </main>
    )
}