import React, { Component } from "react";
import "./Dashboard.css";
import { Row, Container, Col } from "react-bootstrap";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import WidgetBar from "./WidgetBar";
import WidgetDoughnut from "./WidgetDoughnut";
import Dropdown from "react-dropdown";
import WidgetText from "./WidgetText";
import WidgetArea from './WidgetArea'
import WidgetLineGraph from './WidgetLineGraph';

import "react-dropdown/style.css";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
//excel import
const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg",
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOption: [],
      selectedValue: null,
      organicSource: null,
      bounceRate: null,
      directSource: null,
      referralSource: null,
      pageViews: null,
      users: null,
      newUsers: null,
      sessionPerUser: null,
      avgSessionTime: null,
      pagePerSession: null,
      sessions: null,
      socialSource: null,
      month: null,
      sessionArr : [],
      sourceArr: [],
      usersArr: [],
      lineGraphArr: [],
    };
  }
  getData = (arg) => {
    const arr = this.state.items;
    const arrLen = arr.length;
    let organicSource = 0;
    let directSource = 0;
    let selectedValue = null;
    let newUsers = 0;
    let users = 0;
    let sessions = 0;
    let pageViews = 0;
    let referralSource = 0;
    let sessionPerUser =0;
    let pagePerSession = 0;
    let avgSessionTime = 0;
    let bounceRate = 0;
    let socialSource = 0;
    let month = null;
    let sourceArr = [];
    let usersArr = [];
    let sessionArr = [];
    let lineGraphArr = [];
    for (let i = 0; i < arrLen; i++) {
      if (arg === arr[i]["month"]) {
        organicSource = arr[i].organic_source;
        directSource = arr[i].direct_source;
        referralSource = arr[i].referral_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        newUsers = arr[i].new_users;
        sessionPerUser = arr[i].number_of_sessions_per_users;
        pagePerSession = arr[i].page_per_session;
        avgSessionTime = arr[i].avg_session_time;
        sessions = arr[i].sessions;
        socialSource = arr[i].social_source;
        month = arr[i].month;
        bounceRate = arr[i].bounce_rate;
        
        sourceArr.push(
          {
            label: "Organic Source",
            value: arr[i].organic_source,
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source,
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source,
          }
        );
        
        usersArr.push(
          {
            label: "Users",
            value: arr[i].users,
          },
          {
            label: "New Users",
            value: arr[i].new_users,
          }
        );
      }
      lineGraphArr.push(
        {
          label: arr[i].month,
          value: arr[i].page_per_session,
        }
      );
      sessionArr.push(
        {
          label: arr[i].month,
          value: arr[i].sessions,
        }
      );
    }
    

    selectedValue = arg;
    this.setState(
      {
        organicSource: organicSource,
        directSource: directSource,
        referralSource: referralSource,
        pageViews: pageViews,
        users: users,
        newUsers: newUsers,
        sourceArr: sourceArr,
        usersArr: usersArr,
        pagePerSession : pagePerSession,
        avgSessionTime : avgSessionTime,
        sessionPerUser: sessionPerUser,
        month: month,
        sessions: sessions,
        socialSource : socialSource,
        lineGraphArr: lineGraphArr,
        sessionArr: sessionArr,
        bounceRate: bounceRate,
      },
      () => {
        console.log(this.state.organicSource);
      }
    );
  };
  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value }, () => {
      console.log(this.state.organicSource);
    });
  };
  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        //dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }
        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2018",
          },
          () => this.getData("Jan 2018")
        );
      });
  }
  render() {
    return (
      <div>
        <Container fluid>
          <Row className="TopHeader">
            <Col>Dashboard</Col>
            <Col>
              <Dropdown
                options={this.state.dropdownOptions}
                onChange={this.updateDashboard}
                value={this.state.selectedValue}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="mainDashboard">
            <Col>
              <WidgetText
                title="Organic Source"
                value={this.state.organicSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Direct Source"
                value={this.state.directSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Referral Source"
                value={this.state.referralSource}
              />
            </Col>
            </Row>
            
            <Row>
              <Col>
                <WidgetBar
                  title="Source Comparison"
                  data={this.state.sourceArr}
                />
              </Col>
              <Col>
                <WidgetDoughnut
                  title="Users Comparison"
                  data={this.state.usersArr}
                />
              </Col>
            </Row>
            <Row>
            <Col>
              <WidgetText
                title="Session Per User"
                value={this.state.sessionPerUser}
              />
            </Col>
            <Col>
              <WidgetText title="Users" value={this.state.users} />
            </Col>
            <Col>
              <WidgetText title="New Users" value={this.state.newUsers} />
            </Col>
            </Row>
            <Row>
              <Col>
              <WidgetLineGraph
              title="Pages per Session"
              data={this.state.lineGraphArr}
              />
              </Col>
            </Row>
            <Row>
            <Col>
              <WidgetText
                title="Average Session Time"
                value={this.state.avgSessionTime}
              />
            </Col>
            <Col>
              <WidgetText
                title="Socail Source"
                value={this.state.socialSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Bounce Rate"
                value={this.state.bounceRate + "%"}
              />
            </Col>

            </Row>
            <Row>
              <Col>
              <WidgetArea
              title="Sessions"
              data={this.state.sessionArr}
              />
              </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
