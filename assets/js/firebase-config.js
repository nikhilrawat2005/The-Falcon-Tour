// Firebase Configuration and Initialization for The Falcon Tour
// Replace the placeholders below with your actual credentials from the Firebase Console.

const firebaseConfig = {
  apiKey: "AIzaSyD886ZgqpKQuMnHdx-tZUdXwaO4UeEQwMI",
  authDomain: "the-falcon-tour.firebaseapp.com",
  projectId: "the-falcon-tour",
  storageBucket: "the-falcon-tour.firebasestorage.app",
  messagingSenderId: "898187329494",
  appId: "1:898187329494:web:c00b07e08d7c908020ee77",
};

window.ADMIN_EMAILS = ['nikhil2005114@gmail.com', 'manishrawat2636@gmail.com', 'thefalcontour@gmail.com'];

function isAdminEmail(email) {
  return window.ADMIN_EMAILS.includes(email);
}

const ADMIN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`;
const CHEVRON_ICON = `<svg class="user-menu-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function userMenuHtml(displayName, menuId) {
  const safeName = escapeHtml(displayName);
  return `
    <div class="user-menu-wrap">
      <button type="button" class="user-menu-trigger" id="${menuId}Trigger" aria-expanded="false" aria-haspopup="true">
        <span class="user-menu-name">${safeName}</span>
        ${CHEVRON_ICON}
      </button>
      <div class="user-menu-dropdown" id="${menuId}Dropdown">
        <button type="button" onclick="logoutUser()" class="user-menu-logout">Logout</button>
      </div>
    </div>
  `;
}

function initUserMenuDropdown(menuId) {
  const trigger = document.getElementById(`${menuId}Trigger`);
  const dropdown = document.getElementById(`${menuId}Dropdown`);
  if (!trigger || !dropdown) return;

  if (!window._userMenuCloseBound) {
    window._userMenuCloseBound = true;
    document.addEventListener('click', () => {
      document.querySelectorAll('.user-menu-dropdown.is-open').forEach((menu) => {
        menu.classList.remove('is-open');
        const linkedTrigger = document.getElementById(menu.id.replace('Dropdown', 'Trigger'));
        if (linkedTrigger) linkedTrigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.user-menu-dropdown.is-open').forEach((menu) => {
      if (menu !== dropdown) menu.classList.remove('is-open');
    });
    const isOpen = dropdown.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  dropdown.addEventListener('click', (e) => e.stopPropagation());
}

// Initialize Firebase if the script compat libraries are loaded
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
  window.auth = firebase.auth();
} else {
  console.warn("Firebase script libraries not loaded yet. Make sure to include the CDN scripts in your HTML header.");
}

// Helper to handle Authentication changes on pages
document.addEventListener("DOMContentLoaded", () => {
  if (typeof firebase === 'undefined') return;

  // Listen to auth changes and update UI accordingly
  window.auth.onAuthStateChanged((user) => {
    const userNavContainer = document.getElementById("userNavContainer");
    const mobileUserNavContainer = document.getElementById("mobileUserNavContainer");
    
    let userHtml = '';
    let mobileUserHtml = '';

    if (user) {
      const isAdmin = isAdminEmail(user.email);
      const displayName = user.displayName || user.email.split('@')[0];

      if (isAdmin) {
        userHtml = `
          <div class="user-profile-menu">
            <a href="admin.html" class="btn-admin" title="Open Admin Dashboard">${ADMIN_ICON}<span class="btn-admin-label">Admin Panel</span></a>
          </div>
        `;
        mobileUserHtml = `
          <li><a href="admin.html" class="mobile-admin-btn">${ADMIN_ICON} Admin Panel</a></li>
        `;
      } else {
        userHtml = `
          <div class="user-profile-menu">
            ${userMenuHtml(displayName, 'desktopUserMenu')}
          </div>
        `;
        mobileUserHtml = `
          <li>${userMenuHtml(displayName, 'mobileUserMenu')}</li>
        `;
      }
    } else {
      // User is logged out
      userHtml = `
        <button onclick="openAuthModal()" class="btn btn-primary btn-signin">Sign In</button>
      `;
      mobileUserHtml = `
        <li><button onclick="openAuthModal()" style="color:#D9A441;background:none;border:none;font-family:'Fraunces',serif;font-size:26px;cursor:pointer;padding:0;text-align:left;">Sign In / Join</button></li>
      `;
    }

    if (userNavContainer) userNavContainer.innerHTML = userHtml;
    if (mobileUserNavContainer) mobileUserNavContainer.innerHTML = mobileUserHtml;

    if (user && !isAdminEmail(user.email)) {
      initUserMenuDropdown('desktopUserMenu');
      initUserMenuDropdown('mobileUserMenu');
    }
  });
});

// Logout handler
window.logoutUser = function() {
  window.auth.signOut().then(() => {
    window.location.reload();
  }).catch((error) => {
    console.error("Sign out error", error);
  });
};

// Google Sign-In handler
window.signInWithGoogle = function() {
  if (typeof auth === 'undefined') {
    const feedback = document.getElementById('authFeedback');
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = 'red';
      feedback.textContent = 'Firebase authentication not configured yet.';
    }
    return;
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  const feedback = document.getElementById('authFeedback');
  if (feedback) {
    feedback.style.display = 'block';
    feedback.style.color = 'var(--ink)';
    feedback.textContent = 'Connecting to Google...';
  }

  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      return db.collection('users').doc(user.uid).set({
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
        joined: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
        provider: 'google'
      }, { merge: true });
    })
    .then(() => {
      if (typeof closeAuthModal === 'function') closeAuthModal();
    })
    .catch((error) => {
      if (feedback) {
        feedback.style.color = 'red';
        feedback.textContent = error.message;
      }
    });
};
