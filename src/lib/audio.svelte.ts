import { browser } from '$app/environment';
import { loadJSON, saveJSON } from './storage';

/** Tiny Web Audio sound engine. The context is created lazily on first use so
 * browsers don't leave it suspended before a user gesture. */
export class AudioManager {
	declare ctx: AudioContext | null;
	muted = $state(false);

	/** Restore the saved mute preference. */
	loadSettings() {
		const settings = loadJSON<{ muted: boolean }>('txtiq_settings');
		if (settings) this.muted = !!settings.muted;
	}

	toggleMute() {
		this.muted = !this.muted;
		saveJSON('txtiq_settings', { muted: this.muted });
	}

	init() {
		if (browser && !this.ctx) {
			const Ctx =
				window.AudioContext ??
				(window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
			this.ctx = new Ctx();
		}
		// The context starts suspended until a user gesture resumes it
		this.ctx?.resume();
	}

	play(frequency: number, duration: number) {
		if (!this.ctx || this.muted) return;
		this.ctx.resume();
		const oscillator = this.ctx.createOscillator();
		const gainNode = this.ctx.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(this.ctx.destination);
		oscillator.frequency.value = frequency;
		oscillator.type = 'sine';
		gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
		oscillator.start(this.ctx.currentTime);
		oscillator.stop(this.ctx.currentTime + duration);
	}

	correct() {
		this.play(800, 0.2);
	}

	wrong() {
		this.play(200, 0.3);
	}

	hint() {
		this.play(500, 0.2);
	}

	achievement() {
		this.play(600, 0.15);
		setTimeout(() => this.play(800, 0.15), 100);
	}
}

export const audio = new AudioManager();
