import { Component, OnInit } from '@angular/core';
import gql from "graphql-tag";
import {Apollo} from 'apollo-angular';


const ADDCALENDAR = gql`
    mutation createEventCalendar(
        $patient_id: ID!,
        $state_id: ID!,
        $user_consulting_room_id: ID!
        $date_time_in: DateTime!,
        $date_time_out: DateTime!,
        $description: String,
        $price: String!,
        $event: Int){
        createEventCalendar(input:{
            patient_id: $patient_id,
            state_id: $state_id,
            user_consulting_room_id: $user_consulting_room_id,
            date_time_in: $date_time_in,
            date_time_out: $date_time_out,
            description: $description,
            price: $price,
            event: $event,
        }){
            id
        }
    }`;


const CHEANGEEVENT = gql`
mutation changeEventTime($id: ID!, $start: DateTime!, $end: DateTime!){
    changeEventTime(input:{
        id: $id
        date_time_in: $start
        date_time_out: $end
    }){
        id
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
    this.apollo
      .subscribe({
        query: gql`
          subscription ShiftCaledar($id:ID){
            shiftCalendar(id:$id){
              id
              date_time_in
            }
          }
        `,
      })
      .subscribe((data:any)  => {
        console.log(data); // { id: 2, title: "New title" }
        this.items = data.data.shiftCalendar;
      },
      (error) => {console.log(error)});
  }

  save(){
    console.log('ok');

    this.apollo.mutate({
      mutation: CHEANGEEVENT,
      variables: {
            // patient_id:"8b250ee7-ffa6-46fa-ab87-8a880414d315",
            // state_id:"8b3b2716-b3d9-11ea-b976-d4bed93e8b2b",
            // user_consulting_room_id:"e89396d1-d4c0-11ea-a02e-d4bed93e8b2b",
            id: "2f8a3798-be53-11ea-8a4e-d4bed93e8b2b",
            start:"2021-05-19 09:45:00",
            end:"2021-05-19 10:00:00",
            // description:"123123123333",
            // price:"1000",
            // event:1
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
