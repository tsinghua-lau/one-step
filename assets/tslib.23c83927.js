function a(r,t){var n={};for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&t.indexOf(o)<0&&(n[o]=r[o]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var e=0,o=Object.getOwnPropertySymbols(r);e<o.length;e++)t.indexOf(o[e])<0&&Object.prototype.propertyIsEnumerable.call(r,o[e])&&(n[o[e]]=r[o[e]]);return n}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var c=function(r,t){return c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,o){n.__proto__=o}||function(n,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(n[e]=o[e])},c(r,t)};function p(r,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");c(r,t);function n(){this.constructor=r}r.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var f=function(r,t){return f=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,o){n.__proto__=o}||function(n,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(n[e]=o[e])},f(r,t)};function i(r,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");f(r,t);function n(){this.constructor=r}r.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}export{p as _,a,i as b};
