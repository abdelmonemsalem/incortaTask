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
        GetColumns()
        .then(response => {
          this.setState({columns: response.data})
        })
        .catch(err => {
            console.log(err)
        });
    }

    handleDragStart = (e, name) => {
        e.dataTransfer.setData("name", name)
    }
        
    handleDragOver = e => {
        e.preventDefault();
    }
        
    getDetails = (inquiry) => {
        let measures = [];
        let dimension = []
        inquiry.filter(item => item.function === 'measure').map(item => measures.push(item.name));
        inquiry.filter(item => item.function === 'dimension').map(item => dimension.push(item.name));
        let data = {"measures": measures, "dimension": dimension[0]};
        if (measures.length > 0 && dimension.length > 0) {
            GetItem(data)
            .then(response => {
                this.setState({details: response.data})
            })
            .catch(err => {
                console.log(err)
            });
        }
    }

    handleDrop = (e) => {
        const {columns, inquiry} = this.state;
        let name = e.dataTransfer.getData("name");
        let columnItem = columns.filter(column => {
            return column.name !== name;
        });
        let inquiryItem = columns.filter(column => {
            return column.name === name;
        });
        this.setState({columns: columnItem});

        if(inquiryItem[0].function !== 'dimension') {
            let inquiryItems = [...inquiry, inquiryItem[0]]
            this.getDetails(inquiryItems)
            this.setState({inquiry: inquiryItems});
        } else {
            this.setState({columns: [...columnItem, ...inquiry.filter(item => {
                return item.function === 'dimension';
            })]});
            let inquiryItems = [...inquiry.filter(item => {
            return item.function !== 'dimension';
            }), inquiryItem[0]]
            this.getDetails(inquiryItems)
            this.setState({inquiry: inquiryItems});
        }
    }
        
    handleClear = (type) => {
        const {columns, inquiry} = this.state;
        if (type === 'dimension') {
            this.setState({columns: [...columns, ...inquiry.filter(item => {
                return item.function === 'dimension';
            })]});
            this.setState({inquiry: [...inquiry.filter(item => {
                return item.function !== 'dimension';
            })]});
        } else {
            this.setState({columns: [...columns, ...inquiry.filter(item => {
                return item.function === 'measure';
            })]});
            this.setState({inquiry: [...inquiry.filter(item => {
                return item.function !== 'measure';
            })]});
        }
        this.setState({details: []})
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