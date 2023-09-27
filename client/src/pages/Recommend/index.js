import { useSearchParams } from "react-router-dom";
import { Grid, Typography } from '@mui/material';
import { useQuery } from "@apollo/client";
import { MOVIES_BY_IDS_QUERY } from "./queries";
import { MovieCard } from "../../components";
import { Container } from "@mui/material";

export const Recommend = () => {
    const [searchParams] = useSearchParams();

    const { loading, error, data } = useQuery(MOVIES_BY_IDS_QUERY, {
        variables: { ids: searchParams.get('ids')?.split(",").map((id) => +id) },
    });

    if (loading) {
        <div>Loading...</div>
    }

    if (error) {
        <div>Error.</div>
    }

    return (
        <>
            <Container sx={{ minHeight: "100vh", pb: 4 }} maxWidth="xl">
                <Typography sx={{ fontWeight: "500", pt: 2 }} variant="h2" gutterBottom>
                    {searchParams.get('title')}
                </Typography>
                {data?.moviesByIds && (
                    <Grid container spacing={2}>
                        {data.moviesByIds.map((movie) => (
                            <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                                <MovieCard movie={movie} isPreviewMode />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    )
}