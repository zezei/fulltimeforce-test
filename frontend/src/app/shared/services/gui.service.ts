import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class GuiService {
  constructor(private toastCtrl: ToastController) {}

  async alertToast(message: string, duration: number) {
    const alert = await this.toastCtrl.create({
      message,
      duration,
    });
    await alert.present();
  }
}
