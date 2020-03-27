import { SortType } from "./const/const";
import { OfferMini, City } from "./interfaces";

export type id = string;
export type roomType = `apartment` | `room` | `house` | `hotel`;
export type coord = [number, number];
export type ListItem = SortType | OfferMini | City;
export type TSavedReview = {
    text: string;
    rating: number;
    offerID: id;
};
