import { RequestType } from './system.enums';
export class BrandFilter {
    categoryId: number;
    searchKeyword: string;
    stateId: number;
    cityId: number;
    // investmentAmount: number;
    investmentRangeId: number;
    requestType: RequestType;
}
