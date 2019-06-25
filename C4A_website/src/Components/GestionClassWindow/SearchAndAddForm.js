import React, { Component } from 'react';
import { Input } from 'antd';
import Person from './Person';
import styles from './style.css';

const Search = Input.Search;

class SearchAndAddForm extends Component {
    constructor() {
        super();
        this.state = {
            foundPersons: [],
            addedPersons: []
        }
    }

    onSearch(value) {
        console.log(value);
    }

    render() {
        var foundPersons = this.state.foundPersons.map(person => {
            return <Person name={person.name} id={person.id} />
        });

        var addedPersons = this.state.addedPersons.map(person => {
            return <Person name={person.name} id={person.id} />
        });

        return (
            <div className={styles.search_add_form}>
                <div className={styles.search_person}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={this.onSearch.bind(this)}
                    />
                </div>
                <div className={styles.found_persons}>
                    <h3><b>Personnes trouvées</b></h3>
                    <div className={styles.grid_persons}>
                        {foundPersons}
                    </div>
                </div>
                <div className={styles.added_persons}>
                    <h3><b>Personnes ajoutées</b></h3>
                    <div className={styles.grid_persons}>
                        {addedPersons}
                    </div>
                </div>
           </div>
        );
    }
}

export default SearchAndAddForm;