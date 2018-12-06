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
import FacebookProvider, {Comments, EmbeddedPost, ShareButton} from 'react-facebook';
import Images from "../utils/Images";
import Sticky from 'react-sticky-el';

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
      modalIsOpenIntro: true,
      remainQuestions: questions.length
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPressReset = this.onPressReset.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModalIntro = this.closeModalIntro.bind(this);
    //Todo: for test
    // setTimeout(()=>{
    //   this.setState({
    //     questions : this.generateQuestion(questions, true)
    //   });
    // },5000);
  }

  componentWillUpdate(nextProps, nextStats) {
    if (nextStats.questions !== this.state.questions) {
      const {questions} = nextStats;
      const remainQuestions = questions.filter(e => e.selected === -1).length;
      this.setState({remainQuestions});
    }
  }

  //endregion

  generateQuestion(questions , auto = false) {
    let result = [];
    result = questions.map(q => {
      return {
        content: q.content,
        id: q.id,
        selected: auto ? 2  : -1,
        des: description[q.id]
      };
    });
    return result;
  }

  //region handle action press

  onSelectAnswer(index, id, indexSelected) {
    const {questions} = this.state;
    const newQuestions = questions.map(e => {
      return e;
    });
    newQuestions[index].selected = indexSelected;

    //todo: for test
    // const group = _.groupBy(questions, e => e.id);
    // let sum = [];
    // for (let key in group) {
    //   let sumPoint = _.sumBy(group[key], e => e.selected);
    //   if (sumPoint > 0) {
    //     sum.push({
    //       id: key,
    //       point: sumPoint,
    //       des: group[key][0].des
    //     });
    //   }
    // }
    //
    // console.log("result ", sum);

    this.setState({questions: newQuestions});
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
    return <div className={"QuestionListContainer"}>
      {
        questions.map((q, index) => {
          return (
            <div>
              <QuestionComponent onSelect={this.onSelectAnswer} id={q.id} index={index + 1} content={q.content}
                                 selectedIndex={q.selected}/>
              {index < questions.length - 1 ?
                <Placeholder/> : null
              }
            </div>
          )
        })
      }
    </div>;
  }

  renderIntro() {
    return (
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
        <p className={"QuestionContent"}>Bài trắc nghiệm này sẽ chọn ra tối đa 3 ân tứ có điểm số cao nhất trong 16 loại ân tứ với tổng cộng 128 câu trắc nghiệm. Bài này chỉ
          mang tính tương đối. Không nên đặt nó làm trọng tâm để giới hạn bản thân. Nếu kết quả không như dự đoán của
          bạn thì cũng đừng bối rối nhé</p>
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
          <p className={"DescriptionResult"}>Đừng bối rối, hãy kiên nhẫn cầu nguyện. Có thể bạn có ân tứ khác không nằm
            trong bài khảo sát này</p>
          <Placeholder/>
          <button className={"ButtonSubmitContainer"} onClick={this.onPressReset}>{"Làm lại"}</button>
          <Placeholder/>
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

  renderHeader() {
    const {remainQuestions, questions} = this.state;
    const totalQuestion = questions.length;
    let remainText = "Còn {remainQuestions} trong {totalQuestion} câu hỏi chưa được điền câu trả lời \nGửi câu chưa trả lời:{suggest}";
    let suggest = "";
    remainText = remainText.replace("{remainQuestions}", remainQuestions).replace("{totalQuestion}", totalQuestion);
    if (!remainQuestions) {
      remainText = "Bạn đã hoàn thành hết các câu hỏi hãy nhấn nút xác nhận để nhận kết quả";
    }
    else{
      const questionNoAnswerIndex = questions.findIndex(e => e.selected === -1);
      if(questionNoAnswerIndex !==-1 ){
        suggest =questionNoAnswerIndex + 1;
        remainText = remainText.replace("{suggest}",suggest);
      }
    }
    return (
      <div className={"HeaderContainer"}>
        <p>Trắc nghiệm ân tứ</p>
        <p className={"HeaderNotice"} style={!remainQuestions ? {color: "green"} : null}>{remainText}</p>
      </div>
    );
  }

  render() {
    const {remainQuestions} = this.state;
    return (
      <div className={"AppContainer"}>
        <div className={"AppContent"}>
          <Sticky>
            {this.renderHeader()}

          </Sticky>
          {this.renderQuestion()}
        </div>

        {
          !remainQuestions &&
          <div className={"ButtonSubmitContainerWraper"} style={{alignItems:"center"}} >
            <button className={"ButtonSubmitContainer"}  onClick={this.onSubmit}>{"Xác nhận"}</button>
          </div>

          || null
        }
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
