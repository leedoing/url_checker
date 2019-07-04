import axios from "axios";
import ProgressBar from "progressbar.js";

Chart.Tooltip.positioners.custom = function(elements, position) {
  return {
    x: 7,
    y: 0
  };
};
const deleteBtn = document.getElementsByClassName("chart__button__delete");
const hourBtn = document.getElementsByClassName("chart__button__3hours");
const dayBtn = document.getElementsByClassName("chart__button__day");
const weekBtn = document.getElementsByClassName("chart__button__week");
const twoWeeksBtn = document.getElementsByClassName("chart__button__2weeks");
const urlList = document.querySelectorAll(".urlList");
const chartContainer = document.getElementsByClassName("chart__container");
var bar = new ProgressBar.Circle(chart__circle, {
  color: "#fd5d93",
  trailColor: "#eee",
  trailWidth: 1,
  duration: 1400,
  easing: "bounce",
  strokeWidth: 6,
  from: { color: "#fd5d93", a: 0 },
  to: { color: "#fd5d93", a: 1 },
  // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute("stroke", state.color);
  }
});
const chartCircle = document.getElementById("chart__circle");

const hour = 3 * 12;
const day = 24 * 12;
const week = 168 * 12;
const twoWeeks = 336 * 12;

const createCanvas = async data => {
  const canvas_list = new Array();
  const myChart_list = new Array();
  const massChart_list = new Array();
  for (let i = 0; i < data.length; i++) {
    const subject =
      data[i][0]["name"] +
      "_" +
      data[i][0]["url"] +
      "_" +
      data[i][0]["iso_code"];
    const labels_list = new Array();
    const data_list = new Array();
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j]["date"]) {
        labels_list.push(data[i][j]["date"]);
      } else {
        labels_list.push("0000-00-00T00:00:00");
      }
      if (data[i][j]["total_time"] && data[i][j]["http_code"] === 200) {
        data_list.push(data[i][j]["total_time"]);
      } else {
        data_list.push("0");
      }
    }
    canvas_list.push(document.createElement("canvas"));
    canvas_list[i].setAttribute("id", `myChart_list_${i}`);
    chartContainer[0].appendChild(canvas_list[i]);
    myChart_list.push(
      document.getElementById(`myChart_list_${i}`).getContext("2d")
    );
    massChart_list.push(
      new Chart(`myChart_list_${i}`, {
        type: "line", // bar, horizontalBar, pie, Line, doughnut, radar, polarArea
        data: {
          labels: labels_list,
          datasets: [
            {
              backgroundColor: "#27293C",
              borderColor: "#CB51E2",
              borderWidth: "1",
              label: subject,
              data: data_list
            }
          ]
        },
        options: {
          // fullWidth: true,
          title: {
            display: true,
            text: subject,
            fontSize: 14,
            fontColor: "white"
          },
          layout: {
            padding: {
              top: 30,
              bottom: 15
            }
          },
          tooltips: {
            position: "custom",
            // yAlign: "center",
            callbacks: {
              label: function(tooltipItem) {
                const label = tooltipItem.yLabel;
                const index = tooltipItem["index"];
                const response_list = new Array();
                const header = data[i][index]["header"].split("\n");
                response_list.push(
                  `TOTAL_TIME: ${data[i][index]["total_time"]}`
                );
                // response_list.push(
                //   `Starttransfer_time: ${data[i][index]["starttransfer_time"]}`
                // );
                // response_list.push(
                //   `Pretransfer_time: ${data[i][index]["pretransfer_time"]}`
                // );
                response_list.push(
                  `CONNECT_TIME: ${data[i][index]["connect_time"]}`
                );
                response_list.push(
                  `DNS_LOOKUP_TIME: ${data[i][index]["namelookup_time"]}`
                );
                response_list.push("LOCAL_DNS: 8.8.8.8");
                // response_list.push(
                //   `aws_resolver_dns: ${data[i][index]["aws_resolver_dns"]}`
                // );
                // response_list.push(
                //   `aws_resolver_ip: ${data[i][index]["aws_resolver_ip"]}`
                // );
                response_list.push(`CLIENT_IP: ${data[i][index]["client_ip"]}`);
                response_list.push(`CDN_IP: ${data[i][index]["primary_ip"]}`);

                for (let i = 0; i < header.length; i++) {
                  response_list.push(header[i]);
                }
                return response_list;
              }
            }
          },
          events: ["click"],
          responsive: false,
          maintainAspectRatio: false,
          legend: {
            position: "center",
            labels: {
              fontColor: "white",
              fontSize: 14
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontColor: "#D4D5D7",
                  min: 0,
                  stepSize: 0.1,
                  fontSize: 12,
                  autoSkip: true,
                  maxTicksLimit: 15
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "#D4D5D7",
                  autoSkip: true,
                  fontSize: 12,
                  maxTicksLimit: 36
                }
              }
            ]
          }
        }
      })
    );
  }
};

