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
            <div>
                <img src="/squares.jpg" alt="image of four squares"/>
                <img src="/binarized.png" alt="binarized" />
            </div>
            <div>
            </div>
        </body>
    </main>
    )
}