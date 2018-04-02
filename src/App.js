import React, { Component } from 'react'
import TruffleContract from 'truffle-contract'

import GreetingContract from '../build/contracts/Greeting.json'
import getWeb3 from './utils/getWeb3'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      greeting: "",
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  async instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const greeting = TruffleContract(GreetingContract)
    greeting.setProvider(this.state.web3.currentProvider)

    const instance = await greeting.deployed()
    this.setState({
      greeting: await instance.text()
    })
  }

  render() {
    return (
      <div className="app">
        <p>{this.state.greeting}</p>
      </div>
    );
  }
}

export default App
