export default (attribute, timing, style) => {
  
  if (!attribute) return {};

  return {
    '-webkit-transition': `${attribute} ${timing ? timing : '.1s'} ${style ? style : ''}`,
    '-moz-transition': `${attribute} ${timing ? timing : '.1s'} ${style ? style : ''}`,
    '-o-transition': `${attribute} ${timing ? timing : '.1s'} ${style ? style : ''}`,
    'transition': `${attribute} ${timing ? timing : '.1s'} ${style ? style : ''}`,
  };

};