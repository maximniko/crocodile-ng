import {Injectable} from '@angular/core';
import WebApp from "@twa-dev/sdk";
import {CloudStorage, PopupParams, SecondaryButton} from "@twa-dev/types";
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class TwaService {

  constructor() {
    this.initTheme()
    if (!WebApp.isOrientationLocked) {
      WebApp.lockOrientation()
    }
  }

  getInitData(): string {
    return WebApp.initData
  }

  getUserLanguageCode(): string | undefined {
    return WebApp.initDataUnsafe.user?.language_code
  }

  setMainButton(params: BottomButtonParams, onClick: VoidFunction) {
    WebApp.MainButton.offClick(onClick)
    WebApp.MainButton.setParams(params)
    WebApp.MainButton.onClick(onClick)
  }

  setSecondaryButton(params: BottomButtonParams & { position?: SecondaryButton["position"] }, onClick: VoidFunction) {
    WebApp.SecondaryButton.offClick(onClick)
    WebApp.SecondaryButton.setParams(params)
    WebApp.SecondaryButton.onClick(onClick)
  }

  offMainButton(offClick: VoidFunction, show: boolean = false) {
    WebApp.MainButton.offClick(offClick)
    this.buttonVisible(WebApp.MainButton, show)
  }

  offSecondaryButton(offClick: VoidFunction, show: boolean = true) {
    WebApp.SecondaryButton.offClick(offClick)
    this.buttonVisible(WebApp.SecondaryButton, show)
  }

  offBackButton(cb: VoidFunction, show: boolean = true) {
    WebApp.BackButton.offClick(cb)
    this.buttonVisible(WebApp.BackButton, show)
  }

  visibleBackButton(show: boolean) {
    this.buttonVisible(WebApp.BackButton, show)
  }

  backButtonOnClick(cb: VoidFunction) {
    WebApp.BackButton.offClick(cb)
    this.visibleBackButton(true)
    WebApp.BackButton.onClick(cb)
  }

  showAlert(message: string, callback?: () => unknown) {
    if (environment.production) {
      WebApp.showAlert(message, callback)
    } else {
      console.log(message)
    }
  }

  showPopup(params: PopupParams, callback?: (id?: string) => unknown) {
    WebApp.showPopup(params, callback)
    // WebApp.showPopup({
    //   title: 'Title', // 64
    //   message: 'Some message', // 256
    //   buttons: [ // 1-3 items
    //     {id: 'link', type: 'default', text: 'Open ton.org'},
    //     {type: 'cancel'},
    //   ]
    // }, (btn) => {
    //   if (btn === 'link') {
    //     WebApp.openLink('https://ton.org/');
    //   }
    // })
  }

  visibleMainButton(show: boolean) {
    this.buttonVisible(WebApp.MainButton, show)
  }

  hapticFeedbackNotificationOccurred(type: "error" | "success" | "warning"): void {
    WebApp.HapticFeedback.notificationOccurred(type)
  }

  hapticFeedbackImpactOccurred(type: "light" | "medium" | "heavy" | "rigid" | "soft"): void {
    WebApp.HapticFeedback.impactOccurred(type)
  }

  mainButtonIsActive(isActive: boolean) {
    isActive ? WebApp.MainButton.enable() : WebApp.MainButton.disable()
    this.buttonVisible(WebApp.MainButton, isActive)
  }

  private buttonVisible(button: ButtonVisible, show: boolean) {
    show ? button.show() : button.hide()
  }

  openLink(link: string, options?: { try_instant_view: boolean }) {
    WebApp.openLink(link, options)
  }

  openTelegramLink(link: string) {
    WebApp.openTelegramLink(link)
  }

  expand(): void {
    WebApp.expand()
  }

  ready(): void {
    WebApp.ready()
    WebApp.disableVerticalSwipes()
  }

  initTheme(): void {
    if (WebApp.colorScheme) {
      document.documentElement.setAttribute('data-bs-theme', WebApp.colorScheme)
    }
    WebApp.onEvent("themeChanged", () => {
      document.documentElement.setAttribute('data-bs-theme', WebApp.colorScheme)
    })
  }

  close(): void {
    WebApp.close()
  }

  get cloudStorage(): CloudStorage {
    return WebApp.CloudStorage
  }

  requestFullscreen() {
    try {
      if (!WebApp.isFullscreen && typeof WebApp.requestFullscreen !== undefined) {
        WebApp.requestFullscreen()
      }
    } catch (e) {
      console.log(e)
    }
  }

  exitFullscreen() {
    try {
      if (WebApp.isFullscreen && typeof WebApp.exitFullscreen !== undefined) {
        WebApp.exitFullscreen()
      }
    } catch (e) {
      console.log(e)
    }
  }
}

type BottomButtonParams = {
  color?: string;
  text?: string;
  text_color?: string;
  is_active?: boolean;
  is_visible?: boolean;
  has_shine_effect?: boolean;
}

interface ButtonVisible {
  isVisible?: boolean;
  show: VoidFunction;
  hide: VoidFunction;
}

type CloudStorageKey = string
export const STORAGE_KEY_BALANCE: CloudStorageKey = '1'
export const STORAGE_KEY_BANK: CloudStorageKey = '2'
export const STORAGE_KEY_BANK_DEPOSIT: CloudStorageKey = '3'
export const STORAGE_KEY_TURBO: CloudStorageKey = '5'

export const STORAGE_MAX_VALUE_LENGTH = 4096

