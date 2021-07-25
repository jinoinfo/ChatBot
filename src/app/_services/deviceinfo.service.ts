import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeviceinfoService {

  constructor(private http: HttpClient) { }

  validateDevice(deviceInfo): Observable<any> {
    //    console.log('deviceInfo '+deviceInfo.controls.confirmEsn);
          const headers = { 'content-type': 'application/json'}  
          var deviceObj = JSON.stringify(deviceInfo);
          const url = 'http://159.122.187.209:30375/device';
          //    const url = 'http://localhost:8080/device';

            return this.http.post(url,deviceObj,{'headers':headers});
        }
    
      validateICCID(deviceInfo): Observable<any> {
            const headers = { 'content-type': 'application/json'}  
            var iccidObj = JSON.stringify(deviceInfo);
            //const url = 'http://localhost:8080/iccid';
            const url = 'http://159.122.187.209:32325/iccid';
            return this.http.post(url,iccidObj,{'headers':headers});
       // return this.http.get(url,iccidObj,);
      }
}
