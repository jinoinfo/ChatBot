import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeviceinfoService {

  constructor(private http: HttpClient) { }

  validateDevice(deviceInfo): Observable<any> {
            const url = 'http://localhost:3000/device';
            return this.http.get(url);
        }
    
        validateICCID(deviceInfo): Observable<any> {
                const url = 'http://localhost:3000/iccid';
                return this.http.get(url);
            }
}
