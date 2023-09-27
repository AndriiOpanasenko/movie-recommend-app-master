import { useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { MovieCard } from "../../components";
import { useQuery } from "@apollo/client";
import { MOVIES_QUERY } from "./queries";
import Pagination from "@mui/material/Pagination";
import { useMovies } from "../../hooks/useMovies";
import { SelectedMoviesSection } from "../../components";


export const Home = () => {
    const [page, setPage] = useState(1);
    const { loading, error, data } = useQuery(MOVIES_QUERY, {
        variables: { page },
    });
    const { selectedMovies, selectMovie, deleteMovie } = useMovies();

    if (error) return "Error";

    return (
        <Box sx={{ flexGrow: 1, paddingTop: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3}>Filter</Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3}>
                        <Box sx={{ flexGrow: 1, padding: 1 }}>
                            {loading && "Loading..."}
                            {data && (
                                <Grid container spacing={2}>
                                    {data.movies.results.map((movie) => (
                                        <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                                            <MovieCard movie={movie} onCardSelect={selectMovie} />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Box>
                        <Box
                            mt={2}
                            pb={2}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Pagination
                                count={data?.movies?.totalPages <= 500 ? data?.movies?.totalPages : 500}
                                page={page}
                                onChange={(e, page) => setPage(page)}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <SelectedMoviesSection selectedMovies={selectedMovies} deleteMovie={deleteMovie} />
                </Grid>
            </Grid>
        </Box>
    );
};
