import { gql } from "@apollo/client";

export const MOVIES_BY_IDS_QUERY = gql`
    query Movies($ids: [Int]) {
        moviesByIds(ids: $ids) {
            id
            title
            image: posterPath
            releaseDate(format: "dd.MM.yyyy")
        }
    }

`