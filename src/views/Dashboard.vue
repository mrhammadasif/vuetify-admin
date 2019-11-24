<!-- =========================================================================================
    File Name: DashboardEcommerce.vue
    Description: Dashboard - Ecommerce
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          :chart-data="analyticsData.subscribersGained"
          icon="UsersIcon"
          statistic="92.6k"
          statistic-title="Subscribers Gained"
          type="area"></statistics-card-line>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          :chart-data="analyticsData.revenueGenerated"
          icon="DollarSignIcon"
          statistic="97.5K"
          statistic-title="Revenue Generated"
          color="success"
          type="area"></statistics-card-line>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          :chart-data="analyticsData.quarterlySales"
          icon="ShoppingCartIcon"
          statistic="36%"
          statistic-title="Quarterly Sales"
          color="danger"
          type="area"></statistics-card-line>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          :chart-data="analyticsData.ordersRecevied"
          icon="ShoppingBagIcon"
          statistic="97.5K"
          statistic-title="Orders Received"
          color="warning"
          type="area"></statistics-card-line>
      </div>
    </div>

    <div class="vx-row">
      <!-- LINE CHART -->
      <div class="vx-col w-full md:w-2/3 mb-base">
        <vx-card title="Revenue">
          <template slot="actions">
            <feather-icon
              icon="SettingsIcon"
              svg-classes="w-6 h-6 text-grey"></feather-icon>
          </template>
          <div
            slot="no-body"
            class="p-6 pb-0">
            <div class="flex">
              <div class="mr-6">
                <p class="mb-1 font-semibold">
                  This Month
                </p>
                <p class="text-3xl text-success">
                  <sup class="text-base mr-1">$</sup>86,589
                </p>
              </div>
              <div>
                <p class="mb-1 font-semibold">
                  Last Month
                </p>
                <p class="text-3xl">
                  <sup class="text-base mr-1">$</sup>73,683
                </p>
              </div>
            </div>
            <vue-apex-charts
              :options="analyticsData.revenueComparisonLine.chartOptions"
              :series="analyticsData.revenueComparisonLine.series"
              type="line"
              height="266" />
          </div>
        </vx-card>
      </div>

      <!-- RADIAL CHART -->
      <div class="vx-col w-full md:w-1/3 mb-base">
        <vx-card title="Goal Overview">
          <template slot="actions">
            <feather-icon
              icon="HelpCircleIcon"
              svg-classes="w-6 h-6 text-grey"></feather-icon>
          </template>

          <!-- CHART -->
          <template slot="no-body">
            <div class="mt-10">
              <vue-apex-charts
                :options="analyticsData.goalOverviewRadialBar.chartOptions"
                :series="analyticsData.goalOverviewRadialBar.series"
                type="radialBar"
                height="240" />
            </div>
          </template>

          <!-- DATA -->
          <div
            slot="no-body-bottom"
            class="flex justify-between text-center">
            <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0">
              <p class="mt-4">
                Completed
              </p>
              <p class="mb-4 text-3xl font-semibold">
                786,617
              </p>
            </div>
            <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
              <p class="mt-4">
                In Progress
              </p>
              <p class="mb-4 text-3xl font-semibold">
                13,561
              </p>
            </div>
          </div>
        </vx-card>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mb-base">
        <vx-card title="Browser Statistics">
          <div
            v-for="(browser, index) in analyticsData.browserAnalytics"
            :key="browser.id"
            :class="{'mt-4': index}">
            <div class="flex justify-between">
              <div class="flex flex-col">
                <span class="mb-1">{{ browser.name }}</span>
                <h4>{{ browser.ratio }}%</h4>
              </div>
              <div class="flex flex-col text-right">
                <span class="flex -mr-1">
                  <span class="mr-1">{{ browser.comparedResult }}</span>
                  <feather-icon
                    :icon=" browser.comparedResult < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'"
                    :svg-classes="[browser.comparedResult < 0 ? 'text-danger' : 'text-success' ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>
                </span>
                <span class="text-grey">{{ browser.time | time(true) }}</span>
              </div>
            </div>
            <vs-progress :percent="browser.ratio"></vs-progress>
          </div>
        </vx-card>
      </div>

      <div class="vx-col w-full md:w-2/3 mb-base">
        <vx-card title="Client Retention">
          <div class="flex">
            <span class="flex items-center"><div class="h-3 w-3 rounded-full mr-1 bg-primary"></div><span>New Clients</span></span>
            <span class="flex items-center ml-4"><div class="h-3 w-3 rounded-full mr-1 bg-danger"></div><span>Retained Clients</span></span>
          </div>
          <vue-apex-charts
            :options="analyticsData.clientRetentionBar.chartOptions"
            :series="analyticsData.clientRetentionBar.series"
            type="bar"
            height="277" />
        </vx-card>
      </div>
    </div>

    <div class="vx-row">
      <!-- Sessions By Device -->
      <div class="vx-col w-full lg:w-1/3 lg:mt-0 mt-base">
        <vx-card title="Sessions By Device">
          <!-- SLOT = ACTIONS -->
          <template slot="actions">
            <change-time-duration-dropdown />
          </template>

          <div slot="no-body">
            <vue-apex-charts
              :options="analyticsData.sessionsByDeviceDonut.chartOptions"
              :series="analyticsData.sessionsByDeviceDonut.series"
              class="mt-5"
              type="donut"
              height="325" />
          </div>

          <ul>
            <li
              v-for="deviceData in analyticsData.sessionsByDeviceDonut.analyticsData"
              :key="deviceData.device"
              class="flex mb-3">
              <feather-icon
                :icon="deviceData.icon"
                :svg-classes="[`h-5 w-5 stroke-current text-${deviceData.color}`]"></feather-icon>
              <span class="ml-2 inline-block font-semibold">{{ deviceData.device }}</span>
              <span class="mx-2">-</span>
              <span class="mr-4">{{ deviceData.sessionsPercentgae }}%</span>
              <div class="ml-auto flex -mr-1">
                <span class="mr-1">{{ deviceData.comparedResultPercentage }}%</span>
                <feather-icon
                  :icon=" deviceData.comparedResultPercentage < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'"
                  :svg-classes="[deviceData.comparedResultPercentage < 0 ? 'text-danger' : 'text-success' ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>
              </div>
            </li>
          </ul>
        </vx-card>
      </div>

      <!-- CHAT CARD -->
      <div class="vx-col w-full lg:w-1/3 lg:mt-0 mt-base">
        <vx-card
          title="Chat"
          class="overflow-hidden">
          <template slot="no-body">
            <div class="chat-card-log">
              <VuePerfectScrollbar
                ref="chatLogPS"
                :settings="settings"
                class="scroll-area pt-6 px-6">
                <ul ref="chatLog">
                  <li
                    v-for="(msg, index) in chatMsg"
                    :key="index"
                    :class="{'flex-row-reverse': msg.isSent, 'mt-4': index}"
                    class="flex items-start">
                    <vs-avatar
                      :class="msg.isSent ? 'ml-5' : 'mr-5'"
                      size="40px"
                      class="m-0 flex-shrink-0"></vs-avatar>
                    <div
                      :class="{'chat-sent-msg bg-primary-gradient text-white': msg.isSent, 'border border-solid d-theme-border-grey-light': !msg.isSent}"
                      class="msg relative bg-white shadow-md py-3 px-4 mb-2 rounded-lg max-w-md">
                      <span>{{ msg.msg }}</span>
                    </div>
                  </li>
                </ul>
              </VuePerfectScrollbar>
            </div>
            <div class="flex bg-white chat-input-container p-6">
              <vs-input
                v-model="chatMsgInput"
                class="mr-3 w-full"
                placeholder="Type Your Message"
                @keyup.enter="chatMsgInput = ''"></vs-input>
              <vs-button
                icon-pack="feather"
                icon="icon-send"
                @click="chatMsgInput = ''"></vs-button>
            </div>
          </template>
        </vx-card>
      </div>

      <!-- CUSTOMERS CHART -->
      <div class="vx-col w-full lg:w-1/3 lg:mt-0 mt-base">
        <vx-card title="Customers">
          <!-- SLOT = ACTIONS -->
          <template slot="actions">
            <change-time-duration-dropdown />
          </template>

          <div slot="no-body">
            <!-- CHART -->
            <vue-apex-charts
              :options="analyticsData.customersPie.chartOptions"
              :series="analyticsData.customersPie.series"
              type="pie"
              height="345"
              class="mt-2" />

            <!-- CHART DATA -->
            <ul class="mb-1">
              <li
                v-for="customerData in analyticsData.customersPie.analyticsData"
                :key="customerData.customerType"
                class="flex justify-between py-3 px-6 border d-theme-border-grey-light border-solid border-r-0 border-l-0 border-b-0">
                <span class="flex items-center">
                  <span
                    :class="`bg-${customerData.color}`"
                    class="inline-block h-3 w-3 rounded-full mr-2"></span>
                  <span class="font-semibold">{{ customerData.customerType }}</span>
                </span>
                <span>{{ customerData.counts }}</span>
              </li>
            </ul>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar"
