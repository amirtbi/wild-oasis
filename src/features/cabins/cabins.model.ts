export interface ICabins {
    id: number
    create_at: string;
    description: string;
    discount: number;
    image: any | string;
    maxCapacity: number;
    name: string;
    regularPrice: number
}

export type createCabinType = Omit<ICabins, "create_at">