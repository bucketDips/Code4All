import React, { Component } from 'react';
import { Input } from 'antd';
import Person from './Person';
import styles from './style.css';

import persons from '../../Providers/persons';

const Search = Input.Search;

class SearchAndAddForm extends Component {
    constructor() {
        super();
        this.state = {
            foundPersons: [],
            addedPersons: [],
            persons: [],
            toAdd: []
        }
    }

    componentWillMount() {
        console.log(this.props.persons);
        this.setState({persons: JSON.parse(JSON.stringify(this.props.persons))});
    }

    async onSearch(value) {
        var users = await persons.getUsersForName(value);
        this.setState({foundPersons: users});
    }

    alreadyIsIn(id) {
        var present = false;
        this.state.persons.map(person => {
            if(person.id === id) {
                present = true;
            }
        });
        return present;
    }

    add(person) {
        var persons = this.state.persons;
        var toAdd = this.state.toAdd;
        var addedPersons = this.state.addedPersons;
        persons.push(person);
        toAdd.push(person.id);
        addedPersons.push(person);
        this.setState({
            persons: persons,
            toAdd: toAdd,
            addedPersons: addedPersons
        });
    }

    remove(person) {
        var toAdd = this.state.toAdd;
        var addedPersons = this.state.addedPersons;
        var filteredPersons = this.state.persons.filter(function(value, index, arr){
            return value != person;
        });
        var filteredToAdd = this.state.toAdd.filter(function(value, index, arr){
            return value != person.id;
        });
        var filteredAddedPersons = this.state.addedPersons.filter(function(value, index, arr){
            return value != person;
        });
        this.setState({
            persons: filteredPersons,
            toAdd: filteredToAdd,
            addedPersons: filteredAddedPersons
        });
    }

    render() {
        var foundPersons = this.state.foundPersons.map(person => {
            if(this.alreadyIsIn(person.id)) {
                return null;
            }
            return <Person name={person.name} id={person.id} onClick={this.add.bind(this, person)} />
        });

        var addedPersons = this.state.addedPersons.map(person => {
            return <Person name={person.name} id={person.id} onClick={this.remove.bind(this, person)} />
        });

        return (
            <div className={styles.search_add_form}>
                <div className={styles.search_person}>
                    <Search
                        placeholder="nom de l'élève"
                        enterButton="Rechercher"
                        size="large"
                        onSearch={this.onSearch.bind(this)}
                    />
                </div>
                <div className={styles.found_persons}>
                    <h3><b>Personnes trouvées</b></h3>
                    <div className={styles.container_persons}>
                        <div className={styles.min_grid_persons}>
                            {foundPersons}
                        </div>
                    </div>
                </div>
                <div className={styles.added_persons}>
                    <h3><b>Personnes ajoutées</b></h3>
                    <div className={styles.container_persons}>
                        <div className={styles.min_grid_persons}>
                            {addedPersons}
                        </div>
                    </div>
                </div>
           </div>
        );
    }
}

export default SearchAndAddForm;