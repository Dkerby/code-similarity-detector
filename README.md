# Code Similarity Detector

## Description
This tool allows the user to pass in two GitHub repositories in order to calculate the total difference between the two repositories using levenshtien edit distance. A specific use case of this tool is to detect when smart contracts have been reused, therefore the default behavior of this to search for .sol files in each repository.

## How to run the tool

First, clone the repo.

```sh
git clone https://github.com/Dkerby/code-similarity-detector.git
```

Next, if you don't have it already, install git on your machine, as the 'git clone' command is used to automatically pull down the files onto the server for comparison.

Next, install the depedencies using npm.

```sh
npm i
```

Next, since we're using typescript, we'll need to run the build the files, which will get output to the ./dist folder.

```sh
npm run build
```

Finally, we can move into the ./dist folder and execute our code, using Uniswap and Viperswap as examples, with the default threshold value of 80.

```sh
cd dist

node index.js -a "https://github.com/VenomProtocol/venomswap-core.git" -b "https://github.com/Uniswap/uniswap-v2-core.git"
```
## CLI Parameters

(required) -a, the url of the first repo you would like to compare against
(required) -b, the url of the second repo you would like to compare against
(optional) -e, the extension of the file type you would like to check for in each repo
(optional) -t, the threshold similarity percentage you would like to use. Similarity scores lower than this value will not show in the results