import * as fs from 'fs';
import levenshtein from 'fast-levenshtein';
import { Service } from "typedi";
import { IResult } from '../models/result';

@Service()
export class SimilarityService {
    constructor() {}

    public computeSimilarityScoresForFiles(matchingFilesA: string[], matchingFilesB: string[], threshholdPercentage: number): IResult[] {
        let results: IResult[] = [];    
        for(const fileA of matchingFilesA) {
            for(const fileB of matchingFilesB) {
                try {
                    const fileDataA = fs.readFileSync(fileA, 'utf-8');
                    const fileDataB = fs.readFileSync(fileB, 'utf-8');
                    const fileLengthA = fileDataA.length;
                    const fileLengthB = fileDataB.length;
                    const levEditValue = levenshtein.get(fileDataA, fileDataB);
                    const percentSimilarity = 100 - (levEditValue / (Math.max(fileLengthA, fileLengthB)) * 100);
                    if(percentSimilarity > threshholdPercentage) {
                        const result: IResult = {
                            filePathA: fileA,
                            filePathB: fileB,
                            fileLengthA: fileLengthA,
                            fileLengthB: fileLengthB,
                            similarityPercentage: percentSimilarity
                        };
                        results.push(result);
                    }
                  } catch (err) {
                    throw 'Error computing levenshtein distance for file pair';
                  }
            }
        }

        return results;
    }	
}