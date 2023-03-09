export type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type Dog = {
  message: string;
  status: string;
};

export type Fox = {
  image: string;
  link: string;
};

export type Rabbit = {
  thisServed: number;
  totalServed: number;
  id: string;
  media: Media;
  source: string;
};

export type Media = {
  mp4: string;
  webm: string;
  poster: string;
};

export type AnimalSlice = {
  cat: Cat;
  dog: Dog;
  fox: Fox;
  rabbit: Rabbit;
  favoriteAnimals: Animal[];
};

export type Animal = {
  idAnimal: number;
  img: string;
  id?: string;
  url?: string;
  width?: number;
  height?: number;
  message?: string;
  status?: string;
  image?: string;
  link?: string;
  thisServed?: number;
  totalServed?: number;
  media?: Media;
  source?: string;
};
