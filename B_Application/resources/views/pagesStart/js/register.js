




































// wait for the form markup to load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle-password').forEach(eye => {
    eye.addEventListener('click', () => {
      const target = document.getElementById(eye.dataset.target);
      if (!target) return;
      // toggle
      if (target.type === 'password') {
        target.type = 'text';
        eye.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        target.type = 'password';
        eye.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });
});
