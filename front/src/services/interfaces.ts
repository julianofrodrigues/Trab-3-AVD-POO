export interface Event {
    _id: string;
    event_name: string;
    place: string;
    photo: string;
    commentary: string;
    user_id: string;
    createdAt: Date;
    updatedAt: Date;
}