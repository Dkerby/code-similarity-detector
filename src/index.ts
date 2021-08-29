import 'reflect-metadata';
import { Command } from 'commander';
import { FileService } from './services/fileService'
import { SimilarityService } from './services/similarityService';
import Container from 'typedi';

const program = new Command();

const pathToFiles = "./cloned-repos";
const pathToRepoA = "/repoA";
const pathToRepoB = "/repoB";

const fileService = Container.get(FileService);
const similarityService = Container.get(SimilarityService);

program
    .version('1.0.0')
    .option('-a, --repoA [value]', 'file A') // required
    .option('-b, --repoB [value]', 'file B') // required
    .option('-e, --extension [value]', 'file extension', 'sol') // optional, default looks for solidity files
    .option('-t, --threshold [value]', 'similarity percentage threshold', '80.0') // optional, default is 80%
    .action(async (args: any) => {
        runCodeSimilarityAnalysis(args.repoA, args.repoB, args.extension, args.threshold);
    });

// driver function
async function runCodeSimilarityAnalysis (repoA: string, repoB: string, extension: string, threshold: number) {
    const pathA = pathToFiles + pathToRepoA;
    const pathB = pathToFiles + pathToRepoB;

    // download files from github
    fileService.cloneGitRepos(repoA, repoB, pathToFiles);

    // get array files of passed in type in folderA
    const matchingFilesArrayA = await fileService.getMatchingFiles(pathA, extension);
    // get array of files of passed in type in folderB
    const matchingFilesArrayB = await fileService.getMatchingFiles(pathB, extension);

    // compare files in repoA and repoB using levenshtein distance. If they are similar by more than the threshold percentage, they will be printed to the screen.
    const results = similarityService.computeSimilarityScoresForFiles(matchingFilesArrayA, matchingFilesArrayB, threshold);
    console.log(`File pairs found in cloned repos that are greater than ${threshold}% different:`);
    console.log(results);

    // cleanup git cloned repos after the program executes
    fileService.cleanupGitRepos(pathToFiles);
};

program.parse(process.argv);