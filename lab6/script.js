const Button = document.getElementById('Btn');
const userInfoDiv = document.getElementById('userInfo');

Button.addEventListener('click', getUserData);

function getUserData() {
    userInfoDiv.innerHTML = 'Завантаження...';
    userInfoDiv.classList.add('loading');

    fetch('https://randomuser.me/api')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Помилка мережі: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const user = data.results[0];
            displayUser(user);
        })
        .catch(error => {
            console.error('Не вдалося отримати дані:', error);
            userInfoDiv.innerHTML = `Виникла помилка: ${error.message}`;
            userInfoDiv.classList.remove('loading');
        });
}

function displayUser(user) {
    const picture = user.picture.large;
    const name = `${user.name.first} ${user.name.last}`;
    const city = user.location.city;
    const country = user.location.country;
    const postcode = user.location.postcode;

    const html = `
        <img src="${picture}" alt="Фото ${name}">
        <p><strong>Ім'я:</strong> ${name}</p>
        <p><strong>Місто:</strong> ${city}</p>
        <p><strong>Країна:</strong> ${country}</p>
        <p><strong>Поштовий індекс:</strong> ${postcode}</p>
    `;

    userInfoDiv.innerHTML = html;
    userInfoDiv.classList.remove('loading');
    userInfoDiv.style.display = 'block';
}