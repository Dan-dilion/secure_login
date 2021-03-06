import { createTheme } from '@material-ui/core/styles';
import { lightBlue, indigo } from '@material-ui/core/colors';

// See the complete theme object here: https://material-ui.com/customization/default-theme/
export const theme = createTheme({
  palette: {                              // Find colour objects here: https://material-ui.com/customization/color/#color-palette
    // primary: {
    //   light: '#d1c4e9',
    //   main: '#673ab7',
    //   dark: '#311b92',
    //   contrastText: '#fff'
    // },
    primary: indigo,
    secondary: lightBlue,
    action: { hoverOpacity: 0.2 }
  },
  overrides: {
  //   MuiOutlinedInput: {
  //     root: {
  //       '& $notchedOutline': {              // For unfocused textbox outline
  //         borderColor: '#673ab7',           // deepPurple
  //         borderWidth: 1
  //       },
  //       '&:hover $notchedOutline': {        // For unfocused, hover over text box outline
  //         borderColor: '#8561c5',           // Lilac
  //         borderWidth: 2
  //       }
  //     }
  //   }
  }
});
