// Firebase Configuration and Initialization for The Falcon Tour
// Replace the placeholders below with your actual credentials from the Firebase Console.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID_HERE.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_PROJECT_ID_HERE.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE"
};

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
      // User is logged in
      const isAdmin = user.email === 'nikhil2005114@gmail.com';
      const displayName = user.displayName || user.email.split('@')[0];
      
      userHtml = `
        <div class="user-profile-menu">
          <span class="user-greeting">Hi, ${displayName}</span>
          ${isAdmin ? `<a href="admin.html" class="btn-admin-link">Admin Panel</a>` : ''}
          <button onclick="logoutUser()" class="btn-logout-small">Logout</button>
        </div>
      `;
      mobileUserHtml = `
        <li><span style="color:#D9A441;font-family:'Fraunces',serif;font-size:22px;">Hi, ${displayName}</span></li>
        ${isAdmin ? `<li><a href="admin.html" style="color:#D9A441;font-family:'Fraunces',serif;font-size:26px;">Admin Panel</a></li>` : ''}
        <li><button onclick="logoutUser()" style="color:#F3EEE1;background:none;border:none;font-family:'Fraunces',serif;font-size:26px;cursor:pointer;padding:0;text-align:left;">Logout</button></li>
      `;
    } else {
      // User is logged out
      userHtml = `
        <button onclick="openAuthModal()" class="btn btn-outline">Sign In</button>
      `;
      mobileUserHtml = `
        <li><button onclick="openAuthModal()" style="color:#F3EEE1;background:none;border:none;font-family:'Fraunces',serif;font-size:26px;cursor:pointer;padding:0;text-align:left;">Sign In / Join</button></li>
      `;
    }

    if (userNavContainer) userNavContainer.innerHTML = userHtml;
    if (mobileUserNavContainer) mobileUserNavContainer.innerHTML = mobileUserHtml;
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
