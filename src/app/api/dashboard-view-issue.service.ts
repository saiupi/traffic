import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardViewIssueService {

  apiUrl = "http://192.168.2.55:2222/userReport/getAllReports"
  constructor(private http: HttpClient) { }
  // viewIssue(mobileNum:any): Observable<any>{
  //  // return this.http.get('http://192.168.2.55:3333/viewIssue/getAllReports'+"/"+mobileNum)
  //    return this.http.get('http://192.168.2.55:3333/viewIssue/pendingReports'+"/"+mobileNum)
  //   //return this.http.get('http://192.168.2.55:3333/viewIssue/rejectedReports'+"/"+mobileNum)
  //    //return this.http.get('http://192.168.2.55:3333/viewIssue/approvedReports'+"/"+mobileNum)


  // }
    pending(mobileNum: any): Observable<any> {
      return this.http.get('http://52.66.197.63:4000/userViewIssue/pendingReports' + "/" + mobileNum)
    }
    rejected(mobileNum: any): Observable<any> {
      return this.http.get('http://52.66.197.63:4000/userViewIssue/rejectedReports' + "/" + mobileNum)
    }
    approved(mobileNum: any): Observable<any> {
     // return this.http.get('http://52.66.197.63:4000/userViewIssue/approvedReports' + "/" + mobileNum)
     return this.http.get('http://192.168.2.57:4000/userViewIssue/approvedReports' + "/" + mobileNum)
    }
    getAll(mobileNum: any): Observable<any> {
      return this.http.get('http://52.66.197.63:4000/userViewIssue/getAllReports' + "/" + mobileNum)
    }

    postIssue(profile: any) {
     // return this.http.post("http://192.168.2.55:1111/userReport/postIssue", profile)
      return this.http.post("http://52.66.197.63:4000/userReport/postIssue", profile)
    }
    offence(): Observable<any> {
      return this.http.get('http://52.66.197.63:4000/offence/getAll')
      // return this.http.get('http://192.168.2.57:4000/offence/getAll')
    }
  // registerGet(mobileNum: any): Observable<any> {
  //   return this.http.get('http://192.168.3.29:2222/userDetails/getAllUserDetails'+ "/"+ mobileNum)
  // }



    getImage(imageUrl: string) {
      return this.http.get(imageUrl, {observe: 'response', responseType: 'blob'})
        .map((res) => {
          return new Blob([res.body], {type: res.headers.get('Content-Type')});
        })
    }

}
