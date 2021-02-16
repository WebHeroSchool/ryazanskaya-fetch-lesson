const userElement = document.querySelector('.user-link');
const avatar = document.querySelector('.user-avatar');
const bio = document.querySelector('.user-bio');
const errorMessage = document.querySelector('.error');
const button = document.querySelector('.search-button');
const userName = document.getElementById('name');

function fetchUserData(username) {
	fetch(`https://api.github.com/users/${username}`)
	.then((response) => {
  	response.json()
    	.then((data) => {
        userElement.textContent = data.name;
        userElement.href = data.html_url;
        avatar.src = data.avatar_url;
        bio.textContent = data.bio;
      })
      .catch((error) => {
        errorMessage.textContent = 'Не удалось извлечь данные';
      });
   })
  .catch((error) => {
    errorMessage.textContent = 'Информация о пользователе не доступна';
   });
}

const params = new URLSearchParams(window.location.search);
fetchUserData(params.get('username'));

button.addEventListener('click', () => {
    const userNameValue = userName.value;
    fetchUserData(userNameValue);
});

