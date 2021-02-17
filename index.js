const userElement = document.querySelector('.user-link');
const avatar = document.querySelector('.user-avatar');
const bio = document.querySelector('.user-bio');
const errorMessage = document.querySelector('.error');

function fetchUserData(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((data) => {
                        userElement.textContent = data.name;
                        userElement.href = data.html_url;
                        avatar.src = data.avatar_url;
                        bio.textContent = data.bio;
                        errorMessage.textContent = '';
                    })
                    .catch((error) => {
                        errorMessage.textContent = 'Не удалось извлечь данные';
                    });
            } else if (response.status === 404) {
                errorMessage.textContent = 'Пользователь не найден';
            } else {
                errorMessage.textContent = 'Ошибка';
            }
        })
        .catch((error) => {
            errorMessage.textContent = 'Информация о пользователе не доступна';
        });
}

const params = new URLSearchParams(window.location.search);
const username = params.get('username') || 'IrinaRyazanskaya';

fetchUserData(username);

