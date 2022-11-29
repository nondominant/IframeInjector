window.addEventListener("DOMContentLoaded", function() {
	document.addEventListener("click", function(e){
		if(e.target.matches("button[data-gateway_id]")){
			msg(e.target.dataset.gateway_id, e.target.dataset.options);
		}
	});
});


(()=>{
    let iframe = document.createElement("IFRAME");
    iframe.src = "http://localhost:8080/static/index.html";
    //iframe.src = "http://localhost:3000";
    iframe.id = "iframe_";
    //let wrapper = document.createElement('div');
    //wrapper.id = "wrapper";
    iframe.style = `
    position: fixed;
    box-sizing: border-box;
    top: 20%;
    left: 90%;
    height: 50px;
    width: 50px;
    border-radius: 25px;
    border: solid black 5px;
    transition: all ease 0.2s;
    `;
    //wrapper.setAttribute('onclick', 'console.log(hello)');
    //wrapper.append(iframe);
    document.body.append(iframe);
    setTimeout(() => {
	    window.addEventListener("message", (event) => {
		const shoppingCart = document.getElementById('iframe_');
	    	if(event.data === "open"){
			shoppingCart.style = `
			height: 100vh;
			width: 100vw;
			position: fixed;
			top: 0;
			left: 0;
			border: solid transparent 5px;
			background-color: rgba(255,255,255,0.1);
			box-shadow: 0 4px 30px rgba(0,0,0,0.1);
			backdrop-filter: blur(10.6px);
			transition: all ease 0.2s;
			`;
			//ack
			shoppingCart.contentWindow.postMessage(JSON.stringify({"eventType":"was_opened"}), shoppingCart.src);
		} else if (event.data === "close") {
			shoppingCart.style = `
			position: fixed;
			top: 20%;
			left: 90%;
			height: 50px;
			width: 50px;
			border-radius: 25px;
			border: solid black 1px;
			transition: all ease 0.2s;
			`;
			//ack
			shoppingCart.contentWindow.postMessage(JSON.stringify({"eventType":"was_closed"}), shoppingCart.src);
		} else if (event.data === "phantom") {
			console.log("getting public key");
			(async () => {
				let provider = getProvider();
				await provider.connect()
				const pbk = provider.publicKey;
				shoppingCart.contentWindow.postMessage(JSON.stringify(
					{
						"eventType": "provider", 
						"publicKey":pbk,
						"provider":provider
					}
				), shoppingCart.src);
		})();
		}
	    }, false);
    }, 1000);
})();
window.getProvider = function getProvider() {
	if ('phantom' in window) {
	const provider = window.phantom?.solana;
	if (provider?.isPhantom) {
	return provider;
	}
	}
	window.open('https://phantom.app/', '_blank');
}

window.msg = function msg(caller, options) {
	const shoppingCart = document.getElementById('iframe_');
		shoppingCart.contentWindow.postMessage(JSON.stringify({
			"eventType": "add_item",
			"item": caller, 
			"options": options
		}), shoppingCart.src);
	}

	//may not need bi-directional communication

window.initMessenger = function initMessenger(){
	}
