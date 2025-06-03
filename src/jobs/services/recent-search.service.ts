import { Injectable } from "@nestjs/common";

@Injectable()
export class RecentSearchService {
    async getRecentSearches() {
        console.log("this is my get recent searches service function");
        return;
    }
    
    async addRecentSearch(searchTerm: string) {
        console.log(`this is my add recent search service function with term: ${searchTerm}`);
        return;
    }
    
    async clearRecentSearches() {
        console.log("this is my clear recent searches service function");
        return;
    }
}