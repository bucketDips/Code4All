import React, { Component } from 'react';

class AddTestItem extends Component {

  constructor(){
    super();
    this.state = {
      newProject: {}
    }
  }

  static defaultProps = {
    categories: ['Important', 'Moins Important', 'Pas Important']
  }

  handleSubmit(e) {
    this.setState(
      {
        newProject: {
          title: this.refs.title.value,
          category: this.refs.category.value
        }
      },
      function() {
        this.props.addTestItem(this.state.newProject);
      }
    )
    e.preventDefault(); // empêche l'envoie du formulaire
  }

  render() {
    let selectOptions = this.props.categories.map(category => {
      return(
        <option key={category} value={category}>
          {category}
        </option>
      )
    });

    return (
      <div>
        <h3>Nouveau projet</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>

          <div>
            <label for="titre">Titre : </label>
            <input type="text" ref="title" id="titre" />
          </div>

          <div>
            <label for="category">Catégorie : </label>
            <select ref="category">{selectOptions}</select>
          </div>

          <input type="submit" value="Envoyer" />

        </form>
      </div>
    );
  }
}

export default AddTestItem;
