const buses = [ 
    { name: "Aayappas", time: 1602 }, 
    { name: "Bini", time: 1608 }, 
    { name: "DivyaVishunu", time: 1612 }, 
    { name: "Mariya", time: 1618 }, 
    { name: "Jolly1", time: 1625 }, 
    { name: "Jolly2", time: 1630 }, 
    { name: "Zion", time: 1640 }, 
    { name: "Chirayath", time: 1645 }, 
    { name: "Lakshmi", time: 1650 }, 
    { name: "Chirayath", time: 1655 }, 
    { name: "Aanandha", time: 1705 }, 
    { name: "Bincy", time: 1710 }, 
];

let nextBusTime = getNextBusTime(getCurrentTime());

update();
renderBuses(getCurrentTime());
setInterval(update, 500);

function renderBuses(currentTime) {
    let content = `<ul id="busList">`;

    for(const [i, bus] of buses.entries()) {

        const formattedBusTime = formatTime(bus.time);

        if(nextBusTime == bus.time) {
            content += `<li class="next"> ${formattedBusTime} : ${bus.name} </li>`
        } else if(currentTime < bus.time) {
            content += `<li class="future"> ${formattedBusTime} : ${bus.name} </li>`
        } else {
            content += `<li class="past"> ${formattedBusTime} : ${bus.name} </li>`
        }
    }

    content += `</ul>`;

    document.getElementById("busDetails").innerHTML = content;
    
}

function formatTime(hhmm) {
    const hh =  Math.floor(hhmm / 100);
    const mm = hhmm % 100;

    return `${(hh > 12) ? hh -12 : hh}:${String(mm).padStart(2, '0')} ${(hh > 12) ? "PM" : "AM"}`
}

function getCurrentTime() {
    const date = new Date();

    return (String(date.getHours()).padStart(2, '0') + String(date.getMinutes()).padStart(2, '0'));
    // return 1632;
}

function getNextBusTime(currentTime) {
    const bus = buses.find(bus => bus.time > currentTime);

    if(bus) {
        return bus.time;
    } else {
        return buses[0].time;
    }
}

function updateTimer(currentTime) {
    const waitingHr = Math.floor(nextBusTime/100 - currentTime/100);    
    const waitingMin = Math.abs(nextBusTime%100 - currentTime%100);    
    
    document.getElementById("timer").innerText = `Next bus in ${waitingHr} hrs ${String(waitingMin).padStart(2, '0')} mins`;
}

function update() {
    const currentTime = getCurrentTime();

    if(currentTime > nextBusTime) {
        nextBusTime = getNextBusTime(currentTime);
        renderBuses(currentTime);
    }
    updateTimer(currentTime);
}