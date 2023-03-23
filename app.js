const BASE_URL = "https://user-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/users";
const users = [];
const dataPanel = document.querySelector(".dataPanel");
function renderUsers(data) {
  users.push(...data);
  let htmlContent = ``;
  users.forEach((item) => {
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
    modalAge.innerText = user.age;
    modalGender.innerText = user.gender;
    modalBirthday.innerText = user.birthday;
    modalRegion.innerText = user.region;
    modalEmail.innerText = user.email;
  });
}
axios.get(INDEX_URL).then(function (response) {
  const userList = response.data.results;
  renderUsers(userList);
});
dataPanel.addEventListener("click", function clickedOnDataPanel(event) {
  if (event.target.matches(".user-avatar img")) {
    let id = Number(event.target.dataset.id);
    modalInfo(id);
  }
});