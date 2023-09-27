/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useCallback } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Hidden,
    Button,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { AppContext } from "../../providers/AppContext";
import { LOCALES } from "../../config";
import { FormattedMessage } from "react-intl";
import { translate } from "../../utils/translate";

import uk from "../../images/icons/ukraine.png";
import en from "../../images/icons/united-states.png";

import styles from "./nav.module.scss";

const Navigation = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { state, dispatch } = useContext(AppContext);

    const setLanguage = useCallback((locale) => {
        dispatch({
            type: "setLocale",
            locale,
        });
    }, []);

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation">
            <List>
                <Link to='settings'>
                    <ListItem>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={translate('navigation.settings')} />
                    </ListItem>
                </Link>
            </List>
        </Box>
    );

    return (
        <>
            <Box>
                <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
                    <Toolbar>
                        <Hidden only={["lg", "xl"]}>
                            <IconButton
                                onClick={() => setDrawerOpen(true)}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link className={styles.link} to={"/"}>
                                <FormattedMessage id="navigation.home" />
                            </Link>
                        </Typography>

                        <Box>
                            <Button
                                sx={{ color: "white" }}
                                disabled={state.locale === LOCALES.ENGLISH}
                                onClick={() => setLanguage(LOCALES.ENGLISH)}
                            >
                                <img src={en} alt="US flag" />
                            </Button>
                            <Button
                                sx={{ color: "white" }}
                                disabled={state.locale === LOCALES.UKRAINIAN}
                                onClick={() => setLanguage(LOCALES.UKRAINIAN)}
                            >
                                <img src={uk} alt="Ukraine flag" />
                            </Button>
                        </Box>

                        <Box sx={{ display: { xs: "none", lg: "flex" } }}>
                            <Button>
                                <Link
                                    to={"/settings"}
                                    className={styles.link}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    <FormattedMessage id="navigation.settings" />
                                </Link>
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                {list()}
            </Drawer>
        </>
    );
};

export default Navigation;
