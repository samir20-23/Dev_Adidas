// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // 1) Toggle show/hide password icons
  document.querySelectorAll(".toggle-password").forEach((eye) => {
    eye.addEventListener("click", () => {
      const targetId = eye.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        eye.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        eye.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });

  // 2) Toggle opacity of the terms/remember-me text
  const checkbox = document.getElementById("termsCheckbox");
  const textContent = document.getElementById("termsCheckboxcontent");
  if (checkbox && textContent) {
    checkbox.addEventListener("click", () => {
      if (textContent.style.opacity === "0.5") {
        textContent.style.opacity = "1";
      } else {
        textContent.style.opacity = "0.5";
      }
    });
  }

  // 3) Simple front-end validation feedback (optional)
  //    If you want real-time validation, you can extend this section.
  //    For now, we'll just clear any error messages when the user types.
  document.querySelectorAll(
    "input[type='text'], input[type='email'], input[type='password']"
  ).forEach((inp) => {
    inp.addEventListener("input", () => {
      const errorSpan = document.getElementById(`error-${inp.id}`);
      if (errorSpan) {
        errorSpan.textContent = "";
      }
    });
  });
});
