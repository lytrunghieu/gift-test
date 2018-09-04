// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import SelectInput from './common/SelectInput';
import CheckBox from './common/CheckBox';
import QuestionComponent from './common/heightCommon/QuestionComponent';
import Placeholder from './common/Placeholder';
import {connect} from 'react-redux';
import questions from '../constant/questions';
import description from '../constant/description';
import * as  _ from "lodash";
import Modal from 'react-modal';
// import {
// } from 'react-share';

// import { FacebookButton, FacebookCount } from "react-social";
import FacebookProvider, {Comments, EmbeddedPost, ShareButton} from 'react-facebook';
// import * as Scroll from 'react-scroll';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

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
      modalIsOpen: false,
      modalIsOpenIntro : true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPressReset = this.onPressReset.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModalIntro = this.closeModalIntro.bind(this);
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
      };
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
          return b.point - a.point;
        });
        maxPoint = sum.splice(0, 3);
      }
    }
    this.setState({
      result: maxPoint,
      modalIsOpen: true
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

  closeModalIntro() {
    this.setState({
      modalIsOpenIntro: false
    });
  }


  //region rendering

  renderQuestion() {
    const {questions} = this.state;
    return questions.map((q, index) => {
      return (<div>
        <QuestionComponent onSelect={this.onSelectAnswer} id={q.id} index={index + 1} content={q.content}
                           selectedIndex={q.selected}/>
        {index < questions.length - 1 ?
          <Placeholder/> : null
        }
      </div>);
    });
  }

  renderIntro(){
    return(
        <div>
          <p className={"TitleResult"}>Những điều cần biết về ân tứ</p>
          <p className={"QuestionContent"}>1/Tài năng không phải là ân tứ.</p>
          <p className={"QuestionContent"}>2/Tài năng có thể trở thành ân tứ.</p>
          <p className={"QuestionContent"}>3/Trách nhiệm không phải là ân tứ.</p>
          <p className={"QuestionContent"}>4/Cá tánh không phải là ân tứ.</p>
          <p className={"TitleResult"}>Sự sử dụng sai lầm về ân tứ:</p>
          <p className={"QuestionContent"}>1/Dùng ân tứ khỏa lấp sự yếu đuối tâm linh.</p>
          <p className={"QuestionContent"}>2/Dùng ân tứ để tôn vinh cá nhân.</p>
          <p className={"QuestionContent"}>3/Dùng ân tứ để phô trương quyền lực.</p>
          <p className={"QuestionContent"}>4/Dùng ân tứ để áp lực và làm khổ người khác.</p>
          <p className={"QuestionContent"}>5/Dùng ân tứ từ chối trách nhiệm.</p>
          <p className={"TitleResult"}>Lời nhắn nhủ</p>
          <p className={"QuestionContent"}>Bài khảo sát ân tứ này chỉ mang tính tương đối. Không nên đặt nó làm trọng tâm để giới hạn bản thân. Nếu kết quả không như dự đoán của bạn thì cũng đừng bối rối nhé</p>
          <Placeholder/>
          <button className={"ButtonSubmitContainer"} onClick={this.closeModalIntro}>{"Tôi đồng ý"}</button>
        </div>
    );
  }

  renderResult() {
    // return <div>No result</div>;
    const {result} = this.state;

    if (result.length == 0) {
      return (
        <div>
          <p className={"TitleNoResult"}>Tiếc quá không tìm thấy ân tứ của bạn trong bài khảo sát này</p>
          <p className={"DescriptionResult"}>Đừng bối rối, hãy kiên nhẫn cầu nguyện. Có thể bạn có ấn tứ khác không nằm
            trong bài khảo sát này</p>
          <Placeholder/>
          <button className={"ButtonSubmitContainer"} onClick={this.onPressReset}>{"Làm lại"}</button>
          <FacebookProvider appId="481038945698995">
            <ShareButton href="https://tnat-4fe2a.firebaseapp.com/" className={"buttonShareFb"}>
              <p>Chia sẻ</p>
            </ShareButton>
          </FacebookProvider>
        </div>
      );

    }
    else {
      return (<div>
        <p className={"TitleNoResult"}>Các ân tứ:</p>
        {result.map(r => {

          return (
            <div>
              <p className={"TitleResult"}>{r.des.name}</p>
              <p className={"DescriptionResult"}>{r.des.description}</p>
              <Placeholder/>
            </div>
          );
        })
        }
        <div className={"BottomButtonResultContainer"}>
          <button className={"ButtonSubmitContainer"} onClick={this.onPressReset}>{"Làm lại"}</button>
          <Placeholder/>
          <FacebookProvider appId="481038945698995">
            <ShareButton href="https://tnat-4fe2a.firebaseapp.com/" className={"buttonShareFb"}>
              <p>Chia sẻ</p>
            </ShareButton>
          </FacebookProvider>
        </div>
      </div>);
    }
  }

  render() {
    return (
      <div className={"AppContainer"}>
        {this.renderQuestion()}
        <Placeholder/>
        <button className={"ButtonSubmitContainer"} onClick={this.onSubmit}>{"Xác nhận"}</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {this.renderResult()}
        </Modal>

        <Modal
          isOpen={this.state.modalIsOpenIntro}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          onRequestClose={this.closeModalIntro}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {this.renderIntro()}
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
