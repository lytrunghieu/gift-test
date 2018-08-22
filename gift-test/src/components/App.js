// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import SelectInput from './common/SelectInput';
import CheckBox from './common/CheckBox';
import QuestionComponent from './common/heightCommon/QuestionComponent';
import {connect} from 'react-redux';
import questions from '../constant/questions';
import * as  _ from "lodash";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      questions: this.generateQuestion(questions),
      result : []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSelectAnswer(index, id, indexSelected) {
    const {questions} = this.state;
    questions[index].selected = indexSelected;
    this.setState({
      questions: questions
    });
  }

  generateQuestion(questions) {
    let result = [];
    result = questions.map(q => {
      return {
        content: q.content,
        id: q.id,
        selected: 0
      }
    });
    return result;
  }


  onSubmit() {
    const {questions} = this.state;
    const group =_.groupBy(questions , e => e.id);
    let sum = [];
    let maxPoint = [];
    for (let key in group){
      let sumPoint =  _.sumBy(group[key], e => e.selected);
      if(sumPoint > 0){
        sum.push({
          id : key,
          point:sumPoint
        });
      }
    }



    if(sum.length <= 3 && sum.length > 0){
      maxPoint = sum;
    }
    else{
      if(sum.length > 3){
        sum  =  sum.sort((a,b)=>{ return b.point - a.point});
        maxPoint = sum.splice(0,3);
      }
    }
    this.setState({
      result: maxPoint
    });
  }


  handleInputChange() {

  }

  renderQuestion() {
    const {questions} = this.state;
    return questions.map((q, index) => {
      return (<QuestionComponent onSelect={this.onSelectAnswer} id={q.id} index={index + 1} content={q.content}
                                 selectedIndex={q.selected}/>)
    });
  }

  render() {
    return (
      <div>
        {this.renderQuestion()}
        <button className={"buttonSubmit"} onClick={this.onSubmit}>{"Xác nhận"}</button>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
