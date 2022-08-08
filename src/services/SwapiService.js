export class SwapiService {

  constructor() {
    this.apiBase = 'https://swapi.dev/api';
  }

  getResource = async (url) => {
    const fullUrl = `${ this.apiBase }${ url }`;
    const res = await fetch(fullUrl);
    if (!res.ok) throw new Error(`Cannot fetch. Code: ${ res.status }`);
    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource(`/people`);
    return res.results.map(this.transformPerson);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets`);
    return res.results.map(this.transformPlanet);
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships`);
    return res.results.map(this.transformStarship);
  };

  getPerson = async (id = 1) => {
    const person = await this.getResource(`/people/${ id }`);
    return this.transformPerson(person);
  };

  getPlanet = async (id = 1) => {
    const planet = await this.getResource(`/planets/${ id }`);
    return this.transformPlanet(planet);
  };

  getStarship = async (id = 1) => {
    const starShip = await this.getResource(`/starships/${ id }`);
    return this.transformStarship(starShip);
  };

  transformPlanet = (planet) => {
    const id = this.getIdFromUrl(planet);
    return {
      id, planetName: planet.name, population: planet.population, diameter: planet.diameter, rotationPeriod: planet.rotation_period,
    };
  };

  transformPerson = (person) => {
    const id = this.getIdFromUrl(person);
    return {
      id, name: person.name, gender: person.gender, birthYear: person.birth_year, eyeColor: person.eye_color,
    };
  };

  transformStarship = (starShip) => {
    const id = this.getIdFromUrl(starShip);
    return {
      id,
      name: starShip.name,
      model: starShip.model,
      manufacturer: starShip.manufacturer,
      costInCredits: starShip.costInCredits,
      length: starShip.length,
      crew: starShip.crew,
      passengers: starShip.passengers,
      cargoCapacity: starShip.cargoCapacity,
    };
  };

  getIdFromUrl(planet) {
    const url = planet.url;
    const match = url.match(/\/(\d+)\/$/);
    return match[1];
  }

}
