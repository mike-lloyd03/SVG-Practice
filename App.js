// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
console.log('App.js loaded')
export default class App extends Component {
  render() {
    return (
      <div>
        React is working
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('test'))