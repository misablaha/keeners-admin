import React, { FC } from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Demand, DemandStatus } from '../../types/records';
import { FieldProps } from '../../types/core';
import { PropTypes } from '@material-ui/core';

const themeNew = createMuiTheme({
  palette: {
    primary: {
      main: '#c22b02',
    },
  },
});
const themeSubmitted = createMuiTheme({
  palette: {
    primary: {
      main: '#f9b700',
    },
  },
});
const themeDone = createMuiTheme({
  palette: {
    primary: {
      main: '#58770b',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
}));

const DemandChip: FC<{ record: Pick<Demand, 'status' | 'service'> } & ChipProps> = ({ record, ...rest }) => {
  const classes = useStyles();

  if (!record) {
    return null;
  }

  let theme = themeNew;
  let color: PropTypes.Color = 'primary';
  let icon: React.ReactElement | undefined;
  let deleteIcon: React.ReactElement | undefined;

  switch (record.status) {
    case DemandStatus.NEW: {
      theme = themeNew;
      icon = <NewReleasesIcon />;
      deleteIcon = <PlayCircleOutlineIcon />;
      break;
    }
    case DemandStatus.SUBMITTED: {
      theme = themeSubmitted;
      icon = <PlayCircleFilledIcon />;
      deleteIcon = <CheckCircleOutlineIcon />;
      break;
    }

    case DemandStatus.DONE: {
      theme = themeDone;
      icon = <CheckCircleIcon />;
      break;
    }

    case DemandStatus.CANCELED: {
      theme = themeDone;
      color = 'inherit';
      icon = <HighlightOffIcon />;
      break;
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Chip
        {...rest}
        classes={classes}
        color={color}
        variant={'default'}
        icon={icon}
        deleteIcon={deleteIcon}
        label={record.service.name}
      />
    </MuiThemeProvider>
  );
};

export default DemandChip;
