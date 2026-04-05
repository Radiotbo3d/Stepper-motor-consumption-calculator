let chartRpm;
let chartSpeed;

document.addEventListener("DOMContentLoaded", () => {
    const Rpm = document.getElementById("ChartPowerRpm");
    chartRpm = new Chart(Rpm, {
        type: "line",
        data: {
            datasets: [{
                label: "Power (W)",
                data: []
            }]
        },
        options: {
            parsing: false,
            scales: {
                x: {
                    type: "linear",
                    title: {
                        display: true,
                        text: "RPM"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "W"
                    }
                }
            }
        }
    });

    const Speed = document.getElementById("ChartPowerSpeed");
    chartSpeed = new Chart(Speed, {
        type: "line",
        data: {
            datasets: [{
                label: "Power (W)",
                data: []
            }]
        },
        options: {
            parsing: false,
            scales: {
                x: {
                    type: "linear",
                    title: {
                        display: true,
                        text: "mm/s"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "W"
                    }
                }
            }
        }
    });
});

function updateCharts(pointsRpm, pointsSpeed) {
    chartRpm.data.datasets[0].data = pointsRpm;
    chartRpm.update();

    chartSpeed.data.datasets[0].data = pointsSpeed;
    chartSpeed.update();
}