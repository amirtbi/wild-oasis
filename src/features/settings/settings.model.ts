export interface ISettings {
    id: string;
    created_at: string;
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
}
export type updateSettingType = Partial<ISettings>
