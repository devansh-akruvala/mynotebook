import React ,{useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesinitial = [
        {
          "_id": "63cf5f9dd6f3ba394e821104",
          "user": "63ce88b17a723ef1cc163e23",
          "title": "abc",
          "desc": "my desc",
          "body": "work hard",
          "tag": "personal",
          "date": "2023-01-24T04:33:33.250Z",
          "__v": 0
        },
        {
          "_id": "63cf8824b95b058f36881174",
          "user": "63ce88b17a723ef1cc163e23",
          "title": "abc 2",
          "desc": "my desc",
          "body": "work hard",
          "tag": "goal",
          "date": "2023-01-24T07:26:28.065Z",
          "__v": 0
        },
        {
            "_id": "63cf5f9dd6f3ba394e821104",
            "user": "63ce88b17a723ef1cc163e23",
            "title": "abc",
            "desc": "my desc",
            "body": "work hard",
            "tag": "personal",
            "date": "2023-01-24T04:33:33.250Z",
            "__v": 0
          },
          {
            "_id": "63cf8824b95b058f36881174",
            "user": "63ce88b17a723ef1cc163e23",
            "title": "abc 2",
            "desc": "my desc",
            "body": "work hard",
            "tag": "goal",
            "date": "2023-01-24T07:26:28.065Z",
            "__v": 0
          }, {
            "_id": "63cf5f9dd6f3ba394e821104",
            "user": "63ce88b17a723ef1cc163e23",
            "title": "abc",
            "desc": "my desc",
            "body": "work hard",
            "tag": "personal",
            "date": "2023-01-24T04:33:33.250Z",
            "__v": 0
          },
          {
            "_id": "63cf8824b95b058f36881174",
            "user": "63ce88b17a723ef1cc163e23",
            "title": "abc 2",
            "desc": "my desc",
            "body": "work hard",
            "tag": "goal",
            "date": "2023-01-24T07:26:28.065Z",
            "__v": 0
          }, {
            "_id": "63cf5f9dd6f3ba394e821104",
            "user": "63ce88b17a723ef1cc163e23",
            "title": "abc",
            "desc": "my desc",
            "body": "work hard",
            "tag": "personal",
            "date": "2023-01-24T04:33:33.250Z",
            "__v": 0
          },
          {
            "_id": "63cf8824b95b058f36881174",
            "user": "63ce88b17a723ef1cc163e23",
            "title": "abc 2",
            "desc": "my desc",
            "body": "work hard",
            "tag": "goal",
            "date": "2023-01-24T07:26:28.065Z",
            "__v": 0
          }, {
            "_id": "63cf5f9dd6f3ba394e821104",
            "user": "63ce88b17a723ef1cc163e23",
            "title": "abc",
            "desc": "my desc",
            "body": "work hard",
            "tag": "personal",
            "date": "2023-01-24T04:33:33.250Z",
            "__v": 0
          },
          {
            "_id": "63cf8824b95b058f36881174",
            "user": "63ce88b17a723ef1cc163e23",
            "title": "abc 2",
            "desc": "my desc",
            "body": "work hard",
            "tag": "goal",
            "date": "2023-01-24T07:26:28.065Z",
            "__v": 0
          }
      ]
    const [notes, setnotes] = useState(notesinitial)

    return (
        <NoteContext.Provider value={{notes,setnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;