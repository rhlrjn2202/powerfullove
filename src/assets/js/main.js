// Check if user is logged in via Netlify Identity
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

// Simple mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav ul');
  const menuButton = document.createElement('button');
  menuButton.classList.add('menu-toggle');
  menuButton.innerHTML = '☰';
  
  document.querySelector('header').insertBefore(menuButton, nav);
  
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
});