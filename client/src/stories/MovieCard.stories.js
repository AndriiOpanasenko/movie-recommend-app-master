import { MovieCard } from "../components";

import { movies } from "./stub";

export default {
  title: 'Card / Movie card',
  component: MovieCard,
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    movie: movies[0]
  },
};
