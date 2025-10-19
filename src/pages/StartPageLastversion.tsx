import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../css/StartPage.css";

export default function StartPage() {
    const navigation = useNavigate();
    const boxCenterRef = useRef<HTMLDivElement>(null);
    const forwardBtnRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const startXRef = useRef(0);
    const lastMoveXRef = useRef(0);

    useEffect(() => {
        const boxCenter = boxCenterRef.current;
        const forwardBtn = forwardBtnRef.current;
        const content = contentRef.current;
        if (!boxCenter || !forwardBtn || !content) return;

        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            setIsDragging(true);
            startXRef.current = e.clientX;
            document.body.style.userSelect = "none";
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const dx = e.clientX - startXRef.current;
                const maxMove = boxCenter.clientWidth - forwardBtn.clientWidth - 6;
                const moveX = Math.min(Math.max(0, dx), maxMove);
                lastMoveXRef.current = moveX;
                forwardBtn.style.left = `${moveX + 3}px`;
                forwardBtn.style.minWidth = `${Math.max(20, (moveX / maxMove) * 100)}%`;
                const opacity = 1 - moveX / maxMove;
                content.style.opacity = `${opacity}`;
                if (opacity <= 0.5) {
                    content.style.display = "none";
                } else {
                    content.style.display = "flex";
                }
                boxCenter.style.padding = "3px";
            }

            const xRatio = (e.clientX / window.innerWidth) * 2 - 1;
            const yRatio = (e.clientY / window.innerHeight) * 2 - 1;
            const rotateY = xRatio * 20;
            const rotateX = -yRatio * 20;
            boxCenter.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            content.style.transform = `translateZ(20px)`;

            if (forwardBtn.style.minWidth == "100%") {
                setTimeout(() => {
                    navigation("/load");
                }, 500);
            }
        };

        const handleMouseUp = () => {
            if (!isDragging) return;
            setIsDragging(false);
            document.body.style.userSelect = "";
            setTimeout(() => {
                if (!forwardBtn || !content || !boxCenter) return;
                forwardBtn.style.transition = "left 0.3s ease, min-width 0.3s ease";
                forwardBtn.style.left = "3px";
                forwardBtn.style.minWidth = "48px";
                content.style.display = "flex";
                boxCenter.style.paddingRight = "30px";
                content.style.opacity = "1";
                setTimeout(() => {
                    if (forwardBtn) {
                        forwardBtn.style.transition = "";
                    }
                }, 900);
            }, 1000);
        };

        const handleMouseLeave = () => {
            if (!boxCenter || !content) return;
            boxCenter.style.transform = "";
            content.style.transform = "";
        };

        forwardBtn.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            forwardBtn.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isDragging]);

    return (
        <div className="Startpage">
            <div className="shape s1"></div>
            <div className="boxCenter" ref={boxCenterRef}>
                <button className="forwardBtn" ref={forwardBtnRef}>
                    <i className="fas fa-arrow-right"></i>
                </button>
                <div className="content" ref={contentRef}>
                    <p>Get started</p>
                </div>
            </div>
            <div className="shape s3"></div>
        </div>
    );
}
