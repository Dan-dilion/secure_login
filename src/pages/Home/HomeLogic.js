import useStyles from './HomeStyle.js';
import { useMediaQuery, useTheme } from '@material-ui/core';

const HomeLogic = ({ ...props }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm), { noSsr: true });

  return {
    classes,
    isSmall
  };
};

export default HomeLogic;
