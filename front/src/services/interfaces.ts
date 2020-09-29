export interface Event {
    _id: string;
    event_name: string;
    district: string;
    street: string;
    number: string;
    uf: string;
    city: string;
    photo: string;
    commentary: string;
    user_id: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    dislikes: number;
}