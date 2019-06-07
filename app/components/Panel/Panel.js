import React, { PureComponent } from 'react';
import classNames from "classnames";
import { withStyles } from '@material-ui/core';

import Input from '../Input';
import { Button } from '../Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#535353',
    padding: theme.spacing(2)
  },
  title: {
    color: '#dddddd',
    marginBottom: theme.spacing(2)
  },
  sizeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  chainContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '2.5px solid #7d7d7d',
    width: 20,
    height: 40,
    borderRightWidth: 0,
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5)
  },
  chainBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -7.5,
    height: '70%',
    width: 15,
    backgroundColor: '#535353',
    borderRadius: 4
  },
  chainBackgroundSelected: {
    backgroundColor: '#383838'
  },
  chainIcon: {
    width: '50%',
    cursor: 'pointer'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

class Panel extends PureComponent {

  state = {
    proportion: true
  };

  onProportionClick = () => {
    this.setState({
      proportion: !this.state.proportion
    });
  }

  render() {
    const { proportion } = this.state;
    console.log("TCL: Panel -> render -> proportion", proportion)
    const { classes } = this.props;
    return (
      <div className={classes.root}>

        <div className={classes.title}>
          Image Size: 6M
        </div>

        <div className={classes.sizeContainer}>
          <div className={classes.chainContainer}>
            <div 
              className={classNames(
                classes.chainBackground,
                proportion && classes.chainBackgroundSelected
              )}
            >
              <img
                className={classes.chainIcon} 
                src='images/icons/chain.png'
                onClick={this.onProportionClick}
              />
            </div>
          </div>

          <div>
            <Input 
              title='Width:'
              rightLabel='Pixels'
            />
            <br/>
            <Input 
              title='Height:'
              rightLabel='Pixels'
            />
          </div>
        </div>

        <div className={classes.buttonContainer}>
          <Button title='Cancel' dim/>
          &nbsp;&nbsp;&nbsp;
          <Button title='Save'/>
        </div>
      </div>
    )
  }
}

const withStylePanel = withStyles(styles)(Panel);

export default withStylePanel;
