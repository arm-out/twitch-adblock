console.log("{a}: injected");

/** @type {"ad" | "no-add"} */
let state = "no-ad";

window.setInterval(() => {
	/** @type {HTMLVideoElement} */
	const mainVideo = document.querySelector(".video-ref > video");
	/** @type {HTMLVideoElement} */
	const previewVideo = document.querySelector(
		".pbyp-player-instance > video"
	);

	if (!mainVideo) {
		console.log("{a}: could not find video elements");
		return;
	}

	const adPlaying = previewVideo && !previewVideo.paused;

	if (adPlaying && state === "no-ad") {
		state = "ad";
		console.log("{a}: ad playing");
		previewVideo.muted = false;
		previewVideo.volume = mainVideo.volume;
		mainVideo.muted = true;
		previewVideo.controls = true;

		const mainTransform = `scale(0)`;
		mainVideo.style.transform = mainTransform;
		mainVideo.style.zIndex = 0;

		if (document.fullscreenElement) {
			// Main vid playing in fullscreen
			console.log("{a}: main vid playing in fullscreen");

			// Exit current fullscreen ad
			if (document.exitFullscreen) document.exitFullscreen();
			else if (document.mozCancelFullScreen)
				document.mozCancelFullScreen();
			else if (document.webkitCancelFullScreen)
				document.webkitCancelFullScreen();
			else if (document.msExitFullscreen) document.msExitFullscreen();

			// Fullscreen preview vid
			if (previewVideo.requestFullscreen)
				previewVideo.requestFullscreen();
			else if (previewVideo.mozRequestFullScreen)
				previewVideo.mozRequestFullScreen();
			else if (previewVideo.webkitRequestFullscreen)
				previewVideo.webkitRequestFullscreen();
			else if (previewVideo.msRequestFullscreen)
				previewVideo.msRequestFullscreen();
		}
	} else if (!adPlaying && state === "ad") {
		state = "no-ad";
		console.log("{a}: ad finished");
		previewVideo.muted = true;
		mainVideo.muted = false;
		previewVideo.style.removeProperty("transform");
		mainVideo.style.removeProperty("transform");
		mainVideo.style.removeProperty("z-index");

		if (document.fullscreenElement) {
			// Ad vid playing in fullscreen
			console.log("{a}: minimizing preview");
			if (document.exitFullscreen) document.exitFullscreen();
			else if (document.mozCancelFullScreen)
				document.mozCancelFullScreen();
			else if (document.webkitCancelFullScreen)
				document.webkitCancelFullScreen();
			else if (document.msExitFullscreen) document.msExitFullscreen();

			// Fullscreen main vid
			if (mainVideo.requestFullscreen) mainVideo.requestFullscreen();
			else if (mainVideo.mozRequestFullScreen)
				mainVideo.mozRequestFullScreen();
			else if (mainVideo.webkitRequestFullscreen)
				mainVideo.webkitRequestFullscreen();
			else if (mainVideo.msRequestFullscreen)
				mainVideo.msRequestFullscreen();
		}
	}
}, 500);
