import {Injectable} from '@angular/core';
import TelegramAnalytics from '@telegram-apps/analytics'
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AnalyticsService {
    init() {
        return TelegramAnalytics.init({
            token: 'eyJhcHBfbmFtZSI6Ik1yRGltYSIsImFwcF91cmwiOiJodHRwczovL3QubWUvY3JvYnJvX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL3QubWUvY3JvYnJvX2JvdD9wcm9maWxlIn0=!7ZdBQ21fDF7CW9gOjdMbBJRngizmYSte3XyvyR1bEKg=',
            appName: 'Crocodile',
            env: environment.production ? 'PROD' : 'STG',
        });
    }
}
