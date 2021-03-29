export default function(context, inject){
  /*Notes: Calls addScript() right when the project is booted up
   * inject("maps",{showMap})
   * injecting to the vue scope so any component can use it
   * maps is the name
   * showMap is what we are injecting
  */
    let isLoaded = false;
    let waiting = [];
    addScript();
    inject("maps",{
        showMap,
        makeAutoComplete
    })

    function addScript(){
      //Note: addScript() is a function that adds a script tags. Then appends it to the head of the document.
      /*Example: <script src="https://maps.googleapis.com/..." async>
      /*Notes: 
       * Google maps needs an still needs a way to tap into the the local variables that we have.
       * window.initGoogleMaps is google's API that is asigned to our local variables initGoogleMaps! 
      */
        const script = document.createElement("script")
        script.src =  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDktFtQpoBrueyMxtQphlntzRA1iegjGzc&libraries=places&callback=initGoogleMaps"
        script.async = true
        window.initGoogleMaps = initGoogleMaps
        document.head.appendChild(script)
    }
    
    function initGoogleMaps(){
      //Note: initGoogleMaps() holds all of our local variables, in this case the canvas, lat, lng are set to their own objects.
        isLoaded = true
        waiting.forEach((item)=>{
          if(typeof item.fn === "function"){
            item.fn(...item.arguments)
          }
        })
        waiting = []
    }
    function makeAutoComplete(input){
      if(!isLoaded){
        waiting.push({fn: makeAutoComplete,arguments})
        return 
      }
      const autoComplete = new window.google.maps.places.Autocomplete(input, {type: ['(cities)']})
      autoComplete.addListener("place_changed", ()=>{
        const place = autoComplete.getPlace()
        input.dispatchEvent(new CustomEvent("changed",{detail: place}))
      })
    }
    function showMap(canvas, lat, lng){
      /* Notes: showMap will call for google map when the api is loaded and ready.
       * Else, mapWaiting = canvas, lat, lng, storing the information until google maps is ready to receive the information.
      */
        if(!isLoaded){
          waiting.push({
            fn: showMap,
            arguments
          })
          return
        }
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