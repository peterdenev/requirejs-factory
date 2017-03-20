define([],function(){
    function AppEnv(logger){
        var version = '0.1';

        function setVersion(new_version){
            version = new_version;
        }

        function getVersion(){
            return version;
        }

        function logVersion(){
            logger.log(version);
        }

        return {
            logVersion: logVersion,
            getVersion: getVersion,
            setVersion: setVersion,
        }
    }

    return AppEnv;
})