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

window.ADMIN_EMAILS = ['nikhil2005114@gmail.com', 'manishrawat2636@gmail.com'];

function isAdminEmail(email) {
  return window.ADMIN_EMAILS.includes(email);
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
      // User is logged in
      const isAdmin = isAdminEmail(user.email);
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
        <button onclick="openAuthModal()" class="btn btn-primary btn-signin">Sign In</button>
      `;
      mobileUserHtml = `
        <li><button onclick="openAuthModal()" style="color:#D9A441;background:none;border:none;font-family:'Fraunces',serif;font-size:26px;cursor:pointer;padding:0;text-align:left;">Sign In / Join</button></li>
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
