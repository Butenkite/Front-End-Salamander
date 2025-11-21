"use client";

import React, { useState } from 'react';
import "./output.css";

export default function OutputPage(){
    //im putting example data as this will need to be replace by API results
return(
    <main className="output-container">
        <h1 className="title">Salamander Video Output</h1>

        <p className="instructions">
         Output Instructions: select the link of the video output and a csv file
        should pop up and have the ability to scroll through the results
        </p>
    </main>
)
}