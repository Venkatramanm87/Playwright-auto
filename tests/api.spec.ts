


import {test,expect} from '@playwright/test'

import {APIUtils} from '../utils/apiutils'

test('API Tests', async ({request})=>{

    const apiUtils = new APIUtils(request);
    await apiUtils.get('api/users',{'pages':2},{'Authorization':'Bearer token'});

    const newUser = await   apiUtils.post('/api/users', { name: 'Venkat', job: 'QA' });


});