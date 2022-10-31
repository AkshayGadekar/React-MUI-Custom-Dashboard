import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(41 176 66)',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiLinearProgress: {
      variants: [
        {
          props: { id: "topProgressBar" },
          style: {
            visibility: "hidden",
            position: "fixed",
            width: "100%",
            zIndex: 2000
          }
        }
      ]
    }
  }
});

export default theme;
