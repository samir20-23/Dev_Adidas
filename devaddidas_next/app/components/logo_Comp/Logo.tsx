"use client";

import { useLayoutEffect, useRef, useState } from "react";
import "../css_comp/logo.css";

function isTransparent(bg: string): boolean {
    if (bg === "transparent") return true;
    const rgbaMatch = bg.match(
        /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/
    );
    return (
        !!rgbaMatch &&
        rgbaMatch[4] !== undefined &&
        parseFloat(rgbaMatch[4]) === 0
    );
}

export default function Logo() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [logoColor, setLogoColor] = useState<"black" | "white">("black");

    useLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        let current: Element | null = wrapper.parentElement;
        let bg = "";
        while (current) {
            bg = getComputedStyle(current).backgroundColor;
            if (!isTransparent(bg)) break;
            current = current.parentElement;
        }

        if (!current) {
            const bodyBg = getComputedStyle(document.body).backgroundColor;
            bg = isTransparent(bodyBg) ? "rgb(255,255,255)" : bodyBg;
        }

        const rgbMatch = bg.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
        if (!rgbMatch) {
            setLogoColor("black");
            return;
        }

        const r = parseInt(rgbMatch[1], 10);
        const g = parseInt(rgbMatch[2], 10);
        const b = parseInt(rgbMatch[3], 10);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        setLogoColor(luminance > 0.5 ? "black" : "white");
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="logo-wrapper"
            style={{ color: logoColor }}
        >
            <div className="logo-shapes">
                <div className="logoShape logoS1" />
                <div className="logoShape logoS2" />
                <div className="logoShape logoS3" />
            </div>
        </div>
    );
}