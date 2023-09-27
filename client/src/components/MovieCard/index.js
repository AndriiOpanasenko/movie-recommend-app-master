import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, styled } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const PlusIcon = styled(Box)(() => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, .6)',
    cursor: 'pointer',
    transition: "all 0.3s ease-in-out",
    '&:hover': {
        opacity: 1,
    }
}))

export const MovieCard = ({ movie, onCardSelect, isPreviewMode }) => {
    return (
        <Card sx={{ position: "relative" }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                    component="img"
                    height="450"
                    image={movie.image}
                    alt={movie.title}
                />
                {!isPreviewMode && (
                    <PlusIcon onClick={() => onCardSelect(movie)}>
                        <AddBoxOutlinedIcon sx={{ fontSize: 80 }} />
                    </PlusIcon>
                )}
            </Box>

            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {movie.title}
                </Typography>
                <Typography variant="body1">
                    {movie.releaseDate}
                </Typography>
            </CardContent>
        </Card>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        releaseDate: PropTypes.string
    }).isRequired,
    onCardSelect: PropTypes.func,
    isPreviewMode: PropTypes.bool
}