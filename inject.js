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

	console.log("{a}: mainVideo", mainVideo);
	console.log("{a}: previewVideo", previewVideo);

	const adPlaying = previewVideo && !previewVideo.paused;
	console.log("{a}: adPlaying", adPlaying);

	if (adPlaying && state === "no-ad") {
		state = "ad";
		console.log("{a}: ad playing");
		previewVideo.muted = false;
		previewVideo.volume = mainVideo.volume;
		mainVideo.muted = true;

		previewVideo.controls = true;

		const mainBox = mainVideo.getBoundingClientRect();
		const previewBox = previewVideo.getBoundingClientRect();
		const scale = mainBox.width / previewBox.width;

		// const previewTransform = `translate(-100px, 0px)`;
		// previewVideo.style.transform = previewTransform;
		// previewVideo.style.zIndex = 2147483646;

		const mainTransform = `scale(0)`;
		mainVideo.style.transform = mainTransform;
		mainVideo.style.zIndex = 0;
	} else if (!adPlaying && state === "ad") {
		state = "no-ad";
		console.log("{a}: ad finished");
		previewVideo.muted = true;
		mainVideo.muted = false;
		previewVideo.style.removeProperty("transform");
		mainVideo.style.removeProperty("transform");
		mainVideo.style.removeProperty("z-index");
	}
}, 500);
