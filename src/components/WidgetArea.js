import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";

function WidgetArea(props) {
  const chartConfigs = {
    type: "area2d",
    width: "100%",
    height: "125",
    dataFormat: "json",
    dataSource: {
      chart: {
        bgColor: "#2a2a2a",
        theme: "fusion",
      },

      data: props.data,
    },
  };
  return (
    <div className="widgetWrap">
      <div className="widgetTitle">{props.title}</div>
      <div className="widgetValue">
        <ReactFC {...chartConfigs} />
      </div>
    </div>
  );
}

export default WidgetArea;
