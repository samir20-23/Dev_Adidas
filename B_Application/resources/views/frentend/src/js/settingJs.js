 const checkbox = document.querySelector("input[name=mode]");
checkbox.addEventListener("change", function () {
    document.documentElement.classList.add("transition");
    setTimeout(() => {
        document.documentElement.classList.remove("transition");
    }, 300);
    document.documentElement.setAttribute(
        "data-theme",
        this.checked ? "dark" : "light"
    );
}); 