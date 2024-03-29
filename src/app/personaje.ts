export interface Personaje {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: any;
    location: any;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
}

export interface PersonajeResponse {
  info: {
    count: number;
    pages: number;
    next:string;
    prev: string;
  },
  results: Personaje[];
}