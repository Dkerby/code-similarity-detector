# Code Similarity Detector

## Description
This tool allows the user to pass in two git repository URLs in order to find similar files in both of them using levenshtein edit distance. A specific use case of this tool is to detect when smart contract code has been reused, therefore the default behavior is to search for Solidity files in each repository. However, the tool has the functionality to search for similar files of different file types and use a different threshold value for similarity detection. See the CLI parameters section for more info.

## Dependencies

Node.js, npm, and git are required dependencies that will need to be installed on your local machine prior to running the tool.

## How to run the tool

First, clone the repo.

```sh
git clone https://github.com/Dkerby/code-similarity-detector.git
```

Next, install the depedencies using npm.

```sh
npm i
```

Next, since we're using Typescript, we'll need to build the files. The result of the build process will be output to the ./dist folder.

```sh
npm run build
```

Finally, we can move into the ./dist folder and execute our code, using Uniswap and Viperswap as examples, with the default threshold value of 80%.

```sh
cd dist

node index.js -a "https://github.com/VenomProtocol/venomswap-core.git" -b "https://github.com/Uniswap/uniswap-v2-core.git"
```
## CLI Parameters

- (required) -a, the url of the first repo you would like to compare against
- (required) -b, the url of the second repo you would like to compare against
- (optional) -e, the extension of the file type you would like to check for in each repo
- (optional) -t, the threshold similarity percentage you would like to use. Similarity scores lower than this value will not show in the results