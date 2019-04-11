import axios from "axios";
const chartContainer = document.getElementsByClassName("chart__container");

const getCharts = async email => {
  const response = await axios({
    url: `/api/chats/${email}/view`,
    method: "GET"
  });
  console.log(response);
};

function init() {
  getCharts("lluckyy77@gmail.com");
}

if (chartContainer) {
  init();
}
