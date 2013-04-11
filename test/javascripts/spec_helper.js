// set the Mocha test interface
// see http://visionmedia.github.com/mocha/#interfaces
mocha.ui('bdd');

// ignore the following globals during leak detection
mocha.globals(['util']);

// or, ignore all leaks
mocha.ignoreLeaks();

// set slow test timeout in ms
mocha.timeout(5);
