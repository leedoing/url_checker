import axios from "axios";
const modalContents = document.getElementById("jsModalContents");
const addBtn = document.getElementById("jsAddUrl");
const closeBtn = document.getElementById("jsClose");
const submitAddBtn = document.getElementById("jsSubmitAddBtn");
const addUrlForm = document.getElementById("jsAddUrlForm");

const clickSubmitAddBtn = event => {
  event.preventDefault();
  const urlInput = addUrlForm.querySelector("input");
  const url = urlInput.value;
  const regex = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
  if (!regex.test(url)) {
    document.querySelector(".jsCheckUrl").style.display = "";
  } else {
    document.querySelector(".jsCheckUrl").style.display = "none";

    if (false) {
      document.querySelector(".jsCheckUrl2").style.display = "";
    }
  }
};

const clickAddUrl = event => {
  event.preventDefault();
  document.querySelector(".bg-modal").style.display = "flex";
  const div = document.createElement("div");
  div.setAttribute("class", "jsCheckUrl");
  div.innerHTML = "Please check your URL format!";
  modalContents.appendChild(div);
  document.querySelector(".jsCheckUrl").style.display = "none";

  const div2 = document.createElement("div");
  div2.setAttribute("class", "jsCheckUrl2");
  div2.innerHTML = "Please check your file size(1MB Limit)";
  modalContents.appendChild(div2);
  document.querySelector(".jsCheckUrl2").style.display = "none";
};

const clickCloseAddUrl = event => {
  event.preventDefault();
  document.querySelector(".bg-modal").style.display = "none";
};

async function init() {
  addBtn.addEventListener("click", clickAddUrl);
  closeBtn.addEventListener("click", clickCloseAddUrl);
  submitAddBtn.addEventListener("click", clickSubmitAddBtn);
}

if (addBtn) {
  init();
}
