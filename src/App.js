import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Sign from './Componenets/Sign'
import HomePage from './Componenets/HomePage'
import Nav from './Componenets/Nav'
import FindYourMatch from './Componenets/FindYourMatch'
import DisplayHoriscope from './Componenets/DisplayHoriscope'
import Person from './Componenets/Person'
import MessageForm from './Componenets/MessageForm'
import Inbox from './Componenets/Inbox'
import 'semantic-ui-css/semantic.min.css'

const url = 'http://localhost:3000/signs'
const usersUrl = 'http://localhost:3000/users'
const matchUrl = 'http://localhost:3000/matches'
const messageUrl = 'http://localhost:3000/messages'

export class App extends Component{

  state = {
    showMessage: false,
    users: [],
    birthday: null,
    month: '',
    day: 0,
    year: '',
    sign: '',
    years: [],
    signs: [],
    matches: [],
    showSignIn: false,
    password: '',
    username: '',
    userSignedIn: {id: 0},
    messages: []
  }

  submitUser = () => {
    const user = this.state.users.find(user => user.email === this.state.username)
    if (user.password === this.state.password){
      this.setState({ userSignedIn: user, sign: user.sign })
    } else {
      alert('Incorrect Password Or Username')
    }
  }

  signIn = () => this.setState({ showSignIn: !this.state.showSignIn })

  createYearArray = () => {
    const array = [2020]
    let count = 0
    while (count < 100){
      let newYear = array[count] - 1
      array.push(newYear)
      count ++;
    }
    this.setState({years: array})
  }

  componentDidMount(){
    this.createYearArray()
    this.fetchingSings()
    this.fetchUsers()
    this.fetchMatches()
    this.fetchMessages()
  }

  fetchMatches = () => fetch(matchUrl).then(res => res.json()).then(matches => this.setState({ matches }))

  fetchUsers = () => fetch(usersUrl).then(res => res.json()).then(users => this.setState({ users }))

  fetchingSings = () => fetch(url).then(res => res.json()).then(signs => this.setState({ signs }))

  fetchMessages = () => fetch(messageUrl).then(res => res.json()).then(messages => this.setState({ messages }))
  
  handleOnChange = e => this.setState({ [e.target.name]: e.target.value })

  submitBirthday = () => {
    const month = this.state.month
    const day = parseInt(this.state.day)
    const year = this.state.year
    this.setState({ birthday: {
      month: month,
      day: day,
      year: year
    } })
    this.findSign(month, day)
  }

  findSign = (month, day) => {
    let sign = ''
    switch(month){
      case 'jan':
        if (day < 21){
          sign = 'Capricorn'
        } else {
          sign = 'Aquarius'
        }
        break;
      case 'feb':
        if (day < 20){
          sign = 'Aquarius'
        } else {
          sign = 'Pisces'
        }
        break;
      case 'march':
        if (day < 22){
          sign = 'Pisces'
        } else {
          sign = 'Aries'
        }
        break;
      case 'april':
        if (day < 21){
          sign = 'Aries'
        } else {
          sign = 'Taurus'
        }
        break;
      case 'may':
        if (day < 22){
          sign = 'Taurus'
        } else {
          sign = 'Gemini'
        }
        break;
      case 'june':
        if (day < 22){
          sign = 'Gemini'
        } else {
          sign = 'Cancer'
        }
        break;
      case 'july':
        if (day < 24){
          sign = 'Cancer'
        } else {
          sign = 'Leo'
        }
        break;
      case 'aug':
        if (day < 24){
          sign = 'Leo'
        } else {
          sign = 'Virgo'
        }
        break;
      case 'sept':
        if (day < 24){
          sign = 'Virgo'
        } else {
          sign = 'Libra'
        }
        break;
      case 'oct':
        if (day < 24){
          sign = 'Libra'
        } else {
          sign = 'Scorpio'
        }
        break;
      case 'nov':
        if (day < 23){
          sign = 'Scorpio'
        } else {
          sign = 'Sagittarius'
        }
        break;
      case 'dec':
        if (day < 23){
          sign = 'Sagittarius'
        } else {
          sign = 'Capricorn'
        }
        break;
    }
    this.setState({ sign: sign })
  }

  messageBubleAppear = () => this.setState({ showMessage: true })

  render(){
    const mySign = this.state.signs.find(sign => sign.zodiac_sign === this.state.sign)
    const myMessages = this.state.messages.filter(message => message.reciever_id === this.state.userSignedIn.id)
    console.log(this.state.userSignedIn)
    return (
    <div className="App">
      <br></br>
      <br></br>
      <Nav myMessages={myMessages} sign={this.state.sign} birthday={this.state.birthday} />
      <Link to='/'><img className='ui centered small image' src='https://res.cloudinary.com/teepublic/image/private/s--SIVNWQIj--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_c8e0ec,e_outline:48/co_c8e0ec,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1577739990/production/designs/7399322_0.jpg' alt='fortune teller' /></Link>
      <Switch>
        <Route path='/findmatches/:id' render={(history)=> <Person showMessage={this.state.showMessage} messageBubleAppear={this.messageBubleAppear} users={this.state.users} history={history} /> } />
        <Route path='/findmatches' render={()=> <FindYourMatch matches={this.state.matches} users={this.state.users} sign={mySign}/> } />
        <Route path='/horiscope/inbox' render={()=> <Inbox myMessages={myMessages}/> } />
        <Route path='/horiscope' render={()=> <DisplayHoriscope sign={mySign} />} />
        <Route path='/sign' render={()=> <Sign birthday={this.state.birthday}/>}/>
        <Route path='/' render={()=> <HomePage submitUser={this.submitUser} username={this.state.username} password={this.state.password} handleOnChange={this.handleOnChange} showSignIn={this.state.showSignIn} signIn={this.signIn} sign={mySign} birthday={this.state.birthday} years={this.state.years} day={this.state.day} month={this.state.month} year={this.state.year} submitBirthday={this.submitBirthday} handleOnChange={this.handleOnChange}/> } />
      </Switch>
      <br></br>
      <br></br>
    </div>
   )
  }
}

export default App;
