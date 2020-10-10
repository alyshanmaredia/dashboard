import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import ReactFC from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

function WidgetLineGraph(props){
    const chartConfigs = {
      caption: "Average Fastball Velocity",
    yaxisname: "Velocity (in mph)",
    subcaption: "[01.2018-12.2018]",
    numbersuffix: " mph",
    rotatelabels: "1",
    setadaptiveymin: "1",
    theme: "fusion",  
      type: "line",
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
      console.log(props.data); 
      return (
        <div className="widgetWrap">
          <div className="widgetTitle">{props.title}</div>
          <div className="widgetValue">
            <ReactFC {...chartConfigs} />
          </div>
        </div>
      );
}

export default WidgetLineGraph;