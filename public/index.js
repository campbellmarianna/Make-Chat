// public/index.js
// When the DOM is loaded create the socket connection
function ready() {
    const socket = io.connect();
}
document.addEventListener("DOMContentLoaded", ready);
