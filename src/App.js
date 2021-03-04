import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { Provider } from 'react-redux';
import store from './redux/actions/store';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;
