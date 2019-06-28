import axios from "axios";

const modalContents2 = document.getElementsByClassName("jsModalContents2");
const chartContainer = document.getElementsByClassName("chart__container");
const delUrl = document.getElementsByClassName("chart__button__delete");

const clickDelUrl = async event => {
  event.preventDefault();
  const targetMeta = event.currentTarget.id;
  console.log(targetMeta);
  const deleteInfo = targetMeta.split("||");
  const email = deleteInfo[0];
  const url = deleteInfo[1];
  const encodeUrl = encodeURIComponent(url);
  const response = await axios({
    url: `/api/${email}/${encodeUrl}/delete`,
    method: "POST"
  });
  setTimeout(() => {
    window.location.href = "./";
  }, 1000);
};

async function init() {
  delUrl[0].addEventListener("click", clickDelUrl);
}

if (chartContainer && delUrl[0]) {
  init();
}
