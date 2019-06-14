import axios from "axios";

const modalContents = document.getElementById("jsModalContents");
const addBtn = document.getElementById("jsAddUrl");
const closeBtn = document.getElementById("jsClose");
const submitAddBtn = document.getElementById("jsSubmitAddBtn");
const addUrlForm = document.getElementById("jsAddUrlForm");
//https://react-lee-movieapp.s3.ap-northeast-2.amazonaws.com/favicon.ico
const checkUrl = async url => {
  const encodeUrl = encodeURIComponent(url);
  const response = await axios({
    url: `/api/${encodeUrl}/check`,
    method: "GET"
  });
  console.log(response);
};

const clickSubmitAddBtn = event => {
  event.preventDefault();
  const urlInput = addUrlForm.querySelector("input");
  const url = urlInput.value;
  const regex = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
  document.querySelector(".jsDivFileSize").style.display = "none";
  document.querySelector(".jsDivUrlFormat").style.display = "none";
  if (!regex.test(url)) {
    document.querySelector(".jsDivUrlFormat").style.display = "";
  } else {
    checkUrl(url);
    if (true) {
      document.getElementsByClassName("jsDivFileSize")[0].innerText = "test";
      document.querySelector(".jsDivFileSize").style.display = "";
    }
  }
};

const clickAddUrl = event => {
  event.preventDefault();
  document.querySelector(".bg-modal").style.display = "flex";
};

const clickCloseAddUrl = event => {
  event.preventDefault();
  document.querySelector(".bg-modal").style.display = "none";
  document.querySelector(".jsDivUrlFormat").style.display = "none";
  document.querySelector(".jsDivFileSize").style.display = "none";
};

const createMessage = () => {
  const divUrlFormat = document.createElement("div");
  divUrlFormat.setAttribute("class", "jsDivUrlFormat");
  divUrlFormat.innerHTML = "Please check URL format!";
  modalContents.appendChild(divUrlFormat);
  document.querySelector(".jsDivUrlFormat").style.display = "none";

  const divFileSize = document.createElement("div");
  divFileSize.setAttribute("class", "jsDivFileSize");
  divFileSize.innerHTML = "Please check file size (10MB Limit)";
  modalContents.appendChild(divFileSize);
  document.querySelector(".jsDivFileSize").style.display = "none";
};

async function init() {
  createMessage();
  addBtn.addEventListener("click", clickAddUrl);
  closeBtn.addEventListener("click", clickCloseAddUrl);
  submitAddBtn.addEventListener("click", clickSubmitAddBtn);
}

if (addBtn) {
  init();
}
