Node JMX Experiment
===================

This repo contains some experimental code to try and use the
[node-jmx][https://github.com/zuazo/node-jmx] library to
connect to a Java process that has JMX enabled.

Usage:
------

1. Build and tun the sample boot app found under `hello-boot-app` directory by using
the `build.sh` and `run.sh` scripts respectively.

2. Open this project in vscode.

3. Open `src/index.ts` (in vscode).

4. Run it by pressing `F5`.

Problems encountered:
--------------------

### Installing the jmx library dependency failed because of missing `make` command.

```
$ npm install jmx

> java@0.9.1 install /home/kdvolder/git/kdvolder/node-jmx-experiment/node_modules/java
> node-gyp rebuild

gyp ERR! build error
gyp ERR! stack Error: not found: make
```

Resolved by doing:

```
sudo apt-get install build-essential
```


