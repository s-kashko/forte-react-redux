import { nanoid } from "nanoid";
import * as axios from 'axios';

export const planetsColumns = [
    'name',
    'diameter',
    'rotation_period',
    'population',
    'climate',
]


export const planetsAPI = {

    async getPlanets() {
        const response = await axios.get('https://swapi.dev/api/planets');
        return response.data.results.map(({ name, diameter, rotation_period, population, climate }) => ({
            name,
            diameter,
            rotation_period,
            population,
            climate,
            beloved: false,
            id: nanoid()
        }))
    },
}