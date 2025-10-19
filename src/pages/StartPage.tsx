// src/pages/StartPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/StartPage.css";

export default function StartPage() {
    const navigate = useNavigate();

    const boxCenterRef = useRef<HTMLDivElement | null>(null);
    const forwardBtnRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    // keep a ref so event listeners always read latest value without reattaching
    const isDraggingRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);

    const startXRef = useRef(0);
    const maxMoveRef = useRef(0);
    const navigateTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const boxCenter = boxCenterRef.current;
        const forwardBtn = forwardBtnRef.current;
        const content = contentRef.current;
        if (!boxCenter || !forwardBtn || !content) return;

        // Helpers
        const clamp = (v: number, a: number, b: number) =>
            Math.min(Math.max(v, a), b);

        // Handlers using PointerEvent for both mouse and touch
        const handlePointerDown = (e: PointerEvent) => {
            e.preventDefault();
            isDraggingRef.current = true;
            setIsDragging(true);
            startXRef.current = e.clientX;
            document.body.style.userSelect = "none";

            // Pre-calculate maxMove on drag start
            maxMoveRef.current = Math.max(1, boxCenter.clientWidth - forwardBtn.clientWidth - 6);

            // capture pointer to the button so we keep getting events even if pointer leaves the element
            try {
                if ("setPointerCapture" in forwardBtn) {
                    (forwardBtn as any).setPointerCapture((e as any).pointerId);
                }
            } catch (err) {
                // ignore if capture not supported
            }
        };

        const handlePointerMove = (e: PointerEvent) => {
            // 3D tilt always, regardless of dragging
            const xRatio = (e.clientX / window.innerWidth) * 2 - 1;
            const yRatio = (e.clientY / window.innerHeight) * 2 - 1;
            const rotateY = xRatio * 20;
            const rotateX = -yRatio * 20;

            boxCenter.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            content.style.transform = `translateZ(20px)`;

            if (!isDraggingRef.current) return;

            // Dragging logic
            const dx = e.clientX - startXRef.current;
            const maxMove = maxMoveRef.current;
            const moveX = clamp(dx, 0, maxMove);

            forwardBtn.style.left = `${moveX + 3}px`;

            // convert to percentage for minWidth, ensure between 20 and 100
            const percent = Math.min(100, Math.max(20, (moveX / maxMove) * 100));
            forwardBtn.style.minWidth = `${percent}%`;

            const opacity = 1 - moveX / maxMove;
            content.style.opacity = `${opacity}`;

            if (opacity <= 0.5) {
                content.style.display = "none";
            } else {
                content.style.display = "flex";
            }

            boxCenter.style.padding = "3px";

            // if fully dragged to the end, navigate once
            if (moveX >= maxMove) {
                // prevent multiple timers
                if (navigateTimeoutRef.current == null) {
                    // using window.setTimeout so TS knows it returns a number
                    navigateTimeoutRef.current = window.setTimeout(() => {
                        // navigate("/load");
                        console.log("👌👌👌")
                    }, 150) as unknown as number;
                }
            }
        };

        const handlePointerUpOrCancel = (e?: PointerEvent) => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            setIsDragging(false);
            document.body.style.userSelect = "";

            // release pointer capture if we set it
            try {
                if (e && "releasePointerCapture" in forwardBtn) {
                    (forwardBtn as any).releasePointerCapture((e as any).pointerId);
                }
            } catch (err) {
                // ignore
            }

            // If user did not reach the end, animate back to start
            setTimeout(() => {
                // clear any pending navigate timeout if we didn't actually navigate yet
                if (navigateTimeoutRef.current != null) {
                    clearTimeout(navigateTimeoutRef.current as unknown as number);
                    navigateTimeoutRef.current = null;
                }

                forwardBtn.style.transition = "left 0.3s ease, min-width 0.3s ease";
                forwardBtn.style.left = "3px";
                forwardBtn.style.minWidth = "48px";
                content.style.display = "flex";
                boxCenter.style.paddingRight = "30px";
                content.style.opacity = "1";

                setTimeout(() => {
                    forwardBtn.style.transition = "";
                }, 900);
            }, 200); // slightly quicker snap-back for mobile feel
        };

        // attach pointer events
        forwardBtn.addEventListener("pointerdown", handlePointerDown as any);
        document.addEventListener("pointermove", handlePointerMove as any);
        document.addEventListener("pointerup", handlePointerUpOrCancel as any);
        document.addEventListener("pointercancel", handlePointerUpOrCancel as any);
        // pointer leave for visual reset when not dragging
        document.addEventListener(
            "pointerout",
            () => {
                if (!isDraggingRef.current) {
                    boxCenter.style.transform = "";
                    content.style.transform = "";
                }
            },
            { passive: true }
        );

        // cleanup
        return () => {
            forwardBtn.removeEventListener("pointerdown", handlePointerDown as any);
            document.removeEventListener("pointermove", handlePointerMove as any);
            document.removeEventListener("pointerup", handlePointerUpOrCancel as any);
            document.removeEventListener(
                "pointercancel",
                handlePointerUpOrCancel as any
            );
            document.removeEventListener("pointerout", () => { });
            // clear timeout if any
            if (navigateTimeoutRef.current != null) {
                clearTimeout(navigateTimeoutRef.current as unknown as number);
                navigateTimeoutRef.current = null;
            }
        };
    }, [navigate]);

    return (
        <div className="Startpage page">
            <div className="shape s1" />
            <div className="boxCenter" ref={boxCenterRef}>
                <button className="forwardBtn" ref={forwardBtnRef} aria-label="forward">
                    <i className="fas fa-arrow-right" />
                </button>
                <div className="content" ref={contentRef}>
                    <p>Get started</p>
                </div>
            </div>
            <div className="shape s3" />
        </div>
    );
}
 