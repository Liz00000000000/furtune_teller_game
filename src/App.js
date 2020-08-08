import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Sign from './Componenets/Sign'
import HomePage from './Componenets/HomePage'
import 'semantic-ui-css/semantic.min.css'

export class App extends Component{

  state = {
    birthday: null,
    month: '',
    day: '',
    year: '',
    sign: '',
    celebs: []
  }

  componentDidMount(){
    fetch('https://zodiacal.herokuapp.com/api')
    .then(res => res.json())
    .then(celebs => console.log(celebs))
  }


  handleOnChange = e => this.setState({ [e.target.name]: e.target.value })

  submitBirthday = () => console.log(this.state)

  render(){
    console.log(this.state)
  return (
    <div className="App">
      <img src='https://res.cloudinary.com/teepublic/image/private/s--SIVNWQIj--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_c8e0ec,e_outline:48/co_c8e0ec,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1577739990/production/designs/7399322_0.jpg' alt='fortune teller' />
      <Switch>
        <Route path='/sign' render={()=> <Sign birthday={this.state.birthday}/>}/>
        <Route path='/' render={()=> <HomePage day={this.state.day} month={this.state.month} year={this.state.year} submitBirthday={this.submitBirthday} handleOnChange={this.handleOnChange}/> } />
      </Switch>
    </div>
   )
  }
}

export default App;
