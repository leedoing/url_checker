import axios from "axios";
const addBtn = document.getElementById("jsAddUrl");

const clickAddUrl = event => {
  event.preventDefault();
  console.log("ok");
};

async function init() {
  addBtn.addEventListener("click", clickAddUrl);
}

if (addBtn) {
  init();
}
