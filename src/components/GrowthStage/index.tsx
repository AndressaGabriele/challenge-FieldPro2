import React, { useEffect } from "react";

import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/grid";

import { formatDate } from "utils/helpers/dateFormatter";
import { getAverage } from "utils/helpers/getAverage";

interface DataItem {
  degree_days: number;
  time: number;
  precipitation: number;
  ndvi: number;
}

interface Props {
  data: DataItem[];
}

export const GrowthStage: React.FC<Props> = ({ data }) => {
  const time = data.map((item) => item.time);
  const degreeDays = data.map((item) => item.degree_days);
  const precipitation = data.map((item) => item.precipitation);
  const ndvi = data.map((item) => item.ndvi);
  const formattedTime = time.map(formatDate);

  const maxAccumumRainfall = Math.max(...precipitation);

  useEffect(() => {
    const chart = echarts.init(
      document.getElementById("growth-chart") as HTMLDivElement
    );
    chart.setOption({
      color: ["#f19759 "],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "9%",
        top: "30%",
        height: "60%",
        width: "80%",
        right: "10%",
        bottom: "30%",
        containLabel: true,
      },
      legend: {
        data: ["Precipitation","Degree Days", "NDVI"],
        icon: "circle",
        left: "left",
        orient: "vertical",
        textStyle: {
          fontSize: 12,  
        },
        formatter: (name: string) => {
          switch (name) {
            case "Precipitation":
              return `${name}: ${getAverage(precipitation)} mm`;
            case "Degree Days":
              return `${name}: ${getAverage(degreeDays)} °C`;
            case "NDVI":
              return `${name}: ${getAverage(ndvi)}`;
            default:
              return name;
          }
        },
      },
      xAxis: [
        {
          type: "category",
          data: formattedTime,
          axisLabel: {
            fontSize: 11,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Accumum Rainfall",
          min: 0,
          max: maxAccumumRainfall,
          interval: 5,
          axisLabel: {
            fontSize: 12,
            formatter: "{value} mm",
          },
        },
        {
          type: "value",
          name: "Degree Days",
          min: 0,
          max: 50,
          interval: 5,
          axisLabel: {
            fontSize: 12,
            formatter: "{value} °C",
          },
        },
        {
          min: 0,
          max: 2,
          interval: 5,
          axisLabel: {
            fontSize: 12,
            formatter: "",
          },
        },
      ],
      series: [
        {
          name: "Precipitation",
          type: "bar",
          barWidth: 40,
          symbol: "none",
          barCategoryGap: "5",
          smooth: true,
          yAxisIndex: 0,
          data: precipitation,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgb(131,175,226)" },
              { offset: 0.5, color: "rgb(130,174,226)" },
              { offset: 1, color: "rgb(48,112,166)" },
            ]),
          },
        },
        {
          name: "Degree Days",
          type: "line",
          symbol: "none",
          stack: "x",
          smooth: true,
          yAxisIndex: 1,
          data: degreeDays,
          encode: {
            x: "Year",
            y: "Income",
            itemName: "Year",
            tooltip: ["Income"],
          },
        },
        {
          name: "NDVI",
          type: "line",
          yAxisIndex: 2,
          symbol: "none",
          data: ndvi,
          lineStyle: {
            type: "dashed",
            width: 2,
          },
          areaStyle: {},
          smooth: 0.5,
          markLine: {
            symbol: ["none", "none"],
            label: { show: false },
            data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgb(174,228,188)" },
              { offset: 0.5, color: "rgb(192,233,203)" },
              { offset: 1, color: "rgb(240,250,243)" },
            ]),
          },
        },
      ],
    });

    window.addEventListener("resize", () => {
      chart.resize();
    });

    return () => {
      chart.dispose();
      window.removeEventListener("resize", () => {
        chart.resize();
      });
    };
  }, [data]);

  return <div id="growth-chart" style={{ width: "100%", height: "400px" }} />;
};
