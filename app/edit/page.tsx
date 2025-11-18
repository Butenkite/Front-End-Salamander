"use client";

import React, { useState } from 'react';

export default function Page({videoList}) {

    const [color, setColor] = useState('#ffffff'); // Initial color

    const [threshold, setThreshold] = useState('0'); // Initial threshold

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleThresholdChange = (event) => {
        setThreshold(event.target.value);
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
                    <input type="range" id="threshold" name="threshold" min="0" max="100" onChange={handleThresholdChange}/>
                        <label htmlFor="threshold">Threshold</label>
                    <p>Selected Threshold: {threshold}</p>
                </div>  
            </div>
        </body>
    </main>
    )
}