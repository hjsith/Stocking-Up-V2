import React from "react"; //
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine } from "@nivo/line";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import * as d3 from "d3";
const OneDay = (props) => {
  const [data, setData] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [range, setRange] = useState([0]);
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  fetch("/api/oneday/graph" + "?id=" + props.listingID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    res.json().then((body) => {
      setData(body);
      var tempMin = Number.MAX_SAFE_INTEGER;
      var tempMax = Number.MIN_SAFE_INTEGER;
      for (var i = 0; i < body[0].data.length; i++) {
        if (body[0].data[i].y < tempMin) tempMin = body[0].data[i].y;
        if (body[0].data[i].y > tempMax) tempMax = body[0].data[i].y;
      }
      setMin(tempMin);
      setMax(tempMax);
    });
  });

  const theme = {
    axis: {
      fontSize: "14px",
      tickColor: "#ffffff",
      ticks: {
        line: {
          stroke: "#ffffff",
        },
        text: {
          fill: "#ffffff",
        },
      },
      legend: {
        text: {
          fill: "#ffffff",
        },
      },
    },
    grid: {
      line: {
        stroke: "#ffffff",
      },
    },
  };

  const height = 300;
  const width = 800;

  const gradProps = {
    gradientUnits: "userSpaceOnUse",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: height,
  };

  //set constant timestamps
  var timeStamps = [
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "9am",
    "10am",
    "11am",
  ];

  //set linear scale
  var x = d3.scale.linear().domain([0, timeStamps.length]).range([0, width]);


  return (
    <div style={{ height, width }} id="axisText">
      <svg>
        <defs>
          <linearGradient id="someGradientId" {...gradProps}>
            <stop offset="25%" stopColor="#ff00ff" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
        xScale={{ format: "%Y-%m-%dT%H:%M:%S.%L%Z", type: "time" }}
        yScale={{ type: "linear", stacked: true, min: min - 1, max: max + 1 }} // set the minimum and maximum dependent on data retrieved, set as another state
        xFormat="time:%H:%M"
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={{
          tickValues: 2, //5 values from minimum and maximum range that is evenly distributed
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: ".2s",
          legend: "",
          legendOffset: 0,
        }}
        axisBottom={{
          tickValues: timeStamps.length, // change for each one
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: function (i) {
            return timeStamps[i];
          }, // change to H.M, accoriding to 231
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
          
        }}
        axisLeft={{
          tickValues: 2, //change
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: ".2s",
          legend: "volume",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={true}
        theme={theme}
        colors={["url(#someGradientId)"]}
        lineWidth={1}
        pointSize={6}
        pointColor="#ffffff"
        pointBorderWidth={1}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        areaBaselineValue={50}
        enableArea={true}
        areaOpacity={0.45}
        useMesh={true}
        gridXValues="every 1 hour" // change for each one
        gridYValues = x // change
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 12,
            itemOpacity: 0.75,
            itemTextColor: "#FFFFFF",
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default OneDay;
