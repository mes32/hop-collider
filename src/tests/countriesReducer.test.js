import countriesReducer from '../redux/reducers/countriesReducer';

test('Countries should be an empty array by default.', () => {
    const returnState = countriesReducer(undefined, { type: undefined });
    expect(Array.isArray(returnState)).toBe(true);
    expect(returnState.length).toBe(0);
    expect(returnState).toEqual([]);
});

test('Countries should SET_COUNTRIES to payload.', () => {
    const countries = ['country1', 'country2', 'country3'];
    const returnState = countriesReducer(undefined, { type: 'SET_COUNTRIES', payload: countries });
    expect(Array.isArray(returnState)).toBe(true);
    expect(returnState.length).toBe(countries.length);
    expect(returnState).toBe(countries);
});

test('Countries should IGNORE actions unknown type.', () => {
    const countries = ['country1', 'country2', 'country3'];
    const returnState = countriesReducer(countries, { type: 'IGNORE_ME', payload: [] });
    expect(Array.isArray(returnState)).toBe(true);
    expect(returnState.length).toBe(countries.length);
    expect(returnState).toBe(countries);
});