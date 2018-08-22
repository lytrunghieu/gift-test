import React, {PropTypes} from 'react';
import './style.css';

const Checkbox = ({text , isActive = false, onChangeValue =() =>{}}) => {
  return (
    <div
      onClick={onChangeValue}
      className="Checkbox"
    >
      <input
        type="checkbox"
        checked={isActive}
        onChange={onChangeValue}
      />
     <label className={"textCheckbox"}>{text}</label>

      </div>
  );
};

Checkbox.propTypes = {
  text: PropTypes.string.isRequired
};

export default Checkbox;
