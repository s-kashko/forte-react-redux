import { nanoid } from "nanoid";
import * as axios from 'axios';

export const starshipsColumns = [
    'name',
    'model',
    'starship_class',
    'manufacturer',
    'passengers',
]


export const starshipsAPI = {

    async getStarships() {
        const response = await axios.get('https://swapi.dev/api/starships');
        return response.data.results.map(({ name, model, starship_class, manufacturer, passengers }) => ({
            name,
            model,
            starship_class,
            manufacturer,
            passengers,
            beloved: false,
            id: nanoid()
        }))
    },
}