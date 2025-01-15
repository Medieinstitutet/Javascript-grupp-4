import { describe, expect, it } from 'vitest';
import { makeNewTodo } from './new-todo.js';

describe('todo object validation', () => {
    it('Function returns new todo', () => {
        // Arrange ...
        const todoText = 'study javascript';

        // Act ...
        const result = makeNewTodo(todoText);

        // Assert ...
        expect(typeof result.createdAt).toBe('string');
        expect(typeof result.done).toBe('boolean');
        expect(typeof result.id).toBe('number');
        expect(typeof result.text).toBe('string');
    });

    it('Passing in any arguments except a string throws an error', () => {
        // Arrange ...
        function expectError() {
            makeNewTodo({}); // passing in an object into the function
        };
        
        // Act and assert ...
        expect(expectError).toThrowError(
            /^Function argument is not a string$/,
        );
    });
})