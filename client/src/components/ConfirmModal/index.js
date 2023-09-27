import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { CONFRIM_TIMEOUT } from "../../config";
import { SocialShare } from "../SocialShare";
import { FormattedMessage } from "react-intl";

const CustomModal = styled(Modal)(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const CustomModalBox = styled(Box)(({ theme }) => ({
    width: "50%",
    background: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    border: "0",
    outline: "0",
    outlineOffset: "0"
}));

const CustomAlert = styled(Alert)(({ theme }) => ({
    marginTop: "1rem"
}));

export const ConfirmModal = ({ open, url, title, onClose }) => {
    const [openAlert, setOpenAlert] = React.useState(false);

    React.useEffect(() => {
        let timer;
        if (openAlert) {
            timer = setTimeout(() => { setOpenAlert(false) }, CONFRIM_TIMEOUT)
        }

        return () => clearTimeout(timer)
    }, [openAlert])

    return (
        <CustomModal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CustomModalBox>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Paper
                    component="form"
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        marginTop: "1.5rem",
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="List URL"
                        inputProps={{ "aria-label": "List URL" }}
                        value={url}
                    />
                    <IconButton href={url} target="_blank" sx={{ p: "10px" }} aria-label="preview">
                        <VisibilityIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <CopyToClipboard text={url} onCopy={() => setOpenAlert(true)}>
                        <IconButton
                            color="primary"
                            sx={{ p: "10px" }}
                            aria-label="copy to clipboard"
                        >
                            <ContentCopyIcon />
                        </IconButton>
                    </CopyToClipboard>
                </Paper>

                <Typography sx={{ mt: 2 }} id="modal-modal-title" variant="h6" component="h3">
                    <FormattedMessage id="share_with_friends" />
                </Typography>

                <SocialShare url={url} title={title} />

                {openAlert ? (
                    <CustomAlert severity="success">
                        <FormattedMessage id="copied" />
                    </CustomAlert>
                ) : null}
            </CustomModalBox>
        </CustomModal>
    );
};

ConfirmModal.propTypes = {
    open: PropTypes.bool,
    url: PropTypes.string,
    title: PropTypes.string,
    onClose: PropTypes.func,
};
