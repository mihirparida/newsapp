// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0
    }
  }
  page = 10;
  apiKey = process.env.REACT_APP_NEWS_API
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Routes>
            <Route path="/" element=<News setProgress={this.setProgress} apiKey = {this.apiKey} key="Normal" pageSize={this.page} country="in" category="General" /> />
            <Route path="/Business" element=<News setProgress={this.setProgress} apiKey = {this.apiKey} key="Business" pageSize={this.page} country="in" category="Business" /> />
            <Route path="/Entertainment" element=<News setProgress={this.setProgress} apiKey = {this.apiKey} key="Entertainment" pageSize={this.page} country="in" category="Entertainment" /> />
            <Route path="/General" element=<News setProgress={this.setProgress} apiKey = {this.apiKey} key="General" pageSize={this.page} country="in" category="General" /> />
            <Route path="/Health" element=<News setProgress={this.setProgress} apiKey = {this.apiKey} key="Health" pageSize={this.page} country="in" category="Health" /> />
            <Route path="/Science" element=<News setProgress={this.setProgress} apiKey = {this.apiKey} key="Science" pageSize={this.page} country="in" category="Science" /> />
            <Route path="/Sports" element=<News setProgress={this.setProgress} apiKey = {this.apiKey} key="Sports" pageSize={this.page} country="in" category="Sports" /> />
            <Route path="/Technology" element=<News setProgress={this.setProgress} apiKey = {this.apiKey} key="Technology" pageSize={this.page} country="in" category="Technology" /> />
          </Routes>
        </Router>
      </div>
    )
  }
}

