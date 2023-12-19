export class ClockController {
    host;

    currentTime = new Date();
    timeout = 1000;
    _timerID;

    constructor(host, timeout) {
        (this.host = host).addController(this)

        this.timeout = timeout ?? this.timeout;
    }

    hostConnected() {
        // Start a timer when the host is connected
        this._timerID = setInterval(() => {
            this.currentTime = new Date();

            // Update the host with the new value
            this.host.requestUpdate();

        }, this.timeout);
    }

    hostDisconnected() {
        // Stop the timer when the host is disconnected
        clearInterval(this._timerID);
        this._timerID = undefined;
    }


}
