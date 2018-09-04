import React, {PropTypes} from 'react';
import './style.css';

const Checkbox = ({text , isActive = false, onChangeValue =() =>{}}) => {
  return (
    <div
      onClick={onChangeValue}
      className="Checkbox"
    >
      <span>
         <input
           type="checkbox"
           checked={isActive}
           onChange={onChangeValue}
         />
      </span>
      <span>
         <p className={"textCheckbox"}>{text}</p>
      </span>



      </div>
  );
};

Checkbox.propTypes = {
  text: PropTypes.string.isRequired,
  isActive : PropTypes.bool,
  onChangeValue : PropTypes.func
};



export default Checkbox;
