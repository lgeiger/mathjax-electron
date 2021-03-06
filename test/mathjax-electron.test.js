import {assert} from 'chai';
var path = require('path');
var mathJaxHelper = require('../src/mathjax-electron');

describe('latex transform', function() {

    it('should load MathJax', function() {
        let mathJaxPath = path.join(__dirname, "..", "resources");
        let headScript = '<script type="text/javascript" src="' + mathJaxPath +
            '/MathJax/MathJax.js?delayStartupUntil=configured"></script>'
        mathJaxHelper.loadMathJax(document);
        let script = document.getElementsByTagName('script')[1].outerHTML
        return assert.equal(script, headScript);
    });

    it('should output the correct MathJax script', function() {
        let math = '\\sum\\limits_{i=0}^{\\infty} \\frac{1}{n^2}';
        let latex = '$$' + math + '$$';

        var container = document.createElement('div');
        container.innerHTML = latex
        mathJaxHelper.loadMathJax(document);
        mathJaxHelper.mathProcessor(container);

        return (new Promise(function(resolve) {
            setTimeout(function() {resolve();}, 800);
        })).then(function() {
            assert.lengthOf(container.getElementsByClassName('MathJax_SVG_Display'), 1);
            assert.lengthOf(container.getElementsByClassName('MathJax_SVG'), 1);
            assert.equal(container.getElementsByTagName('script')[0].textContent, math)
        });

    });
});
