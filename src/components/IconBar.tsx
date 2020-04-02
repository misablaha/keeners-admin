import React, { FC, ComponentType } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

interface Props {
  bgColor: string;
  Icon: ComponentType<SvgIconProps>;
}

const useStyles = makeStyles({
  card: {
    // float: 'left',
    // margin: '-20px 20px 0 15px',
    // zIndex: 100,
    // borderRadius: 3,
  },
  icon: {
    // float: 'right',
    width: 40,
    height: 40,
    padding: 14,
    color: '#fff',
  },
});

const IconBar: FC<Props> = ({ Icon, bgColor }) => {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: bgColor }}>
      <Icon className={classes.icon} />
    </div>
  );
};

export default IconBar;
