import React from "react"; //
import { ResponsiveLine } from "@nivo/line";
import { useState } from "react";
const TwoWeeks = (props) => {
  //this section sets the state for the data, minimum and maximum values to ensure that the correct range of data is shown on the graph

  const [data, setData] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  // this section fetches for two week data for the listing

  fetch("/api/twoweeks/graph" + "?id=" + props.listingID, {
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
  // this section applies styling to the graph

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

  const height = 500;
  const width = 900;

  const gradProps = {
    gradientUnits: "userSpaceOnUse",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: height,
  };
  // the below section determines the y and x axis of the graph, including size and what range to present

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
        yScale={{ type: "linear", stacked: true, min: min - 1, max: max + 1 }}
        xFormat="time:%m-%d"
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={{
          tickValues: 2,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: ".2s",
          legend: "",
          legendOffset: 0,
        }}
        axisBottom={{
          tickValues: "every 1 day",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: "%m-%d",
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickValues: 2,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: ".2s",
          legend: "Price",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={true}
        theme={theme}
        colors={["url(#someGradientId)"]}
        lineWidth={1}
        pointSize={6}
        isInteractive={false}
        pointColor="#ffffff"
        pointBorderWidth={1}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        areaBaselineValue={50}
        enableArea={true}
        areaOpacity={0.45}
        useMesh={true}
        gridXValues="every 1 day"
        gridYValues="linear scale"
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

export default TwoWeeks;
