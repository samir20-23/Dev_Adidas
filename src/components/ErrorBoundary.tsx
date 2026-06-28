import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorBoundary() {
    const error = useRouteError();

    let errorMessage = "Unknown error";
    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText || error.data;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }

    return (
        <div style={{ padding: "20px", textAlign: "center", color: "#111" }}>
            <h2>Oops! Something went wrong.</h2>
            <p style={{ color: "#E53935" }}>{errorMessage}</p>
        </div>
    );
}
