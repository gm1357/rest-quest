export interface IPlacesService {
    getCurrentPlace(currentAreaId: any): any;
    getItem(currentAreaId: any, itemName: string, userId: string): any;
    goToNextLocation(currentAreaId: any, direction: string, userId: any): any;
    getInitialArea(): any;
}