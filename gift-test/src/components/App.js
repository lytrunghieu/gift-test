// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import SelectInput from './common/SelectInput';
import CheckBox from './common/CheckBox';
import QuestionComponent from './common/heightCommon/QuestionComponent';
import {connect} from 'react-redux';
import questions from '../constant/questions';
import description from '../constant/description';
import * as  _ from "lodash";
import Modal from 'react-modal';

const customStyles = {
  content: {
    // top                   : '50%',
    // left                  : '50%',
    // right                 : 'auto',
    // bottom                : 'auto',
    // marginRight           : '-50%',
    // transform             : 'translate(-50%, -50%)',
    backgroundColor: "white"
    // width : "100%"
    // display : "flex",
    // flex : 1
  }
};

class App extends React.Component {

  //region cycle life

  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      questions: this.generateQuestion(questions),
      result: [],
      modalIsOpen: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPressReset = this.onPressReset.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //endregion

  generateQuestion(questions) {
    let result = [];
    result = questions.map(q => {
      return {
        content: q.content,
        id: q.id,
        selected: 0,
        des: description[q.id]
      }
    });
    return result;
  }

  //region handle action press

  onSelectAnswer(index, id, indexSelected) {
    const {questions} = this.state;
    questions[index].selected = indexSelected;
    this.setState({
      questions: questions
    });
  }

  onPressReset() {
    this.closeModal();
    this.setState({
      questions: this.generateQuestion(questions)
    });
  }

  onSubmit() {
    const {questions} = this.state;
    const group = _.groupBy(questions, e => e.id);
    let sum = [];
    let maxPoint = [];
    for (let key in group) {
      let sumPoint = _.sumBy(group[key], e => e.selected);
      if (sumPoint > 0) {
        sum.push({
          id: key,
          point: sumPoint,
          des: group[key][0].des
        });
      }
    }


    if (sum.length <= 3 && sum.length > 0) {
      maxPoint = sum;
    }
    else {
      if (sum.length > 3) {
        sum = sum.sort((a, b) => {
          return b.point - a.point
        });
        maxPoint = sum.splice(0, 3);
      }
    }
    this.setState({
      result: maxPoint,
      modalIsOpen: true,
    });
  }

  //endregion


  handleInputChange() {

  }


  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }


  //region rendering

  renderQuestion() {
    const {questions} = this.state;
    return questions.map((q, index) => {
      return (<QuestionComponent onSelect={this.onSelectAnswer} id={q.id} index={index + 1} content={q.content}
                                 selectedIndex={q.selected}/>)
    });
  }


  renderResult() {
    // return <div>No result</div>;
    const {result} = this.state;

    if (result.length == 0) {
      return <div>No result</div>
    }
    else {
      return (<div>
        {result.map(r => {
          // console.log("r ", r);
          return (
            <div>
              <div>{r.des.name}</div>
              <div>{r.des.description}</div>

            </div>
          );
        })
        }
        <button className={"buttonSubmit"} onClick={this.onPressReset}>{"Làm lại"}</button>
      </div>)
    }
  }

  render() {
    return (
      <div>
        {this.renderQuestion()}
        <button className={"buttonSubmit"} onClick={this.onSubmit}>{"Xác nhận"}</button>
        <Modal
          isOpen={this.state.modalIsOpen}

          // onAfterOpen={this.afterOpenModal}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {this.renderResult()}
        </Modal>

      </div>
    );
  }

  //endregion
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