const getChart = async (id, url, count) => {
  chartCircle.style.display = "";
  // const response = await axios({
  //   // url: `/api/charts/${id}/${url}/view/336`,
  //   url: `/api/charts/${id}/${url}/view/${count}`,
  //   method: "GET"
  // });
  // chartCircle.style.display = "";
  bar.animate(1.0);
  const response = await axios({
    // url: `/api/charts/${id}/${url}/view/336`,
    url: `/api/charts/${id}/${url}/view/${count}`,
    method: "GET"
  }).then(response => {
    if (!response.data.length == 0) {
      chartCircle.style.display = "none";
      bar.set(0);
      createCanvas(response.data);
    } else {
      alert("Sorry, Please wait for 5 min");
    }
  });
};

const clickUrl = event => {
  event.preventDefault();
  chartContainer.item(0).id = event.currentTarget.id;
  const targetMeta = event.currentTarget.id;
  const apiMeta = targetMeta.split("||");
  const id = apiMeta[0];
  const url = encodeURIComponent(apiMeta[1]);
  const count = apiMeta[2];
  deleteBtn[0].id = id + "||" + apiMeta[1];
  hourBtn[0].id = id + "||" + apiMeta[1] + "||" + hour;
  dayBtn[0].id = id + "||" + apiMeta[1] + "||" + day;
  weekBtn[0].id = id + "||" + apiMeta[1] + "||" + week;
  twoWeeksBtn[0].id = id + "||" + apiMeta[1] + "||" + twoWeeks;
  while (chartContainer[0].hasChildNodes()) {
    chartContainer[0].removeChild(chartContainer[0].firstChild);
  }
  if (!apiMeta[2]) {
    getChart(id, url, hour);
  } else {
    getChart(id, url, count);
  }
};

async function init() {
  if (chartContainer[0]) {
    const apiMeta = chartContainer.item(0).id.split("||");
    const id = apiMeta[0];
    const url = encodeURIComponent(apiMeta[1]);
    deleteBtn[0].id = id + "||" + apiMeta[1];
    hourBtn[0].id = id + "||" + apiMeta[1] + "||" + hour;
    dayBtn[0].id = id + "||" + apiMeta[1] + "||" + day;
    weekBtn[0].id = id + "||" + apiMeta[1] + "||" + week;
    twoWeeksBtn[0].id = id + "||" + apiMeta[1] + "||" + twoWeeks;
    await getChart(id, url, hour);
  }
  [].forEach.call(urlList, urlList => {
    urlList.addEventListener("click", clickUrl);
  });
  hourBtn[0].addEventListener("click", clickUrl);
  dayBtn[0].addEventListener("click", clickUrl);
  weekBtn[0].addEventListener("click", clickUrl);
  twoWeeksBtn[0].addEventListener("click", clickUrl);
}

if (chartContainer && hourBtn[0]) {
  init();
}