import VueApexCharts from "vue-apexcharts"
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue"
import ChangeTimeDurationDropdown from "@/components/ChangeTimeDurationDropdown.vue"

export default{
  components: {
    VueApexCharts,
    StatisticsCardLine,
    VuePerfectScrollbar,
    ChangeTimeDurationDropdown
  },
  data () {
    return {
      analyticsData: {
        // LINE CHART
        siteTraffic: {
          series: [{
            name: "Traffic Rate",
            data: [
              150,
              200,
              125,
              225,
              200,
              250
            ]
          }],
          chartOptions: {
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0
              }
            },
            chart: {
              type: "line",
              dropShadow: {
                enabled: true,
                top: 5,
                left: 0,
                blur: 4,
                opacity: 0.10
              },
              toolbar: {show: false},
              sparkline: {enabled: true}
            },
            stroke: {
              width: 5,
              curve: "smooth"
            },
            xaxis: {type: "numeric"},
            colors: ["#7367F0"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                gradientToColors: ["#A9A2F6"],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [
                  0,
                  100,
                  100,
                  100
                ]
              }
            },
            markers: {
              size: 0,
              hover: {size: 5}
            },
            tooltip: {x: {show: false}}
          }
        },
        activeUsers: {
          series: [{
            name: "Active Users",
            data: [
              750,
              1000,
              900,
              1250,
              1000,
              1200,
              1100
            ]
          }],
          chartOptions: {
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0
              }
            },
            chart: {
              type: "line",
              dropShadow: {
                enabled: true,
                top: 5,
                left: 0,
                blur: 4,
                opacity: 0.10
              },
              toolbar: {show: false},
              sparkline: {enabled: true}
            },
            stroke: {
              width: 5,
              curve: "smooth"
            },
            xaxis: {type: "numeric"},
            colors: ["#28C76F"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                gradientToColors: ["#55DD92"],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [
                  0,
                  75,
                  100,
                  100
                ]
              }
            },
            markers: {
              size: 0,
              hover: {size: 5}
            },
            tooltip: {x: {show: false}}
          }
        },
        newsletter: {
          series: [{
            name: "Newsletter",
            data: [
              365,
              390,
              365,
              400,
              375,
              400
            ]
          }],
          chartOptions: {
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0
              }
            },
            chart: {
              type: "line",
              dropShadow: {
                enabled: true,
                top: 5,
                left: 0,
                blur: 4,
                opacity: 0.10
              },
              toolbar: {show: false},
              sparkline: {enabled: true}
            },
            stroke: {
              width: 5,
              curve: "smooth"
            },
            xaxis: {type: "numeric"},
            colors: ["#FF9F43"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                gradientToColors: ["#ffc085"],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [
                  0,
                  75,
                  100,
                  100
                ]
              }
            },
            markers: {
              size: 0,
              hover: {size: 5}
            },
            tooltip: {x: {show: false}}
          }
        },
        revenueComparisonLine: {
          series: [
            {
              name: "This Month",
              data: [
                45000,
                47000,
                44800,
                47500,
                45500,
                48000,
                46500,
                48600
              ]
            },
            {
              name: "Last Month",
              data: [
                46000,
                48000,
                45500,
                46600,
                44500,
                46500,
                45000,
                47000
              ]
            }
          ],
          chartOptions: {
            chart: {toolbar: {show: false}},
            stroke: {
              curve: "smooth",
              dashArray: [
                0,
                8
              ],
              width: [
                4,
                2
              ]
            },
            grid: {borderColor: "#e7e7e7"},
            legend: {show: false},
            colors: [
              "#F97794",
              "#b8c2cc"
            ],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                inverseColors: false,
                gradientToColors: [
                  "#7367F0",
                  "#b8c2cc"
                ],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [
                  0,
                  100,
                  100,
                  100
                ]
              }
            },
            markers: {
              size: 0,
              hover: {size: 5}
            },
            xaxis: {
              labels: {style: {cssClass: "text-grey fill-current"}},
              axisTicks: {show: false},
              categories: [
                "01",
                "05",
                "09",
                "13",
                "17",
                "21",
                "26",
                "31"
              ],
              axisBorder: {show: false}
            },
            yaxis: {
              tickAmount: 5,
              labels: {
                style: {cssClass: "text-grey fill-current"},
                formatter: function (val) {
                  return val > 999 ? (val / 1000).toFixed(1) + "k" : val
                }
              }
            },
            tooltip: {x: {show: false}}
          }
        },

        // LINE AREA CHART
        subscribersGained: {
          series: [{
            name: "Subscribers",
            data: [
              28,
              40,
              36,
              52,
              38,
              60,
              55
            ]
          }],
          chartOptions: {
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0
              }
            },
            chart: {
              toolbar: {show: false},
              sparkline: {enabled: true}
            },
            dataLabels: {enabled: false},
            stroke: {
              curve: "smooth",
              width: 2.5
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 0.9,
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [
                  0,
                  80,
                  100
                ]
              }
            },
            xaxis: {
              type: "numeric",
              lines: {show: false},
              axisBorder: {show: false},
              labels: {show: false}
            },
            yaxis: [{
              y: 0,
              offsetX: 0,
              offsetY: 0,
              padding: {
                left: 0,
                right: 0
              }
            }],
            tooltip: {x: {show: false}}
          }
        },
        quarterlySales: {
          series: [{
            name: "Sales",
            data: [
              10,
              15,
              7,
              12,
              3,
              16
            ]
          }],
          chartOptions: {
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0
              }
            },
            chart: {
              toolbar: {show: false},
              sparkline: {enabled: true}
            },
            dataLabels: {enabled: false},
            stroke: {
              curve: "smooth",
              width: 2.5
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 0.9,
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [
                  0,
                  80,
                  100
                ]
              }
            },
            xaxis: {
              type: "numeric",
              lines: {show: false},
              axisBorder: {show: false},
              labels: {show: false}
            },
            yaxis: [{
              y: 0,
              offsetX: 0,
              offsetY: 0,
              padding: {
                left: 0,
                right: 0
              }
            }],
            tooltip: {x: {show: false}}
          }
        },
        revenueGenerated: {
          series: [{
            name: "Revenue",
            data: [
              350,
              275,
              400,
              300,
              350,
              300,
              450
            ]
          }],
          chartOptions: {
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0
              }
            },
            chart: {
              toolbar: {show: false},
              sparkline: {enabled: true}
            },
            dataLabels: {enabled: false},
            stroke: {
              curve: "smooth",
              width: 2.5
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 0.9,
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [
                  0,
                  80,
                  100
                ]
              }
            },
            xaxis: {
              type: "numeric",
              lines: {show: false},
              axisBorder: {show: false},
              labels: {show: false}
            },
            yaxis: [{
              y: 0,
              offsetX: 0,
              offsetY: 0,
              padding: {
                left: 0,
                right: 0
              }
            }],
            tooltip: {x: {show: false}}
          }
        },
        ordersRecevied: {
          series: [{
            name: "Orders",
            data: [
              10,
              15,
              8,
              15,
              7,
              12,
              8
            ]
          }],
          chartOptions: {
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0
              }
            },
            chart: {
              toolbar: {show: false},
              sparkline: {enabled: true}
            },
            dataLabels: {enabled: false},
            stroke: {
              curve: "smooth",
              width: 2.5
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 0.9,
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [
                  0,
                  80,
                  100
                ]
              }
            },
            xaxis: {
              type: "numeric",
              lines: {show: false},
              axisBorder: {show: false},
              labels: {show: false}
            },
            yaxis: [{
              y: 0,
              offsetX: 0,
              offsetY: 0,
              padding: {
                left: 0,
                right: 0
              }
            }],
            tooltip: {x: {show: false}}
          }
        },
        // BAR CHART
        salesBar: {
          series: [{
            name: "Sessions",
            data: [
              75,
              125,
              225,
              175,
              125,
              75,
              25
            ]
          }],
          chartOptions: {
            grid: {
              show: false,
              padding: {
                left: 0,
                right: 0
              }
            },
            chart: {
              type: "bar",
              sparkline: {enabled: true},
              toolbar: {show: false}
            },
            states: {hover: {filter: "none"}},
            colors: [
              "#e6edf7",
              "#e6edf7",
              "#7367f0",
              "#e6edf7",
              "#e6edf7",
              "#e6edf7"
            ],
            plotOptions: {
              bar: {
                columnWidth: "45%",
                distributed: true,
                endingShape: "rounded" // Deprecated
                // borderRadius: '20px', // Coming Soon
              }
            },
            tooltip: {x: {show: false}}
          }
        },
        // RADIAL BAR
        goalOverviewRadialBar: {
          series: [83],
          chartOptions: {
            plotOptions: {
              radialBar: {
                size: 110,
                startAngle: -150,
                endAngle: 150,
                hollow: {size: "77%"},
                track: {
                  background: "#bfc5cc",
                  strokeWidth: "50%"
                },
                dataLabels: {
                  name: {show: false},
                  value: {
                    offsetY: 18,
                    color: "#99a2ac",
                    fontSize: "4rem"
                  }
                }
              }
            },
            colors: ["#00db89"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#00b5b5"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [
                  0,
                  100
                ]
              }
            },
            stroke: {lineCap: "round"},
            chart: {
              sparkline: {enabled: true},
              dropShadow: {
                enabled: true,
                blur: 3,
                left: 1,
                top: 1,
                opacity: 0.1
              }
            }
          }
        },
        supportTrackerRadialBar: {
          chartData: {
            totalTickets: 163,
            openTickets: 103,
            lastResponse: "1d"
          },
          series: [83],
          chartOptions: {
            plotOptions: {
              radialBar: {
                size: 150,
                offsetY: 15,
                startAngle: -150,
                endAngle: 150,
                hollow: {size: "65%"},
                track: {
                  background: "#fff",
                  strokeWidth: "100%"

                },
                dataLabels: {
                  value: {
                    offsetY: 30,
                    color: "#99a2ac",
                    fontSize: "2rem"
                  }
                }
              }
            },
            colors: ["#EA5455"],
            fill: {
              type: "gradient",
              gradient: {
                // enabled: true,
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#7367F0"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [
                  0,
                  100
                ]
              }
            },
            stroke: {dashArray: 8},
            chart: {sparkline: {}},
            labels: ["Completed Tickets"]
          }
        },
        // RADAR
        statisticsRadar: {
          series: [
            {
              name: "Visits",
              data: [
                90,
                50,
                86,
                40,
                100,
                20
              ]
            },
            {
              name: "Sales",
              data: [
                70,
                75,
                70,
                76,
                20,
                85
              ]
            }
          ],
          chartOptions: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun"
            ],
            dataLabels: {
              style: {
                colors: [
                  "#b9c3cd",
                  "#b9c3cd",
                  "#b9c3cd",
                  "#b9c3cd",
                  "#b9c3cd",
                  "#b9c3cd"
                ]
              }
            },
            yaxis: {show: false},
            grid: {show: false},
            legend: {show: false},
            chart: {
              dropShadow: {
                enabled: true,
                blur: 8,
                left: 1,
                top: 1,
                opacity: 0.2
              },
              toolbar: {show: false}
            },
            stroke: {width: 0},
            colors: [
              "#9f8ed7",
              "#1edec5"
            ],
            plotOptions: {
              radar: {
                polygons: {
                  strokeColors: [
                    "#e8e8e8",
                    "transparent",
                    "transparent",
                    "transparent",
                    "transparent",
                    "transparent"
                  ],
                  connectorColors: "transparent"
                }
              }
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                gradientToColors: [
                  "#8e9ad6",
                  "#1fcadb"
                ],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [
                  0,
                  100,
                  100,
                  100
                ]
              }
            },
            markers: {size: 0}
          }
        },
        // SessionsByDevice
        sessionsByDeviceDonut: {
          analyticsData: [
            {
              device: "Dekstop",
              icon: "MonitorIcon",
              color: "primary",
              sessionsPercentgae: 58.6,
              comparedResultPercentage: 2
            },
            {
              device: "Mobile",
              icon: "SmartphoneIcon",
              color: "warning",
              sessionsPercentgae: 34.9,
              comparedResultPercentage: 8
            },
            {
              device: "Tablet",
              icon: "TabletIcon",
              color: "danger",
              sessionsPercentgae: 6.5,
              comparedResultPercentage: -5
            }
          ],
          comparedResult: [
            2,
            -3,
            8
          ],
          series: [
            58.6,
            34.9,
            6.5
          ],
          chartOptions: {
            labels: [
              "Desktop",
              "Mobile",
              "Tablet"
            ],
            dataLabels: {enabled: false},
            legend: {show: false},
            chart: {
              offsetY: 30,
              type: "donut",
              toolbar: {show: false}
            },
            stroke: {width: 0},
            colors: [
              "#7961F9",
              "#FF9F43",
              "#EA5455"
            ],
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: [
                  "#9c8cfc",
                  "#FFC085",
                  "#f29292"
                ]
              }
            }
          }
        },
        // Product Orders
        productOrdersRadialBar: {
          analyticsData: [
            {
              orderType: "Finished",
              counts: 23043,
              color: "primary"
            },
            {
              orderType: "Pending",
              counts: 14658,
              color: "warning"
            },
            {
              orderType: "Rejected ",
              counts: 4758,
              color: "danger"
            }
          ],
          series: [
            70,
            52,
            26
          ],
          chartOptions: {
            labels: [
              "Finished",
              "Pending",
              "Rejected"
            ],
            plotOptions: {
              radialBar: {
                size: 165,
                offsetY: 30,
                hollow: {size: "20%"},
                track: {
                  background: "#ebebeb",
                  strokeWidth: "100%",
                  margin: 15
                },
                dataLabels: {
                  show: true,
                  name: {fontSize: "18px"},
                  value: {
                    fontSize: "16px",
                    color: "#636a71",
                    offsetY: 11
                  },
                  total: {
                    show: true,
                    label: "Total",
                    formatter: function () {
                      return 42459
                    }
                  }
                }
              }
            },
            responsive: [{
              breakpoint: 576,
              options: {
                plotOptions: {
                  radialBar: {
                    size: 150,
                    hollow: {size: "20%"},
                    track: {
                      background: "#ebebeb",
                      strokeWidth: "100%",
                      margin: 15
                    }
                  }
                }
              }
            }],
            colors: [
              "#7961F9",
              "#FF9F43",
              "#EA5455"
            ],
            fill: {
              type: "gradient",
              gradient: {
                // enabled: true,
                shade: "dark",
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: [
                  "#9c8cfc",
                  "#FFC085",
                  "#f29292"
                ],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [
                  0,
                  100
                ]
              }
            },
            stroke: {lineCap: "round"},
            chart: {
              dropShadow: {
                enabled: true,
                blur: 3,
                left: 1,
                top: 1,
                opacity: 0.1
              }
            }
          }
        },
        // Customers
        customersPie: {
          analyticsData: [
            {
              customerType: "New",
              counts: 890,
              color: "primary"
            },
            {
              customerType: "Returning",
              counts: 258,
              color: "warning"
            },
            {
              customerType: "Referrals ",
              counts: 149,
              color: "danger"
            }
          ],
          series: [
            690,
            258,
            149
          ],
          chartOptions: {
            labels: [
              "New",
              "Returning",
              "Referrals"
            ],
            dataLabels: {enabled: false},
            legend: {show: false},
            chart: {
              type: "pie",
              offsetY: 30,
              dropShadow: {
                enabled: false,
                blur: 5,
                left: 1,
                top: 1,
                opacity: 0.2
              },
              toolbar: {show: false}
            },
            stroke: {width: 5},
            colors: [
              "#7961F9",
              "#FF9F43",
              "#EA5455"
            ],
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: [
                  "#9c8cfc",
                  "#FFC085",
                  "#f29292"
                ]
              }
            }
          }
        },
        // Sales monthly
        salesLine: {
          series: [{
            name: "Sales",
            data: [
              140,
              180,
              150,
              205,
              160,
              295,
              125,
              255,
              205,
              305,
              240,
              295
            ]
          }],
          chartOptions: {
            chart: {
              toolbar: {show: false},
              dropShadow: {
                enabled: true,
                top: 20,
                left: 2,
                blur: 6,
                opacity: 0.20
              }
            },
            stroke: {
              curve: "smooth",
              width: 4
            },
            grid: {borderColor: "#ebebeb"},
            legend: {show: false},
            colors: ["#df87f2"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                inverseColors: false,
                gradientToColors: ["#7367F0"],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [
                  0,
                  100,
                  100,
                  100
                ]
              }
            },
            markers: {
              size: 0,
              hover: {size: 5}
            },
            xaxis: {
              labels: {style: {cssClass: "text-grey fill-current"}},
              axisTicks: {show: false},
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "July",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ],
              axisBorder: {show: false}
            },
            yaxis: {
              tickAmount: 5,
              labels: {
                style: {cssClass: "text-grey fill-current"},
                formatter: function (val) {
                  return val > 999 ? (val / 1000).toFixed(1) + "k" : val
                }
              }
            },
            tooltip: {x: {show: false}}
          }
        },
        // ClientRetention Bar Chart
        clientRetentionBar: {
          series: [
            {
              name: "New Clients",
              data: [
                175,
                125,
                225,
                175,
                160,
                189,
                206,
                134,
                159,
                216,
                148,
                123
              ]
            },
            {
              name: "Retained Clients",
              data: [
                -144,
                -155,
                -141,
                -167,
                -122,
                -143,
                -158,
                -107,
                -126,
                -131,
                -140,
                -137
              ]
            }
          ],
          chartOptions: {
            grid: {
              borderColor: "#ebebeb",
              padding: {
                left: 0,
                right: 0
              }
            },
            legend: {show: false},
            dataLabels: {enabled: false},
            chart: {
              stacked: true,
              type: "bar",
              toolbar: {show: false}
            },
            colors: [
              "#7367F0",
              "#EA5455"
            ],
            plotOptions: {bar: {columnWidth: "10%"}},
            xaxis: {
              labels: {style: {cssClass: "text-grey fill-current"}},
              axisTicks: {show: false},
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ],
              axisBorder: {show: false}
            },
            yaxis: {
              tickAmount: 5,
              labels: {style: {cssClass: "text-grey fill-current"}}
            },
            tooltip: {x: {show: false}}
          }
        },
        // OTHER
        browserAnalytics: [
          {
            id: 1,
            name: "Google Chrome",
            ratio: 73,
            time: "Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)",
            comparedResult: "800"
          },
          {
            id: 3,
            name: "Opera",
            ratio: 8,
            time: "Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)",
            comparedResult: "-200"
          },
          {
            id: 2,
            name: "Firefox",
            ratio: 19,
            time: "Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)",
            comparedResult: "100"
          },
          {
            id: 4,
            name: "Internet Explorer",
            ratio: 27,
            time: "Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)",
            comparedResult: "-450"
          }
        ]
      },
      chatMsgInput: "",
      contentImg1: "content-img-1.jpg",
      profileUser1: "avatar-s-18.png",
      profileUser2: "avatar-s-1.png",
      profileUser3: "avatar-s-12.png",
      overlayImg2: "card-image-5.jpg",
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      chatMsg: [
        {
          senderImg: "avatar-s-2.png",
          msg: "Cake sesame snaps cupcake gingerbread",
          isSent: true
        },
        {
          senderImg: "avatar-s-5.png",
          msg: "Apple pie pie jujubes chupa chups muffin",
          isSent: false
        },
        {
          senderImg: "avatar-s-2.png",
          msg: "Chocolate cake",
          isSent: true
        },
        {
          senderImg: "avatar-s-5.png",
          msg: "Donut sweet pie oat cake dragée fruitcake",
          isSent: false
        },
        {
          senderImg: "avatar-s-2.png",
          msg: "Liquorice chocolate bar jelly beans icing",
          isSent: true
        },
        {
          senderImg: "avatar-s-5.png",
          msg: "Powder toffee tootsie roll macaroon cupcake.",
          isSent: false
        },
        {
          senderImg: "avatar-s-2.png",
          msg: "Apple pie oat cake brownie cotton candy cupcake chocolate bar dessert.",
          isSent: true
        },
        {
          senderImg: "avatar-s-5.png",
          msg: "Biscuit cake jujubes carrot cake topping sweet cake.",
          isSent: false
        }
      ]
    }
  },
  mounted () {
    this.$refs.chatLogPS.$el.scrollTop = this.$refs.chatLog.scrollHeight
  }
}
</script>

<style lang="scss">
.chat-card-log {
    height: 400px;

    .chat-sent-msg {
        background-color: #f2f4f7 !important;
    }
}
</style>
