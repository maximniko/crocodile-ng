import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SoundService {
  private readonly sounds: HTMLAudioElement[]
  withSound = true
  private playNow: number|undefined

  constructor() {
    this.sounds = AUDIO_ITEMS.map<HTMLAudioElement>(
      (fileName, index) => {
        const audio = new Audio(AUDIO_PATH + fileName)
        audio.addEventListener('pause', (e: Event) => {
          audio.fastSeek(0)
          this.playNow = undefined
        })
        audio.addEventListener('ended', (e: Event) => {
          this.playNow = undefined
        })
        audio.addEventListener('play', (e: Event) => {
          this.playNow = index
        })
        return audio
      }
    )
  }

  playOn() {
    this.play(0)
  }

  playOff() {
    this.play(1)
  }

  private play(index: number): void {
    if (!this.withSound) {
      return
    }

    if (this.playNow) {
      this.sounds[this.playNow].pause()
    }

    this.sounds[index].play()
  }
}

const AUDIO_PATH = 'assets/sound/'
const AUDIO_ITEMS = [
  'on.mp3',
  'off.mp3'
]
