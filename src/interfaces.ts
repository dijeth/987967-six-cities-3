import {id, roomType, coord} from "./types";

export interface OfferMini {
    readonly id: id;
    title: string;
    type: roomType;
    pictures: Array<string>;
    cost: number;
    rating: number;
    isPremium: boolean;
    isFavorite: boolean;
    city: string;
    coord: coord;
}

export interface Offer extends OfferMini {
    bedroomCount: number;
    adultsCount: number;
    insideFeatures: Array<string>;
    userName: string;
    userPicture: string;
    isSuperUser: boolean;
    descriptionTitle: string;
    description: string;
    zoom: number;
}

export interface City {
    name: string;
    zoom: number;
    centerCoord: coord;
}

export interface UserReview {
    readonly id: id;
    userName: string;
    userPicture: string;
    rating: number;
    description: string;
    date: string;
}

export interface List<T extends unknown> {
    items: Array<T>;
    activeItem: T | null;
    onActiveItemChange: (activeItem: T | null) => void;
    onListClick: (evt: React.MouseEvent<HTMLElement>) => void;
}

export interface FavoriteOffers {
    [key: string]: Array<OfferMini>;
}