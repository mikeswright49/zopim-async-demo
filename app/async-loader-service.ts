export default class AsyncLoaderService {

    static $inject: Array<string> = ['$http'];
    constructor(private $http: any, private $q, private $timeout) { }


    public loadLibrary = (id:string, url: string): any => {
        // using document here is more reliable

        
        var libraryDeferred = this.$q.defer();
        
        if(this.checkForExisting(id)){
            libraryDeferred.resolve(document.getElementById(id));
        }
        else{
            var script: any = document.createElement('script');
            script.id = id;
            script.src = url;
            document.body.appendChild(script);
            script.onload = () => {
                this.$timeout(() => {
                    libraryDeferred.resolve(script);
                });
            }
       }
       return libraryDeferred.promise();
    }
    
    
    public checkForExisting = (id: string): boolean => {
        return !!document.getElementById(id);
    }
}
angular
    .module('zopim-async')
    .service('asyncLoaderService', AsyncLoaderService);