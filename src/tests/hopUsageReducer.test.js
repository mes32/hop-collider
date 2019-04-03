import hopUsage from '../redux/reducers/hopUsageReducer';

test('Hop usage should be an empty array by default.', () => {
    const returnState = hopUsage(undefined, { type: undefined });
    
    expect(Array.isArray(returnState)).toBe(true);
    expect(returnState.length).toBe(0);
    expect(returnState).toEqual([]);
});

test('Hop usage should SET_HOP_USAGE to payload.', () => {
    const usageArray = ['usage1', 'usage2', 'usage3'];
    const returnState = hopUsage(undefined, { type: 'SET_HOP_USAGE', payload: usageArray });

    expect(Array.isArray(returnState)).toBe(true);
    expect(returnState.length).toBe(usageArray.length);
    expect(returnState).toBe(usageArray);
});

test('Hop usage should IGNORE actions unknown type.', () => {
    const usageArray = ['usage1', 'usage2', 'usage3'];
    const returnState = hopUsage(usageArray, { type: 'IGNORE_ME', payload: [] });

    expect(Array.isArray(returnState)).toBe(true);
    expect(returnState.length).toBe(usageArray.length);
    expect(returnState).toBe(usageArray);
});