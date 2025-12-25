const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const errorDiv = document.getElementById('error');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    showError('Please fill in all fields');
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = 'Authenticating...';

  try {
    const auth = btoa(`${username}:${password}`);

    const response = await fetch(
      'https://learn.zone01oujda.ma/api/auth/signin',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    if (!response.ok) {
      showError('Invalid credentials');
      return;
    }

    const jwt = await response.json();
    localStorage.setItem('jwt', jwt);

    window.location.href = './profile.html';
  } catch (err) {
    console.error(err);
    showError('Network error, try again');
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Enter Chronicle';
  }
});

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';

  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 2000);
}
