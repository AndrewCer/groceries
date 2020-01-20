import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {}

  /**
   * Sends a request to the API, returning the data as a basic object.
   * @param method The HTTP method to use. Ex: 'get', 'post', 'put', 'delete'.
   * @param path The relative path from the object's base endpoint. Ex: '/count', '/recent'.
   * @param body The body to pass to the endpoint. Ex: { id: 12345, name: 'apple' }.
   */
  public request(method: string, path: string, body: any): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { headers };
    // NOTE: in a production env we would wire this up with an env variable
    const url = 'http://localhost:4000/api' + path;

    switch (method.toLowerCase()) {
      case 'get':
        return this.http.get(url, options).toPromise();
      case 'post':
        return this.http.post(url, body ? body : undefined, options).toPromise();
      case 'put':
        return this.http.put(url, body ? body : undefined, options).toPromise();
      case 'delete':
        return this.http.delete(url, options).toPromise();
      default:
        throw new Error('Unsupported HTTP verb.');
    }
  }

}
