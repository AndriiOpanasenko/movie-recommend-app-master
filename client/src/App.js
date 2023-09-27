import { CssBaseline, Container, Box } from "@mui/material";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import { Home, Settings, Recommend } from "./pages";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, from } from '@apollo/client';
import { useContext } from "react";
import { AppContext } from "./providers/AppContext";
import I18nProvider from "./providers/i18n";  

function App() {
  const { state } = useContext(AppContext)
  const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" })
  const localeMiddleware = new ApolloLink((operation, forward) => {
    const customHeaders = operation.getContext().hasOwnProperty("headers") ? operation.getContext().headers : {};

    operation.setContext({
      headers: {
        ...customHeaders,
        locale: state.locale
      }
    });
    return forward(operation);
  });

  const client = new ApolloClient({
    link: from([localeMiddleware, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true
  });


  return (
    <I18nProvider locale={state.locale}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Navigation />

        <Box sx={{
          backgroundColor: (theme) => theme.palette.grey[100]
        }}>
          <Container maxWidth="xxl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/recommend" element={<Recommend />} />
            </Routes>
          </Container>
        </Box>
      </ApolloProvider>
    </I18nProvider>
  );
}

export default App;
