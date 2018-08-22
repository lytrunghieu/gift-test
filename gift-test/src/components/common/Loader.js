import React from 'react';
import './style.css';

class Loader extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
          <div className="Loader">
            {/*<img src={require("../../res/img/loader.gif")}/>*/}
          </div>
        );
    }
}

export default Loader;
