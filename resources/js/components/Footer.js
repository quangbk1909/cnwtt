import React, {Component} from 'react'


import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'

export class Footer extends Component{
    render() {
        return (
            <div className="footer" style={{width: '80%', alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                <div style={{width: '100%', alignSelf: 'center', backgroundColor: 'red'}}>
                    <p className="pull-left">
                        Group 12
                    </p>
                </div>
                <div className="clearfix">
                </div>
            </div>
        );
    }
}
