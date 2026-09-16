let buses = [];

let nextBusTime;

fetchBus();

function fetchBus() {
    fetch(`./data/busList.json`)
    .then(response => response.json())
    .then(data => {
        buses = data;
        nextBusTime = getNextBusTime(getCurrentTime());
        update();
        renderBuses(getCurrentTime());
        setInterval(update, 1000);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });
}

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
    const waitingHr = Math.floor(nextBusTime/100 - currentTime/100 + 24) % 24;    
    const waitingMin = ((nextBusTime%100 - currentTime%100 + 60) % 60) - 1;
    const waitingSec = 59 - (new Date().getSeconds());
    
    if(waitingHr == 0) {
        document.getElementById("timer").innerText = `Next bus in ${String(waitingMin).padStart(2, '0')} mins ${String(waitingSec).padStart(2, '0')} secs`;
    } else {
        document.getElementById("timer").innerText = `Next bus in ${waitingHr} hrs ${String(waitingMin).padStart(2, '0')} mins ${String(waitingSec).padStart(2, '0')} secs`;
    }
}
function update() {
    const currentTime = getCurrentTime();

    if(currentTime > nextBusTime) {
        nextBusTime = getNextBusTime(currentTime);
        renderBuses(currentTime);
    }
    updateTimer(currentTime);
}