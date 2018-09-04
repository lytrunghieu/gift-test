import React, {PropTypes} from 'react';
import './style.css';
import {FaCheck, FaCheckCircle, FaCircle} from "react-icons/fa";


const Checkbox = ({
                    text, isActive = false, onChangeValue = () => {
  }
                  }) => {
  return (
    <div
      onClick={onChangeValue}
      className="CheckboxContainer"
    >
      <span>
        {
          isActive ?
            <FaCheckCircle color={"#00008B"} className={"CheckboxIcon"}/> :
            <FaCircle color={"#00008B"} className={"CheckboxIcon"}/>
        }

      </span>
      <span>
   <p className={"textCheckbox"}>{text}</p>
    </span>
    </div>
  );
};

Checkbox.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onChangeValue: PropTypes.func
};


export default Checkbox;
