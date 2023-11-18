import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private sesionKey = 'sesion';

  async setCurrentUser(user: any) {
    const userString = JSON.stringify(user);
    await Preferences.set({ key: this.sesionKey, value: userString });
  }

  async getCurrentUser(): Promise<any> {
    const { value } = await Preferences.get({ key: this.sesionKey });
    return value ? JSON.parse(value) : null;
  }

  async logout() {
    await Preferences.remove({ key: this.sesionKey });
    console.log('Cerrando sesión...');
  }
}