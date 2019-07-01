import axios from "axios";

const modalContents = document.getElementById("jsModalContents");
const addBtn = document.getElementById("jsAddUrl");
const closeBtn = document.getElementById("jsClose");
const submitAddBtn = document.getElementById("jsSubmitAddBtn");
const addUrlForm = document.getElementById("jsAddUrlForm");
//https://react-lee-movieapp.s3.ap-northeast-2.amazonaws.com/favicon.ico
const checkUrl = async (name, url) => {
  const encodeName = encodeURIComponent(name);
  const encodeUrl = encodeURIComponent(url);
  const response = await axios({
    url: `/api/${encodeName}/${encodeUrl}/add`,
    method: "GET"
  });
  return response.data;
};

const clickSubmitAddBtn = async event => {
  event.preventDefault();
  const inputUrl = addUrlForm.querySelector("#jsInputUrl");
  const inputName = addUrlForm.querySelector("#jsInputName");
  const url = inputUrl.value;
  const name = inputName.value;
  if (name.length < 1) {
    document.getElementsByClassName("jsDivFileSize")[0].innerText =
      "Please Input Name";
    document.querySelector(".jsDivFileSize").style.display = "";
    document.querySelector(".jsDivUrlFormat").style.display = "none";
  } else {
    const regex = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
    document.querySelector(".jsDivFileSize").style.display = "none";
    document.querySelector(".jsDivUrlFormat").style.display = "none";
    if (!regex.test(url)) {
      document.querySelector(".jsDivUrlFormat").style.display = "";
    } else {
      const response = await checkUrl(name, url);
      if (response.result == true) {
        document.getElementsByClassName("jsDivFileSize")[0].innerText =
          response.comment;
        document.querySelector(".jsDivFileSize").style.display = "";
        setTimeout(() => {
          window.location.href = "./";
        }, 1000);
      } else {
        document.getElementsByClassName(
          "jsDivFileSize"
        )[0].innerText = response;
        document.querySelector(".jsDivFileSize").style.display = "";
      }
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
