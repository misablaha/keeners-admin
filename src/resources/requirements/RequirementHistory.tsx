import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import HotTubIcon from '@material-ui/icons/HotTub';
import { Requirement } from '../../types/records';

const useStyles = makeStyles(theme => ({
  cell: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  icon: {
    width: 60,
    height: 60,
    padding: 14,
  },
}));

const RequirementHistory: FC<{ record: Requirement }> = ({ record }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Historie požadavku" subheader={record.recipient.name} />
      <Divider />
      <Typography align={'center'} color={'secondary'}>
        <HotTubIcon color={'disabled'} className={classes.icon}/>
      </Typography>
    </Card>
  );
};

export default RequirementHistory;
