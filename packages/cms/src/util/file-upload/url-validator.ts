export default class UrlValidator {

    static validate(type, url){

        if(url)
            return true
        else
            return false

        // if(type=='image')
        //     return(url.match(/\.(jpeg|jpg|gif|png)$/) != null)
    }
    
}