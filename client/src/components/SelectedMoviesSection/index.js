import { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MovieCardSelected } from '../MovieCardSelected';
import { SelectedMoviesForm } from '../SelectedMoviesForm';
import noMoviesImageSrc from '../../images/empty_movie_list.png';
import { ConfirmModal } from '../ConfirmModal';
import { AppContext } from '../../providers/AppContext';
import { FormattedMessage } from 'react-intl';

const SelectedMovies = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: 'calc(100vh - 160px)',
    position: 'sticky',
    top: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
}));

const MoviesList = styled(Box)(({ theme }) => ({
    overflowY: 'auto',
    height: '100%'
}))

const NoMovies = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
}))

export const SelectedMoviesSection = ({ selectedMovies, deleteMovie }) => {
    const [link, setLink] = useState('');
    const [listName, setListName] = useState('')
    const { state } = useContext(AppContext);

    const onSubmit = ({ listName }) => {
        const ids = selectedMovies.map(({ id }) => id)
        const link = `${window.location.origin}/recommend?title=${listName}&locale=${state.locale}&ids=${ids.join()}`;

        setLink(link)
        setListName(listName)
    }

    const handeModalClose = () => {
        setLink('')
    }

    if (!selectedMovies.length) {
        return (
            <SelectedMovies>
                <NoMovies>
                    <Box
                        component="img"
                        sx={{
                            width: '50%',
                            opacity: '.6'
                        }}
                        alt="No images."
                        src={noMoviesImageSrc}
                    />
                    <Typography variant="h5" mt={2}>
                        <FormattedMessage id="no_selected_movies" />
                    </Typography>
                </NoMovies>
            </SelectedMovies>
        )
    }

    return (
        <SelectedMovies>
            <MoviesList spacing={2}>
                {selectedMovies.map((movie) => (
                    <MovieCardSelected key={movie.id}
                        movie={movie}
                        onCardDelete={deleteMovie} />
                ))}
            </MoviesList>
            <Box pt={2}>
                <SelectedMoviesForm onSubmit={onSubmit} />
            </Box>
            <ConfirmModal url={link} title={listName} open={!!link} onClose={handeModalClose} />
        </SelectedMovies>
    )
};