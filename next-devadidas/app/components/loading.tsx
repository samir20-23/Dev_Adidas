import React from "react"
import "./css_comp/loading.css";
export default function Loading() {
    return (
        <>
            <div className="fullLoader">
                <div className="loader">
                    <div className="leaf"></div>
                    <div className="leaf"></div>
                    <div className="leaf"></div>
                </div>
            </div>
        </>
    )
}
