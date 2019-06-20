import Axios from 'axios';

class Exercices {
    getMines(token) {
        return {
            "myExercices": [
                {
                    id: 0,
                    name: "exo1"
                },
                {
                    id: 1,
                    name: "exo2"
                }
            ],
            "forkedExercices": [
                {
                    id: 2,
                    name: "exoAA"
                },
                {
                    id: 3,
                    name: "exoBB"
                }
            ]
        }
    }
}

export default new Exercices();