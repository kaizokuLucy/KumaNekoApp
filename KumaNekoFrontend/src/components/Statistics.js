import React from 'react';
import Table from 'react-bootstrap/Table';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.getTableData();
        this.state = {
            'data': 'hello', //this.getTableData(),
            'test': '',
            'practice': '',
        }
    }

  componentDidMount() {
    console.log("mount");
    document.body.style.backgroundColor = '#D1E294';
    document.body.style.backgroundImage = 'none';
  }
    getTableData = () => {
        return fetch('http://localhost:8000/fetch_stats/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': localStorage.username})
        }).then(res => {
            if (res.status === 200) {
                console.log("Response status je 200");
                return res.json();
            }
        }).then(json => {
            console.log("Ispisujem dobiveni JSON");
            console.log(json);
            //return json;
            this.setState({
                'test': json.test,
                'practice': json.practice
            });
        });
    }

    render() {
        //console.log(JSON.stringify(table));
        //this.getTableData().then(response => {console.log(response)});
        return (
        <div>
            <h2>Previous tests:</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Finish time</th>
                    <th>Duration (seconds)</th>
                    <th>Correct answers</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(this.state.test).map(([key, val]) =>
                <tr>
                    <td>{key}</td>
                    <td>{val.date}</td>
                    <td>{val.time}</td>
                    <td>{val.duration}</td>
                    <td>{val.correct_answers}</td>
                </tr>
                )}
            </tbody>
            </Table>
            <h2>Previous practices:</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Finish time</th>
                    <th>Duration (seconds)</th>
                    <th>Letter</th>
                    <th>Number of mistakes</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(this.state.practice).map(([key, val]) =>
                <tr>
                    <td>{key}</td>
                    <td>{val.date}</td>
                    <td>{val.time}</td>
                    <td>{val.duration}</td>
                    <td>{val.letter}</td>
                    <td>{val.tries}</td>
                </tr>
                )}
            </tbody>
            </Table>
        </div>
        );
    }
}

export default Statistics;
