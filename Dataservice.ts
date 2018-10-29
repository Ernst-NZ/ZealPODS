import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    searchText: String = '';
    myToken: String = '';


    constructor(private http: HttpClient) { }

    getAllRoutes() {
        return this.http.get('https://deliveryapi.completefoodservices.com.au:8095/api/values/1');
        //return this.http.get('http://test1.zealsystems.co.nz/api/values/1') ;

    }

    // getTestApiResult() {
    //   return this.http.get('https://localhost:5000/api/genras/');
    // }

    // #####################################################################
    getAllRoutes1() {
        // const httpOptions = {
        //   headers: new HttpHeaders({
        //     'Content-Type': 'application/json'
        //     , 'Authorization': 'Bearer aRA39yf4N8J-DhTNCVRXptKywROwFCi6meGgAhafP9SGy96ReXmnwZYNTkqA_-vHcYOtNLgk0wCKTw1gkFfWj8S8A6j073XCcHeqlW7R-ahC3jOQ70iRcINbOsVsUWHqQ-YRi5u6bUZz9ECWruJ6vsIymMqBj9Lvk839h-9-F3iKQjOvXBmIA1j3ymGpO-FeuiXeQ3OnGxuUjWCCg6faVARQplX00GjoEgW1fgOJkvOxqgGlV5zWFUxfYh-oMlRfLSx7z4ZSm-OCKEmI5CIV1zzFodwp6n_mMrWy5AeOD0cu2mdDHBlqEp1E72s16Wi2liVW0dCcmoozZyJ0lhEy4SD-3_tkjW3-ShlZdCZ1niaIL5D6NBXeN1YeLFiEPGwYnmTV2j6f6PM9jUKCR9EWDODJejgVV8iDyAGFHuNDaO5IInQSzLyDCPmRq3QNeCTRuFV4tB0CJ1_Okj8wxkFdRg0jqU3o9oFq5_szZ47sV3tz-U2lIb0OFXl4kz-oWDpz'
        //     , 'Access-Control-Allow-Origin': '*'
        //   })
        // };
        // return this.http.get('https://test1.zealsystems.co.nz/api/values/1',httpOptions);
        return this.http.get('https://test1.zealsystems.co.nz/api/values/1');
    }



    // ###  111  #############
    postJson(dataString) {
        console.log('Data Before Post 35')

        console.log("Test 1 Line 41")
        console.log(dataString)
        return this.http.post('https://test1.zealsystems.co.nz/api/values/', dataString, {
            headers: new HttpHeaders({
                'content-type': 'application/json'
            })
        })
    }


    // ######## 44  JQuery  #######
    postJson4() {
        var person = {
            name: $("#id-name").val(),
            address: $("#id-address").val(),
            phone: $("#id-phone").val()
        }

        $('#target').html('sending..');
        console.log("44 Jquery");
        console.log(JSON.stringify(person));
        $.ajax({
            url: 'https://test1.zealsystems.co.nz/api/values',
            type: 'post',
            //dataType: 'json',
            //contentType: 'application/json',
            //    Authorization: 'Bearer aRA39yf4N8J-DhTNCVRXptKywROwFCi6meGgAhafP9SGy96ReXmnwZYNTkqA_-vHcYOtNLgk0wCKTw1gkFfWj8S8A6j073XCcHeqlW7R-ahC3jOQ70iRcINbOsVsUWHqQ-YRi5u6bUZz9ECWruJ6vsIymMqBj9Lvk839h-9-F3iKQjOvXBmIA1j3ymGpO-FeuiXeQ3OnGxuUjWCCg6faVARQplX00GjoEgW1fgOJkvOxqgGlV5zWFUxfYh-oMlRfLSx7z4ZSm-OCKEmI5CIV1zzFodwp6n_mMrWy5AeOD0cu2mdDHBlqEp1E72s16Wi2liVW0dCcmoozZyJ0lhEy4SD-3_tkjW3-ShlZdCZ1niaIL5D6NBXeN1YeLFiEPGwYnmTV2j6f6PM9jUKCR9EWDODJejgVV8iDyAGFHuNDaO5IInQSzLyDCPmRq3QNeCTRuFV4tB0CJ1_Okj8wxkFdRg0jqU3o9oFq5_szZ47sV3tz-U2lIb0OFXl4kz-oWDpz'
            //    ,
            data: JSON.stringify(person)
        }).done(function () {
            alert("second success");
        })
            .fail(function (e) {
                console.log(e)
                alert(e);
            });

        // $.post('https://test1.zealsystems.co.nz/api/values', JSON.stringify(person), function (data) {
        //   console.log('success callback');
        //   console.log(data);
        // })
        // .done(function(data){
        //   console.log('done');
        //   console.log(data);
        // })
        //   .fail(function (data) {
        //     console.log('failed');
        //   });
        // console.log("45 Jquery");
    }



    // ### 222 #############
    postJson2(dataString) {
        console.log('Data Before Post 35')
        console.log("Test 2 Line 91")
        this.myToken = localStorage.getItem('JSONToken');
        console.log(this.myToken);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
                , 'Authorization': 'Bearer 5m7lk9e5cMrMlMBNPGkRjLiZXCTqxPjJb2z7fenczHwJeJhvYGmNzPO6ldKgynAGPU-ct2rGy1NtxWaRgBza26-y3ffqdr3Whk8XEBWXoJUk8cFnPmsO0_CLVI6F-qHIl2I0sA1V8Z8TUBBoTqEV2haya_PXvR_YP_TfCYG1GjiUoRLmUei9VqjwhxRFDtVaUm4Ow2aYqXuYCtOg86wXFZJmPn4H5rOCLxpn-iup2FH0RLnFNo6Cp7C-i1Q4d8ld3xT3mIkX5Yq0Bb1noCd9zjxKJg0yAdaRi8JVkm7m3zRkp4C7XdtwzWPYUstsrRDFePLOeFug7bQJIJDXkbX3VhhecMPdtkcVeZwuqyCOjRbKFbYVOi5JRNEq4EUhg0IplscIkEC181c5b_UyXaElXlzS1RdErWQkl_CAZvHLRJl93U_itxSDAz-xSeRQj0zQsYgyXJEWFSFDjhkGEVx-SV559WOmX2dgJ0_wMQPK3bub3pCDdGO0Ykjdj60taPDv'
                , 'Access-Control-Allow-Origin': '*'
                //    , 'Authorization': 'Bearer aRA39yf4N8J-DhTNCVRXptKywROwFCi6meGgAhafP9SGy96ReXmnwZYNTkqA_-vHcYOtNLgk0wCKTw1gkFfWj8S8A6j073XCcHeqlW7R-ahC3jOQ70iRcINbOsVsUWHqQ-YRi5u6bUZz9ECWruJ6vsIymMqBj9Lvk839h-9-F3iKQjOvXBmIA1j3ymGpO-FeuiXeQ3OnGxuUjWCCg6faVARQplX00GjoEgW1fgOJkvOxqgGlV5zWFUxfYh-oMlRfLSx7z4ZSm-OCKEmI5CIV1zzFodwp6n_mMrWy5AeOD0cu2mdDHBlqEp1E72s16Wi2liVW0dCcmoozZyJ0lhEy4SD-3_tkjW3-ShlZdCZ1niaIL5D6NBXeN1YeLFiEPGwYnmTV2j6f6PM9jUKCR9EWDODJejgVV8iDyAGFHuNDaO5IInQSzLyDCPmRq3QNeCTRuFV4tB0CJ1_Okj8wxkFdRg0jqU3o9oFq5_szZ47sV3tz-U2lIb0OFXl4kz-oWDpz'
                //    , 'Access-Control-Allow-Origin': '*'
            })
        };
    }


    // ### 33 #############
    postJson3(dataString) {
        console.log("Test 3 Line 122")
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");


    }

    // ########################################################################
}


