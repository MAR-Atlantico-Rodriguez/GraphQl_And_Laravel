import { Component, OnInit } from '@angular/core';
import gql from "graphql-tag";
import {Apollo} from 'apollo-angular';
import Echo from "laravel-echo";


const ADDUSER = gql`
mutation createUser($name: String!, $email: String!, $password: String!){
      createUser(input:{name: $name, email: $email, password: $password}){
        id
        name
        email
    }
}`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public items:any = []; 
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo.subscribe({
        query: gql`
          subscription userCreated{
            userCreated{
              id
              name
            }
          }
        `,
      })
      .subscribe((data:any)  => {
        console.log(data); // { id: 2, title: "New title" }
        this.items = data;
      },
      (error) => {console.log(error)});
  }

  save(){
    //console.log('ok');

    this.apollo.mutate({
      mutation: ADDUSER,
      variables: {
            name:"Martin Rodriguez",
            email: "martin1@martin.com",
            password: "1231231"
      }
    }).subscribe();

    // this.apollo.mutate({
    //   mutation: CHEANGEEVENT,
    //   variables: {
    //         id:"03dcbb6f-427f-4419-99f1-76189d68b2a6",
    //         start:"2021-05-23 10:45:00",
    //         end:"2021-05-23 11:00:00"
    //   }
    // }).subscribe(data =>{
    //   console.log(data);
    // }, error => console.log(error));
  }
}
