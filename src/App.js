import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "./firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      textarea: "",
      messages: []
    };
    this.handelChange = this.handelChange.bind(this);
    this.send = this.send.bind(this);
  }

  componentDidMount() {
    let n = prompt("Insert your name ");
    this.setState({
      name: n
    });
    const MsgRef = firebase.database().ref("react");
    MsgRef.on("value", snap => {
      let newMessages = [];
      snap.forEach(e=>{
        let msg = e.val();
        newMessages.push({id:e.key,msg:msg.message.message,from:msg.message.from})
      });

      this.setState({
        messages:newMessages.reverse()
      })

    });
  }

  handelChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  send() {
    firebase
      .database()
      .ref("react")
      .push({
        message: {
          from: this.state.name,
          message: this.state.textarea
        }
      });
    this.setState({
        messages:[
          {id:this.state.messages.length+1,msg:this.state.textarea,from:this.state.name},
          ...this.state.messages
        ],
        textarea:''
    })
  }
  render() {
    let st = this.state;
    return (
      <div
        className="App"
        className="container row justify-content-center mt-5"
      >
        <div className="col-6">
          <textarea
            className="form-control"
            onChange={this.handelChange}
            name="textarea"
            placeholder="Your message ..."
            value={st.textarea}
          />
          <button
            className="btn btn-success btn-block mt-2"
            onClick={this.send}
          >
            Send
          </button>
          <div>
            <ul className="list-group">
              {st.messages.map(e => {
                if (e.from != this.state.name)
                  return (
                    <li key={e.id} className="list-group-item">
                      <b>{e.from} :</b>
                      {e.msg}
                    </li>
                  );
                else
                  return (
                    <li
                      key={e.id}
                      className="list-group-item text-right list-group-item-light"
                    >
                      <b>You :</b>
                      {e.msg}
                    </li>
                  );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
