import {APIRequestContext,expect} from '@playwright/test';

export class APIUtils{

    constructor(private request: APIRequestContext){}

    async get(url:string, params?:Record<string, any>,headers?:Record<string, any>){

        const res= await this.request.get(url,{params,headers});
        expect(res.status()).toBe(200);
        return res.json();
    }

    async post(url:string, data:Object,headers?:Record<string, any>){

        const res= await this.request.post(url,{data,headers});
        expect(res.status()).toBe(201);
        return res.json();  
    
    }

}

