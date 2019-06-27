import React from 'react';
import Table from 'react-bootstrap/Table';

//import myVideo from '../resources/videos/test.webm';

var data = [
    {
        'date': '2019-06-22',
        'time': '14:22',
        //'video': '/home/mark/workspace/gits/KumaNeko/KumaNekoReact/frontend/src/resources/videos/test.webm',
        //'video': myVideo,
    }
];

class EyeTracking extends React.Component {
    constructor(props) {
        super(props);
    }
  componentDidMount() {
    console.log("mount");
    document.body.style.backgroundColor = '#D1E294';
    document.body.style.backgroundImage = 'none';
  }

    render() {
        return (
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Finish time</th>
                    <th>Video</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>0</th>
                    <th>{data[0].date}</th>
                    <th>{data[0].time}</th>
                    <th>
                        <video width="320" height="240" controls>
                            <source src={data[0].video} type='video/webm'/>
                            Your browser does not support the video tag.
                        </video>
                    </th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>{data[0].date}</th>
                    <th>{data[0].time}</th>
                    <th>
                        <video width="320" height="240" controls>
                            <source src={data[0].video} type='video/webm'/>
                            Your browser does not support the video tag.
                        </video>
                    </th>
                </tr>
            </tbody>
            </Table>
        );
    /*
             <video width="320" height="240" controls>
                 <source src={myVideo} type='video/webm'/>
                Your browser does not support the video tag.
             </video>

            <div>
                <Player fluid={false} width={500} src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
            </div>
                */
    }
}

export default EyeTracking;
