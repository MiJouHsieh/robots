'use strict'
const BASE_URL = "https://user-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const users = [];
const dataPanel = document.querySelector(".dataPanel");
const pagination = document.querySelector(".pagination");
const USERS_PER_PAGE = 12

function getUsersByPage(page) {
  const startIndex = (page - 1) * USERS_PER_PAGE
  return users.slice(startIndex, startIndex + USERS_PER_PAGE)
}
function renderPaginator (amount) {
  const numberOfPages = Math.ceil(amount / USERS_PER_PAGE)
  let pageHtml = `
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    `
  for(let page = 1; page <= numberOfPages; page++) {
    pageHtml += `
      <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>
    `
  }
  pageHtml += `
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
    `
  pagination.innerHTML = pageHtml
}
function renderUsers(data) {
  let htmlContent = ``;
  data.forEach((item) => {
    htmlContent += `
        <div class="user-card">
          <div class="user-avatar">
            <img src="${
              item.avatar
            }" alt="user-avatar" data-bs-toggle="modal" data-bs-target="#user-modal" data-id="${
      item.id
    }">
          </div>
          <p class="user-name">${item.name + " " + item.surname}</p>
        </div>
    `;
  });
  dataPanel.innerHTML = htmlContent;
}
function modalInfo(id) {
  const SHOW_URL = INDEX_URL + "/" + id;
  const modalName = document.querySelector(".modal-name");
  const modalImg = document.querySelector(".modal-avatar-img");
  const modalAge = document.querySelector(".modal-age");
  const modalGender = document.querySelector(".modal-gender");
  const modalBirthday = document.querySelector(".modal-birthday");
  const modalRegion = document.querySelector(".modal-region");
  const modalEmail = document.querySelector(".modal-email");

  axios.get(SHOW_URL).then(function (response) {
    const user = response.data;
    modalName.innerText = `${user.name + " " + user.surname}`;
    modalImg.src = user.avatar;
    modalAge.innerText = `age: ${user.age}`;
    modalGender.innerText = `gender: ${user.gender}`;
    modalBirthday.innerText = `birthday: ${user.birthday}`;
    modalRegion.innerText = `region: ${user.region}`;
    modalEmail.innerText = `email: ${user.email}`;
  });
}

dataPanel.addEventListener("click", function clickedOnDataPanel(event) {
  if (event.target.matches(".user-avatar img")) {
    let id = Number(event.target.dataset.id);
    modalInfo(id);
  }
});

pagination.addEventListener('click', function clickedOnPagination(event) {
  if (event.target.tagName !== 'A') return
  const clickedPage = Number(event.target.dataset.page)
  renderUsers(getUsersByPage(clickedPage))
})

axios.get(INDEX_URL)
.then(function (response) {
  users.push(...response.data.results)
  renderUsers(getUsersByPage(1));
  renderPaginator (users.length)
})
.catch((err) => console.log(err))