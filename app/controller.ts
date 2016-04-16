import AsyncLoaderService from './async-loader-service.ts';

interface Window {
    $zopim: any;
}

export default class AsyncController {
    private zopimId: string = 'zopim';
    private zopimLibraryUrl: string = '//v2.zopim.com/?' + this.zopimId;
    private zopimLocalStorageKey: string = '__zlcstore';
    private zopimLocalStorageObject: any = {};
    
    constructor(private asyncLoaderService: AsyncLoaderService){
        this.zopimLocalStorageObject[this.zopimLocalStorageKey] = {
            settings:{
                chat_window: {
                    'mobile_mode$string': 'overlay'
                }
            }
        };
    }
    
    public loadZopim = (setLocalstorage: boolean) => {
        
        if(setLocalstorage){
            localStorage.setItem(this.zopimLocalStorageKey, this.zopimLocalStorageObject);
        }
        else {
            localStorage.clear();
        }
         
        this.asyncLoaderService
            .loadLibrary('zopim', this.zopimLibraryUrl)
            .then((zopimLibrary: any) => {
                let chat: any;
                // initializes $zopim and sets the baseline properties for the chat window
                window.$zopim(() => {
                    chat = window.$zopim.livechat();                    
                    //set up whatever you want                    
                    chat.window.show();
                 });
            });
    }
    
}
angular
    .module('zopim-async')
    .controller('asyncController', AsyncController);