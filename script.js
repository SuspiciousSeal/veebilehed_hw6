(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            date = new Date(date.getTime() + 1000);
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let meridian = " AM";

            if (h > 12) {
                h -= 12;
                meridian = " PM"
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + meridian;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let present = document.getElementById("v1");
        let contactless = document.getElementById("v2");
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        let courier = document.getElementsByName("courier");
        console.log(courier)
        if(linn.value === ""){
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        } else if(fname.value === ""){
            alert("Palun sisestage teie eesnimi");
            fname.focus();
            return;
        } else if(lname.value === ""){
            alert("Palun sisestage teie perekonnanimi");
            lname.focus();
            return;
        } else if(!(courier[0].checked || courier[1].checked)){
            alert("Palun valige tarnija");
            courier[0].focus();
            return;
        } else {
            let price = 0;
            if(present.checked) price += 5;
            if(contactless.checked) price += 1;
            // if(linn.value === "tln"){
            //     price += 0;
            //     e.innerHTML = "0,00 &euro;";
            // } else 
            if(linn.value === "trt"){
                price += 2.5;
            } else if(linn.value === "nrv"){
                price += 2.5;
            } else if(linn.value === "prn"){
                price += 3;
            }
            
            e.innerHTML = price.toFixed(2) + " &euro;";
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map, infobox;

function GetMap() {
    
    "use strict";

    

    let centerPoint = new Microsoft.Maps.Location(
            59.02000460684592, 26.39597307356246
        );
    let ut_loc = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let rand_loc = new Microsoft.Maps.Location(
            59.58504787331631, 26.170031637908657
        );
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    infobox.setMap(map);
    let pushpin = new Microsoft.Maps.Pushpin(ut_loc, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            //text: 'UT'
        });
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    map.entities.push(pushpin);
    let pushpin2 = new Microsoft.Maps.Pushpin(rand_loc, {
            title: 'Mustoja rand',
            subTitle: 'Hea koht 2',
            //text: 'UT'
        });
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin2);

}
function pushpinClicked(e) {
    //Set the infobox options with the metadata of the pushpin.
    infobox.setOptions({
        location: e.target.getLocation(),
        title: e.target.getTitle(),
        description: e.target.getSubTitle(),
        visible: true
    });
}
// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

