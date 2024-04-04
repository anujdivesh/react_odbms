
export function mayFlyer(map, site) {
    //fly
    var latlng;
    if (site === "ASM"){
    latlng = [[-14.359765625, -170.820507813], [-14.257421875, -170.568115234]];
    }
    if (site === "AUS"){
    latlng = [[-12.4359375, 123.572460938], [-12.4239257813, 123.595214844]];
    }
    if (site === "COK"){
    latlng = [-5.669055, 176.110211];
    }
    if (site === "FSM"){
    latlng = [-10.788939, 179.472849];
    }
    if (site === "Funafuti"){
    latlng = [-8.518118, 179.118515];
    }

    if (site === "Fongafale"){
    latlng = [-8.521147, 179.196198];
    }
    if (site === "Niutao"){
    latlng = [-6.10717, 177.34215];
    }
    if (site === "Nui"){
    latlng = [-7.23247, 177.15205];
    }
    if (site === "Nukufetau"){
    latlng = [-8.017857, 178.362114];
    }
    if (site === "Nukulaelae"){
    latlng = [-9.38412, 179.84559];
    }
    if (site === "Vaitupu"){
    latlng = [-7.4742, 178.67456];
    }
    if (site === "Tuvalu"){
    latlng = [-8, 178.3053];
    }
    return latlng;
    }
    