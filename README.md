Node JMX Experiment
===================

This repo contains some experimental code to try and use the
[node-jmx][https://github.com/zuazo/node-jmx] library to
connect to a Java process that has JMX enabled.

Project Contents:
-----------------

hello-boot-app:
    Contains 'assets' related to launching a 'Hello World' 
    spring boot app. This is our test subject.

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
 

