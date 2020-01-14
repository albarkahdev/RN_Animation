export interface Cat {
  id: number;
  name: string;
  gender: string;
  species: string;
  age: number;
  distance: number;
  source: number;
}

export const cats: Cat[] = [
  {
    id: 1,
    name: 'Brita',
    gender: 'female',
    species: 'British Shorthair',
    age: 2,
    distance: 3.6,
    source: require('./assets/cats/brita.png')
  },{
    id: 2,
    name: 'Tabby',
    gender: 'male',
    species: 'Brown Tabby',
    age: 1.5,
    distance: 7,
    source: require('./assets/cats/brita.png')
    // source: require('./assets/cats/tabby.png')
  }
];
