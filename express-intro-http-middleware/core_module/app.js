const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("name called", () => {
    console.log("Listener 1")
})
eventEmitter.on("name called", () => {
    console.log("Listener 2")
})

eventEmitter.emit("name called",)