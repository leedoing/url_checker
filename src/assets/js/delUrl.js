import axios from "axios";

const modalContents2 = document.getElementsByClassName("jsModalContents2");
const chartContainer = document.getElementsByClassName("chart__container");
const delUrl = document.getElementsByClassName("chart__button__delete");

const clickDelUrl = event => {
  console.log("test");
};

async function init() {
  delUrl[0].addEventListener("click", clickDelUrl);
  console.log(chartContainer);
}

if (chartContainer) {
  init();
}
