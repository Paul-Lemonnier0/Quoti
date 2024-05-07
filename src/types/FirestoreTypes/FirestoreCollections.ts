export enum FirestoreCollections {
    Users = "Users",
    Habits = "Habits",
    Objectifs = "Objectifs",
    Posts = "Posts"
}

export enum FirestoreUserSubCollections {
    UserHabits = "UserHabits",
    UserDoneHabits = 'UserDoneHabits',
    UserArchivedHabits = "UserArchivedHabits",
    
    UserObjectifs = "UserObjectifs",
    History = "History",
    Social = "Social"
}

export enum FirestoreSocialSubCollections {
    Friends = "Friends",
    Blocked = "Blocked",
    Requests = "Requests",
    HabitsInvitation = "HabitsInvitation",
    ObjectifsInvitation = "ObjectifsInvitation"
}
