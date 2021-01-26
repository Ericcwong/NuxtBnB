export default function(context, inject){
  /*Notes: Calls addScript() right when the project is booted up
   * inject("maps",{showMap})
   * injecting to the vue scope so any component can use it
   * maps is the name
   * showMap is what we are injecting
  */
    let mapLoaded = false;
    let mapWaiting = null
    addScript();
    inject("maps",{
        showMap
    })

    function addScript(){
      //Note: addScript() is a function that adds a script tags. Then appends it to the head of the document.
      /*Example: <script src="https://maps.googleapis.com/..." async>
      /*Notes: 
       * Google maps needs an still needs a way to tap into the the local variables that we have.
       * window.initMap is google's API that is asigned to our local variables initMap! 
      */
        const script = document.createElement("script")
        script.src =  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDktFtQpoBrueyMxtQphlntzRA1iegjGzc&libraries=places&callback=initMap"
        script.async = true
        window.initMap = initMap
        document.head.appendChild(script)
    }
    
    function initMap(){
      //Note: initMap() holds all of our local variables, in this case the canvas, lat, lng are set to their own objects.
        mapLoaded = true
        if(mapWaiting){
            const { canvas, lat, lng } = mapWaiting;
            renderMap(canvas, lat, lng)
            mapWaiting = null
        }
    }
    function showMap(canvas, lat, lng){
      /* Notes: showMap will call for google map when the api is loaded and ready.
       * Else, mapWaiting = canvas, lat, lng, storing the information until google maps is ready to receive the information.
      */
        if(mapLoaded) renderMap(canvas, lat, lng)
        else mapWaiting = {canvas, lat, lng}

    }
    function renderMap(canvas, lat, lng) {
        /*Notes: This mapOption zoom is set to 18 and 20 is the farthest zoom back.
         * center is calling the data from the json file. Saving it to mapOptions.
         * Map is not declared but is still used via ref="map" in the template section.
         * Map also displays the map into the DOM.
         * setMap() function adds the red marker to the map.
        */
        const mapOptions = {
          zoom: 18,
          center: new window.google.maps.LatLng(
            lat,
            lng
          ),
          disableDefaultUI: true,
          zoomControl: true,
        };
        const map = new window.google.maps.Map(canvas, mapOptions);
        const position = new window.google.maps.LatLng(
          lat,
          lng
        );
        const marker = new window.google.maps.Marker({ position });
        marker.setMap(map);
      }
}
