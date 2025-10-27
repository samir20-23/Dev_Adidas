'use client';

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "../css/start.css";

export default function StartPage() {
    const router = useRouter();

    const boxCenterRef = useRef<HTMLDivElement | null>(null);
    const forwardBtnRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

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

        const clamp = (v: number, a: number, b: number) =>
            Math.min(Math.max(v, a), b);

        const handlePointerDown = (e: PointerEvent) => {
            e.preventDefault();
            isDraggingRef.current = true;
            setIsDragging(true);
            startXRef.current = e.clientX;
            document.body.style.userSelect = "none";

            maxMoveRef.current = Math.max(1, boxCenter.clientWidth - forwardBtn.clientWidth - 6);

            try {
                if ("setPointerCapture" in forwardBtn) {
                    (forwardBtn as any).setPointerCapture((e as any).pointerId);
                }
            } catch (err) {
            }
        };

        const handlePointerMove = (e: PointerEvent) => {
            const xRatio = (e.clientX / window.innerWidth) * 2 - 1;
            const yRatio = (e.clientY / window.innerHeight) * 2 - 1;
            const rotateY = xRatio * 20;
            const rotateX = -yRatio * 20;

            boxCenter.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            content.style.transform = `translateZ(20px)`;

            if (!isDraggingRef.current) return;

            const dx = e.clientX - startXRef.current;
            const maxMove = maxMoveRef.current;
            const moveX = clamp(dx, 0, maxMove);

            forwardBtn.style.left = `${moveX + 3}px`;

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

            if (moveX >= maxMove) {
                if (navigateTimeoutRef.current == null) {
                    navigateTimeoutRef.current = window.setTimeout(() => {
                        router.push("/load");
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

            try {
                if (e && "releasePointerCapture" in forwardBtn) {
                    (forwardBtn as any).releasePointerCapture((e as any).pointerId);
                }
            } catch (err) {
            }

            setTimeout(() => {
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
            }, 200);
        };

        forwardBtn.addEventListener("pointerdown", handlePointerDown as any);
        document.addEventListener("pointermove", handlePointerMove as any);
        document.addEventListener("pointerup", handlePointerUpOrCancel as any);
        document.addEventListener("pointercancel", handlePointerUpOrCancel as any);
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

        return () => {
            forwardBtn.removeEventListener("pointerdown", handlePointerDown as any);
            document.removeEventListener("pointermove", handlePointerMove as any);
            document.removeEventListener("pointerup", handlePointerUpOrCancel as any);
            document.removeEventListener(
                "pointercancel",
                handlePointerUpOrCancel as any
            );
            document.removeEventListener("pointerout", () => { });
            if (navigateTimeoutRef.current != null) {
                clearTimeout(navigateTimeoutRef.current as unknown as number);
                navigateTimeoutRef.current = null;
            }
        };
    }, [router]);

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
