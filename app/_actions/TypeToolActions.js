export const TYPE_TOOL_ACTION_TYPES = {
  changeTypeToolReducer: 'changeTypeToolReducer',
};

// ----------------------------------------

export const changeTypeToolReducer = args => ({
  type: TYPE_TOOL_ACTION_TYPES.changeTypeToolReducer,
  payload: args
});
