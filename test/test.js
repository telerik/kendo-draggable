import Feature from '../src/Feature';

describe('Feature', () => {
    let result;

    beforeEach(() => { /* test setup */ });

    it('should output some text', () => {
        expect(Feature()).toEqual('I am a feature in here, and I am a helper.');
    });
});
