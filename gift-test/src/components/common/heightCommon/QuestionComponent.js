import React, {PropTypes} from 'react';
import './style.css';
import CheckBox from "../CheckBox";

const QuestionComponent = ({index, id, content, onSelect = {}, selectedIndex}) => {
  return (
    <div
      className="Question"

    >
      <div className={"IndexQuestionContainer"}
           style ={selectedIndex  ===-1 ? {backgroundColor : "orangered" } : null}

      >
        <p className={"IndexQuestionText"}
        >{index}</p>
      </div>
      <div className={"QuestionContentContainer"}
      >
      <p className={"QuestionContent"}>{content}</p>
      <div>
        <CheckBox isActive={selectedIndex == 0} text={"không đúng tí nào"} onChangeValue={() =>onSelect(index-1,id, 0)}/>
        <CheckBox isActive={selectedIndex == 1} text={"đúng một tí"} onChangeValue={() =>{onSelect(index-1,id, 1);}}/>
        <CheckBox isActive={selectedIndex == 2} text={"hơi đúng"} onChangeValue={() =>{onSelect(index-1,id, 2);}}/>
        <CheckBox isActive={selectedIndex == 3} text={"đúng nhiều"} onChangeValue={() =>{onSelect(index-1,id, 3);}}/>
      </div>
      </div>
    </div>
  );
};

QuestionComponent.propTypes = {
  index: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id : PropTypes.string.isRequired,
  onSelect : PropTypes.func,
  selectedIndex : PropTypes.number
};

export default QuestionComponent;
