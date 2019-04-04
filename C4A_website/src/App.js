import React, { Component } from 'react';
import './App.css';
import Test from './Components/Test';
import AddTestItem from './Components/AddTestItem';

class App extends Component {

  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  componentWillMount() {
    this.setState({
      projects: [
        {
          title : 'Projet 1',
          category : 'Important'
        },
        {
          title : 'Projet 2',
          category : 'Moins Important'
        },
        {
          title : 'Projet 3',
          category : 'Pas important du tout'
        }
      ]
    });
  }

  handleAddTestItem(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
  }

  render() {
    return (
      <div className="App">
        <AddTestItem addTestItem={this.handleAddTestItem.bind(this)}/>
        <Test projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
