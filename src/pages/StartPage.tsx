// src/pages/StartPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/StartPage.css";

// NOTE
// Add this to your CSS (StartPage.css) so touch dragging isnt treated as a page gesture
// .boxCenter, .forwardBtn, .content { touch-action: none; }

export default function StartPage() {
    const navigate = useNavigate();

    const boxCenterRef = useRef<HTMLDivElement | null>(null);
    const forwardBtnRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    // keep a ref so event listeners always read latest value without reattaching
    const isDraggingRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);

    const startXRef = useRef(0);
    const lastMoveXRef = useRef(0);
    const navigateTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const boxCenter = boxCenterRef.current;
        const forwardBtn = forwardBtnRef.current;
        const content = contentRef.current;
        if (!boxCenter || !forwardBtn || !content) return;

        // Helpers
        const clamp = (v: number, a: number, b: number) =>
            Math.min(Math.max(v, a), b);

        const getMaxMove = () => {
            // ensure we never divide by zero
            const calc = boxCenter.clientWidth - forwardBtn.clientWidth - 6;
            return Math.max(1, calc);
        };

        // Handlers using PointerEvent for both mouse and touch
        const handlePointerDown = (e: PointerEvent) => {
            e.preventDefault();
            isDraggingRef.current = true;
            setIsDragging(true);
            startXRef.current = e.clientX;
            document.body.style.userSelect = "none";

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
            const maxMove = getMaxMove();
            const moveX = clamp(dx, 0, maxMove);
            lastMoveXRef.current = moveX;

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
                        navigate("/load");
                    }, 500) as unknown as number;
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
        // NOTE intentionally empty deps to attach listeners once and use refs for mutable state
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







// import { useNavigate } from "react-router-dom";

// // src/pages/StartPage.tsx
// import { use, useEffect, useRef, useState } from "react";
// import "../css/StartPage.css";
// export default function StartPage() {
//     const navigation = useNavigate();
//     const boxCenterRef = useRef<HTMLDivElement>(null);
//     const forwardBtnRef = useRef<HTMLButtonElement>(null);
//     const contentRef = useRef<HTMLDivElement>(null);

//     const [isDragging, setIsDragging] = useState(false);
//     const startXRef = useRef(0);
//     const lastMoveXRef = useRef(0);
//     // Drag functionality
//     useEffect(() => {
//         const boxCenter = boxCenterRef.current;
//         const forwardBtn = forwardBtnRef.current;
//         const content = contentRef.current;

//         if (!boxCenter || !forwardBtn || !content) return;

//         const handleMouseDown = (e: MouseEvent) => {
//             e.preventDefault();
//             setIsDragging(true);
//             startXRef.current = e.clientX;
//             document.body.style.userSelect = "none";
//         };

//         const handleMouseMove = (e: MouseEvent) => {
//             // Drag functionality
//             if (isDragging) {
//                 const dx = e.clientX - startXRef.current;
//                 const maxMove =
//                     boxCenter.clientWidth - forwardBtn.clientWidth - 6;
//                 const moveX = Math.min(Math.max(0, dx), maxMove);
//                 lastMoveXRef.current = moveX;

//                 forwardBtn.style.left = `${moveX + 3}px`;
//                 forwardBtn.style.minWidth = `${Math.max(
//                     20,
//                     (moveX / maxMove) * 100
//                 )}%`;

//                 const opacity = 1 - moveX / maxMove;
//                 content.style.opacity = `${opacity}`;

//                 if (opacity <= 0.5) {
//                     content.style.display = "none";
//                 } else {
//                     content.style.display = "flex";
//                 }

//                 boxCenter.style.padding = "3px";
//             }

//             console.log(forwardBtn.style.minWidth);
//             // 3D effect
//             const xRatio = (e.clientX / window.innerWidth) * 2 - 1;
//             const yRatio = (e.clientY / window.innerHeight) * 2 - 1;
//             const rotateY = xRatio * 20;
//             const rotateX = -yRatio * 20;

//             boxCenter.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
//             content.style.transform = `translateZ(20px)`;

//             if (forwardBtn.style.minWidth == "100%") {
//                 setTimeout(() => {
//                     navigation("/load");
//                 }, 500);

//             }
//         };

//         const handleMouseUp = () => {
//             if (!isDragging) return;
//             setIsDragging(false);
//             document.body.style.userSelect = "";
//             setTimeout(() => {
//                 if (!forwardBtn || !content || !boxCenter) return;

//                 forwardBtn.style.transition =
//                     "left 0.3s ease, min-width 0.3s ease";
//                 forwardBtn.style.left = "3px";
//                 forwardBtn.style.minWidth = "48px";
//                 content.style.display = "flex";
//                 boxCenter.style.paddingRight = "30px";
//                 content.style.opacity = "1";

//                 setTimeout(() => {
//                     if (forwardBtn) {
//                         forwardBtn.style.transition = "";
//                     }
//                 }, 900);
//             }, 1000);
//         };

//         const handleMouseLeave = () => {
//             if (!boxCenter || !content) return;
//             boxCenter.style.transform = "";
//             content.style.transform = "";
//         };

//         forwardBtn.addEventListener("mousedown", handleMouseDown);
//         document.addEventListener("mousemove", handleMouseMove);
//         +document.addEventListener("mouseup", handleMouseUp);
//         document.addEventListener("mouseleave", handleMouseLeave);

//         return () => {
//             forwardBtn.removeEventListener("mousedown", handleMouseDown);
//             document.removeEventListener("mousemove", handleMouseMove);
//             document.removeEventListener("mouseup", handleMouseUp);
//             document.removeEventListener("mouseleave", handleMouseLeave);
//         };
//     }, [isDragging]);

//     return (
//         <div className="Startpage">
//             <div className="shape s1"></div>
//             <div className="boxCenter" ref={boxCenterRef}>
//                 <button className="forwardBtn" ref={forwardBtnRef}>
//                     <i className="fas fa-arrow-right"></i>
//                 </button>
//                 <div className="content" ref={contentRef}>
//                     <p>Get started</p>
//                 </div>
//             </div>
//             <div className="shape s3"></div>
//         </div>
//     );
// }
