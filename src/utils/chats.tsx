import profilePic from "../assets/image/profilePic.svg";

export const contacts = [
  {
    contactName: "Chioma",
    contactImage: profilePic,
    activeStatus: "left 15mins ago",
    message: [
      {
        text: "Hello",
        time: "10:01am | TODAY",
        rstatus: "seen",
        type: "recieved",
      },
      {
        text: "How are you today",
        time: "10:03am | TODAY",
        status: "unseen",
        type: "recieved",
      },
    ],
  },
  {
    contactName: "David",
    contactImage: profilePic,
    activeStatus: "Active",
    message: [
      {
        text: "Hello",
        time: "10:01am | TODAY",
        status: "seen",
        type: "recieved",
      },
      {
        text: "How are you today",
        time: "10:03am | TODAY",
        status: "unseen",
        type: "recieved",
      },
      {
        text: "Hey!!",
        time: "10:11am | TODAY",
        status: "seen",
        type: "sent",
      },
      {
        text: "I'm great and you?",
        time: "10:11am | TODAY",
        status: "unseen",
        type: "sent",
      },
    ],
  },
];
