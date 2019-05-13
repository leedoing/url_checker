import axios from "axios";
const chartContainer = document.getElementsByClassName("chart__container");

const createCanvas = async data => {
  console.log(data);
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
      if (data[i][j]["total_time"]) {
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
          layout: {
            padding: {
              top: 110,
              bottom: 70
            }
          },
          tooltips: {
            yAlign: "center",
            callbacks: {
              label: function(tooltipItem) {
                const label = tooltipItem.yLabel;
                const index = tooltipItem["index"];
                const response_list = new Array();
                const header = data[i][index]["header"].split("\n");
                response_list.push(
                  `Total_time: ${data[i][index]["total_time"]}`
                );
                response_list.push(
                  `aws_resolver_dns: ${data[i][index]["aws_resolver_dns"]}`
                );
                response_list.push(
                  `aws_resolver_ip: ${data[i][index]["aws_resolver_ip"]}`
                );
                response_list.push(`client_ip: ${data[i][index]["client_ip"]}`);
                response_list.push(`cdn_ip: ${data[i][index]["primary_ip"]}`);

                for (let i = 0; i < header.length; i++) {
                  response_list.push(header[i]);
                }
                return response_list;

                // return [`Total_time: ${label}`];
              }
            }
          },
          events: ["click"],
          responsive: false,
          maintainAspectRatio: false,
          legend: {
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
                  autoSkip: true
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "#D4D5D7",
                  autoSkip: true,
                  fontSize: 12
                  // maxTicksLimit: 24,
                }
              }
            ]
          }
        }
      })
    );
  }
};

async function init() {
  if (chartContainer.item(0).id) {
    const email = chartContainer.item(0).id;
    const response = await axios({
      url: `/api/charts/${email}/view/36`,
      method: "GET"
    });
    createCanvas(response.data);
  }
}

if (chartContainer) {
  init();
}
