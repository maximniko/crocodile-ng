import {Injectable} from '@angular/core';
import TelegramAnalytics from '@telegram-apps/analytics'
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AnalyticsService {
    init() {
        return TelegramAnalytics.init({
            token: 'eyJhcHBfbmFtZSI6IkNyb2NvZGlsZSIsImFwcF91cmwiOiJodHRwczovL3QubWUvY3JvYnJvX2JvdCIsImFwcF9kb21haW4iOiJodHRwczovL21heGltbmlrby5naXRodWIuaW8vY3JvY29kaWxlLW5nLyJ9!n4d0T0/+AtTaGkOzCDZU8TuFTJS2NrTZAIjeRhhLNCs=',
            appName: 'Crocodile',
            env: environment.production ? 'PROD' : 'STG',
        });
    }
}
