# Tinder 
### Introduction
> The Tinder App is a dating application that allows users to create a profile, swipe left or right on potential matches, and chat with matches if both parties are interested. The app is built using React Native, Firebase, and Tailwind CSS. This documentation provides an overview of the app's features, installation instructions, and how to use it.

### Installation
To install the Tinder App, follow these steps:

1) First create the react native app:
   
      npx create-expo-app tinder

2)  Install the following dependency and dev-dependencies by using the following command:
      
      #### Dependency
      npm i @expo/webpack-config @react-native-async-storage/async-storage @react-navigation/native @react-navigation/native-stack expo expo-auth-session expo-random expo-status-bar
      firebase nativewind

      #### Dev Dependency
      npm i -D tailwindcss

3) Create a Firebase project and add the necessary configuration details to the .env file:
   
      FIREBASE_API_KEY=your_api_key
      FIREBASE_AUTH_DOMAIN=your_auth_domain
      FIREBASE_PROJECT_ID=your_project_id
      FIREBASE_STORAGE_BUCKET=your_storage_bucket
      FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
      FIREBASE_APP_ID=your_app_id

4) Start the app:

      npm start


### Features
- Sign Up and Login:
Users can create a new account or login with their existing account. The app uses Firebase Authentication to securely store user information.

- Profile Creation:
Users can create a profile with their name, age, gender, and a profile picture. The app uses Firebase Storage to store user profile pictures.

- Swiping:
Users can swipe left or right on potential matches. If both users swipe right, they are matched and can start chatting.

- Chatting:
Users can chat with their matches in real-time. The app uses Firebase Firestore to store chat messages.

- Settings:
Users can access their account settings, edit their profile information, and logout.

### Schema/ Collection Used
The Tinder App uses Firebase Firestore as its database to store user and chat information. The schema for the database is as follows:

#### Users Collection
- id: string
- name: string
- age: number
- gender: string
- profilePicture: string (URL to the user's profile picture in Firebase Storage)
- email: string
- matches: array of strings (IDs of the user's matches)
- createdAt: timestamp
- updatedAt: timestamp

#### Chats Collection
- id: string
- users: array of strings (IDs of the users in the chat)
- messages: array of objects
  - id: string
  - text: string
  - senderId: string (ID of the user who sent the message)
  - createdAt: timestamp

#### Matches Collection
- id: string
- userId1: string (ID of the first user in the match)
- userId2: string (ID of the second user in the match)
- createdAt: timestamp
- updatedAt: timestamp

#### Swipes Collection
- id: string
- userId: string (ID of the user who made the swipe)
- swipedUserId: string (ID of the user who was swiped on)
- type: string ('like' or 'dislike')
- createdAt: timestamp

> This collection is used to keep track of the swipes made by each user. When a user swipes left (dislike) or right (like) on a potential match, a new document is added to this collection with the userId, swipedUserId, and type fields. The createdAt field is automatically set by Firestore to the time the document was created. The id field can be either manually set or automatically generated by Firestore.

> In addition to the Firestore schema, the app also uses Firebase Authentication to store user authentication information and Firebase Storage to store user profile pictures.

### Conclusion
The Tinder App is a powerful dating application that allows users to create a profile, swipe left or right on potential matches, and chat with matches if both parties are interested. The app is built using React Native, Firebase, and Tailwind CSS. This documentation has provided an overview of the app's features, installation instructions, and how to use it.