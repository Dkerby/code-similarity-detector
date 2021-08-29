import * as fs from 'fs';
import * as path from 'path';
import * as walk from 'walk';
import { execSync } from 'child_process';
import { Service } from "typedi";

@Service()
export class FileService {
    constructor() {}

    // Warning: The 'execSync' command should never accept unsanitized user input
    public cloneGitRepos(repoUrlA: string, repoUrlB: string, path: string = './cloned-repos') {   
        try {
            const commandA = `git clone ${repoUrlA} ${path}/repoA`;
            const commandB = `git clone ${repoUrlB} ${path}/repoB`;
            execSync(commandA);
            execSync(commandB);
        } catch {
            throw 'Error cloning git repo. Make sure your git repo is accessible and referenced correctly.';
        }
    }

    public cleanupGitRepos(path: string) {
        try {
            fs.rmdirSync(path, { recursive: true });
        } catch (err) {
            throw 'Error removing git repos. Path could not be found';
        }
    }

    public async getMatchingFiles(root: string, targetFileExtension: string): Promise<string[]> {
        const options: walk.WalkOptions = {
            followLinks: false
        }

        const walker = walk.walk(root, options);
        let matchingFiles: string[] = [];

        return await new Promise(function (resolve, reject) {
            walker.on("file", function (root, fileStats, next) {
                const splitFileName = fileStats.name.split('.');
                if (splitFileName.length > 0) {
                    const fileExtension = splitFileName[splitFileName.length - 1];
                    if (fileExtension != targetFileExtension) {
                        next();
                        return;
                    }
                } else {
                    next();
                    return;
                }

                fs.readFile(path.join(root, fileStats.name), function () {
                    matchingFiles.push(path.join(root, fileStats.name));
                    next();
                });
            });

            walker.on("end", function () {
                resolve(matchingFiles);
            });
        });
    }
}