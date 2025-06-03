import { Injectable } from "@nestjs/common";

@Injectable()
export class JobsService {
  async getAllJobs() {
    console.log("this is my get all jobs service function");
    return;
  }

  async search(searchTerm: string) {
    console.log(`this is my search service function with term: ${searchTerm}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Search results for: ${searchTerm}`);
        }, 1000);
    });
  }

  
}