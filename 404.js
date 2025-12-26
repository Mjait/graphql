const profileBtn = document.getElementById('profileBtn');
profileBtn.addEventListener('click', () => {
    window.location.href = './profile.html';
});

const homepageBtn = document.getElementById('homepageBtn');
homepageBtn.addEventListener('click', () => {
    localStorage.removeItem('jwt');
    window.location.href = './index.html';
});