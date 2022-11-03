# A TypeScript compiler for the CMC-1 course.

A minimalist TypeScript compiler for the "Strictly" programming language.

---

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environment.

### Node installation

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v18.12.0

    $ npm --version
    8.19.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

    $ npm install -g yarn

If the installation was successful, you should be able to run the following command.

    $ yarn --version
    1.22.19

---

## Install

    $ git clone https://github.com/eugeniuRacila/cmc-1-strictly
    $ cd cmc-1-strictly
    $ yarn install

---

## Running the project

### Development environment

- #### Run the project and generate the output (JavaScript) file.

      $ yarn start

- #### Run the project and execute the code, without generating the output file.

      $ yarn start:x

---

## Testing

    $ yarn test
