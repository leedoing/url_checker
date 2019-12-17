import axios from "axios";

const modalContents = document.getElementById("jsModalContents");
const addBtn = document.getElementById("jsAddUrl");
const closeBtn = document.getElementById("jsClose");
const submitAddBtn = document.getElementById("jsSubmitAddBtn");
const addUrlForm = document.getElementById("jsAddUrlForm");
//https://react-lee-movieapp.s3.ap-northeast-2.amazonaws.com/favicon.ico
const checkUrl = async (name, url, month) => {
  const encodeName = encodeURIComponent(name);
  const encodeUrl = encodeURIComponent(url);
  const response = await axios({
    url: `/api/${encodeName}/${encodeUrl}/${month}/add`,
    method: "post"
  });
  return response.data;
};

const clickSubmitAddBtn = async event => {
  event.preventDefault();
  const inputUrl = addUrlForm.querySelector("#jsInputUrl");
  const inputName = addUrlForm.querySelector("#jsInputName");
  const inputMonth = addUrlForm.querySelector("#jsInputMonth");
  const url = inputUrl.value;
  const name = inputName.value;
  const month = inputMonth.value;
  const regexUrl = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
  if (name.length < 1) {
    document.getElementsByClassName("jsDivFileSize")[0].innerText =
      "Please Input Name";
    document.querySelector(".jsDivFileSize").style.display = "";
    document.querySelector(".jsDivUrlFormat").style.display = "none";
    document.querySelector(".jsDivMonthFormat").style.display = "none";
  } else {
    document.querySelector(".jsDivFileSize").style.display = "none";
    document.querySelector(".jsDivUrlFormat").style.display = "none";
    document.querySelector(".jsDivMonthFormat").style.display = "none";
    if (!regexUrl.test(url)) {
      document.querySelector(".jsDivFileSize").style.display = "none";
      document.querySelector(".jsDivUrlFormat").style.display = "";
      document.querySelector(".jsDivMonthFormat").style.display = "none";
    } else if (month < 1 || month > 12 || month.length < 1 || month % 1 != 0) {
      document.querySelector(".jsDivFileSize").style.display = "none";
      document.querySelector(".jsDivUrlFormat").style.display = "none";
      document.querySelector(".jsDivMonthFormat").style.display = "";
    } else {
      const response = await checkUrl(name, url, month);
      if (response.result == true) {
        document.getElementsByClassName("jsDivFileSize")[0].innerText =
          response.comment;
        document.querySelector(".jsDivFileSize").style.display = "";
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        alert("Sorry, Please check a message");
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
  document.querySelector(".jsDivMonthFormat").style.display = "none";
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

  const divMonthFormat = document.createElement("div");
  divMonthFormat.setAttribute("class", "jsDivMonthFormat");
  divMonthFormat.innerHTML = "Please check month (min:1 / max:12)";
  modalContents.appendChild(divMonthFormat);
  document.querySelector(".jsDivMonthFormat").style.display = "none";
};

const init = async () => {
  createMessage();
  addBtn.addEventListener("click", clickAddUrl);
  closeBtn.addEventListener("click", clickCloseAddUrl);
  submitAddBtn.addEventListener("click", clickSubmitAddBtn);
};

if (addBtn) {
  init();
}
