import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/actions/store';
import 'src/views/styles/app.css';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
      <ToastContainer autoClose={2000} />
    </Provider>
  );
};

export default App;
