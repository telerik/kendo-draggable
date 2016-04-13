import Feature from '../src/Feature';

import { withRoot } from 'e2e-utils';

describe('Feature', () => {

    beforeEach(() => { /* test setup */ });

    it('should output some text', withRoot((root) => {
        root.html(Feature());
        root.should.contain('I am a feature in here, and I am a helper.');
    }));
});
