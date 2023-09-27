import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import {
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon
} from "react-share";

import { SOCIAL_BUTTON_SIZE } from '../../config';

export const SocialShare = ({ url, title }) => (
    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <FacebookShareButton url={url}>
            <FacebookIcon round size={SOCIAL_BUTTON_SIZE} />
        </FacebookShareButton>

        <TelegramShareButton
            url={url}
            title={title}
        >
            <TelegramIcon size={SOCIAL_BUTTON_SIZE} round />
        </TelegramShareButton>
    </Stack>
);

SocialShare.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string
}