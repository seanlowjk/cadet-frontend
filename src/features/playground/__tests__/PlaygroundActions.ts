import { CHANGE_QUERY_STRING, GENERATE_LZ_STRING, TOGGLE_USING_SUBST } from '../PlaygroundTypes';
import { changeQueryString, generateLzString, toggleUsingSubst } from '../PlaygroundActions';

test('generateLzString generates correct action object', () => {
  const action = generateLzString();
  expect(action).toEqual({
    type: GENERATE_LZ_STRING
  });
});

test('changeQueryString generates correct action object', () => {
  const queryString = 'test-query-string';
  const action = changeQueryString(queryString);
  expect(action).toEqual({
    type: CHANGE_QUERY_STRING,
    payload: queryString
  });
});

test('toggleUsingSubst generates correct action object', () => {
  const action = toggleUsingSubst(true);
  expect(action).toEqual({
    type: TOGGLE_USING_SUBST,
    payload: true
  });
});
