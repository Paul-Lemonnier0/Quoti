export enum FirestoreCollections {
    Users = "Users",
    Habits = "Habits",
    Goals = "Goals",
    Posts = "Posts"
}

export enum FirestoreUserSubCollections {
    UserHabits = "UserHabits",
    UserDoneHabits = 'UserDoneHabits',
    UserArchivedHabits = "UserArchivedHabits",
    
    UserGoals = "UserGoals",
    History = "History",
    Social = "Social"
}

export enum FirestoreSocialSubCollections {
    Friends = "Friends",
    Blocked = "Blocked",
    Requests = "Requests",
    HabitsInvitation = "HabitsInvitation",
    GoalsInvitation = "GoalsInvitation"
}
