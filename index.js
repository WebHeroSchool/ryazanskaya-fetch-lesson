const userElement = document.querySelector('.user-link');
const avatarElement = document.querySelector('.user-avatar');
const bioElement = document.querySelector('.user-bio');
const errorMessageElement = document.querySelector('.error');
const dateElement = document.querySelector('.date');
const preloaderWrapperElement = document.querySelector('.preloader-wrapper');
const userCardElement = document.querySelector('.user-card');

const params = new URLSearchParams(window.location.search);
const username = params.get('username') || 'IrinaRyazanskaya';

const getCurrentDate = new Promise((resolve, reject) => {
    setTimeout(() => {
        const date = new Date();
        resolve(date);
    }, 2000);
});

const fetchUserData = fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        }

        if (response.status === 404) {
            throw new Error('Не удалось найти пользователя');
        }

        throw new Error('Неизвестная ошибка');
    })
    .then((data) => {
        return {
            name: data.name,
            url: data.html_url,
            avatar: data.avatar_url,
            bio: data.bio,
        }
    });

userCardElement.classList.add('hidden');

Promise.all([getCurrentDate, fetchUserData])
    .then((allData) => {
        preloaderWrapperElement.classList.add('hidden');
        userCardElement.classList.remove('hidden');
        const date = allData[0];
        const userData = allData[1];
        dateElement.textContent = date.toLocaleString();
        userElement.textContent = userData.name;
        userElement.href = userData.url;
        avatarElement.src = userData.avatar;
        bioElement.textContent = userData.bio;
    })
    .catch((error) => {
        errorMessageElement.textContent = error.message;
        preloaderWrapperElement.classList.add('hidden');
        userCardElement.classList.remove('hidden');
    });
