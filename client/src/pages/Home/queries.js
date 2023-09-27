import { gql } from "@apollo/client";

export const MOVIES_QUERY = gql`
    query Movies($page: Int) {
        movies(page: $page) {
            page
            totalPages
            totalResults
            results {
                id
                title
                image: posterPath
                releaseDate(format: "dd.MM.yyyy")
            }
        }
    }

`