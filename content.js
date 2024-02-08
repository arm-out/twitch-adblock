function injectScript(url) {
	const target = document.head || document.documentElement;
	const script = document.createElement("script");
	script.setAttribute("type", "module");
	script.setAttribute("src", chrome.runtime.getURL(url));
	target.appendChild(script);
}

injectScript("inject.js");
