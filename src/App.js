import React, { Component } from 'react';
import './App.css';
import 'reset-css';
import Header from './Components/header'
import Columns from './Components/columns';
import Inquiry from './Components/inquiry';
import LineChart from './Components/chart'
import {GetColumns, GetItem} from './API/GetData';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            inquiry: [],
            details: []
        };
      }
    componentDidMount() {

    }

    handleDragStart = (e, name) => {
        
    }
        
    handleDragOver = e => {
        
    }
        
    getDetails = (inquiry) => {
        
    }

    handleDrop = (e) => {

    }
        
    handleClear = (type) => {
        
    }

    render() {
        const {columns, inquiry, details} = this.state;
        return (
            <div className="container">
                <Header />
                <Columns columns={columns} handleDragStart={this.handleDragStart} />
                <div className="rightCol">
                    <Inquiry inquiry={inquiry} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} handleClear={this.handleClear} />
                    {details.length > 0 ? <LineChart details={details} /> : ''}
                </div>
            </div>
        )
    }
}

export default App;