import { createMuiTheme } from '@material-ui/core/styles'

import overrides from './overrides';
import palette from './palette';
import props from './props';
import tranforms from './tranforms';
import typography from './typography';

export default createMuiTheme({
  typography,
  props,
  palette,
  overrides,
  tranforms
});