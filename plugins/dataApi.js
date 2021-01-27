export default function(context, inject){
    const appId = "A8PJ2XOCEQ";
    const apiKey = "bc540fe9a0ea7baf765bafd848268a48";
    const headers = {
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": appId
    }
    inject("dataApi", {
        getHome
    })
    async function getHome(homeId){
        try{

       return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {headers}))
        }
       catch(error){
        return getErrorResponse(error)
       }
    }

    async function unWrap(response){
        const json = await response.json()
        const { okay, status, statusText } = response
        return {
            json,
            okay,
            status,
            statusText
        }
    }
    function getErrorResponse(error){
        return {
            okay: false,
            status: 500,
            statusText: error.message,
            json:{}
        }
    }
}