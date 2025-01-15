
function makeNewTodo(todoText) {
  // If argument is not a string, throw error.
  if (typeof todoText !== 'string') {
    throw new Error('Function argument is not a string')
  }
  // returns a new todoObject.
  const newTodo = {
    id: Date.now(),
    text: todoText,
    done: false,
    createdAt: new Date().toISOString(),
  };

  return newTodo;
};
// namngiven export
  export { makeNewTodo };