interface Icon {
  cat: number;
  dog: number;
  parrot: number;
  bunny: number;
  male: number;
  female: number;
  menu: number;
  search: number;
  filter: number;
  marker: number;
}

export const icons: Icon = {
  cat: require('./assets/icon/cat.png'),
  dog: require('./assets/icon/dog.png'),
  parrot: require('./assets/icon/parrot.png'),
  bunny: require('./assets/icon/bunny.png'),
  male: require('./assets/icon/male.png'),
  female: require('./assets/icon/female.png'),
  menu: require('./assets/icon/menu.png'),
  search: require('./assets/icon/search.png'),
  filter: require('./assets/icon/filter.png'),
  marker: require('./assets/icon/marker.png')
};

export const iconPetAnimal = [];

const keyIcons = Object.keys(icons).forEach((iconKey: string) => {
  return iconPetAnimal.push(icons[iconKey]);
});
