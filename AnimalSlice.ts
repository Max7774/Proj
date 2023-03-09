import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AppThunk } from '../hooks';
import type {
  Animal,
  AnimalSlice,
  Cat,
  Dog,
  Fox,
  Rabbit,
} from './AnimalsTypes';

const initialState: AnimalSlice = {
  cat: {
    id: '',
    url: '',
    width: 250,
    height: 250,
  },
  dog: {
    message: '',
    status: '',
  },
  fox: {
    image: '',
    link: '',
  },
  rabbit: {
    thisServed: 0,
    totalServed: 0,
    id: '',
    media: {
      mp4: '',
      webm: '',
      poster: '',
    },
    source: '',
  },
  favoriteAnimals: [],
};

export const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    oneCat: (state, action: PayloadAction<Cat>) => {
      state.cat = action.payload;
    },
    oneDog: (state, action: PayloadAction<Dog>) => {
      state.dog = action.payload;
    },
    oneFox: (state, action: PayloadAction<Fox>) => {
      state.fox = action.payload;
    },
    oneRabbit: (state, action: PayloadAction<Rabbit>) => {
      state.rabbit = action.payload;
    },

    addFavorite: (state, action: PayloadAction<Animal>) => {
      if (
        !state.favoriteAnimals
          .map((animal) => animal.idAnimal)
          .includes(action.payload.idAnimal)
      ) {
        state.favoriteAnimals.unshift(action.payload);
      }
    },

    delFavorite: (state, action: PayloadAction<Animal['idAnimal']>) => ({
      ...state,
      favoriteAnimals: state.favoriteAnimals.filter(
        (animal) => animal.idAnimal !== action.payload,
      ),
    }),
  },
});

export const { oneCat, oneDog, oneFox, oneRabbit, addFavorite, delFavorite } =
  animalsSlice.actions;

export const getOneCat = (): AppThunk => (dispatch) => {
  axios<Cat[]>('https://api.thecatapi.com/v1/images/search?size=full')
    .then((res) => dispatch(oneCat(res.data[0])))
    .catch(console.log);
};

export const getOneDog = (): AppThunk => (dispatch) => {
  axios<Dog>('https://dog.ceo/api/breeds/image/random')
    .then((res) => dispatch(oneDog(res.data)))
    .catch(console.log);
};

export const getOneFox = (): AppThunk => (dispatch) => {
  axios<Fox>('https://randomfox.ca/floof/')
    .then((res) => dispatch(oneFox(res.data)))
    .catch(console.log);
};

export const getOneRabbit = (): AppThunk => (dispatch) => {
  axios<Rabbit>('https://api.bunnies.io/v2/loop/random/?media=webm,mp4')
    .then((res) => dispatch(oneRabbit(res.data)))
    .catch(console.log);
};

export const addFavoriteAnimal =
  (animal: Animal): AppThunk =>
  (dispatch) => {
    dispatch(addFavorite(animal));
  };

export const delFavoriteMeal =
  (id: Animal['idAnimal']): AppThunk =>
  (dispatch) => {
    dispatch(delFavorite(id));
  };

// export const getCurrentMealInfo =
//   (id: Meal['idMeal']): AppThunk =>
//   (dispatch) => {
//     axios(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
//       .then((res: { data: { meals: CurrMeal[] } }) =>
//         dispatch(getMealInfo(res.data.meals[0])),
//       )
//       .catch(console.log);
//   };

// export const addNewMeal =
//   (formInput: FormMeal): AppThunk =>
//   (dispatch) => {
//     const idMeal = Math.floor(
//       Math.random() * (1000000 - 100000) + 100000,
//     ).toString();
//     const newMeal: Meal = { ...formInput, idMeal };
//     dispatch(add(newMeal));
//   };

// export const deleteMeal =
//   (id: Meal['idMeal']): AppThunk =>
//   (dispatch) => {
//     dispatch(del(id));
//   };

// export const addFavoriteMeal =
//   (meal: Meal): AppThunk =>
//   (dispatch) => {
//     dispatch(addFavorite(meal));
//   };

// export const delFavoriteMeal =
//   (id: Meal['idMeal']): AppThunk =>
//   (dispatch) => {
//     dispatch(delFavorite(id));
//   };

export default animalsSlice.reducer;
