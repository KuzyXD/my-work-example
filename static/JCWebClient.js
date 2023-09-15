/*!
* \file JCWebClient.js
*/

/** @name 1. JavaScript SDK.
 **/
///@{

if (typeof (__JCWebClientScriptFileLoaded) != 'undefined') {
    throw new Error("JCWebClient API script file has been already loaded");
}
var __JCWebClientScriptFileLoaded = true;


// For IE 8
if (typeof Object.create != 'function') {
    // Production steps of ECMA-262, Edition 5, 15.2.3.5
    // Reference: http://es5.github.io/#x15.2.3.5
    Object.create = (function() {
        // To save on memory, use a shared constructor
        function Temp() {}

        // make a safe reference to Object.prototype.hasOwnProperty
        var hasOwn = Object.prototype.hasOwnProperty;

        return function (O) {
            // 1. If Type(O) is not Object or Null throw a TypeError exception.
            if (typeof O != 'object') {
                throw TypeError('Object prototype may only be an Object or null');
            }

            // 2. Let obj be the result of creating a new object as if by the
            //    expression new Object() where Object is the standard built-in
            //    constructor with that name
            // 3. Set the [[Prototype]] internal property of obj to O.
            Temp.prototype = O;
            var obj = new Temp();
            Temp.prototype = null; // Let's not keep a stray reference to O...

            // 4. If the argument Properties is present and not undefined, add
            //    own properties to obj as if by calling the standard built-in
            //    function Object.defineProperties with arguments obj and
            //    Properties.
            if (arguments.length > 1) {
                // Object.defineProperties does ToObject on its first argument.
                var Properties = Object(arguments[1]);
                for (var prop in Properties) {
                    if (hasOwn.call(Properties, prop)) {
                        obj[prop] = Properties[prop];
                    }
                }
            }

            // 5. Return obj
            return obj;
        };
    })();
}

if(typeof(Array.isArray) === 'undefined') {
    Array.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
}

if(typeof(String.prototype.trim) === 'undefined') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}
if(typeof(String.prototype.ltrim) === 'undefined') {
    String.prototype.ltrim = function() {
        return this.replace(/^\s+/, '');
    }
}
if(typeof(String.prototype.rtrim) === 'undefined') {
    String.prototype.rtrim = function() {
        return this.replace(/\s+$/, '');
    }
}
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function (callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. ÐŸÐ¾Ð»Ð¾Ð¶Ð¸Ð¼ O Ñ€Ð°Ð²Ð½Ñ‹Ð¼ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ñƒ Ð²Ñ‹Ð·Ð¾Ð²Ð° ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. ÐŸÐ¾Ð»Ð¾Ð¶Ð¸Ð¼ lenValue Ñ€Ð°Ð²Ð½Ñ‹Ð¼ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ñƒ Ð²Ñ‹Ð·Ð¾Ð²Ð° Ð²Ð½ÑƒÑ‚Ñ€ÐµÐ½Ð½ÐµÐ³Ð¾ Ð¼ÐµÑ‚Ð¾Ð´Ð° Get Ð¾Ð±ÑŠÐµÐºÑ‚Ð° O Ñ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ð¾Ð¼ "length".
        // 3. ÐŸÐ¾Ð»Ð¾Ð¶Ð¸Ð¼ len Ñ€Ð°Ð²Ð½Ñ‹Ð¼ ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. Ð•ÑÐ»Ð¸ IsCallable(callback) Ñ€Ð°Ð²ÐµÐ½ false, Ð²Ñ‹ÐºÐ¸Ð½ÐµÐ¼ Ð¸ÑÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ TypeError.
        // Ð¡Ð¼Ð¾Ñ‚Ñ€Ð¸Ñ‚Ðµ: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. Ð•ÑÐ»Ð¸ thisArg Ð¿Ñ€Ð¸ÑÑƒÑ‚ÑÑ‚Ð²ÑƒÐµÑ‚, Ð¿Ð¾Ð»Ð¾Ð¶Ð¸Ð¼ T Ñ€Ð°Ð²Ð½Ñ‹Ð¼ thisArg; Ð¸Ð½Ð°Ñ‡Ðµ Ð¿Ð¾Ð»Ð¾Ð¶Ð¸Ð¼ T Ñ€Ð°Ð²Ð½Ñ‹Ð¼ undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. ÐŸÐ¾Ð»Ð¾Ð¶Ð¸Ð¼ k Ñ€Ð°Ð²Ð½Ñ‹Ð¼ 0
        k = 0;

        // 7. ÐŸÐ¾ÐºÐ° k < len, Ð±ÑƒÐ´ÐµÐ¼ Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€ÑÑ‚ÑŒ
        while (k < len) {

            var kValue;

            // a. ÐŸÐ¾Ð»Ð¾Ð¶Ð¸Ð¼ Pk Ñ€Ð°Ð²Ð½Ñ‹Ð¼ ToString(k).
            //   Ð­Ñ‚Ð¾ Ð½ÐµÑÐ²Ð½Ð¾Ðµ Ð¿Ñ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð´Ð»Ñ Ð»ÐµÐ²Ð¾ÑÑ‚Ð¾Ñ€Ð¾Ð½Ð½ÐµÐ³Ð¾ Ð¾Ð¿ÐµÑ€Ð°Ð½Ð´Ð° Ð² Ð¾Ð¿ÐµÑ€Ð°Ñ‚Ð¾Ñ€Ðµ in
            // b. ÐŸÐ¾Ð»Ð¾Ð¶Ð¸Ð¼ kPresent Ñ€Ð°Ð²Ð½Ñ‹Ð¼ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ñƒ Ð²Ñ‹Ð·Ð¾Ð²Ð° Ð²Ð½ÑƒÑ‚Ñ€ÐµÐ½Ð½ÐµÐ³Ð¾ Ð¼ÐµÑ‚Ð¾Ð´Ð° HasProperty Ð¾Ð±ÑŠÐµÐºÑ‚Ð° O Ñ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ð¾Ð¼ Pk.
            //   Ð­Ñ‚Ð¾Ñ‚ ÑˆÐ°Ð³ Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ Ð¾Ð±ÑŠÐµÐ´Ð¸Ð½Ñ‘Ð½ Ñ ÑˆÐ°Ð³Ð¾Ð¼ c
            // c. Ð•ÑÐ»Ð¸ kPresent Ñ€Ð°Ð²ÐµÐ½ true, Ñ‚Ð¾
            if (k in O) {

                // i. ÐŸÐ¾Ð»Ð¾Ð¶Ð¸Ð¼ kValue Ñ€Ð°Ð²Ð½Ñ‹Ð¼ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ñƒ Ð²Ñ‹Ð·Ð¾Ð²Ð° Ð²Ð½ÑƒÑ‚Ñ€ÐµÐ½Ð½ÐµÐ³Ð¾ Ð¼ÐµÑ‚Ð¾Ð´Ð° Get Ð¾Ð±ÑŠÐµÐºÑ‚Ð° O Ñ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ð¾Ð¼ Pk.
                kValue = O[k];

                // ii. Ð’Ñ‹Ð·Ð¾Ð²ÐµÐ¼ Ð²Ð½ÑƒÑ‚Ñ€ÐµÐ½Ð½Ð¸Ð¹ Ð¼ÐµÑ‚Ð¾Ð´ Call Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸ callback Ñ Ð¾Ð±ÑŠÐµÐºÑ‚Ð¾Ð¼ T Ð² ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ñ this Ð¸
                // ÑÐ¿Ð¸ÑÐºÐ¾Ð¼ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ð¾Ð², ÑÐ¾Ð´ÐµÑ€Ð¶Ð°Ñ‰Ð¸Ð¼ kValue, k Ð¸ O.
                callback.call(T, kValue, k, O);
            }
            // d. Ð£Ð²ÐµÐ»Ð¸Ñ‡Ð¸Ð¼ k Ð½Ð° 1.
            k++;
        }
        // 8. Ð’ÐµÑ€Ð½Ñ‘Ð¼ undefined.
    };
}
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () { },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}


function JCWebClientRequestError(message) {
    Error.call(this);
    this.name = 'JCWebClientRequestError';

    this.message = message;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        this.stack = (new Error()).stack || '';
    }
}

JCWebClientRequestError.prototype = Object.create(Error.prototype);
JCWebClientRequestError.prototype.constructor = JCWebClientRequestError;

function JCWebClientError(code, description, message, extendedData) {
    Error.call(this);
    this.name = 'JCWebClientError';

    this.code = code;
    this.description = description;
    this.message = (typeof(message) == 'undefined' ? description : message);

    this.extendedData = extendedData;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        this.stack = (new Error()).stack || '';
    }
}

JCWebClientError.prototype = Object.create(Error.prototype);
JCWebClientError.prototype.constructor = JCWebClientError;


function JSONParser() {
    "use strict";

    // This function creates a JSON parse function that uses a state machine rather
    // than the dangerous eval function to parse a JSON text.

    var state,      // The state of the parser, one of
        // 'go'         The starting state
        // 'ok'         The final, accepting state
        // 'firstokey'  Ready for the first key of the object or
        //              the closing of an empty object
        // 'okey'       Ready for the next key of the object
        // 'colon'      Ready for the colon
        // 'ovalue'     Ready for the value half of a key/value pair
        // 'ocomma'     Ready for a comma or closing }
        // 'firstavalue' Ready for the first value of an array or
        //              an empty array
        // 'avalue'     Ready for the next value of an array
        // 'acomma'     Ready for a comma or closing ]
        stack,      // The stack, for controlling nesting.
        container,  // The current container object or array
        key,        // The current key
        value,      // The current value
        escapes = { // Escapement translation table
            '\\': '\\',
            '"': '"',
            '/': '/',
            't': '\t',
            'n': '\n',
            'r': '\r',
            'f': '\f',
            'b': '\b'
        },
        string = {   // The actions for string tokens
            go: function () {
                state = 'ok';
            },
            firstokey: function () {
                key = value;
                state = 'colon';
            },
            okey: function () {
                key = value;
                state = 'colon';
            },
            ovalue: function () {
                state = 'ocomma';
            },
            firstavalue: function () {
                state = 'acomma';
            },
            avalue: function () {
                state = 'acomma';
            }
        },
        number = {   // The actions for number tokens
            go: function () {
                state = 'ok';
            },
            ovalue: function () {
                state = 'ocomma';
            },
            firstavalue: function () {
                state = 'acomma';
            },
            avalue: function () {
                state = 'acomma';
            }
        },
        action = {

            // The action table describes the behavior of the machine. It contains an
            // object for each token. Each object contains a method that is called when
            // a token is matched in a state. An object will lack a method for illegal
            // states.

            '{': {
                go: function () {
                    stack.push({ state: 'ok' });
                    container = {};
                    state = 'firstokey';
                },
                ovalue: function () {
                    stack.push({ container: container, state: 'ocomma', key: key });
                    container = {};
                    state = 'firstokey';
                },
                firstavalue: function () {
                    stack.push({ container: container, state: 'acomma' });
                    container = {};
                    state = 'firstokey';
                },
                avalue: function () {
                    stack.push({ container: container, state: 'acomma' });
                    container = {};
                    state = 'firstokey';
                }
            },
            '}': {
                firstokey: function () {
                    var pop = stack.pop();
                    value = container;
                    container = pop.container;
                    key = pop.key;
                    state = pop.state;
                },
                ocomma: function () {
                    var pop = stack.pop();
                    container[key] = value;
                    value = container;
                    container = pop.container;
                    key = pop.key;
                    state = pop.state;
                }
            },
            '[': {
                go: function () {
                    stack.push({ state: 'ok' });
                    container = [];
                    state = 'firstavalue';
                },
                ovalue: function () {
                    stack.push({ container: container, state: 'ocomma', key: key });
                    container = [];
                    state = 'firstavalue';
                },
                firstavalue: function () {
                    stack.push({ container: container, state: 'acomma' });
                    container = [];
                    state = 'firstavalue';
                },
                avalue: function () {
                    stack.push({ container: container, state: 'acomma' });
                    container = [];
                    state = 'firstavalue';
                }
            },
            ']': {
                firstavalue: function () {
                    var pop = stack.pop();
                    value = container;
                    container = pop.container;
                    key = pop.key;
                    state = pop.state;
                },
                acomma: function () {
                    var pop = stack.pop();
                    container.push(value);
                    value = container;
                    container = pop.container;
                    key = pop.key;
                    state = pop.state;
                }
            },
            ':': {
                colon: function () {
                    if (Object.hasOwnProperty.call(container, key)) {
                        throw new SyntaxError('Duplicate key "' + key + '"');
                    }
                    state = 'ovalue';
                }
            },
            ',': {
                ocomma: function () {
                    container[key] = value;
                    state = 'okey';
                },
                acomma: function () {
                    container.push(value);
                    state = 'avalue';
                }
            },
            'true': {
                go: function () {
                    value = true;
                    state = 'ok';
                },
                ovalue: function () {
                    value = true;
                    state = 'ocomma';
                },
                firstavalue: function () {
                    value = true;
                    state = 'acomma';
                },
                avalue: function () {
                    value = true;
                    state = 'acomma';
                }
            },
            'false': {
                go: function () {
                    value = false;
                    state = 'ok';
                },
                ovalue: function () {
                    value = false;
                    state = 'ocomma';
                },
                firstavalue: function () {
                    value = false;
                    state = 'acomma';
                },
                avalue: function () {
                    value = false;
                    state = 'acomma';
                }
            },
            'null': {
                go: function () {
                    value = null;
                    state = 'ok';
                },
                ovalue: function () {
                    value = null;
                    state = 'ocomma';
                },
                firstavalue: function () {
                    value = null;
                    state = 'acomma';
                },
                avalue: function () {
                    value = null;
                    state = 'acomma';
                }
            }
        },
        source;

    function debackslashify(text) {

        // Remove and replace any backslash escapement.

        return text.replace(/\\(?:u(.{4})|([^u]))/g, function (ignore, b, c) {
            return b
                ? String.fromCharCode(parseInt(b, 16))
                : escapes[c];
        });
    }

    return {
        init: function () {
            // Set the starting state.
            source = '';
            state = 'go';
            // The stack records the container, key, and state for each object or array
            // that contains another object or array while processing nested structures.
            stack = [];
        },
        wellformed : function() {
            // The parsing is finished. If we are not in the final 'ok' state, or if the
            // remaining source contains anything except whitespace, then we did not have
            //a well-formed JSON text.
            if (state === 'ok' && !(/[^\u0020\t\n\r]/.test(source)))
                return true;
            else
                return false;
            //throw state instanceof SyntaxError
            //    ? state
            //    : new SyntaxError('JSON');
        },
        result : function(reviver) {

            // If there is a reviver function, we recursively walk the new structure,
            // passing each name/value pair to the reviver function for possible
            // transformation, starting with a temporary root object that holds the current
            // value in an empty key. If there is not a reviver function, we simply return
            // that value.

            return typeof reviver === 'function'
                ? (function walk(holder, key) {
                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }({ '': value }, ''))
                : value;

        },
        parse: function (pieceOfJSON) {

            // A regular expression is used to extract tokens from the JSON text.
            // The extraction process is cautious.

            var result,
                tx = /^[\u0020\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;

            //  tx = /^[\u0020\t\n\r]* // white space
            //      (?:
            //          ([,:\[\]{}] | true | false | null) |        // , : [ ] { } true false null
            //          (-?\d+ (?:\.\d*)? (?:[eE][+\-]?\d+)? ) |    // -123.456E-78
            //          "(                                                              // "
            //               (?:[^\r\n\t\\\"] | \\(?:["\\\/trnfb] | u[0-9a-fA-F]{4}) )* // white space \ " \u0035
            //          )"                                                              // "
            //      )/;

            // If any error occurs, we will catch it and go not wellformed.
            source += pieceOfJSON;

            try {

                // For each token...
                while (true) {
                    result = tx.exec(source);
                    if (!result) {
                        break;
                    }

                    // result is the result array from matching the tokenizing regular expression.
                    //  result[0] contains everything that matched, including any initial whitespace.
                    //  result[1] contains any punctuation that was matched, or true, false, or null.
                    //  result[2] contains a matched number, still in string form.
                    //  result[3] contains a matched string, without quotes but with escapement.

                    if (result[1]) {

                        // Token: Execute the action for this state and token.

                        action[result[1]][state]();

                    } else if (result[2]) {

                        // Number token: Convert the number string into a number value and execute
                        // the action for this state and number.

                        value = +result[2];
                        number[state]();
                    } else {

                        // String token: Replace the escapement sequences and execute the action for
                        // this state and string.

                        value = debackslashify(result[3]);
                        string[state]();
                    }

                    // Remove the token from the string. The loop will continue as long as there
                    // are tokens. This is a slow process, but it allows the use of ^ matching,
                    // which assures that no illegal tokens slip through.

                    source = source.slice(result[0].length);
                }

                // If we find a state/token combination that is illegal, then the action will
                // cause an error. We handle the error by simply changing the state.

            } catch (e) {
                state = e;
            }
        }
    };
};

/*!
* \class JCWebClient
* \brief JC-WebClient SDK
*/

//@cond DUMMY

/// API 1.0 (Deprecated)
var JCWebClient = (function () {

    var json_parse = JSONParser();

    var _JCWebClient_Static = new Object;

    // Ð¡Ñ‚Ñ€Ð¾ÐºÐ° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°
    var thisPageUrl = window.location.href;
    var urlParts = thisPageUrl.split("//");
    if (urlParts[0] == 'file:')
        _JCWebClient_Static.requestUrl = "https://localhost:24738/jcext?";
    else
        _JCWebClient_Static.requestUrl = urlParts[0] + "//localhost:24738/jcext?";

    _JCWebClient_Static.SystemInfoClass = {
        guid: "guid",
        user: "user",
        osType: "osType",
        osDescription: "osDescription",
        osArchitecture: "osArchitecture"
    };

    // Ð’ÑÐ¿Ð¾Ð¼Ð¾Ð³Ð°Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸ Ð¸ Ð¿ÐµÑ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ðµ
    var _isInitialized = false;

    _JCWebClient_Static.saveSession = true;
    _JCWebClient_Static.initialize = initialize;
    _JCWebClient_Static.isInitialized = isInitialized;

    // ÐžÐ±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð¾ÑˆÐ¸Ð±Ð¾Ðº
    _JCWebClient_Static.isAsyncOperationInProgress = isAsyncOperationInProgress;

    // ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ° Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ñ‹Ñ… ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ… ÑÐ²ÑÐ·Ð°Ð½Ð½Ñ‹Ñ… ÑÐ¾ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚Ð¾Ð¹
    _JCWebClient_Static.TokenAddedSubscriptions = [];
    _JCWebClient_Static.TokenRemovedSubscriptions = [];
    _JCWebClient_Static.SmartCardAddedSubscriptions = [];
    _JCWebClient_Static.SmartCardRemovedSubscriptions = [];
    _JCWebClient_Static.LoginStateChangedSubscriptions = [];
    _JCWebClient_Static.addEventListener = addEventListener;
    _JCWebClient_Static.attachEvent = attachEvent;
    _JCWebClient_Static.removeEventListener = removeEventListener;
    _JCWebClient_Static.detachEvent = detachEvent;
    // Ð”Ð¾Ð»Ð¶Ð½Ð° Ð¿Ñ€Ð¾Ñ…Ð¾Ð´Ð¸Ñ‚ÑŒ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° if (typeof (JCWebClient) == 'undefined' || JCWebClient().valid == null)
    _JCWebClient_Static.valid = true;
    _JCWebClient_Static.session_id = "";

    // Ð ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚ PKCS11
    _JCWebClient_Static.SCLayerResponse = null;

    // ÐŸÐ¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑÐºÐ¸Ð¹ Ð¾Ð±Ñ€Ð°Ñ‚Ð½Ñ‹Ð¹ Ð²Ñ‹Ð·Ð¾Ð²
    _JCWebClient_Static.callback = null;
    _JCWebClient_Static.asyncRequestIsOngoing = false;

    // ID Ñ‚Ð°Ð¹Ð¼Ð°ÑƒÑ‚Ð° Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸ Ð¾Ñ‚Ð²ÐµÑ‚Ð° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ° ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ð¹
    _JCWebClient_Static.eventRetriveCheckTimeoutId = null;

    // Ð¡Ð»ÑƒÐ¶ÐµÐ±Ð½Ñ‹Ðµ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸
    _JCWebClient_Static.getAllTokens = getAllTokens;
    _JCWebClient_Static.getAllSlots = getAllSlots;
    _JCWebClient_Static.getTokenInfo = getTokenInfo;
    _JCWebClient_Static.getSlotInfo = getSlotInfo;
    _JCWebClient_Static.getLoggedInState = getLoggedInState;
    _JCWebClient_Static.getPluginVersion = getPluginVersion;
    _JCWebClient_Static.checkWebBrowserVersion = checkWebBrowserVersion;
    _JCWebClient_Static.initToken = initToken;
    _JCWebClient_Static.initTokenWithoutUserPIN = initTokenWithoutUserPIN;
    _JCWebClient_Static.initTokenUI = initTokenUI;
    _JCWebClient_Static.getSystemInfo = getSystemInfo;
    _JCWebClient_Static.getSystemInfoAsync = getSystemInfoAsync;
    // ÐžÐ±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð¾ÑˆÐ¸Ð±Ð¾Ðº
    _JCWebClient_Static.getLastError = getLastError;
    _JCWebClient_Static.getErrorMessage = getErrorMessage;
    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ PIN ÐºÐ¾Ð´Ð°Ð¼Ð¸
    _JCWebClient_Static.bindToken = bindToken;
    _JCWebClient_Static.bindTokenAsync = bindTokenAsync;
    _JCWebClient_Static.bindTokenUI = bindTokenUI;
    _JCWebClient_Static.unbindToken = unbindToken;
    _JCWebClient_Static.changePIN = changePIN;
    _JCWebClient_Static.changePINasync = changePINAsync;
    _JCWebClient_Static.changePINAsync = changePINAsync;
    _JCWebClient_Static.changePINUI = changePINUI;
    _JCWebClient_Static.changePINUIAsynch = changePINUIAsync;
    _JCWebClient_Static.changePINUIAsync = changePINUIAsync;
    _JCWebClient_Static.initUserPIN = initUserPIN;
    _JCWebClient_Static.initUserPINasync = initUserPINAsync;
    _JCWebClient_Static.initUserPINAsync = initUserPINAsync;
    _JCWebClient_Static.initUserPINUI = initUserPINUI;
    _JCWebClient_Static.initUserPINUIAsynch = initUserPINUIAsync;
    _JCWebClient_Static.initUserPINUIAsync = initUserPINUIAsync;
    _JCWebClient_Static.initUserPINAFT = initUserPINAFT;
    _JCWebClient_Static.unblockUserPIN = unblockUserPIN;
    _JCWebClient_Static.unblockUserPINasync = unblockUserPINasync;
    _JCWebClient_Static.unblockUserPINUI = unblockUserPINUI;
    _JCWebClient_Static.unblockUserPINUIAsynch = unblockUserPINUIAsync;
    _JCWebClient_Static.unblockUserPINUIAsync = unblockUserPINUIAsync;
    // ÐžÐ¿ÐµÑ€Ð°Ñ†Ð¸Ð¸ Ñ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð¾Ð¼
    _JCWebClient_Static.createContainer = createContainer;
    _JCWebClient_Static.createContainerEx = createContainerEx;
    _JCWebClient_Static.createContainerAsync = createContainerAsync;
    _JCWebClient_Static.createContainerExAsync = createContainerExAsync;
    _JCWebClient_Static.deleteContainerOrCertificate = deleteContainerOrCertificate;
    _JCWebClient_Static.deleteCertificate = deleteCertificate;
    _JCWebClient_Static.changeContainerDescription = changeContainerDescription;
    // Ð˜Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ñ Ñ PKI
    _JCWebClient_Static.genCSR = genCSR;
    _JCWebClient_Static.genCSRAsync = genCSRAsync;
    _JCWebClient_Static.genCSRUsingHardwareHash = genCSRUsingHardwareHash;
    _JCWebClient_Static.genCSRUsingHardwareHashAsync = genCSRUsingHardwareHashAsync;
    _JCWebClient_Static.writeSelfSignedCertificate = writeSelfSignedCertificate;
    _JCWebClient_Static.writeCertificate = writeCertificate;
    _JCWebClient_Static.writeCertificateAsync = writeCertificateAsync;
    _JCWebClient_Static.writeSignerCertificate = writeSignerCertificate;
    _JCWebClient_Static.writeSignerCertificateAsync = writeSignerCertificateAsync;
    _JCWebClient_Static.deleteSignerCertificateById = deleteSignerCertificateById;
    _JCWebClient_Static.deleteAllSignerCertificatesForId = deleteAllSignerCertificatesForId;
    _JCWebClient_Static.deleteAllSignerCertificates = deleteAllSignerCertificates;
    _JCWebClient_Static.readCertificate = readCertificate;
    _JCWebClient_Static.readCertificateEx = readCertificateEx;
    _JCWebClient_Static.readSignerCertificateList = readSignerCertificateList;
    _JCWebClient_Static.readSignerCertificateListAsync = readSignerCertificateListAsync;
    _JCWebClient_Static.writeServerPublicKey = writeServerPublicKey;
    _JCWebClient_Static.readServerPublicKey = readServerPublicKey;
    _JCWebClient_Static.writeServerCertificate = writeServerCertificate;
    _JCWebClient_Static.readServerCertificate = readServerCertificate;
    _JCWebClient_Static.readCkaID = readCkaID;
    _JCWebClient_Static.writeCkaID = writeCkaID;
    _JCWebClient_Static.readPublicKey = readPublicKey;
    _JCWebClient_Static.getCertificateInfo = getCertificateInfo;
    _JCWebClient_Static.getCertificatePublicKey = getCertificatePublicKey;
    _JCWebClient_Static.getCertificateInfoEx = getCertificateInfoEx;
    _JCWebClient_Static.getContainerList = getContainerList;
    _JCWebClient_Static.parseCertificateEx = parseCertificateEx;
    _JCWebClient_Static.parseCertificate = parseCertificate;
    _JCWebClient_Static.parseX509CertificateEx = parseX509CertificateEx;
    _JCWebClient_Static.parseX509Certificate = parseX509Certificate;
    _JCWebClient_Static.getCertificateList = getCertificateList;
    _JCWebClient_Static.getCertificateListAsync = getCertificateListAsync;
    _JCWebClient_Static.getCertificateListEx = getCertificateListEx;
    _JCWebClient_Static.getCertificateListExAsync = getCertificateListExAsync;
    _JCWebClient_Static.getSignerCertificateList = getSignerCertificateList;
    _JCWebClient_Static.getSignerCertificateListAsync = getSignerCertificateListAsync;
    _JCWebClient_Static.getAllValidCertificateChains = getAllValidCertificateChains;
    _JCWebClient_Static.getAllValidCertificateChainsAsync = getAllValidCertificateChainsAsync;
    _JCWebClient_Static.getAllInvalidCertificateChains = getAllInvalidCertificateChains;
    _JCWebClient_Static.getAllInvalidCertificateChainsAsync = getAllInvalidCertificateChainsAsync;
    _JCWebClient_Static.getAllUnusedCertificateChains = getAllUnusedCertificateChains;
    _JCWebClient_Static.getAllUnusedCertificateChainsAsync = getAllUnusedCertificateChainsAsync;
    _JCWebClient_Static.getAllCertificateChains = getAllCertificateChains;
    _JCWebClient_Static.getAllCertificateChainsAsync = getAllCertificateChainsAsync;
    _JCWebClient_Static.createStandaloneCertificate = createStandaloneCertificate;
    _JCWebClient_Static.verifyCertificateChain = verifyCertificateChain;
    _JCWebClient_Static.verifyCertificateChainAsync = verifyCertificateChainAsync;
    _JCWebClient_Static.verifyCertificateChainEx = verifyCertificateChainEx;
    _JCWebClient_Static.verifyCertificateChainExAsync = verifyCertificateChainExAsync;
    _JCWebClient_Static.verifyCertificateChainExExternalTrustedCerts = verifyCertificateChainExExternalTrustedCerts;
    _JCWebClient_Static.verifyCertificateChainExExternalTrustedCertsAsync = verifyCertificateChainExExternalTrustedCertsAsync;
    // ÐŸÐ¾Ð´Ð¿Ð¸ÑÑŒ Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸
    _JCWebClient_Static.enableReverifyPINOnSignature = enableReverifyPINOnSignature;
    _JCWebClient_Static.isReverifyPINOnSignatureEnabled = isReverifyPINOnSignatureEnabled;
    _JCWebClient_Static.signData = signData;
    _JCWebClient_Static.signDataAsync = signDataAsync;
    _JCWebClient_Static.signDataInFile = signDataInFile;
    _JCWebClient_Static.signDataInFileBase64 = signDataInFileBase64;
    _JCWebClient_Static.signDataUsingHardwareHashBase64 = signDataUsingHardwareHashBase64;
    _JCWebClient_Static.signDataInFileUsingHardwareHash = signDataInFileUsingHardwareHash;
    _JCWebClient_Static.signDataInFileUsingHardwareHashBase64 = signDataInFileUsingHardwareHashBase64;
    _JCWebClient_Static.signBase64EncodedData = signBase64EncodedData;
    _JCWebClient_Static.signBase64EncodedDataAsync = signBase64EncodedDataAsync;
    _JCWebClient_Static.signDataUsingHardwareHash = signDataUsingHardwareHash;
    _JCWebClient_Static.signBase64EncodedDataUsingHardwareHash = signBase64EncodedDataUsingHardwareHash;
    _JCWebClient_Static.signHash = signHash;
    _JCWebClient_Static.signDataInByte = signDataInByte;
    _JCWebClient_Static.signHashInByte = signHashInByte;
    _JCWebClient_Static.signDataInByteAsync = signDataInByteAsync;
    _JCWebClient_Static.signHashInByteAsync = signHashInByteAsync;
    _JCWebClient_Static.verifyData = verifyData;
    _JCWebClient_Static.verifyDataHW = verifyDataHW;
    _JCWebClient_Static.verifyDataHWUsingHardwareHash = verifyDataHWUsingHardwareHash;
    _JCWebClient_Static.verifyBase64EncodedData = verifyBase64EncodedData;
    _JCWebClient_Static.verifyBase64EncodedDataHW = verifyBase64EncodedDataHW;
    _JCWebClient_Static.verifyBase64EncodedDataHWUsingHardwareHash = verifyBase64EncodedDataHWUsingHardwareHash;
    _JCWebClient_Static.verifyRawBase64EncodedData = verifyRawBase64EncodedData;
    _JCWebClient_Static.verifyRawBase64EncodedDataEx = verifyRawBase64EncodedDataEx;
    _JCWebClient_Static.verifyDataInFile = verifyDataInFile;
    _JCWebClient_Static.verifyDataInByte = verifyDataInByte;
    _JCWebClient_Static.verifyHashInByte = verifyHashInByte;
    _JCWebClient_Static.digest = digest;
    _JCWebClient_Static.digestAsync = digestAsync;
    _JCWebClient_Static.digestHardware = digestHardware;
    _JCWebClient_Static.digestHardwareAsync = digestHardwareAsync;
    _JCWebClient_Static.digestNoAuth = digestNoAuth;
    _JCWebClient_Static.digestNoAuthAsync = digestNoAuthAsync;
    _JCWebClient_Static.digestNoAuthHardware = digestNoAuthHardware;
    _JCWebClient_Static.digestNoAuthHardwareAsync = digestNoAuthHardwareAsync;
    _JCWebClient_Static.pkcs7Parse = pkcs7Parse;
    _JCWebClient_Static.pkcs7ParseBase64Encoded = pkcs7ParseBase64Encoded;
    _JCWebClient_Static.pkcs7ParseInFile = pkcs7ParseInFile;
    _JCWebClient_Static.pkcs7ParseInFileBase64Encoded = pkcs7ParseInFileBase64Encoded;
    _JCWebClient_Static.makeContainerPkcs21Ready = makeContainerPkcs21Ready;
    // ÐÑƒÑ‚ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ Ð¸ Ð·Ð°Ñ‰Ð¸Ñ‚Ð° ÐºÐ°Ð½Ð°Ð»Ð°
    _JCWebClient_Static.establishSChannelBegin = establishSChannelBegin;
    _JCWebClient_Static.establishSChannelContinue = establishSChannelContinue;
    _JCWebClient_Static.unilateralAuthenticationBegin = unilateralAuthenticationBegin;
    _JCWebClient_Static.unilateralAuthenticationContinue = unilateralAuthenticationContinue;
    _JCWebClient_Static.encode = encode;
    _JCWebClient_Static.decode = decode;
    _JCWebClient_Static.openTLSConnection = openTLSConnection;
    _JCWebClient_Static.openTLSConnectionAsync = openTLSConnectionAsync;
    _JCWebClient_Static.openUnilateralTLSConnection = openUnilateralTLSConnection;
    _JCWebClient_Static.openUnilateralTLSConnectionAsync = openUnilateralTLSConnectionAsync;
    _JCWebClient_Static.sendDataTLS = sendDataTLS;
    _JCWebClient_Static.sendDataTLSAsync = sendDataTLSAsync;
    _JCWebClient_Static.closeTLSConnection = closeTLSConnection;
    _JCWebClient_Static.closeTLSConnectionAsync = closeTLSConnectionAsync;
    _JCWebClient_Static.startAjaxTlsServer = startAjaxTlsServer;
    _JCWebClient_Static.stopAjaxTlsServer = stopAjaxTlsServer;
    _JCWebClient_Static.startTlsProxyPass = startTlsProxyPass;
    _JCWebClient_Static.stopTlsProxyPass = stopTlsProxyPass;
    // Ð¥Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ñ…
    _JCWebClient_Static.storeBinaryData = storeBinaryData;
    _JCWebClient_Static.storePrivateBinaryData = storePrivateBinaryData;
    _JCWebClient_Static.getBinaryDataObjectList = getBinaryDataObjectList;
    _JCWebClient_Static.readBinaryObject = readBinaryObject;
    _JCWebClient_Static.deleteBinaryObject = deleteBinaryObject;
    _JCWebClient_Static.modifyBinaryObject = modifyBinaryObject;
    // ÐœÐµÑ‚Ð¾Ð´Ñ‹ Ð´Ð»Ñ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ Ñ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð¾Ð¼ Ð¸ Ñ‚ÐµÑ…Ð½Ð¾Ð»Ð¾Ð³Ð¸ÐµÐ¹ SWYX
    _JCWebClient_Static.isSwyxReader = isSwyxReader;
    _JCWebClient_Static.enroll = enroll;
    _JCWebClient_Static.performPersonalization = performPersonalization;
    _JCWebClient_Static.performPersonalizationAsync = performPersonalizationAsync;
    _JCWebClient_Static.getReaderAppletSerialNumber = getReaderAppletSerialNumber;
    _JCWebClient_Static.swyxStart = swyxStart;
    _JCWebClient_Static.swyxStartEx = swyxStartEx;
    _JCWebClient_Static.swyxStartAsync = swyxStartAsync;
    _JCWebClient_Static.swyxStartExAsync = swyxStartExAsync;
    _JCWebClient_Static.swyxStop = swyxStop;
    _JCWebClient_Static.swyxStopAsync = swyxStopAsync;
    _JCWebClient_Static.swyxDisplay = swyxDisplay;
    _JCWebClient_Static.swyxDisplayEx = swyxDisplayEx;
    _JCWebClient_Static.swyxDisplayAsync = swyxDisplayAsync;
    _JCWebClient_Static.swyxDisplayExAsync = swyxDisplayExAsync;
    _JCWebClient_Static.swyxSign = swyxSign;
    _JCWebClient_Static.swyxSignAsync = swyxSignAsync;
    _JCWebClient_Static.swyxSignEx = swyxSignEx;
    _JCWebClient_Static.swyxSignExAsync = swyxSignExAsync;
    _JCWebClient_Static.aftEnterAdminPINAsync = aftEnterAdminPINAsync;
    _JCWebClient_Static.aftSaveAdminPINAsync = aftSaveAdminPINAsync;
    _JCWebClient_Static.aftInitCardAsync = aftInitCardAsync;
    _JCWebClient_Static.aftInitUserPINAsync = aftInitUserPINAsync;
    _JCWebClient_Static.bindTokenAFTAsync = bindTokenAFTAsync;
    _JCWebClient_Static.aftGetReaderVersion = aftGetReaderVersion;
    _JCWebClient_Static.aftCardlessSupport = aftCardlessSupport;
    _JCWebClient_Static.aftGetPINAsync = aftGetPINAsync;
    _JCWebClient_Static.aftGetNewPINAsync = aftGetNewPINAsync;
    _JCWebClient_Static.aftUpdateFirmwareAsync = aftUpdateFirmwareAsync;
    _JCWebClient_Static.aftGetBrokenReaders = aftGetBrokenReaders;
    _JCWebClient_Static.aftFixBrokenReaderAsync = aftFixBrokenReaderAsync;
    // Debug
    _JCWebClient_Static.debugFunction = debugFunction;
    _JCWebClient_Static.debugFunctionAsynch = debugFunctionAsynch;
    // Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ Ð¾ÐºÐ¾Ð½Ñ‡Ð°Ð½Ð¸Ñ WEB-ÑÐµÑÑÐ¸Ð¸
    _JCWebClient_Static.closeWebSession = closeWebSession;

    _JCWebClient_Static.setAppletEnabled = setAppletEnabled;
    _JCWebClient_Static.setAppletEnabledAsync = setAppletEnabledAsync;


//@endcond


    /*!
    * \fn loadSessionID()
    * \memberof JCWebClient
    * \brief ÐÐ°Ñ‡Ð°Ñ‚ÑŒ Ñ€Ð°Ð±Ð¾Ñ‚Ñƒ Ñ ÐºÐ¾Ð½Ñ‚ÐµÐºÑÑ‚Ð¾Ð¼ JCWebClient().
    *
    * Ð­Ñ‚Ð¾Ñ‚ Ð¼ÐµÑ‚Ð¾Ð´ Ð½ÑƒÐ¶Ð½Ð¾ Ð¾Ð±ÑÐ·Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾ Ð²Ñ‹Ð·Ñ‹Ð²Ð°Ñ‚ÑŒ Ð² Ð½Ð°Ñ‡Ð°Ð»Ðµ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ ÑÐºÑ€Ð¿Ð¸Ñ‚Ð° Ð² Ñ€Ð°Ð¼ÐºÐ°Ñ… Ð²ÐµÐ± ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹.
    * ÐŸÐµÑ€Ð²Ð¾Ð½Ð°Ñ‡Ð°Ð»ÑŒÐ½Ð¾ ÐºÐ¾Ð½Ñ‚ÐµÐºÑÑ‚ JCWebClient() ÑÐ¾Ð·Ð´Ð°ÐµÑ‚ÑÑ Ð¿ÑƒÑÑ‚Ñ‹Ð¼. Ð’ Ñ…Ð¾Ð´Ðµ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ Ñ JCWebClient() Ð² Ñ€Ð°Ð¼ÐºÐ°Ñ… ÐºÐ¾Ð½Ñ‚ÐµÐºÑÑ‚Ð° Ð¿Ñ€Ð¾Ð¸ÑÑ…Ð¾Ð´Ð¸Ñ‚ Ð»Ð¾Ð³Ð¾Ð½ Ð½Ð° ÑƒÑ€Ð¾Ð²Ð½Ðµ ÑÐ¼Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚Ñ‹,
    * ÑÐ¾Ð·Ð´Ð°ÑŽÑ‚ÑÑ PKCS#11 Ð¾Ð±ÑŠÐµÐºÑ‚Ñ‹, ÑƒÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÑ‚ÑÑ TLS ÑÐµÑÑÐ¸Ñ Ñ ÑƒÐ´Ð°Ð»ÐµÐ½Ð½Ñ‹Ð¼ ÑÐµÑ€Ð²ÐµÑ€Ð¾Ð¼ Ð¸ Ñ‚.Ð´. Ð’ Ð´Ð°Ð»ÑŒÐ½ÐµÐ¹ÑˆÐµÐ¼ Ð¼Ð¾Ð¶ÐµÑ‚ Ð¿Ñ€Ð¾Ð¸Ð·Ð¾Ð¹Ñ‚Ð¸ Ð¿ÐµÑ€ÐµÑ…Ð¾Ð´ Ð½Ð° Ð´Ñ€ÑƒÐ³ÑƒÑŽ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ
    * Ñ Ð¿Ð¾Ð¼Ð¾Ñ‰ÑŒÑŽ Ð¼ÐµÑ‚Ð¾Ð´Ð° JCWebClient().navigateTo(..., true), Ð¸ ÐºÐ¾Ð½Ñ‚ÐµÐºÑÑ‚ JCWebClient() Ð¿ÐµÑ€ÐµÐ¹Ð´ÐµÑ‚ Ð² Ð¾Ð±Ð»Ð°ÑÑ‚ÑŒ Ð²Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚Ð¸ ÑÐºÑ€Ð¸Ð¿Ñ‚Ð¾Ð² Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÑÐµÐ¼Ñ‹Ñ… Ð½Ð° Ð½Ð¾Ð²Ð¾Ð¹ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ.
    * Ð•ÑÐ»Ð¸ Ð¾ÑÑƒÑ‰ÐµÑÑ‚Ð²Ð»ÑÑ‚ÑŒ Ð½Ð°Ð²Ð¸Ð³Ð°Ñ†Ð¸ÑŽ Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð¼ JCWebClient().navigateTo(..., false) Ñ‚Ð¾ ÐºÐ¾Ð½Ñ‚ÐµÐºÑÑ‚ JCWebClient() Ð½Ð° Ð² Ð¾Ð±Ð»Ð°ÑÑ‚Ð¸ Ð²Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚Ð¸ ÑÐºÑ€Ð¸Ð¿Ñ‚Ð¾Ð² Ð½Ð¾Ð²Ð¾Ð¹
    * ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹ Ð±ÑƒÐ´ÐµÑ‚ Ð¸Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ð½ Ð·Ð°Ð½Ð¾Ð²Ð¾
    */
    function loadSessionID() {
        var ret = "";

        if(sessionStorage)
        {
            ret = sessionStorage.getItem("jc-session-id");

            if (ret == null || sessionStorage.getItem("jc-session-id-in-use")) {
                ret = String(Math.floor(Math.random()*4000000000));
            }

            sessionStorage.setItem("jc-session-id", ret);
            sessionStorage.setItem("jc-session-id-in-use", true);
        }

        _JCWebClient_Static.session_id = ret;
    }

    return function (callback) {
        if (callback) {
            _JCWebClient_Static.callback = callback;
        }
        // Ð² Ñ…Ð¾Ð´Ðµ Ð¾Ð±Ñ€Ð°Ñ‰ÐµÐ½Ð¸Ñ JCWebClient() Ð¸Ð· JSONP callback Ð½Ðµ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½
        return _JCWebClient_Static;
    }

    function isInitialized() {
        return _isInitialized;
    }

    function initialize() {
        if (typeof (JCWebClient2) != 'undefined' && typeof (JCWebClient2.isInitialized) === 'function' && JCWebClient2.isInitialized()) {
            throw new Error("JCWebClient API v2 has been already initialized");
        }

        _isInitialized = true;

        // Ð—Ð°Ð³Ñ€ÑƒÐ¶Ð°ÐµÐ¼ ID Web-ÑÐµÑÑÐ¸Ð¸ Ð¸Ð· sesionStore
        loadSessionID();
        // Ð’ ÑÐ¸Ð»Ñƒ Ð¾ÑÐ¾Ð±ÐµÐ½Ð½Ð¾ÑÑ‚ÐµÐ¹ FireFox, Ð¿ÐµÑ€Ð²Ñ‹Ð¹ ajax Ð·Ð°Ð¿Ñ€Ð¾Ñ Ðº Ð»Ð¾ÐºÐ°Ð»ÑŒÐ½Ð¾Ð¼Ñƒ Ð²ÐµÐ± ÑÐµÑ€Ð²ÐµÑ€Ñƒ Ð´Ð¾Ð»Ð¶ÐµÐ½ Ð±Ñ‹Ñ‚ÑŒ ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ñ‹Ð¹
        // ÐµÑÐ»Ð¸ Ð¿Ð¾ÑÐ»Ð°Ñ‚ÑŒ Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ñ‹Ð¹, ÐºÐ°ÐºÐ¸Ð¼ ÑÐ²Ð»ÑÐµÑ‚ÑÑ JCWebClient().RetrieveEvents(), Ñ‚Ð¾ Ð¿Ð¾ÑÐ»Ðµ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ TLS
        // ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ñ, FireFox Ð²Ñ…Ð¾Ð´Ð¸Ñ‚ Ð² ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ðµ Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ñ
        // Ñ‚Ð°ÐºÐ¸Ð¼ Ð¾Ð±Ñ€Ð°Ð·Ð¾Ð¼, Ð·Ð°Ð¿Ñ€Ð¾Ñ Ping() Ð½ÑƒÐ¶ÐµÐ½ Ð´Ð»Ñ Ñ‚Ð¾Ð³Ð¾ Ñ‡Ñ‚Ð¾Ð±Ñ‹ "Ð²Ð·Ð±Ð¾Ð´Ñ€Ð¸Ñ‚ÑŒ" FF Ð¸ Ð¿ÐµÑ€ÐµÐ¹Ñ‚Ð¸ Ðº Ð¾Ñ‚ÑÑ‹Ð»ÐºÐµ Ð¿Ð¾ÑÐ»ÐµÐ´ÑƒÑŽÑ‰Ð¸Ñ…
        // ajax Ð·Ð°Ð¿Ñ€Ð¾ÑÐ¾Ð² Ñ‚Ð°ÐºÐ¸Ñ… ÐºÐ°Ðº getPluginVersion() Ð¸ Ñ‚.Ð´.
        Ping();
        // Ð•ÑÐ»Ð¸ Ð·Ð°Ð´ÐµÐ¹ÑÑ‚Ð²Ð¾Ð°Ð½ JCWebClient 3.0, Ð·Ð°Ð¿ÑƒÑÐºÐ°ÐµÐ¼ Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½ÑƒÑŽ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÑƒ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ð¹ Ð¾ eToken ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ…
        RetrieveEvents();

        attachWindowUnloadEvent();
    }

    // ÐžÐ±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð¾ÑˆÐ¸Ð±Ð¾Ðº
    function isAsyncOperationInProgress() {
        if (JCWebClient().asyncRequestIsOngoing) {
            return true;
        }
        else {
            return false;
        }
    }

    function attachWindowUnloadEvent() {

        var pageUnloaded = false;

        function onPageUnload() {
            if(pageUnloaded) {
                return;
            }
            pageUnloaded = true;

            if(sessionStorage) {
                sessionStorage.removeItem("jc-session-id-in-use");
            }

            if (_JCWebClient_Static.saveSession && sessionStorage) {
                sessionStorage.setItem("jc-session-id", _JCWebClient_Static.session_id);
            } else {
                // ÐŸÐ¾Ð²ÐµÐ´ÐµÐ½Ð¸Ðµ Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ
                _JCWebClient_Static.closeWebSession();
            }
        }

        window.onbeforeunload = onPageUnload;
        window.onunload = onPageUnload;
    }

    function constructTypedResponse(toBeTypedResponse) {
        var prefBlob = "blob:";

        var objectType = Object.prototype.toString.call(toBeTypedResponse);
        if(objectType == '[object Object]') {
            for (prop in toBeTypedResponse) {
                prop = constructTypedResponse(prop);
            }
        } else if (objectType == '[object Array]') {
            var arrRes = [];

            for (var idx = 0; idx < toBeTypedResponse.length; idx++) {

                var isBlob = false;
                var subType = Object.prototype.toString.call(toBeTypedResponse[idx]);
                if (subType == '[object String]') {
                    if (toBeTypedResponse[idx].indexOf(prefBlob) == 0) {
                        isBlob = true;
                    }
                }

                if (isBlob) {
                    toBeTypedResponse[idx] = constructTypedResponse(toBeTypedResponse[idx]);
                    for (var i = 0; i < toBeTypedResponse[idx].length; i++) {
                        arrRes.push(toBeTypedResponse[idx][i]);
                    }
                }
                else {
                    arrRes.push(constructTypedResponse(toBeTypedResponse[idx]));
                }
            }

            toBeTypedResponse = arrRes;
        } else if (objectType == '[object String]') {
            var prefStr = "str:";
            var prefBool = "bool:";
            var prefInt = "int:";
            var prefCkb = "ckb:";
            var prefCkul = "ckul:";
            if (toBeTypedResponse.indexOf(prefStr) == 0) {
                var unprefixedValue = toBeTypedResponse.substring(prefStr.length);
                toBeTypedResponse = unprefixedValue;
            } else if (toBeTypedResponse.indexOf(prefBool) == 0) {
                var strValue = toBeTypedResponse.substring(prefBool.length);
                if (strValue == "true") {
                    toBeTypedResponse = true;
                } else {
                    toBeTypedResponse = false;
                }
            } else if (toBeTypedResponse.indexOf(prefInt) == 0) {
                var strValue = toBeTypedResponse.substring(prefInt.length);
                toBeTypedResponse = parseInt(strValue);
            } else if (toBeTypedResponse.indexOf(prefCkb) == 0) {
                var strValue = toBeTypedResponse.substring(prefCkb.length);
                toBeTypedResponse = parseInt(strValue) % 256;
            } else if (toBeTypedResponse.indexOf(prefCkul) == 0) {
                var strValue = toBeTypedResponse.substring(prefCkul.length);
                toBeTypedResponse = parseInt(strValue);
            } else if (toBeTypedResponse.indexOf(prefBlob) == 0) {
                var strValue = toBeTypedResponse.substring(prefBlob.length);
                var arrNewNode = new Array;
                for (i = 0; toBeTypedResponse.length - prefBlob.length > i; i += 2) {
                    arrNewNode[i / 2] = parseInt("0x" + toBeTypedResponse.substring(prefBlob.length + i, prefBlob.length + i + 2)) % 256;
                }
                toBeTypedResponse = arrNewNode;
            }
        }
        return toBeTypedResponse;
    }

    function requestJcExtFunction2(RequestObj, ticket_id) {
        _JCWebClient_Static.SCLayerResponse = null;

        RequestObj.session_id = _JCWebClient_Static.session_id;
        if (null != ticket_id) {
            RequestObj.ticket_id = ticket_id;
        }
        else {
            RequestObj.ticket_id = String(Math.floor(Math.random() * 4000000000));
        }

        var jsonRequest = JSON.stringify(RequestObj);

        var xhr = new XMLHttpRequest;

        for (var bKeepTrying = true; bKeepTrying;) {
            try {
                xhr.open('POST', _JCWebClient_Static.requestUrl, false);
                xhr.send(jsonRequest);
                if (xhr.status == 200) {
                    bKeepTrying = false;
                }
            }
            catch (exc) {
                xhr.abort();
            }
        }

        if ('[GET]' == xhr.responseText.substring(0, 5)) {
            json_parse.init();

            var parsed = 0;
            do {
                json_parse.parse(xhr.responseText.substring(5));
                parsed += xhr.responseText.length - 5; // subtructing [GET] length

                for (var bKeepTryingAgain = true; bKeepTryingAgain;) {
                    try {
                        xhr.open('GET', _JCWebClient_Static.requestUrl + "session_id=" + _JCWebClient_Static.session_id + "&get_position=" + parsed, false);
                        xhr.send();
                        if (xhr.status == 200) {
                            bKeepTryingAgain = false;
                        }
                    }
                    catch (exc) {
                        xhr.abort();
                    }
                }
            } while ('[GET]' == xhr.responseText.substring(0, 5));

            json_parse.parse(xhr.responseText);

            var responseEdning = xhr.responseText.substring(xhr.responseText.length - 32, xhr.responseText.length);

            if (json_parse.wellformed())
                _JCWebClient_Static.SCLayerResponse = json_parse.result();
            else
                throw new SyntaxError('JSON');
        }
        else
            _JCWebClient_Static.SCLayerResponse = JSON.parse(xhr.responseText);

        var statusCode = parseInt(_JCWebClient_Static.SCLayerResponse.Status.Code);

        if (0 != statusCode) {
            debugLog(_JCWebClient_Static.SCLayerResponse.Status.Message);
            debugLog("[JCWebClient] " + RequestObj.jcapi + " failed: with status " + _JCWebClient_Static.SCLayerResponse.Status.Code);

            throw new Error(_JCWebClient_Static.SCLayerResponse.Status.Message);
        } else {
            debugLog("[JCWebClient] " + RequestObj.jcapi + " succeeded.");
        }

        var typedResponse = constructTypedResponse(_JCWebClient_Static.SCLayerResponse.ResultingData);
        _JCWebClient_Static.SCLayerResponse.ResultingData = typedResponse === null ? [] : typedResponse;

        return _JCWebClient_Static.SCLayerResponse.ResultingData;
    }

    function requestJcExtFunction2Async(RequestObj, callback) {
        if (_JCWebClient_Static.asyncRequestIsOngoing)
        {
            return;
        }
        _JCWebClient_Static.asyncRequestIsOngoing = true;
        _JCWebClient_Static.SCLayerResponse = null;

        RequestObj.session_id = _JCWebClient_Static.session_id;
        RequestObj.ticket_id = String(Math.floor(Math.random() * 4000000000));

        var jsonRequest = JSON.stringify(RequestObj);

        var xhr = new XMLHttpRequest;
        var url = _JCWebClient_Static.requestUrl;
        var multiGetRequest = false;
        var parsed = 0;

        function XhrReadyStateHandler() {
            if (this.readyState == 4) {
                if (typeof(this.status) != "unknown" && this.status == 200) {
                    try {
                        var prefix = xhr.responseText.substring(0, 5); // [GET]

                        if ('[GET]' == prefix) {
                            if (!multiGetRequest) {
                                json_parse.init();
                                multiGetRequest = true;
                            }

                            json_parse.parse(xhr.responseText.substring(5));
                            parsed += xhr.responseText.length - 5; // subtructing [GET] length

                            xhr.open('GET', _JCWebClient_Static.requestUrl + "session_id=" + _JCWebClient_Static.session_id + "&get_position=" + parsed, true);
                            xhr.send();
                        }
                        else {
                            _JCWebClient_Static.asyncRequestIsOngoing = false;
                            if (multiGetRequest) {
                                json_parse.parse(xhr.responseText);

                                if (json_parse.wellformed())
                                    _JCWebClient_Static.SCLayerResponse = json_parse.result();
                                else
                                    throw new SyntaxError('JSON');
                            }
                            else
                                _JCWebClient_Static.SCLayerResponse = JSON.parse(xhr.responseText);

                            var statusCode = parseInt(_JCWebClient_Static.SCLayerResponse.Status.Code);

                            if (0 != statusCode) {
                                debugLog(_JCWebClient_Static.SCLayerResponse.Status.Message);
                                debugLog("[JCWebClient] " + RequestObj.jcapi + " failed: with status " + _JCWebClient_Static.SCLayerResponse.Status.Code);

                                throw new Error(_JCWebClient_Static.SCLayerResponse.Status.Message);
                            } else {
                                debugLog("[JCWebClient] " + RequestObj.jcapi + " succeeded.");
                            }

                            var typedResponse = constructTypedResponse(_JCWebClient_Static.SCLayerResponse.ResultingData);
                            _JCWebClient_Static.SCLayerResponse.ResultingData = typedResponse === null ? [] : typedResponse;

                            callback(_JCWebClient_Static.SCLayerResponse.ResultingData);
                        }
                    }
                    catch (arg) {
                        _JCWebClient_Static.asyncRequestIsOngoing = false;
                        var error;
                        if (arg instanceof Error || arg instanceof SyntaxError) {
                            error = ["Error", arg.message];
                        }
                        else {
                            error = ["Error", "Unspecified error."];
                        }
                        callback(error);
                    }
                }
                else {
                    _JCWebClient_Static.asyncRequestIsOngoing = false;

                    var message;
                    if (typeof(this.status) != "unknown")
                        message = "[JCWebClient] POST for " + RequestObj.jcapi + " failed: with status " + xhr.status;
                    else
                        message = "[JCWebClient] POST for " + RequestObj.jcapi + " failed: with unknown status";
                    debugLog(message);

                    var error = ["Error", message];
                    callback(error);
                }
            }
        }

        xhr.onreadystatechange = XhrReadyStateHandler;
        xhr.open('POST', url, true);
        xhr.send(jsonRequest);
    }

    function debugLog(str) {
        if(typeof(console) != "undefined")
            console.log(str);
    }

    // Ð¡Ð»ÑƒÐ¶ÐµÐ±Ð½Ñ‹Ðµ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸
    function Ping() {
        var RequestObj = new Object();
        RequestObj.jcapi = "ping";
        RequestObj.ticket_id = "0";

        return requestJcExtFunction2(RequestObj);
    }

    /*!
    * \fn RetrieveEvents()
    * \memberof JCWebClient
    * \brief Ð—Ð°Ð¿ÑƒÑÑ‚Ð¸Ñ‚ÑŒ Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ñ‹Ð¹ Ð¼ÐµÑ…Ð°Ð½Ð¸Ð·Ð¼ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ñ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ð¹ Ð¾ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ð¸ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚ Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ñ Ð»Ð¾Ð³Ð¸Ð½ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ.
    *
    * ÐÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ñ‹Ð¹ Ð¼ÐµÑ…Ð°Ð½Ð¸Ð·Ð¼ Ð¾Ð¿Ñ€Ð¾ÑÐ° ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ð¹ Ñ€ÐµÐ°Ð»Ð¸Ð·Ð¾Ð²Ð°Ð½ Ñ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸ÐµÐ¼ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸ setTimeout(...) JavaScript.
    * ÐŸÐ¾ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð½Ñ‹Ð¼ Ð¾Ñ‚ Ð»Ð¾ÐºÐ°Ð»ÑŒÐ½Ð¾Ð³Ð¾ Ð²ÐµÐ± ÑÐµÑ€Ð²ÐµÑ€Ð° ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÐ¼ Ð²Ñ‹Ð·Ñ‹Ð²Ð°ÑŽÑ‚ÑÑ Ð²ÑÐµ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑ‡Ð¸ÐºÐ¸ Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð²ÑˆÐ¸Ðµ ÑÐ²Ð¾Ð¸ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ
    * Ñ Ð¿Ð¾Ð¼Ð¾Ñ‰ÑŒÑŽ Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð² addEventListener(...). ÐŸÐ¾Ð´Ð¿Ð¸ÑÑ‡Ð¸Ðº ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ñ Ð¼Ð¾Ð¶ÐµÑ‚ ÑƒÐ´Ð°Ð»Ð¸Ñ‚ÑŒ ÑÐ²Ð¾ÑŽ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ðµ Ñ Ð¿Ð¾Ð¼Ð¾Ñ‰ÑŒÑŽ Ð¼ÐµÑ‚Ð¾Ð´Ð° removeEventListener(...)
    */
    function RetrieveEvents() {

        if(_JCWebClient_Static.eventRetriveCheckTimeoutId != null)
            clearTimeout(_JCWebClient_Static.eventRetriveCheckTimeoutId);

        var RequestObj = new Object();
        RequestObj.jcapi = "RetrieveEvents";
        RequestObj.session_id = _JCWebClient_Static.session_id;
        RequestObj.ticket_id = "0"; // Ð½Ð° Ñ‚Ð¸ÐºÐµÑ‚Ðµ 0 Ð¾Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ…
        var jsonRequest = JSON.stringify(RequestObj);

        var xhr = new XMLHttpRequest;
        var url = _JCWebClient_Static.requestUrl;

        xhr.open('POST', url, true);

        xhr.onreadystatechange = RetrieveEventsStateHandler;
        xhr.timeout = 10000;

        xhr.send(jsonRequest);

        _JCWebClient_Static.eventRetriveCheckTimeoutId = setTimeout(RetrieveEventsCheckTimeoutHandler, 6000);

        function RetrieveEventsCheckTimeoutHandler() {
            xhr.abort();
        }

        function RetrieveEventsStateHandler() {
            if (this.readyState == 4) { // DONE
                if (_JCWebClient_Static.eventRetriveCheckTimeoutId != null)
                {
                    clearTimeout(_JCWebClient_Static.eventRetriveCheckTimeoutId);
                    _JCWebClient_Static.eventRetriveCheckTimeoutId = null;
                }

                if (typeof (this.status) != "unknown" && this.status == 200) {
                    try {

                        var NotificationResponse = JSON.parse(xhr.responseText);

                        var statusCode = parseInt(NotificationResponse.Status.Code);

                        if (0 == statusCode) {

                            try {
                                for (var i = 0; i < NotificationResponse.ResultingData.length; i++) {
                                    var Event = NotificationResponse.ResultingData[i];
                                    var EventMethod = Event[0];
                                    var EventInfo = parseInt(Event[1]);

                                    debugLog("[JCWebClient::RetrieveEventsStateHandler] " + EventMethod + " : " + EventInfo);


                                    var j;
                                    if (EventMethod == "TokenAdded") {
                                        for (j = 0; j < _JCWebClient_Static.TokenAddedSubscriptions.length; j++) {
                                            (_JCWebClient_Static.TokenAddedSubscriptions[j])(EventInfo);
                                        }
                                    } else if (EventMethod == "TokenRemoved") {
                                        for (j = 0; j < _JCWebClient_Static.TokenRemovedSubscriptions.length; j++) {
                                            (_JCWebClient_Static.TokenRemovedSubscriptions[j])(EventInfo);
                                        }
                                    } else if (EventMethod == "LoginStateChanged") {
                                        for (j = 0; j < _JCWebClient_Static.LoginStateChangedSubscriptions.length; j++) {
                                            (_JCWebClient_Static.LoginStateChangedSubscriptions[j])(EventInfo);
                                        }
                                    } else if (EventMethod == "SmartCardAdded") {
                                        for (j = 0; j < _JCWebClient_Static.SmartCardAddedSubscriptions.length; j++) {
                                            (_JCWebClient_Static.SmartCardAddedSubscriptions[j])(EventInfo);
                                        }
                                    } else if (EventMethod == "SmartCardRemoved") {
                                        for (j = 0; j < _JCWebClient_Static.SmartCardRemovedSubscriptions.length; j++) {
                                            (_JCWebClient_Static.SmartCardRemovedSubscriptions[j])(EventInfo);
                                        }
                                    }
                                }
                            }
                            catch (errMessage) {
                                debugLog("[JCWebClient::RetrieveEventsStateHandler] exception caught:");
                                debugLog("[JCWebClient::RetrieveEventsStateHandler] " + errMessage);
                            }
                        } else {
                            debugLog(NotificationResponse.Status.Message);
                            debugLog("[JCWebClient::RetrieveEventsStateHandler] " + RequestObj.jcapi + " failed: with status " + NotificationResponse.Status.Code);
                        }
                    }
                    catch(arg) {
                    }

                }

                RetrieveEventsTimeoutHandler();
            }
        }
    }
    function RetrieveEventsTimeoutHandler() {
        setTimeout(RetrieveEvents, 1000);
    }
    /*!
	* \fn addEventListener(name, func, bubbling)
	* \memberof JCWebClient
    * \brief ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒÑÑ Ð½Ð° ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ðµ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ… Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚ Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸ Ð»Ð¾Ð³Ð¸Ð½ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ.
	* \param name Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ ÑÑ‚Ñ€Ð¾ÐºÐ¾Ð¹ "tokenAdded", "tokenRemoved", "loginStateChanged", "smartcardadded", "smartcardremoved"
	* \param func Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ ÐºÐ¾Ñ‚Ð¾Ñ€Ð°Ñ Ð±ÑƒÐ´ÐµÑ‚ Ð²Ñ‹Ð·Ð²Ð°Ð½Ð° Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ð¾ Ð¿Ð¾ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸ÑŽ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²ÑƒÑŽÑ‰ÐµÐ³Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ñ
	* \param bubbling Ð´Ð»Ñ ÑÐ¾Ð²Ð¼ÐµÑÑ‚Ð¸Ð¼Ð¾ÑÑ‚Ð¸, Ð½Ðµ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ
    */
    function addEventListener(name, func, bubbling) {
        var strTokenAdded = "tokenAdded";
        var strTokenRemoved = "tokenRemoved";
        var strLoginStateChanged = "loginStateChanged";
        var strSmartCardAdded = "smartcardadded";
        var strSmartCardRemoved = "smartcardremoved";

        if (name.toUpperCase() == strTokenAdded.toUpperCase()) {
            _JCWebClient_Static.TokenAddedSubscriptions.push(func);
        } else if (name.toUpperCase() == strTokenRemoved.toUpperCase()) {
            _JCWebClient_Static.TokenRemovedSubscriptions.push(func);
        } else if (name.toUpperCase() == strLoginStateChanged.toUpperCase()) {
            _JCWebClient_Static.LoginStateChangedSubscriptions.push(func);
        } else if (name.toUpperCase() == strSmartCardAdded.toUpperCase()) {
            _JCWebClient_Static.SmartCardAddedSubscriptions.push(func);
        } else if (name.toUpperCase() == strSmartCardRemoved.toUpperCase()) {
            _JCWebClient_Static.SmartCardRemovedSubscriptions.push(func);
        }
    }
    /*!
	* \fn attachEvent(onName, func)
	* \memberof JCWebClient
    * \brief ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒÑÑ Ð½Ð° ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ðµ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ… Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚ Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸ Ð»Ð¾Ð³Ð¸Ð½ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ.
	* \param onName: Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ ÑÑ‚Ñ€Ð¾ÐºÐ¾Ð¹ "ontokenAdded", "ontokenRemoved", "onloginStateChanged", "onsmartcardadded", "onsmartcardremoved"
	* \param func Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ ÐºÐ¾Ñ‚Ð¾Ñ€Ð°Ñ Ð±Ñ‹Ð»Ð° Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð° Ñ€Ð°Ð½ÐµÐµ Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð¼ \ref addEventListener
    */
    function attachEvent(onName, func) {
        addEventListener(onName.substring(2), func, false); // ontokenAddedEvent-> tokenAddedEvent,...
    }
    /*!
	* \fn removeEventListener(name, func)
	* \memberof JCWebClient
    * \brief Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐºÑƒ Ð½Ð° ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ðµ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ… Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚ Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸ Ð»Ð¾Ð³Ð¸Ð½ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ.
	* \param name: Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ ÑÑ‚Ñ€Ð¾ÐºÐ¾Ð¹ "tokenAdded", "tokenRemoved", "loginStateChanged", "smartcardadded", "smartcardremoved"
	* \param func Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ ÐºÐ¾Ñ‚Ð¾Ñ€Ð°Ñ Ð±Ñ‹Ð»Ð° Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð° Ñ€Ð°Ð½ÐµÐµ Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð¼ \ref addEventListener
    */
    function removeEventListener(name, func) {
        var strTokenAdded = "tokenAdded";
        var strTokenRemoved = "tokenRemoved";
        var strLoginStateChanged = "loginStateChanged";
        var strSmartCardAdded = "smartcardadded";
        var strSmartCardRemoved = "smartcardremoved";
        var funcArray;

        if (name.toUpperCase() == strTokenAdded.toUpperCase()) {
            funcArray = _JCWebClient_Static.TokenAddedSubscriptions;
        } else if (name.toUpperCase() == strTokenRemoved.toUpperCase()) {
            funcArray = _JCWebClient_Static.TokenRemovedSubscriptions;
        } else if (name.toUpperCase() == strLoginStateChanged.toUpperCase()) {
            funcArray = _JCWebClient_Static.LoginStateChangedSubscriptions;
        } else if (name.toUpperCase() == strSmartCardAdded.toUpperCase()) {
            funcArray = _JCWebClient_Static.SmartCardAddedSubscriptions;
        } else if (name.toUpperCase() == strSmartCardRemoved.toUpperCase()) {
            funcArray = _JCWebClient_Static.SmartCardRemovedSubscriptions;
        }
        try {
            var i;
            for (i = 0; i < funcArray.length; i++) {
                if (func == funcArray[i]) {
                    funcArray.splice(i, 1);
                    break;
                }
            }
        }
        catch (errMessage) {
            debugLog("[JCWebClient::removeEventListener] exception caught:");
            debugLog("[JCWebClient::removeEventListener] " + errMessage);
        }
    }
    /*!
	* \fn detachEvent(onName, func)
	* \memberof JCWebClient
    * \brief Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐºÑƒ Ð½Ð° ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ðµ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ… Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚ Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸ Ð»Ð¾Ð³Ð¸Ð½ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ.
	* Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹ Ð°Ð½Ð°Ð»Ð¾Ð³Ð¸Ñ‡Ð½Ñ‹ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð°Ð¼ Ð¼ÐµÑ‚Ð¾Ð´Ð° \ref attachEvent
	* \param func Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ ÐºÐ¾Ñ‚Ð¾Ñ€Ð°Ñ Ð±Ñ‹Ð»Ð° Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð° Ñ€Ð°Ð½ÐµÐµ Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð¼ \ref addEventListener
    */
    function detachEvent(onName, func) {
        removeEventListener(onName.substring(2), func); // ontokenAddedEvent-> tokenAddedEvent,...
    }

    function utf8Decode(arr) {
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            str += String.fromCharCode(arr[i]);
        }
        return decodeURIComponent(escape(str));
    }

    // ÐŸÐ°Ñ€ÑÐ¸Ð½Ð³ ÑÑ‚Ñ€Ð¾ÐºÐ¸ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² JS-Ð¾Ð±ÑŠÐºÑ‚
    function parseCertInfoString(info) {

        // Ð¿Ð°Ñ€ÑÐ¸Ð½Ð³ ÑÑ‚Ñ€Ð¾ÐºÐ¸ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð¸ ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ð¸Ñ
        function structurizeCertInfo(info) {
            var lines = info.split('\n');

            var root = { childs: [] };
            var que = [root];

            var level = -1;
            var extensionsLevel = -1;

            for (var i = 0; i < lines.length; i++) {
                var ln = lines[i];

                var spaceCount = 0;
                for (var ic = 0; ic < ln.length; ic++) {
                    if (ln[ic] != ' ') {
                        break;
                    }
                    spaceCount++;
                }

                // Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿ÐµÑ€ÐµÐ½Ð¾ÑÐ° ÑÑ‚Ñ€Ð¾ÐºÐ¸ Ð² Ð´Ð°Ð½Ð½Ñ‹Ñ… X509v3 extensions
                if (spaceCount < 4 && extensionsLevel != -1 && level > extensionsLevel && ln.trim()) {
                    que[0].name += ('\n' + ln);
                    continue;
                }

                ln = ln.trim();
                if (!ln) {
                    continue;
                }

                if (spaceCount % 4) {
                    spaceCount += (4 - (spaceCount % 4));
                }
                var lnLevel = spaceCount / 4;

                var obj = { name: ln, childs: [] };

                // Ñ€Ð°Ð·Ð´ÐµÐ»ÑÐµÐ¼ Ð¸Ð¼Ñ Ð¸ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ
                if (obj.name) {
                    var pos = obj.name.indexOf(': ');
                    if (pos != -1) {
                        obj.value = obj.name.substr(pos + 2).trim();
                        obj.name = obj.name.substr(0, pos).trim();
                    }
                    else if (obj.name[obj.name.length - 1] == ':') {
                        obj.name = obj.name.substr(0, obj.name.length - 1).trim();
                    }
                }

                if (obj.name == "X509v3 extensions") {
                    extensionsLevel = lnLevel;
                }
                else if (extensionsLevel != -1 && lnLevel <= extensionsLevel) {
                    extensionsLevel = -1;
                }

                if (lnLevel == level) {
                    que[1].childs.push(obj);
                    que[0] = obj;
                }
                else if (lnLevel > level) {
                    while (lnLevel > level) {
                        level++;

                        var o = (level == lnLevel ? obj : { childs: [] });
                        que[0].childs.push(o);
                        que.unshift(o);
                    }
                }
                else if (lnLevel < level) {
                    que.splice(0, level - lnLevel);
                    level = lnLevel;

                    que[1].childs.push(obj);
                    que[0] = obj;
                }
            }

            // ÑƒÐ´Ð°Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¾Ð¼ÐµÐ¶ÑƒÑ‚Ð¾Ñ‡Ð½Ñ‹Ñ… Ð¿ÑƒÑÑ‚Ñ‹Ñ… ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¾Ð²
            function removeEmptyItems(obj) {

                // remove empty sub-objects
                while (obj.childs.length == 1 && !obj.childs[0].name) {
                    obj.childs = obj.childs[0].childs;
                }

                // correct child-objects
                for (var i = 0; i < obj.childs.length; i++) {
                    removeEmptyItems(obj.childs[i]);
                }

            }

            removeEmptyItems(root.childs[0]);
            return root.childs[0];
        }

        // Ð¿Ñ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ð¸Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ð¾Ð±ÑŠÐµÐºÑ‚
        function objectizeInfo(obj, ooo) {

            // Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¸ Ð¿Ñ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€Ð¾ÐºÐ¸ Ð² Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚
            function isBinaryArray(obj) {

                var arr = [];
                for (var i = 0; i < obj.childs.length; i++) {
                    var child = obj.childs[i];
                    if (child.value || child.childs.length > 0) {
                        return null;
                    }

                    for (var c = 0; c < child.name.length; c += 3) {
                        var h = parseInt(child.name.substr(c, 2), 16);

                        if (isNaN(h) || (c < child.name.length - 2 && child.name.substr(c + 2, 1) != ':')) {
                            return null;
                        }
                        arr.push(h);
                    }
                }

                if (arr.length == 0) {
                    return null;
                }

                obj.childs.splice(0, obj.childs.length);
                return arr;
            }

            // Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¸ Ð¿Ñ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð´Ð¾Ñ‡ÐµÑ€Ð½Ð¸Ñ… ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¾Ð² Ð² Ð¼Ð°ÑÑÐ¸Ð² ÑÑ‚Ñ€Ð¾Ðº
            function isStringArray(obj) {

                var arr = [];
                for (var i = 0; i < obj.childs.length; i++) {
                    var child = obj.childs[i];
                    if (child.value || child.childs.length > 0) {
                        return null;
                    }

                    arr.push(child.name);
                }

                if (arr.length == 0) {
                    return null;
                }

                obj.childs.splice(0, obj.childs.length);
                return arr;
            }

            // Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ°, ÑÐ²Ð»ÑÐµÑ‚ÑÑ Ð»Ð¸ Ð¾Ð±ÑŠÐµÐºÑ‚ Ð¿Ñ€Ð¾ÑÑ‚Ñ‹Ð¼ Ñ‚Ð¸Ð¿Ð¾Ð¼ [Ð¸Ð¼Ñ:Ð·Ð°Ñ‡ÐµÐ½Ð¸Ðµ] Ð¸ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ñ
            function isNamedValue(obj) {

                if (obj.childs.length) {
                    if (obj.childs.length == 1 && !obj.value && !obj.childs[0].childs.length && !obj.childs[0].value) {
                        var val = obj.childs[0].name;
                        obj.childs.splice(0, 1);
                        return val;
                    }
                    return null;
                }
                if (!obj.value) {
                    return null;
                }

                return obj.value;
            }

            // Ð¿Ñ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€Ð¾ÐºÐ¸ Ð¸Ð»Ð¸ Ð¼Ð°ÑÑÐ¸Ð²Ð° ÑÑ‚Ñ€Ð¾Ðº Ð² Ð¿Ð¾Ð´Ñ…Ð¾Ð´ÑÑ‰Ð¸Ð¹ Ñ‚Ð¸Ð¿ Ð´Ð°Ð½Ð½Ñ‹Ñ… (Ñ‡Ð¸ÑÐ»Ð¾/Ð´Ð°Ñ‚Ð°)
            function convertStringValue(val) {

                function convertSingleValue(val) {
                    if (/^\d+ \(0[xX][0-9a-fA-F]+\)$/.test(val)) {
                        return parseInt(val.substr(0, val.indexOf(' ')));
                    }
                    if (/^\d+$/.test(val)) {
                        return parseInt(val);
                    }

                    if (/[A-z]{3,}\s+\d{1,2}\s+\d{1,2}:\d{1,2}:\d{1,2}\s+\d{2,4}/.test(val)) { // !For Chrome
                        var dateVal = Date.parse(val);
                        if (!isNaN(dateVal)) {
                            var date = new Date();
                            date.setTime(dateVal);
                            return date;
                        }
                    }

                    return val;
                }

                if (Array.isArray(val)) {
                    var arr = [];
                    for (var i = 0; i < val.length; i++) {
                        arr.push(convertSingleValue(val[i]));
                    }
                    return arr;
                }
                else {
                    return convertSingleValue(val);
                }
            }

            // Ð”Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð° Ð² ooo. Ð•ÑÐ»Ð¸ ÐµÑÑ‚ÑŒ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ñ‹ Ñ Ð¾Ð´Ð¸Ð½Ð°ÐºÐ¾Ð²Ñ‹Ð¼Ð¸ Ð¸Ð¼ÐµÐ½Ð°Ð¼Ð¸ - ooo Ð¿Ñ€ÐµÐ²Ñ€Ð°Ñ‰Ð°ÐµÑ‚ÑÑ Ð² Ð¼Ð°ÑÑÐ¸Ð²
            function addElementToOoo(looo, lname, lval) {
                if(Array.isArray(looo)) {
                    looo.push({ name: lname, value: lval });
                }
                else {
                    if(looo[lname]) {
                        var arr = [];
                        for(var el in looo) {
                            arr.push({ name: el, value: looo[el] });
                        }

                        looo = arr;
                        looo.push({ name: lname, value: lval });
                    }
                    else {
                        looo[lname] = lval;
                    }
                }
                return looo;
            }

            if (obj.name == "Subject Public Key Info" && obj.childs.length == 1 && obj.childs[0].name == "Public Key Algorithm") {
                for (var i = 0; i < obj.childs[0].childs.length; i++) {
                    obj.childs.push(obj.childs[0].childs[i]);
                }
                obj.childs[0].childs.splice(0, obj.childs[0].childs.length);
            }

            var val = isBinaryArray(obj);
            if (val) {
                if (obj.value && obj.name == "Signature Algorithm") {
                    ooo = addElementToOoo(ooo, "Signature", val);
                    ooo = addElementToOoo(ooo, "Signature Algorithm", convertStringValue(obj.value));
                }
                else if (obj.value) {
                    ooo = addElementToOoo(ooo, obj.name, { value: convertStringValue(obj.value), data: val });
                }
                else {
                    ooo = addElementToOoo(ooo, obj.name, val);
                }
            }

            if (!val) {
                val = isNamedValue(obj);
                if (val) {
                    ooo = addElementToOoo(ooo, obj.name, convertStringValue(val));
                }
            }

            if (!val) {
                val = isStringArray(obj);
                if (val) {
                    if (obj.value) {
                        ooo = addElementToOoo(ooo, obj.name, { value: convertStringValue(obj.value), data: convertStringValue(val) });
                    }
                    else {
                        ooo = addElementToOoo(ooo, obj.name, convertStringValue(val));
                    }
                }
            }

            if (!val) {
                var osub = {};

                if (obj.value) {
                    osub.value = convertStringValue(obj.value);
                }

                for (var i = 0; i < obj.childs.length; i++) {
                    osub = objectizeInfo(obj.childs[i], osub);
                }
                ooo = addElementToOoo(ooo, obj.name, osub);
            }

            return ooo;
        }

        // ÐŸÑ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€Ð¾Ðº Ð²Ð¸Ð´Ð° 'CN=Ð˜Ð²Ð°Ð½ Ð˜Ð²Ð°Ð½Ð¾Ð²Ð¸Ñ‡ Ð˜Ð²Ð°Ð½Ð¾Ð²' Ð² Ð¾Ð±ÑŠÐµÐºÑ‚Ñ‹ Ð²Ð¸Ð´Ð°: {'rdn': 'CN', 'value': 'Ð˜Ð²Ð°Ð½ Ð˜Ð²Ð°Ð½Ð¾Ð²Ð¸Ñ‡ Ð˜Ð²Ð°Ð½Ð¾Ð²'}
        function findRdns(ooo) {

            function makeRdn(s) {
                var ind = s.indexOf('=');
                if(ind == -1) {
                    return;
                }

                var name = s.substr(0, ind).trim();
                var val = s.substr(ind + 1).trim();

                if(name.length == 0 || val.length == 0) {
                    return;
                }

                return { "rdn" : name, "value" : val };
            }

            if (Array.isArray(ooo)) {
                for (var i = 0; i < ooo.length; i++) {
                    var o = findRdns(ooo[i]);
                    if(o) {
                        ooo[i] = o;
                    }
                }
            }
            else if(typeof(ooo) == 'object') {
                for (key in ooo) {
                    if(ooo.hasOwnProperty(key)) {
                        var o = findRdns(ooo[key]);
                        if(o) {
                            ooo[key] = o;
                        }
                    }
                }
            }
            else if(typeof(ooo) == 'string') {
                var parts = ooo.split(",");
                var rdn_parts = [];

                for (var ip = 1; ip < parts.length; ) {
                    if(parts[ip].indexOf('=') == -1) {
                        parts[ip - 1] += ("," + parts[ip]);
                        parts.splice(ip, 1);
                    }
                    else {
                        ip++;
                    }
                }

                for (var ip = 0; ip < parts.length; ip++) {
                    var rdn = makeRdn(parts[ip]);
                    if(!rdn) {
                        return;
                    }

                    rdn_parts.push(rdn);
                }

                if(rdn_parts.length == 1) {
                    return rdn_parts[0];
                }
                else if(rdn_parts.length > 1) {
                    return rdn_parts;
                }
            }
        }

        var root = structurizeCertInfo(info);

        var ooo = {};
        for (var i = 0; i < root.childs.length; i++) {
            ooo = objectizeInfo(root.childs[i], ooo);
        }

        findRdns(ooo);
        return ooo;
    }

    function getAllTokens() {
        var RequestObj = new Object();
        RequestObj.jcapi = "getAllTokens";

        return requestJcExtFunction2(RequestObj);
    }
    function getAllSlots() {
        var RequestObj = new Object();
        RequestObj.jcapi = "getAllSlots";

        return requestJcExtFunction2(RequestObj);
    }
    function getTokenInfo(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getTokenInfo";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function getSlotInfo(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getTokenInfo";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function getLoggedInState() {
        var RequestObj = new Object();
        RequestObj.jcapi = "getLoggedInState";

        return requestJcExtFunction2(RequestObj);
    }
    function getPluginVersion() {
        var RequestObj = new Object();
        RequestObj.jcapi = "getPluginVersion";

        return requestJcExtFunction2(RequestObj);
    }
    function checkWebBrowserVersion() {
        var RequestObj = new Object();
        RequestObj.jcapi = "checkWebBrowserVersion";

        return requestJcExtFunction2(RequestObj);
    }
    function initToken(SlotId, AdminPin, UserPin, SCLabel) {
        var RequestObj = new Object();
        RequestObj.jcapi = "initToken";
        RequestObj.SlotId = SlotId;
        RequestObj.UserPin = UserPin;
        RequestObj.AdminPin = AdminPin;
        RequestObj.Label = SCLabel;

        return requestJcExtFunction2(RequestObj);
    }
    function initTokenWithoutUserPIN(SlotId, AdminPin, SCLabel) {
        var RequestObj = new Object();
        RequestObj.jcapi = "initToken";
        RequestObj.SlotId = SlotId;
        RequestObj.UserPin = ""; // pass an empty string
        RequestObj.AdminPin = AdminPin;
        RequestObj.Label = SCLabel;

        return requestJcExtFunction2(RequestObj);
    }
    function initTokenUI(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "initTokenUI";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function getSystemInfo(siclass) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getSystemInfo";
        RequestObj.Class = siclass;

        return requestJcExtFunction2(RequestObj);
    }
    function getSystemInfoAsync(callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getSystemInfo";

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    // ÐžÐ±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð¾ÑˆÐ¸Ð±Ð¾Ðº
    function getLastError() {
        var RequestObj = new Object();
        RequestObj.jcapi = "getLastError";

        return requestJcExtFunction2(RequestObj);
    }
    function getErrorMessage(Error) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getErrorMessage";
        RequestObj.Error = Error;
        return requestJcExtFunction2(RequestObj);
    }
    function isAsyncOperationInProgress() {
        if (JCWebClient().asyncRequestIsOngoing) {
            return true;
        }
        else {
            return false;
        }
    }
    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ PIN ÐºÐ¾Ð´Ð°Ð¼Ð¸
    function bindToken(SlotId, sPin, userType) {
        var RequestObj = new Object();
        RequestObj.jcapi = "bindToken";
        RequestObj.SlotId = SlotId;
        RequestObj.Pin = sPin;

        if(typeof(userType) != 'undefined') {
            RequestObj.Type = userType;
        }

        return requestJcExtFunction2(RequestObj);
    }
    function bindTokenAsync(SlotId, sPin, userTypeOrCallback, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "bindToken";
        RequestObj.SlotId = SlotId;
        RequestObj.Pin = sPin;

        if(typeof (userTypeOrCallback) == 'function') {
            callback = userTypeOrCallback;
        }
        else {
            RequestObj.Type = userTypeOrCallback;
        }

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function bindTokenUI(SlotId, userType) {
        var RequestObj = new Object();
        RequestObj.jcapi = "bindTokenUI";
        RequestObj.SlotId = SlotId;

        if(typeof(userType) != 'undefined') {
            RequestObj.Type = userType;
        }

        return requestJcExtFunction2(RequestObj);
    }
    function unbindToken() {
        var RequestObj = new Object();
        RequestObj.jcapi = "unbindToken";

        return requestJcExtFunction2(RequestObj);
    }
    function changePIN(SlotId, userType, oldPin, newPin) {
        var RequestObj = new Object();
        RequestObj.jcapi = "changePIN";
        RequestObj.SlotId = SlotId;
        RequestObj.Type = userType;
        RequestObj.Pin = oldPin;
        RequestObj.NewPin = newPin;

        return requestJcExtFunction2(RequestObj);
    }
    function changePINAsync(SlotId, userType, oldPin, newPin, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "changePIN";
        RequestObj.SlotId = SlotId;
        RequestObj.Type = userType;
        RequestObj.Pin = oldPin;
        RequestObj.NewPin = newPin;

        return requestJcExtFunction2Async(RequestObj,callback);
    }
    function changePINUI(SlotId, userType) {
        var RequestObj = new Object();
        RequestObj.jcapi = "changePINUI";
        RequestObj.SlotId = SlotId;
        RequestObj.Type = userType;

        return requestJcExtFunction2(RequestObj);
    }
    function changePINUIAsync(SlotId, userType, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "changePINUI";
        RequestObj.SlotId = SlotId;
        RequestObj.Type = userType;

        return requestJcExtFunction2Async(RequestObj,callback);
    }
    function initUserPIN(SlotId, AdminPin, userPin) {
        var RequestObj = new Object();
        RequestObj.jcapi = "initUserPIN";
        RequestObj.SlotId = SlotId;
        RequestObj.AdminPin = AdminPin;
        RequestObj.UserPin = userPin;

        return requestJcExtFunction2(RequestObj);
    }
    function initUserPINAsync(SlotId, AdminPin, userPin, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "initUserPIN";
        RequestObj.SlotId = SlotId;
        RequestObj.AdminPin = AdminPin;
        RequestObj.UserPin = userPin;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function initUserPINUI(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "initUserPINUI";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function initUserPINUIAsync(SlotId, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "initUserPINUI";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function initUserPINAFT(SlotId, LangID, RequireConfirmation) {
        var RequestObj = new Object();
        RequestObj.jcapi = "initUserPINAFT";
        RequestObj.SlotId = SlotId;
        RequestObj.LangID = LangID;
        RequestObj.RequireConfirmation = RequireConfirmation;

        return requestJcExtFunction2(RequestObj);
    }
    function unblockUserPIN(SlotId, AdminPin) {
        var RequestObj = new Object();
        RequestObj.jcapi = "unblockUserPIN";
        RequestObj.SlotId = SlotId;
        RequestObj.AdminPin = AdminPin;

        return requestJcExtFunction2(RequestObj);
    }
    function unblockUserPINUI(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "unblockUserPINUI";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function unblockUserPINasync(SlotId, AdminPin, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "unblockUserPIN";
        RequestObj.SlotId = SlotId;
        RequestObj.AdminPin = AdminPin;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function unblockUserPINUIAsync(SlotId, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "unblockUserPINUI";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    // ÐžÐ¿ÐµÑ€Ð°Ñ†Ð¸Ð¸ Ñ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð¾Ð¼
    function createContainer(ecParams, Description) {
        var RequestObj = new Object();
        RequestObj.jcapi = "createContainer";
        RequestObj.ecParams = ecParams;
        RequestObj.Description = Description;

        return requestJcExtFunction2(RequestObj);
    }
    function createContainerEx(CkaID, ecParams, Description) {
        var RequestObj = new Object();
        RequestObj.jcapi = "createContainerEx";
        RequestObj.CkaID = CkaID;
        RequestObj.ecParams = ecParams;
        RequestObj.Description = Description;

        return requestJcExtFunction2(RequestObj);
    }
    function createContainerAsync(ecParams, Description, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "createContainer";
        RequestObj.ecParams = ecParams;
        RequestObj.Description = Description;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function createContainerExAsync(CkaID, ecParams, Description, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "createContainerEx";
        RequestObj.CkaID = CkaID;
        RequestObj.ecParams = ecParams;
        RequestObj.Description = Description;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function deleteContainerOrCertificate(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "deleteContainerOrCertificate";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function deleteCertificate(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "deleteCertificate";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function changeContainerDescription(ContId, Description) {
        var RequestObj = new Object();
        RequestObj.jcapi = "changeContainerDescription";
        RequestObj.ContId = ContId;
        RequestObj.Description = Description;

        return requestJcExtFunction2(RequestObj);
    }
    // Ð˜Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ñ Ñ PKI
    function genCSR(ContId, Dn, Exts) {
        var RequestObj = new Object();
        RequestObj.jcapi = "genCSR";
        RequestObj.ContId = ContId;
        RequestObj.Dn = Dn;
        RequestObj.Exts = Exts;

        return requestJcExtFunction2(RequestObj);
    }
    function genCSRAsync(ContId, Dn, Exts, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "genCSR";
        RequestObj.ContId = ContId;
        RequestObj.Dn = Dn;
        RequestObj.Exts = Exts;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function genCSRUsingHardwareHash(ContId, Dn, Exts) {
        var RequestObj = new Object();
        RequestObj.jcapi = "genCSRUsingHardwareHash";
        RequestObj.ContId = ContId;
        RequestObj.Dn = Dn;
        RequestObj.Exts = Exts;

        return requestJcExtFunction2(RequestObj);
    }
    function genCSRUsingHardwareHashAsync(ContId, Dn, Exts, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "genCSRUsingHardwareHash";
        RequestObj.ContId = ContId;
        RequestObj.Dn = Dn;
        RequestObj.Exts = Exts;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function writeSelfSignedCertificate(ContId, Dn, Exts, Days) {
        var RequestObj = new Object();
        RequestObj.jcapi = "writeSelfSignedCertificate";
        RequestObj.ContId = ContId;
        RequestObj.Dn = Dn;
        RequestObj.Exts = Exts;
        RequestObj.Days = Days;

        return requestJcExtFunction2(RequestObj);
    }
    function writeCertificate(ContId, Cert) {
        var RequestObj = new Object();
        RequestObj.jcapi = "writeCertificate";
        RequestObj.ContId = ContId;
        RequestObj.Cert = Cert;

        return requestJcExtFunction2(RequestObj);
    }
    function writeCertificateAsync(ContId, Cert, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "writeCertificate";
        RequestObj.ContId = ContId;
        RequestObj.Cert = Cert;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function writeSignerCertificate(Cert, Description) {
        var RequestObj = new Object();
        RequestObj.jcapi = "writeSignerCertificate";
        RequestObj.Cert = Cert;
        RequestObj.Description = Description;

        return requestJcExtFunction2(RequestObj);
    }
    function writeSignerCertificateAsync(Cert, Description, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "writeSignerCertificate";
        RequestObj.Cert = Cert;
        RequestObj.Description = Description;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function deleteSignerCertificateById(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "deleteSignerCertificateById";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function deleteAllSignerCertificatesForId(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "deleteAllSignerCertificatesForId";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function deleteAllSignerCertificates() {
        var RequestObj = new Object();
        RequestObj.jcapi = "deleteAllSignerCertificates";

        return requestJcExtFunction2(RequestObj);
    }
    function readCertificate(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "readCertificate";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function readCertificateEx(SlotId, ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "readCertificateEx";
        RequestObj.SlotId = SlotId;
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function readSignerCertificateList(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "readSignerCertificateList";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function readSignerCertificateListAsync(ContId, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "readSignerCertificateList";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function writeServerPublicKey(ContId, Spk) {
        var RequestObj = new Object();
        RequestObj.jcapi = "writeServerPublicKey";
        RequestObj.ContId = ContId;
        RequestObj.Spk = Spk;

        return requestJcExtFunction2(RequestObj);
    }
    function readServerPublicKey(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "readServerPublicKey";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function writeServerCertificate(ContId, Cert) {
        var RequestObj = new Object();
        RequestObj.jcapi = "writeServerCertificate";
        RequestObj.ContId = ContId;
        RequestObj.Cert = Cert;

        return requestJcExtFunction2(RequestObj);
    }
    function readServerCertificate(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "readServerCertificate";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function readCkaID(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "readCkaID";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function writeCkaID(ContId, newCkaID) {
        var RequestObj = new Object();
        RequestObj.jcapi = "writeCkaID";
        RequestObj.ContId = ContId;
        RequestObj.CkaID = newCkaID;

        return requestJcExtFunction2(RequestObj);
    }
    function readPublicKey(SlotId, ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "readPublicKey";
        RequestObj.SlotId = SlotId;
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function getCertificateInfo(SlotId, ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getCertificateInfo";
        RequestObj.SlotId = SlotId;
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function getCertificatePublicKey(Cert) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getCertificatePublicKey";
        RequestObj.Cert = Cert;

        return requestJcExtFunction2(RequestObj);
    }
    function getContainerList(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getContainerList";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function parseCertificateEx(SlotId, ContId) {
        var res = getCertificateInfo(SlotId, ContId);

        var str = "";
        for (var i = 0; i < res.length; i++) {
            str += String.fromCharCode(res[i]);
        }
        str = decodeURIComponent(escape(str));

        return parseCertInfoString(str);
    }
    function parseCertificate(Cert) {
        var res = getCertificateInfoEx(Cert);

        var str = "";
        for (var i = 0; i < res.length; i++) {
            str += String.fromCharCode(res[i]);
        }
        str = decodeURIComponent(escape(str));

        return parseCertInfoString(str);
    }
    function parseX509CertificateEx(SlotId, ContId) {
        var res = getCertificateInfo(SlotId, ContId);

        var str = "";
        for (var i = 0; i < res.length; i++) {
            str += String.fromCharCode(res[i]);
        }
        str = decodeURIComponent(escape(str));

        return parseCertInfoString(str, true);
    }
    function parseX509Certificate(Cert) {
        var res = getCertificateInfoEx(Cert);

        var str = "";
        for (var i = 0; i < res.length; i++) {
            str += String.fromCharCode(res[i]);
        }
        str = decodeURIComponent(escape(str));

        return parseCertInfoString(str, true);
    }
    function getCertificateList(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getCertificateList";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function getCertificateListAsync(SlotId, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getCertificateList";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function getCertificateListEx(SlotId, Sn, Issuer, Subject) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getCertificateListEx";
        RequestObj.SlotId = SlotId;
        RequestObj.Sn = Sn;
        RequestObj.Issuer = Issuer;
        RequestObj.Subject = Subject;

        return requestJcExtFunction2(RequestObj);
    }
    function getCertificateListExAsync(SlotId, Sn, Issuer, Subject, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getCertificateListEx";
        RequestObj.SlotId = SlotId;
        RequestObj.Sn = Sn;
        RequestObj.Issuer = Issuer;
        RequestObj.Subject = Subject;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function getSignerCertificateList(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getSignerCertificateList";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    function getSignerCertificateListAsync(ContId, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getSignerCertificateList";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function getAllValidCertificateChains() {
        var RequestObj = new Object();
        RequestObj.jcapi = "getAllValidCertificateChains";

        return requestJcExtFunction2(RequestObj);
    }
    function getAllValidCertificateChainsAsync(callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getAllValidCertificateChains";

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function getAllInvalidCertificateChains() {
        var RequestObj = new Object();
        RequestObj.jcapi = "getAllInvalidCertificateChains";

        return requestJcExtFunction2(RequestObj);
    }
    function getAllInvalidCertificateChainsAsync(callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getAllInvalidCertificateChains";

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function getAllUnusedCertificateChains() {
        var RequestObj = new Object();
        RequestObj.jcapi = "getAllUnusedCertificateChains";

        return requestJcExtFunction2(RequestObj);
    }
    function getAllUnusedCertificateChainsAsync(callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getAllUnusedCertificateChains";

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function getAllCertificateChains() {
        var RequestObj = new Object();
        RequestObj.jcapi = "getAllCertificateChains";

        return requestJcExtFunction2(RequestObj);
    }
    function getAllCertificateChainsAsync(callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getAllCertificateChains";

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function createStandaloneCertificate(Cert, Description) {
        var RequestObj = new Object();
        RequestObj.jcapi = "createStandaloneCertificate";
        RequestObj.Cert = Cert;
        RequestObj.Description = Description;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyCertificateChain(Cert, TrustedCerts, CertChain) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyCertificateChain";
        RequestObj.Cert = Cert;
        RequestObj.TrustedCerts = TrustedCerts;
        RequestObj.CertChain = CertChain;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyCertificateChainAsync(Cert, TrustedCerts, CertChain, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyCertificateChain";
        RequestObj.Cert = Cert;
        RequestObj.TrustedCerts = TrustedCerts;
        RequestObj.CertChain = CertChain;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function verifyCertificateChainEx(Cert, TrustedCerts, CertChain, RevokedCerts) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyCertificateChainEx";
        RequestObj.Cert = Cert;
        RequestObj.TrustedCerts = TrustedCerts;
        RequestObj.CertChain = CertChain;
        RequestObj.RevokedCerts = RevokedCerts;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyCertificateChainExAsync(Cert, TrustedCerts, CertChain, RevokedCerts, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyCertificateChainEx";
        RequestObj.Cert = Cert;
        RequestObj.TrustedCerts = TrustedCerts;
        RequestObj.CertChain = CertChain;
        RequestObj.RevokedCerts = RevokedCerts;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function verifyCertificateChainExExternalTrustedCerts(Cert, TrustedCerts, CertChain, RevokedCerts) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyCertificateChainExExternalTrustedCerts";
        RequestObj.Cert = Cert;
        RequestObj.TrustedCerts = TrustedCerts;
        RequestObj.CertChain = CertChain;
        RequestObj.RevokedCerts = RevokedCerts;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyCertificateChainExExternalTrustedCertsAsync(Cert, TrustedCerts, CertChain, RevokedCerts, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyCertificateChainExExternalTrustedCerts";
        RequestObj.Cert = Cert;
        RequestObj.TrustedCerts = TrustedCerts;
        RequestObj.CertChain = CertChain;
        RequestObj.RevokedCerts = RevokedCerts;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    // ÐŸÐ¾Ð´Ð¿Ð¸ÑÑŒ Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸
    function enableReverifyPINOnSignature(ReverifyPin) {
        var RequestObj = new Object();
        RequestObj.jcapi = "enableReverifyPINOnSignature";
        RequestObj.ReverifyPin = ReverifyPin;

        return requestJcExtFunction2(RequestObj);
    }
    function isReverifyPINOnSignatureEnabled() {
        var RequestObj = new Object();
        RequestObj.jcapi = "isReverifyPINOnSignatureEnabled";

        return requestJcExtFunction2(RequestObj);
    }
    function signData(ContId, Data, AttachedSignature) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signData";
        RequestObj.ContId = ContId;
        RequestObj.Data = Data;
        RequestObj.AttachedSignature = AttachedSignature;

        return requestJcExtFunction2(RequestObj);
    }
    function signDataAsync(ContId, Data, AttachedSignature, UseHardwareHash, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signData";
        RequestObj.ContId = ContId;
        RequestObj.Data = Data;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.UseHardwareHash = UseHardwareHash;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function signBase64EncodedData(ContId, DataBase64, AttachedSignature) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signDataBase64";
        RequestObj.ContId = ContId;
        RequestObj.DataBase64 = DataBase64;
        RequestObj.AttachedSignature = AttachedSignature;

        return requestJcExtFunction2(RequestObj);
    }
    function signBase64EncodedDataAsync(ContId, DataBase64, AttachedSignature, UseHardwareHash, callback) {
        var RequestObj = new Object();
        if(UseHardwareHash == true)
            RequestObj.jcapi = "signDataUsingHardwareHashBase64";
        else
            RequestObj.jcapi = "signDataBase64";
        RequestObj.ContId = ContId;
        RequestObj.DataBase64 = DataBase64;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.UseHardwareHash = UseHardwareHash;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function signDataInFile(ContId, FileName, AttachedSignature) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signDataInFile";
        RequestObj.ContId = ContId;
        RequestObj.FileName = FileName;
        RequestObj.AttachedSignature = AttachedSignature;

        return requestJcExtFunction2(RequestObj);
    }
    function signDataInFileBase64(ContId, FileName, AttachedSignature) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signDataInFileBase64";
        RequestObj.ContId = ContId;
        RequestObj.FileName = FileName;
        RequestObj.AttachedSignature = AttachedSignature;

        return requestJcExtFunction2(RequestObj);
    }
    function signDataUsingHardwareHashBase64(ContId, DataBase64, AttachedSignature) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signDataUsingHardwareHashBase64";
        RequestObj.ContId = ContId;
        RequestObj.DataBase64 = DataBase64;
        RequestObj.AttachedSignature = AttachedSignature;

        return requestJcExtFunction2(RequestObj);
    }
    function signDataInFileUsingHardwareHash(ContId, FileName, AttachedSignature) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signDataInFileUsingHardwareHash";
        RequestObj.ContId = ContId;
        RequestObj.FileName = FileName;
        RequestObj.AttachedSignature = AttachedSignature;

        return requestJcExtFunction2(RequestObj);
    }
    function signDataInFileUsingHardwareHashBase64(ContId, FileName, AttachedSignature) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signDataInFileUsingHardwareHashBase64";
        RequestObj.ContId = ContId;
        RequestObj.FileName = FileName;
        RequestObj.AttachedSignature = AttachedSignature;

        return requestJcExtFunction2(RequestObj);
    }
    function signDataUsingHardwareHash(ContId, Data, AttachedSignature) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signDataUsingHardwareHash";
        RequestObj.ContId = ContId;
        RequestObj.Data = Data;
        RequestObj.AttachedSignature = AttachedSignature;

        return requestJcExtFunction2(RequestObj);
    }
    function signBase64EncodedDataUsingHardwareHash(ContId, DataBase64, AttachedSignature) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signDataUsingHardwareHashBase64";
        RequestObj.ContId = ContId;
        RequestObj.DataBase64 = DataBase64;
        RequestObj.AttachedSignature = AttachedSignature;

        return requestJcExtFunction2(RequestObj);
    }
    function signHash(ContId, Hash, AttachedSignature) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signHash";
        RequestObj.ContId = ContId;
        RequestObj.Hash = Hash;
        RequestObj.AttachedSignature = AttachedSignature;

        return requestJcExtFunction2(RequestObj);
    }
    function signDataInByte(ContId, Data, UseHardwareHash) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signDataInByte";
        RequestObj.ContId = ContId;
        RequestObj.Data = Data;
        RequestObj.UseHardwareHash = UseHardwareHash;

        return requestJcExtFunction2(RequestObj);
    }
    function signDataInByteAsync(ContId, Data, UseHardwareHash, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signDataInByte";
        RequestObj.ContId = ContId;
        RequestObj.Data = Data;
        RequestObj.UseHardwareHash = UseHardwareHash;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function signHashInByte(ContId, Hash) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signHashInByte";
        RequestObj.ContId = ContId;
        RequestObj.Hash = Hash;

        return requestJcExtFunction2(RequestObj);
    }
    function signHashInByteAsync(ContId, Hash, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "signHashInByte";
        RequestObj.ContId = ContId;
        RequestObj.Hash = Hash;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function verifyData(Signature, AttachedSignature, Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyData";
        RequestObj.Signature = Signature;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.Data = Data;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyDataHW(Signature, AttachedSignature, Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyDataHW";
        RequestObj.Signature = Signature;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.Data = Data;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyDataHWUsingHardwareHash(Signature, AttachedSignature, Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyDataHWUsingHardwareHash";
        RequestObj.Signature = Signature;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.Data = Data;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyBase64EncodedData(SignatureBase64, AttachedSignature, DataBase64) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyBase64EncodedData";
        RequestObj.SignatureBase64 = SignatureBase64;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.DataBase64 = DataBase64;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyBase64EncodedDataHW(SignatureBase64, AttachedSignature, DataBase64) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyBase64EncodedDataHW";
        RequestObj.SignatureBase64 = SignatureBase64;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.DataBase64 = DataBase64;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyBase64EncodedDataHWUsingHardwareHash(SignatureBase64, AttachedSignature, DataBase64) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyBase64EncodedDataHWUsingHardwareHash";
        RequestObj.SignatureBase64 = SignatureBase64;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.DataBase64 = DataBase64;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyRawBase64EncodedData(ContId, SignatureBase64, DataBase64) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyRawBase64EncodedData";
        RequestObj.ContId = ContId;
        RequestObj.SignatureBase64 = SignatureBase64;
        RequestObj.DataBase64 = DataBase64;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyRawBase64EncodedDataEx(SlotId, ContId, SignatureBase64, DataBase64) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyRawBase64EncodedDataEx";
        RequestObj.SlotId = SlotId;
        RequestObj.ContId = ContId;
        RequestObj.SignatureBase64 = SignatureBase64;
        RequestObj.DataBase64 = DataBase64;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyDataInFile(Signature, AttachedSignature, FileName) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyDataInFile";
        RequestObj.Signature = Signature;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.FileName = FileName;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyDataInByte(Signature, Data, PublicKeyValue) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyDataInByte";
        RequestObj.Signature = Signature;
        RequestObj.Data = Data;
        RequestObj.PublicKeyValue = PublicKeyValue;

        return requestJcExtFunction2(RequestObj);
    }
    function verifyHashInByte(Signature, Hash, PublicKeyValue) {
        var RequestObj = new Object();
        RequestObj.jcapi = "verifyHashInByte";
        RequestObj.Signature = Signature;
        RequestObj.Hash = Hash;
        RequestObj.PublicKeyValue = PublicKeyValue;

        return requestJcExtFunction2(RequestObj);
    }
    function digest(Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "digest";
        RequestObj.Data = Data;

        return requestJcExtFunction2(RequestObj);
    }
    function digestAsync(Data, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "digest";
        RequestObj.Data = Data;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function digestHardware(Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "digestHardware";
        RequestObj.Data = Data;

        return requestJcExtFunction2(RequestObj);
    }
    function digestHardwareAsync(Data, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "digestHardware";
        RequestObj.Data = Data;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function digestNoAuth(SlotId, Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "digestNoAuth";
        RequestObj.SlotId = SlotId;
        RequestObj.Data = Data;

        return requestJcExtFunction2(RequestObj);
    }
    function digestNoAuthAsync(SlotId, Data, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "digestNoAuth";
        RequestObj.SlotId = SlotId;
        RequestObj.Data = Data;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function digestNoAuthHardware(SlotId, Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "digestNoAuthHW";
        RequestObj.SlotId = SlotId;
        RequestObj.Data = Data;

        return requestJcExtFunction2(RequestObj);
    }
    function digestNoAuthHardwareAsync(SlotId, Data, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "digestNoAuthHW";
        RequestObj.SlotId = SlotId;
        RequestObj.Data = Data;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function pkcs7Parse(Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "pkcs7Parse";
        RequestObj.Data = Data;

        return requestJcExtFunction2(RequestObj);
    }
    function pkcs7ParseBase64Encoded(DataBase64) {
        var RequestObj = new Object();
        RequestObj.jcapi = "pkcs7ParseBase64";
        RequestObj.DataBase64 = DataBase64;

        return requestJcExtFunction2(RequestObj);
    }
    function pkcs7ParseInFile(FileName) {
        var RequestObj = new Object();
        RequestObj.jcapi = "pkcs7ParseInFile";
        RequestObj.FileName = FileName;

        return requestJcExtFunction2(RequestObj);
    }
    function pkcs7ParseInFileBase64Encoded(FileName) {
        var RequestObj = new Object();
        RequestObj.jcapi = "pkcs7ParseInFileBase64";
        RequestObj.FileName = FileName;

        return requestJcExtFunction2(RequestObj);
    }
    function makeContainerPkcs21Ready(ContId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "makeContainerPkcs21Ready";
        RequestObj.ContId = ContId;

        return requestJcExtFunction2(RequestObj);
    }
    // ÐÑƒÑ‚ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ Ð¸ Ð·Ð°Ñ‰Ð¸Ñ‚Ð° ÐºÐ°Ð½Ð°Ð»Ð°
    function establishSChannelBegin(CertHandle) {
        var RequestObj = new Object();
        RequestObj.jcapi = "establishSChannelBegin";
        RequestObj.CertHandle = CertHandle;

        return requestJcExtFunction2(RequestObj);
    }
    function establishSChannelContinue(ServerTlsPacket, ConectionId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "establishSChannelContinue";
        RequestObj.ServerTlsPacket = ServerTlsPacket;
        RequestObj.ConectionId = ConectionId;

        return requestJcExtFunction2(RequestObj);
    }
    function unilateralAuthenticationBegin(CertHandle) {
        var RequestObj = new Object();
        RequestObj.jcapi = "unilateralAuthenticationBegin";
        RequestObj.CertHandle = CertHandle;

        return requestJcExtFunction2(RequestObj);
    }
    function unilateralAuthenticationContinue(ServerTlsPacket, ConectionId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "unilateralAuthenticationContinue";
        RequestObj.ServerTlsPacket = ServerTlsPacket;
        RequestObj.ConectionId = ConectionId;

        return requestJcExtFunction2(RequestObj);
    }
    function encode(PlainText) {
        var RequestObj = new Object();
        RequestObj.jcapi = "encode";
        RequestObj.PlainText = PlainText;

        return requestJcExtFunction2(RequestObj);
    }
    function decode(CipherText) {
        var RequestObj = new Object();
        RequestObj.jcapi = "decode";
        RequestObj.CipherText = CipherText;

        return requestJcExtFunction2(RequestObj);
    }
    function openTLSConnection(CertHandle, Url) {
        var RequestObj = new Object();
        RequestObj.jcapi = "openTLSConnection";
        RequestObj.CertHandle = CertHandle;
        RequestObj.Url = Url;

        return requestJcExtFunction2(RequestObj);
    }
    function openTLSConnectionAsync(CertHandle, Url, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "openTLSConnection";
        RequestObj.CertHandle = CertHandle;
        RequestObj.Url = Url;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function openUnilateralTLSConnection(CertHandle, Url) {
        var RequestObj = new Object();
        RequestObj.jcapi = "openUnilateralTLSConnection";
        RequestObj.CertHandle = CertHandle;
        RequestObj.Url = Url;

        return requestJcExtFunction2(RequestObj);
    }
    function openUnilateralTLSConnectionAsync(CertHandle, Url, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "openUnilateralTLSConnection";
        RequestObj.CertHandle = CertHandle;
        RequestObj.Url = Url;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function sendDataTLS(Url, Method, Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "sendDataTLS";
        RequestObj.Url = Url;
        RequestObj.Method = Method;

        if(Data) {
            RequestObj.Data = Data;
        }

        return requestJcExtFunction2(RequestObj);
    }
    function sendDataTLSAsync(Url, Method, Data, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "sendDataTLS";
        RequestObj.Url = Url;
        RequestObj.Method = Method;

        if(Data) {
            RequestObj.Data = Data;
        }

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function closeTLSConnection() {
        var RequestObj = new Object();
        RequestObj.jcapi = "closeTLSConnection";

        return requestJcExtFunction2(RequestObj);
    }
    function closeTLSConnectionAsync(callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "closeTLSConnection";

        return requestJcExtFunction2Async(RequestObj, callback);
    }

    function startAjaxTlsServer(CertHandle, Url) {
        var RequestObj = new Object();
        RequestObj.jcapi = "startAjaxTlsServer";
        RequestObj.CertHandle = CertHandle;
        RequestObj.Url = Url;

        return requestJcExtFunction2(RequestObj);
    }
    function stopAjaxTlsServer(Port) {
        var RequestObj = new Object();
        RequestObj.jcapi = "stopAjaxTlsServer";
        RequestObj.Port = Port;

        return requestJcExtFunction2(RequestObj);
    }

    function startTlsProxyPass(CertHandle, Url) {
        var RequestObj = new Object();
        RequestObj.jcapi = "startTlsProxyPass";
        RequestObj.CertHandle = CertHandle;

        return requestJcExtFunction2(RequestObj);
    }
    function stopTlsProxyPass() {
        var RequestObj = new Object();
        RequestObj.jcapi = "stopTlsProxyPass";

        return requestJcExtFunction2(RequestObj);
    }

    // Ð¥Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ñ…
    function storeBinaryData(Label, Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "storeBinaryData";
        RequestObj.Label = Label;
        RequestObj.Data  = Data;

        return requestJcExtFunction2(RequestObj);
    }
    function storePrivateBinaryData(Label, Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "storePrivateBinaryData";
        RequestObj.Label = Label;
        RequestObj.Data  = Data;

        return requestJcExtFunction2(RequestObj);
    }
    function getBinaryDataObjectList(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getBinaryDataObjectList";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function readBinaryObject(SlotId, ObjectId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "readBinaryObject";
        RequestObj.SlotId = SlotId;
        RequestObj.ObjectId = ObjectId;

        return requestJcExtFunction2(RequestObj);
    }
    function deleteBinaryObject(ObjectId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "deleteBinaryObject";
        RequestObj.ObjectId = ObjectId;

        return requestJcExtFunction2(RequestObj);
    }
    function modifyBinaryObject(ObjectId, Label, Data) {
        var RequestObj = new Object();
        RequestObj.jcapi = "modifyBinaryObject";
        RequestObj.ObjectId = ObjectId;
        RequestObj.Label = Label;
        RequestObj.Data = Data;

        return requestJcExtFunction2(RequestObj);
    }
    // ÐœÐµÑ‚Ð¾Ð´Ñ‹ Ð´Ð»Ñ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ Ñ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð¾Ð¼ Ð¸ Ñ‚ÐµÑ…Ð½Ð¾Ð»Ð¾Ð³Ð¸ÐµÐ¹ SWYX
    function isSwyxReader(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "isSwyxReader";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function enroll(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "enroll";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function performPersonalization(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "performPersonalization";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function performPersonalizationAsync(SlotId, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "performPersonalization";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function getReaderAppletSerialNumber(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getReaderAppletSerialNumber";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function swyxStart(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxStart";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function swyxStartEx(SlotId, Reference) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxStartEx";
        RequestObj.SlotId = SlotId;
        RequestObj.Reference = Reference;

        return requestJcExtFunction2(RequestObj);
    }
    function swyxStartAsync(SlotId, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxStart";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function swyxStartExAsync(SlotId, Reference, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxStartEx";
        RequestObj.SlotId = SlotId;
        RequestObj.Reference = Reference;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function swyxStop(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxStop";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function swyxStopAsync(SlotId, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxStop";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function swyxDisplay(SlotId, Message, Timeout) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxDisplay";
        RequestObj.SlotId = SlotId;
        RequestObj.Message = Message;
        RequestObj.Timeout = Timeout;

        return requestJcExtFunction2(RequestObj);
    }
    function swyxDisplayEx(SlotId, Message, Timeout, langId, MessageIdx) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxDisplayEx";
        RequestObj.SlotId = SlotId;
        RequestObj.Message = Message;
        RequestObj.Timeout = Timeout;
        RequestObj.LangID = langId;
        RequestObj.MessageIdx = MessageIdx;

        return requestJcExtFunction2(RequestObj);
    }
    function swyxDisplayAsync(SlotId, Message, Timeout, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxDisplay";
        RequestObj.SlotId = SlotId;
        RequestObj.Message = Message;
        RequestObj.Timeout = Timeout;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function swyxDisplayExAsync(SlotId, Message, Timeout, langId, MessageIdx, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxDisplayEx";
        RequestObj.SlotId = SlotId;
        RequestObj.Message = Message;
        RequestObj.Timeout = Timeout;
        RequestObj.LangID = langId;
        RequestObj.MessageIdx = MessageIdx;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function swyxSign(SlotId, ContId, Data, DisplayedMessage, AskPin, AttachedSignature, HardwareHash, Timeout) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxSign";
        RequestObj.SlotId = SlotId;
        RequestObj.ContId = ContId;
        RequestObj.Data = Data;
        RequestObj.DisplayedMessage = DisplayedMessage;
        RequestObj.AskPin = AskPin;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.HardwareHash = HardwareHash;
        RequestObj.Timeout = Timeout;

        return requestJcExtFunction2(RequestObj);
    }
    function swyxSignAsync(SlotId, ContId, Data, DisplayedMessage, AskPin, AttachedSignature, HardwareHash, Timeout, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxSign";
        RequestObj.SlotId = SlotId;
        RequestObj.ContId = ContId;
        RequestObj.Data = Data;
        RequestObj.DisplayedMessage = DisplayedMessage;
        RequestObj.AskPin = AskPin;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.HardwareHash = HardwareHash;
        RequestObj.Timeout = Timeout;

        return requestJcExtFunction2Async(RequestObj, callback);
    }

    function swyxSignEx(SlotId, ContId, Data, DisplayedMessage, AskPin, AttachedSignature, HardwareHash, Timeout, Reference, LangID, MessageIdx) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxSignEx";
        RequestObj.SlotId = SlotId;
        RequestObj.ContId = ContId;
        RequestObj.Data = Data;
        RequestObj.DisplayedMessage = DisplayedMessage;
        RequestObj.AskPin = AskPin;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.HardwareHash = HardwareHash;
        RequestObj.Timeout = Timeout;
        RequestObj.Reference = Reference;
        RequestObj.LangID = LangID;
        RequestObj.MessageIdx = MessageIdx;

        return requestJcExtFunction2(RequestObj);
    }
    function swyxSignExAsync(SlotId, ContId, Data, DisplayedMessage, AskPin, AttachedSignature, HardwareHash, Timeout, Reference, LangID, MessageIdx, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "swyxSignEx";
        RequestObj.SlotId = SlotId;
        RequestObj.ContId = ContId;
        RequestObj.Data = Data;
        RequestObj.DisplayedMessage = DisplayedMessage;
        RequestObj.AskPin = AskPin;
        RequestObj.AttachedSignature = AttachedSignature;
        RequestObj.HardwareHash = HardwareHash;
        RequestObj.Timeout = Timeout;
        RequestObj.Reference = Reference;
        RequestObj.LangID = LangID;
        RequestObj.MessageIdx = MessageIdx;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function aftEnterAdminPINAsync(SlotId, LangID, Timeout, ConfirmationCode, Message1Idx, Message2Idx, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftEnterAdminPIN";
        RequestObj.SlotId = SlotId;
        RequestObj.LangID = LangID;
        RequestObj.Timeout = Timeout;
        RequestObj.ConfirmationCode = ConfirmationCode;
        RequestObj.MessageIdx = Message1Idx;
        RequestObj.Message2Idx = Message2Idx;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function aftSaveAdminPINAsync(SlotId, LangID, Timeout, AdminPin, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftSaveAdminPIN";
        RequestObj.SlotId = SlotId;
        RequestObj.LangID = LangID;
        RequestObj.Timeout = Timeout;
        RequestObj.AdminPin = AdminPin;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function aftInitCardAsync(SlotId, LangID, Timeout, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftInitCard";
        RequestObj.SlotId = SlotId;
        RequestObj.LangID = LangID;
        RequestObj.Timeout = Timeout;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function aftInitUserPINAsync(SlotId, LangID, Timeout, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftInitUserPIN";
        RequestObj.SlotId = SlotId;
        RequestObj.LangID = LangID;
        RequestObj.Timeout = Timeout;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function bindTokenAFTAsync(SlotId, LangID, Timeout, MessageIdx, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "bindTokenAFT";
        RequestObj.SlotId = SlotId;
        RequestObj.LangID = LangID;
        RequestObj.Timeout = Timeout;
        RequestObj.MessageIdx = MessageIdx;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function aftGetReaderVersion(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftGetReaderVersion";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function aftCardlessSupport(SlotId) {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftCardlessSupport";
        RequestObj.SlotId = SlotId;

        return requestJcExtFunction2(RequestObj);
    }
    function aftGetPINAsync(SlotId, LangID, Timeout, MessageIdx, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftGetPIN";
        RequestObj.SlotId = SlotId;
        RequestObj.LangID = LangID;
        RequestObj.Timeout = Timeout;
        RequestObj.MessageIdx = MessageIdx;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function aftGetNewPINAsync(SlotId, LangID, Timeout, Message1Idx, Message2Idx, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftGetNewPIN";
        RequestObj.SlotId = SlotId;
        RequestObj.LangID = LangID;
        RequestObj.Timeout = Timeout;
        RequestObj.MessageIdx = Message1Idx;
        RequestObj.Message2Idx = Message2Idx;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function aftUpdateFirmwareAsync(SlotId, Data, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftUpdateFirmware";
        RequestObj.SlotId = SlotId;
        RequestObj.Data = Data;

        return requestJcExtFunction2Async(RequestObj, callback);
    }
    function aftGetBrokenReaders() {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftGetBrokenReaders";

        return requestJcExtFunction2(RequestObj);
    }
    function aftFixBrokenReaderAsync(ReaderName, Data, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "aftFixBrokenReader";
        RequestObj.ReaderName = ReaderName;
        RequestObj.Data = Data;

        return requestJcExtFunction2Async(RequestObj, callback);
    }

    function closeWebSession() {
        var RequestObj = new Object();
        RequestObj.jcapi = "closeWebSession";

        if(navigator && navigator.sendBeacon) {

            RequestObj.session_id = _JCWebClient_Static.session_id;
            RequestObj.ticket_id = String(Math.floor(Math.random() * 4000000000));

            var jsonRequest = JSON.stringify(RequestObj);
            navigator.sendBeacon(_JCWebClient_Static.requestUrl, jsonRequest);
        }
        else {
            return requestJcExtFunction2(RequestObj);
        }
    }

    function setAppletEnabled(isEnabled) {
        var RequestObj = new Object();
        RequestObj.jcapi = "setAppletEnabled";
        RequestObj.isEnabled = isEnabled;

        return requestJcExtFunction2(RequestObj);
    }

    function setAppletEnabledAsync(isEnabled, callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "setAppletEnabled";
        RequestObj.isEnabled = isEnabled;

        return requestJcExtFunction2Async(RequestObj, callback);
    }

    // Debug
    function debugFunction() {
        var RequestObj = new Object();
        RequestObj.jcapi = "debugFunction";

        return requestJcExtFunction2(RequestObj);
    }
    function debugFunctionAsynch(callback) {
        var RequestObj = new Object();
        RequestObj.jcapi = "debugFunction";

        return requestJcExtFunction2Async(RequestObj, callback);
    }

    function getCertificateInfoEx(Cert) {
        var RequestObj = new Object();
        RequestObj.jcapi = "getCertificateInfoEx";
        RequestObj.Cert = Cert;

        return requestJcExtFunction2(RequestObj);
    }

})();


/// API 2.0
var JCWebClient2 = (function () {

    var _currentApiVersion = '2.0';
    var _currentEventsID = 0;

    // ID Ñ‚ÐµÐºÑƒÑ‰ÐµÐ¹ ÑÐµÑÑÐ¸Ð¸
    var _session_id = '';

    // ID Ñ‚Ð°Ð¹Ð¼Ð°ÑƒÑ‚Ð° Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸ Ð¾Ñ‚Ð²ÐµÑ‚Ð° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ° ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ð¹
    var _eventRetriveCheckTimeoutId = null;

    // Ð¤Ð»Ð°Ð³ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð½Ð¾Ð³Ð¾ Ð±Ð»Ð¾ÐºÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ¸ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ð¹
    var _disableRetriveEvents = false;

    //
    var _slotAddedSubscriptions = [];
    var _slotRemovedSubscriptions = [];
    var _loginStateChangedSubscriptions = [];

    //
    var _JCWebClient_Static = new Object();

    var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    // Ð¡Ñ‚Ñ€Ð¾ÐºÐ° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°
    _JCWebClient_Static.requestUrl = getProtocol() + '//localhost:24738/jcext?';

    // ÐžÐ±Ñ‰Ð¸Ðµ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹
    _JCWebClient_Static_defaults = {
        async: false,
        errorToString: false,
        antifraud: {
            langID: 0,
            timeout: 0
        }
    };

    // ÐžÐ±Ñ‰Ð¸Ðµ Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸
    _JCWebClient_Static_opts = {
        licensing: {
            activationRequestUrl: null,
            licenseSub: null
        },
        gibJsUrl: null
    };

    // Ð’ÑÐ¿Ð¾Ð¼Ð¾Ð³Ð°Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸ Ð¸ Ð¿ÐµÑ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ðµ
    var _isInitialized = false;

    _JCWebClient_Static.defaults = defaults;
    _JCWebClient_Static.saveSession = true;
    _JCWebClient_Static.initialize = initialize;
    _JCWebClient_Static.isInitialized = isInitialized;
    _JCWebClient_Static.sessionID = sessionID;
    _JCWebClient_Static.exec = exec;

    // ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ° Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ñ‹Ñ… ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ… ÑÐ²ÑÐ·Ð°Ð½Ð½Ñ‹Ñ… ÑÐ¾ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚Ð¾Ð¹
    _JCWebClient_Static.addEventListener = addEventListener;
    _JCWebClient_Static.attachEvent = attachEvent;
    _JCWebClient_Static.removeEventListener = removeEventListener;
    _JCWebClient_Static.detachEvent = detachEvent;


    // Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ Ð¾ÐºÐ¾Ð½Ñ‡Ð°Ð½Ð¸Ñ WEB-ÑÐµÑÑÐ¸Ð¸
    _JCWebClient_Static.closeWebSession = closeWebSession;

    // ÐšÐ¾Ð½Ð²ÐµÑ€Ñ‚Ð°Ñ†Ð¸Ñ DER Ð² PEM
    _JCWebClient_Static.derToPem = derToPem;

    // ÐŸÐ°Ñ€ÑÐ¸Ð½Ð³ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°
    _JCWebClient_Static.certInfoStringToCertObject = parseCertInfoString;
    _JCWebClient_Static.certInfoArrayToCertObject = parseCertificateInfo;

    // Ð¡Ð¾ÑÑ‚Ð¾ÑÐ½Ð¸Ðµ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ñ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ° Ð½Ð° Ð°ÐºÑ‚Ð¸Ð²Ð°Ñ†Ð¸ÑŽ Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ð¸
    _JCWebClient_Static.licenseCallback = {
        activated: null,
        error: null,
    };

    _licenseAutoActivationInProgress = false;
    _licenseAutoActivationResult = false;

    _secureBankProcessResult = undefined;

    _secureBankProcessResultCallbacks = new Array();
    _JCWebClient_Static.addGibScoringCallback = addGibScoringCallback;

    var _Vars = {
        /// FormFactor
        FormFactor: {
            undefined: 'Undefined',
            smartcard: 'SmartCard',
            jc_usb_nano: 'JaCarta-USB-Nano',
            jc_usb_mini: 'JaCarta-USB-Mini',
            jc_usb_xl: 'JaCarta-USB-XL',
            jc_usb_otp: 'JaCarta-USB-OTP',
            jc_microsd: 'JaCarta-MicroSD',
            jc_antifraud: 'JaCarta-Antifraud',
            et_classic: 'eToken-Classic',
            et_ng: 'eToken-NG',
            et_ng1: 'eToken-NG1',
            et_otp: 'eToken-OTP',
        },
        /// KeyWrapAlgorithm
        KeyWrapAlgorithm: {
            cryptoPro: 'CryptoPro',
            GOST_28147_89: 'GOST-28147-89',
        },
        /// DigestAlgorithm
        DigestAlgorithm: {
            GOST_94: 'GOST-94',
            GOST_2012_256: 'GOST-2012-256',
            GOST_2012_512: 'GOST-2012-512',
        },
        /// NetInterfaceType
        NetInterfaceType: {
            ethernet: 'Ethernet',
            token_ring: 'Token ring',
            ppp: 'PPP',
            atm: 'ATM',
            ieee80211: 'IEEE80211',
            ieee1394: 'IEEE1394',
        },
        /// RecipientInfoType
        RecipientInfoType: {
            keyTransport: 'KeyTransport ',
            keyAgreement: 'KeyAgreement ',
        },
        /// KeyAlgorithm
        KeyAlgorithm: {
            GOST_2001: 'GOST-2001',
            GOST_2012_256: 'GOST-2012-256',
            GOST_2012_512: 'GOST-2012-512',
            RSA_1024: 'RSA-1024',
            RSA_2048: 'RSA-2048',
            RSA_4096: 'RSA-4096',
        },
        /// SignaturePinStatus
        SignaturePinStatus: {
            on: 'on',
            off: 'off',
            n_a: 'n/a',
        },
        /// OsInfo
        OsInfo: {
            osArchitecture: 'osArchitecture',
            osDescription: 'osDescription',
            osType: 'osType',
            machineID: 'machineID',
            guid: 'guid',
            user: 'user',
        },
        /// TokenType
        TokenType: {
            gost: 'GOST',
            pro: 'PRO',
            gost2: 'GOST 2',
            pki: 'PKI',
            storage: 'STORAGE',
        },
        /// NetProtocol
        NetProtocol: {
            ipv4: 'IPv4',
            ipv6: 'IPv6',
        },
        /// VisualDataType
        VisualDataType: {
            text: 0,
            pdf: 1,
        },
        /// TcpConnectionState
        TcpConnectionState: {
            closed: 'closed',
            listen: 'listen',
            syn_sent: 'syn_sent',
            syn_rcvd: 'syn_rcvd',
            established: 'established',
            close_wait: 'close_wait',
            fin_wait1: 'fin_wait1',
            closing: 'closing',
            last_ack: 'last_ack',
            fin_wait2: 'fin_wait2',
            time_wait: 'time_wait',
            delete_tcb: 'delete_tcb',
        },
        /// AuthState
        AuthState: {
            notBinded: 0,
            binded: 1,
            secureChannelInProgress: 2,
            secureChannelEstablished: 3,
            unilateralAuthenticationInProgress: 4,
            unilateralAuthenticationComplete: 5,
        },
        /// CheckCRLMode
        CheckCRLMode: {
            None: 0,
            Mild: 1,
            Strong: 2,
        },
        /// AftAcceptMessageID
        AftAcceptMessageID: {
            confirm: 0,
            sign: 1,
        },
        /// UserHostData
        UserHostData: {
            all: 'all',
            JCWebClientVersion: 'JCWebClientVersion',
            browserUserAgent: 'browserUserAgent',
            slotInfo: 'slotInfo',
            tokenInfo: 'tokenInfo',
            ipconfig: 'ipconfig',
            processes: 'processes',
            sysDateTime: 'sysDateTime',
            machineID: 'machineID',
            user: 'user',
            osType: 'osType',
            osDescription: 'osDescription',
            osArchitecture: 'osArchitecture',
        },
        /// AftLang
        AftLang: {
            defaultLang: 0,
            eng: 1033,
            rus: 1049,
        },
        /// UserType
        UserType: {
            user: 'user',
            admin: 'admin',
        },
        /// LicenseFeatures
        LicenseFeatures: {
            tls: 'tls',
            systemInfo: 'systemInfo',
            ipconfig: 'ipconfig',
            processes: 'processes',
        },
        /// ReaderType
        ReaderType: {
            antifraud: 'antifraud',
            other: 'other',
        },
    };

    var _Cmds = {
        /// Ð¡Ð»ÑƒÐ¶ÐµÐ±Ð½Ñ‹Ðµ

        // Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ð²ÑÐµ Ð¾Ð±ÑŠÐµÐºÑ‚Ñ‹ Ñ Ñ‚Ð¾ÐºÐµÐ½Ð°.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param userPin (string) [Optional] - PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ.
        // @param label (string) [Optional] - Ð½Ð¾Ð²Ð°Ñ Ð¼ÐµÑ‚ÐºÐ° Ð¸Ð·Ð´ÐµÐ»Ð¸Ñ.
        //
        clearToken: {
            type: 'clearToken',
        },

        //
        // @result (array)
        //
        getAllSlots: {
            type: 'getAllSlots',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ ipconfig.
        // @param encryptionPublicKey (array) [Optional] - Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡ RSA Ð´Ð»Ñ Ð·Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PEM Ð¸Ð»Ð¸ DER.
        // @result (None) Ð·Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼Ð°Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ.
        //
        getIpConfig: {
            type: 'getIpConfig',
            argsHandler: [setLicenseDefaults],
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð²ÐµÑ€ÑÐ¸ÑŽ Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ.
        // @result (string) Ð²ÐµÑ€ÑÐ¸Ñ Ð² Ð²Ð¸Ð´Ðµ Ð¥.Ð¥.Ð¥.Ð¥.
        //
        getJCWebClientVersion: {
            type: 'getJCWebClientVersion',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ðµ Ð°ÑƒÑ‚ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸.
        //
        getLoggedInState: {
            type: 'getLoggedInState',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð·Ð°Ð¿ÑƒÑ‰ÐµÐ½Ð½Ñ‹Ñ… Ð¿Ñ€Ð¾Ñ†ÐµÑÑÐ¾Ð² Ð¸ Ð¿Ñ€Ð¸Ð²ÑÐ·Ð°Ð½Ð½Ñ‹Ñ… Ðº Ð½Ð¸Ð¼ Ð°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ñ… ÑÐµÑ‚ÐµÐ²Ñ‹Ñ… ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ð¹.
        // @param encryptionPublicKey (array) [Optional] - Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡ RSA Ð´Ð»Ñ Ð·Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PEM Ð¸Ð»Ð¸ DER.
        // @result (array) Ð·Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼Ð°Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ.
        //
        getProcesses: {
            type: 'getProcesses',
            argsHandler: [setLicenseDefaults],
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸ÑŽ Ð¾ ÑÐ»Ð¾Ñ‚Ðµ.
        // @param slotID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»Ð¾Ñ‚Ð°.
        //
        getSlotInfo: {
            type: 'getSlotInfo',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ ÑÐ¸ÑÑ‚ÐµÐ¼Ð½Ñ‹Ñ… Ð´Ð°Ñ‚Ñ‹ Ð¸ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸ Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¾Ð½Ð½Ð¾Ð¹ ÑÐ¸ÑÑ‚ÐµÐ¼Ñ‹.
        // @param encryptionPublicKey (array) [Optional] - Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡ RSA Ð´Ð»Ñ Ð·Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PEM Ð¸Ð»Ð¸ DER.
        // @result (None) ÑÐ¸ÑÑ‚ÐµÐ¼Ð½Ñ‹Ðµ Ð´Ð°Ñ‚Ð° Ð¸ Ð²Ñ€ÐµÐ¼Ñ Ð² UTC ÑÐ¾ ÑÐ¼ÐµÑ‰ÐµÐ½Ð¸ÐµÐ¼ Ð´Ð»Ñ Ñ‚ÐµÐºÑƒÑ‰ÐµÐ³Ð¾ Ð»Ð¾ÐºÐ°Ð»ÑŒÐ½Ð¾Ð³Ð¾ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸.
        //
        getSystemDateTime: {
            type: 'getSystemDateTime',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ Ð¾ ÑÐ¸ÑÑ‚ÐµÐ¼Ðµ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ.
        // @param info (string) [Required] - Ñ‚Ð¸Ð¿ Ð·Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼Ð¾Ð¹ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸.
        // @param encryptionPublicKey (array) [Optional] - Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡ RSA Ð´Ð»Ñ Ð·Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PEM Ð¸Ð»Ð¸ DER.
        // @result (string) Ð·Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼Ð°Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ.
        //
        getSystemInfo: {
            type: 'getSystemInfo',
            argsHandler: [setLicenseDefaults],
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸ÑŽ Ð¾Ð± ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð¼ ÐºÐ»ÑŽÑ‡Ðµ.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param extendedInfo (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ñ Ð´Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾Ð¹ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸.
        //
        getTokenInfo: {
            type: 'getTokenInfo',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ Ð¾ ÑÐ¸ÑÑ‚ÐµÐ¼Ðµ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ.
        // @param userHostData (array) [Required] - ÑÐ¿Ð¸ÑÐ¾Ðº Ð·Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼Ð¾Ð¹ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸.
        // @result (object) Ð·Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼Ð°Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ.
        //
        getUserHostData: {
            type: 'getUserHostData',
            argsHandler: [setUserHostDataDefaults, setLicenseDefaults],
            resultHandler: processUserHostData,
        },

        // Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param useUI (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð³Ñ€Ð°Ñ„Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð¸Ð½Ñ‚ÐµÑ€Ñ„ÐµÐ¹ÑÐ° Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ JC-WebClient.
        // @param adminPin (string) [Optional] - PIN-ÐºÐ¾Ð´ Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°.
        // @param userPin (string) [Optional] - Ð½Ð¾Ð²Ñ‹Ð¹ PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ.
        // @param label (string) [Required] - Ð½Ð¾Ð²Ð°Ñ Ð¼ÐµÑ‚ÐºÐ° Ð¸Ð·Ð´ÐµÐ»Ð¸Ñ.
        // @param options (object) [Optional] - Ð”Ð¾Ð¿. Ð¾Ð¿Ñ†Ð¸Ð¸.
        // @param optionsPki (object) [Optional] - Ð”Ð¾Ð¿. Ð¾Ð¿Ñ†Ð¸Ð¸ Ð´Ð»Ñ Ð°Ð¿Ð¿Ð»ÐµÑ‚Ð° PKI.
        //
        initToken: {
            type: 'initToken',
        },

        /// ÐžÐ±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð¾ÑˆÐ¸Ð±Ð¾Ðº

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ Ð¾ÑˆÐ¸Ð±ÐºÐ¸ Ð¿Ð¾ ÐµÑ‘ ÐºÐ¾Ð´Ñƒ.
        // @param code (int) [Required] - ÐºÐ¾Ð´ Ð¾ÑˆÐ¸Ð±ÐºÐ¸.
        // @result (string) Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ Ð¾ÑˆÐ¸Ð±ÐºÐ¸.
        //
        getErrorDescription: {
            type: 'getErrorDescription',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÐºÐ¾Ð´ Ð¿Ð¾ÑÐ»ÐµÐ´Ð½ÐµÐ¹ Ð¾ÑˆÐ¸Ð±ÐºÐ¸.
        //
        getLastError: {
            type: 'getLastError',
        },

        /// Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ PIN-ÐºÐ¾Ð´Ð°Ð¼Ð¸

        // Ð˜Ð·Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð° Ð¸ Ð¿Ñ€ÐµÐ´ÑŠÑÐ²Ð¸Ñ‚ÑŒ PIN-ÐºÐ¾Ð´.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param antifraud (object) [Required] -
        // @param oldPin (string) [Required] - ÑÑ‚Ð°Ñ€Ñ‹Ð¹ PIN-ÐºÐ¾Ð´.
        // @result (object)
        //
        aftChangeUserPINAndBind: {
            type: 'aftChangeUserPINAndBind',
            argsHandler: [setDefaultsAft],
            resultHandler: updateSessionId,
        },

        // ÐŸÑ€ÐµÐ´ÑŠÑÐ²Ð¸Ñ‚ÑŒ PIN-ÐºÐ¾Ð´.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param antifraud (object) [Optional] -
        // @param useUI (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð³Ñ€Ð°Ñ„Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð¸Ð½Ñ‚ÐµÑ€Ñ„ÐµÐ¹ÑÐ° Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ JC-WebClient.
        // @param pin (string) [Optional] - PIN-ÐºÐ¾Ð´.
        // @param secureMessaging (bool) [Optional] - Ð’ÐºÐ»ÑŽÑ‡Ð¸Ñ‚ÑŒ Ð·Ð°Ñ‰Ð¸Ñ‰Ñ‘Ð½Ð½Ñ‹Ð¹ ÑÐµÐ°Ð½Ñ.
        // @result (object)
        //
        bindToken: {
            type: 'bindToken',
            argsHandler: [setDefaultsAft],
            resultHandler: updateSessionId,
        },

        // Ð˜Ð·Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð¸Ð»Ð¸ Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð° ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param antifraud (object) [Optional] -
        // @param userType (string) [Required] - Ñ‚Ð¸Ð¿ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ.
        // @param useUI (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð³Ñ€Ð°Ñ„Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð¸Ð½Ñ‚ÐµÑ€Ñ„ÐµÐ¹ÑÐ° Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ JC-WebClient.
        // @param oldPin (string) [Optional] - ÑÑ‚Ð°Ñ€Ñ‹Ð¹ PIN-ÐºÐ¾Ð´.
        // @param newPin (string) [Optional] - Ð½Ð¾Ð²Ñ‹Ð¹ PIN-ÐºÐ¾Ð´.
        //
        changePIN: {
            type: 'changePIN',
            argsHandler: [setDefaultsAft],
        },

        // Ð¡Ð¼ÐµÐ½Ð° PIN-ÐºÐ¾Ð´Ð° Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸.
        // @param oldPin (string) [Required] - ÑÑ‚Ð°Ñ€Ñ‹Ð¹ PIN-ÐºÐ¾Ð´.
        // @param newPin (string) [Required] - Ð½Ð¾Ð²Ñ‹Ð¹ PIN-ÐºÐ¾Ð´.
        //
        changeSignaturePIN: {
            type: 'changeSignaturePIN',
        },

        // Ð¡Ð¾Ð·Ð´Ð°Ð½Ð¸Ðµ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ° Ð½Ð° Ñ€Ð°Ð·Ð±Ð»Ð¾ÐºÐ¸Ñ€Ð¾Ð²ÐºÑƒ PIN-ÐºÐ¾Ð´Ð° Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ ÑÐ³ÐµÐ½ÐµÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°.
        //
        createUnblockChallenge: {
            type: 'createUnblockChallenge',
        },

        // Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param antifraud (object) [Optional] -
        // @param useUI (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð³Ñ€Ð°Ñ„Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð¸Ð½Ñ‚ÐµÑ€Ñ„ÐµÐ¹ÑÐ° Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ JC-WebClient.
        // @param adminPin (string) [Optional] - PIN-ÐºÐ¾Ð´ Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°.
        // @param userPin (string) [Optional] - PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ.
        //
        initUserPIN: {
            type: 'initUserPIN',
            argsHandler: [setDefaultsAft],
        },

        // Ð£ÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ¸ PIN-ÐºÐ¾Ð´Ð° Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸.
        // @param pin (string) [Required] - PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸.
        //
        setSignaturePIN: {
            type: 'setSignaturePIN',
        },

        // Ð Ð°Ð·Ð¾Ñ€Ð²Ð°Ñ‚ÑŒ Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ð½Ñ‹Ð¹ ÐºÐ°Ð½Ð°Ð», ÐµÑÐ»Ð¸ Ð¾Ð½ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½, Ð¸/Ð¸Ð»Ð¸ Ð¾Ñ‚Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ Ð¿Ñ€ÐµÐ´ÑŠÑÐ²Ð»ÐµÐ½Ð¸Ðµ PIN-ÐºÐ¾Ð´Ð°.
        //
        unbindToken: {
            type: 'unbindToken',
        },

        // Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param antifraud (object) [Optional] -
        // @param useUI (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð³Ñ€Ð°Ñ„Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð¸Ð½Ñ‚ÐµÑ€Ñ„ÐµÐ¹ÑÐ° Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ JC-WebClient.
        // @param adminPin (string) [Optional] - PIN-ÐºÐ¾Ð´ Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°.
        // @param pukCode (string) [Optional] - PUK-ÐºÐ¾Ð´.
        // @param response (array) [Optional] - ÐŸÐ¾ÑÐ»ÐµÐ´Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚ÑŒ Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð° Ð² Ð¾Ñ‚Ð²ÐµÑ‚ Ð½Ð° Ð·Ð°Ð¿Ñ€Ð¾Ñ Ð½Ð° Ñ€Ð°Ð·Ð±Ð»Ð¾ÐºÐ¸Ñ€Ð¾Ð²ÐºÑƒ.
        //
        unblockUserPIN: {
            type: 'unblockUserPIN',
            argsHandler: [setDefaultsAft],
        },

        /// Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ Ð°Ð²Ñ‚Ð¾Ð½Ð¾Ð¼Ð½Ñ‹Ð¼Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°Ð¼Ð¸

        // Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚.
        // @param certID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°.
        //
        deleteStandaloneCertificate: {
            type: 'deleteStandaloneCertificate',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÐ¿Ð¸ÑÐ¾Ðº ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ð².
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param filters (object) [Optional] - Ñ„Ð¸Ð»ÑŒÑ‚Ñ€Ñ‹ Ð¿Ð¾Ð¸ÑÐºÐ°
        // @result (array)
        //
        getStandaloneCertificateList: {
            type: 'getStandaloneCertificateList',
        },

        //
        // @param cert (array) [Required] -
        // @param description (string) [Required] - Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð°.
        // @result (int) Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ð·Ð°Ð¿Ð¸ÑÐ°Ð½Ð½Ð¾Ð³Ð¾ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°.
        //
        writeStandaloneCertificate: {
            type: 'writeStandaloneCertificate',
        },

        /// Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÐºÐ»ÑŽÑ‡ÐµÐ²Ñ‹Ð¼Ð¸ Ð¿Ð°Ñ€Ð°Ð¼Ð¸

        //
        // @param description (string) [Required] - Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð°.
        // @param ckaID (array) [Optional] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ CKA_ID
        // @param paramSet (string) [Required] - Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹ ÑÐ»Ð»Ð¸Ð¿Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¾Ð¹ ÐºÑ€Ð¸Ð²Ð¾Ð¹ ÐºÐ»ÑŽÑ‡ÐµÐ²Ð¾Ð¹ Ð¿Ð°Ñ€Ñ‹.
        // @param algorithm (string) [Required] - Ð°Ð»Ð³Ð¾Ñ€Ð¸Ñ‚Ð¼
        // @param requireSignaturePin (bool) [Required] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ PIN-ÐºÐ¾Ð´Ð° Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸
        // @result (int) Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ¾Ð·Ð´Ð°Ð½Ð½Ð¾Ð¹ ÐºÐ»ÑŽÑ‡ÐµÐ²Ð¾Ð¹ Ð¿Ð°Ñ€Ñ‹.
        //
        createKeyPair: {
            type: 'createKeyPair',
        },

        //
        // @param keyPairID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ»ÑŽÑ‡ÐµÐ²Ð¾Ð¹ Ð¿Ð°Ñ€Ñ‹.
        //
        deleteKeyPair: {
            type: 'deleteKeyPair',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÐ¿Ð¸ÑÐ¾Ðº ÐºÐ»ÑŽÑ‡ÐµÐ²Ñ‹Ñ… Ð¿Ð°Ñ€.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @result (array)
        //
        getKeyPairList: {
            type: 'getKeyPairList',
        },

        /// Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð°Ð¼Ð¸

        // Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        //
        deleteContainer: {
            type: 'deleteContainer',
        },

        // Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑÐºÐ¸Ð¹ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @result (int) Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ»ÑŽÑ‡ÐµÐ²Ð¾Ð¹ Ð¿Ð°Ñ€Ñ‹ (contID Ð±Ð¾Ð»ÑŒÑˆÐµ Ð½ÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½).
        //
        deleteUserCertificate: {
            type: 'deleteUserCertificate',
        },

        // Ð¡Ð³ÐµÐ½ÐµÑ€Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð¸ Ð·Ð°Ð¿Ð¸ÑÐ°Ñ‚ÑŒ ÑÐ°Ð¼Ð¾Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ð½Ð½Ñ‹Ð¹ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑÐºÐ¸Ð¹ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚.
        // @param keyPairID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ»ÑŽÑ‡ÐµÐ²Ð¾Ð¹ Ð¿Ð°Ñ€Ñ‹.
        // @param dn (object) [Required] - distinguished name.
        // @param exts (object) [Required] - Ñ€Ð°ÑÑˆÐ¸Ñ€ÐµÐ½Ð¸Ñ Ð´Ð»Ñ Ð²ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ Ð² Ð·Ð°Ð¿Ñ€Ð¾Ñ.
        // @param days (int) [Required] - ÑÑ€Ð¾Ðº Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ñ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ð´Ð½ÑÑ… Ñ Ð¼Ð¾Ð¼ÐµÐ½Ñ‚Ð° Ð²Ñ‹Ð¿ÑƒÑÐºÐ°.
        // @result (int) Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ð¿Ð¾Ð»ÑƒÑ‡Ð¸Ð²ÑˆÐµÐ³Ð¾ÑÑ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (keyPairID Ð±Ð¾Ð»ÑŒÑˆÐµ Ð½ÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½).
        //
        generateUserSelfSignedCertificate: {
            type: 'generateUserSelfSignedCertificate',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÐ¿Ð¸ÑÐ¾Ðº ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð¾Ð².
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param filters (object) [Optional] - Ñ„Ð¸Ð»ÑŒÑ‚Ñ€Ñ‹ Ð¿Ð¾Ð¸ÑÐºÐ°
        // @result (array)
        //
        getContainerList: {
            type: 'getContainerList',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÐ¿Ð¸ÑÐ¾Ðº Ð´Ð¾Ð²ÐµÑ€ÐµÐ½Ð½Ñ‹Ñ… Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ñ… ÐºÐ»ÑŽÑ‡ÐµÐ¹.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @result (array)
        //
        getTrustedPublicKeyList: {
            type: 'getTrustedPublicKeyList',
        },

        // Ð—Ð°Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑÐºÐ¸Ð¹ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚.
        // @param keyPairID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ»ÑŽÑ‡ÐµÐ²Ð¾Ð¹ Ð¿Ð°Ñ€Ñ‹.
        // @param cert (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PEM Ð¸Ð»Ð¸ DER.
        // @result (int) Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ð¿Ð¾Ð»ÑƒÑ‡Ð¸Ð²ÑˆÐµÐ³Ð¾ÑÑ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (keyPairID Ð±Ð¾Ð»ÑŒÑˆÐµ Ð½ÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½).
        //
        writeUserCertificate: {
            type: 'writeUserCertificate',
        },

        /// Ð”Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ

        // Ð¡Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ.
        // @param id (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€.
        // @param description (string) [Required] - Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð°.
        //
        changeDescription: {
            type: 'changeDescription',
        },

        // Ð£Ð´Ð°Ð»ÐµÐ½Ð¸Ðµ ÐºÐ»ÑŽÑ‡ÐµÐ²Ð¾Ð¹ Ð¿Ð°Ñ€Ñ‹, ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° Ð¸Ð»Ð¸ Standalone ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°.
        // @param id (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€.
        //
        deletePKIObject: {
            type: 'deletePKIObject',
        },

        // Ð’Ð¸Ð·ÑƒÐ°Ð»Ð¸Ð·Ð¸Ñ€ÑƒÐµÑ‚ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ð½Ð¸Ñ.
        // @param contID (int) [Optional] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param keyPairID (int) [Optional] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ»ÑŽÑ‡ÐµÐ²Ð¾Ð¹ Ð¿Ð°Ñ€Ñ‹.
        // @param cert (array) [Optional] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PEM Ð¸Ð»Ð¸ DER.
        // @param transactionID (array) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ñ‚Ñ€Ð°Ð½Ð·Ð°ÐºÑ†Ð¸Ð¸.
        // @param dataType (int) [Required] - Ñ‚Ð¸Ð¿ Ð´Ð°Ð½Ð½Ñ‹Ñ… Ð´Ð»Ñ Ð²Ð¸Ð·ÑƒÐ°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ð¸.
        // @param data (array) [Required] - Ð´Ð°Ð½Ð½Ñ‹Ðµ.
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒÑŽ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#7.
        //
        dssAuthenticate: {
            type: 'dssAuthenticate',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ CKA_ID.
        // @param id (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€.
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ CKA_ID.
        //
        readCkaID: {
            type: 'readCkaID',
        },

        // ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° TLS ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ñ.
        // @param url (string) [Required] - URL.
        // @result (bool) true - Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ñ€Ð¾ÑˆÐ»Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾, false - Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð½Ðµ Ð¿Ñ€Ð¾ÑˆÐ»Ð°.
        //
        resolveTLSServerName: {
            type: 'resolveTLSServerName',
        },

        // Ð—Ð°Ð¿ÑƒÑÑ‚Ð¸Ñ‚ÑŒ TLS-Ð¿Ñ€Ð¾ÐºÑÐ¸-ÑÐµÑ€Ð²ÐµÑ€.
        // @param url (string) [Required] - ÐÐ´Ñ€ÐµÑ Ð¿Ñ€Ð¾ÐºÑÐ¸Ñ€ÑƒÐµÐ¼Ð¾Ð³Ð¾ ÑÐµÑ€Ð²ÐµÑ€Ð°.
        // @result (string) ÐÐ´Ñ€ÐµÑ TLS-Ð¿Ñ€Ð¾ÐºÑÐ¸-ÑÐµÑ€Ð²ÐµÑ€Ð°.
        //
        startAjaxTlsProxy: {
            type: 'startAjaxTlsProxy',
        },

        // Ð—Ð°Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð½Ð¾Ð²Ð¾Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ CKA_ID.
        // @param id (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€.
        // @param newCkaID (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð½Ð¾Ð²Ñ‹Ð¼ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ CKA_ID.
        //
        writeCkaID: {
            type: 'writeCkaID',
        },

        /// Ð˜Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ñ Ñ PKI

        // Ð¡Ð¾Ð·Ð´Ð°Ñ‚ÑŒ Ð·Ð°Ð¿Ñ€Ð¾Ñ Ð½Ð° Ð¿ÐµÑ€ÐµÐ¸Ð·Ð´Ð°Ð½Ð¸Ðµ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°
        // @param oldContID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param newID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€.
        // @param signaturePin (string) [Optional] - PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸.
        // @result (array) Ð·Ð°Ð¿Ñ€Ð¾Ñ Ð½Ð° Ð¿ÐµÑ€ÐµÐ¸Ð·Ð´Ð°Ð½Ð¸Ðµ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ CMC.
        //
        createCertificateRenewal: {
            type: 'createCertificateRenewal',
            argsHandler: [setDefaultsAft],
        },

        // Ð¡Ð¾Ð·Ð´Ð°Ñ‚ÑŒ Ð·Ð°Ð¿Ñ€Ð¾Ñ Ð½Ð° ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚.
        // @param id (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€.
        // @param dn (object) [Required] - distinguished name.
        // @param exts (object) [Required] - Ñ€Ð°ÑÑˆÐ¸Ñ€ÐµÐ½Ð¸Ñ Ð´Ð»Ñ Ð²ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ Ð² Ð·Ð°Ð¿Ñ€Ð¾Ñ.
        // @param useHardwareHash (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð°Ð¿Ð¿Ð°Ñ€Ð°Ñ‚Ð½Ð¾Ð³Ð¾ Ñ…ÐµÑˆÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ.
        // @param signaturePin (string) [Optional] - PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸.
        // @param customSignedAttributes (array) [Optional] - ÑÐ¿Ð¸ÑÐ¾Ðº Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑÐºÐ¸Ñ… Ð¿Ð¾Ð´Ð¿Ð¸ÑÑ‹Ð²Ð°ÐµÐ¼Ñ‹Ñ… Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ð¾Ð²
        // @result (array) Ð·Ð°Ð¿Ñ€Ð¾Ñ Ð½Ð° ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#10.
        //
        genCSR: {
            type: 'genCSR',
            argsHandler: [setDefaultsAft],
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°.
        // @param id (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ DER.
        //
        getCertificateBody: {
            type: 'getCertificateBody',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÐ¾Ð´ÐµÑ€Ð¶Ð°Ð½Ð¸Ðµ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ñ‚ÐµÐºÑÑ‚Ð¾Ð²Ð¾Ð¼ Ð²Ð¸Ð´Ðµ.
        // @param cert (array) [Optional] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PEM Ð¸Ð»Ð¸ DER.
        // @param tokenID (int) [Optional] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param id (int) [Optional] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€.
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ñ‚ÐµÐºÑÑ‚Ð¾Ð²Ð¾Ð¹ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸ÐµÐ¹ Ð¾ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ðµ.
        //
        getCertificateInfo: {
            type: 'getCertificateInfo',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ñ Ð¿Ð¾Ð»ÐµÐ¹ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°.
        // @param cert (array) [Optional] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PEM Ð¸Ð»Ð¸ DER.
        // @param tokenID (int) [Optional] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param id (int) [Optional] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€.
        // @result (object) JavaScript-Ð¾Ð±ÑŠÐµÐºÑ‚, Ð²ÐºÐ»ÑŽÑ‡Ð°ÑŽÑ‰Ð¸Ð¹ Ð² ÑÐµÐ±Ñ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ñ Ð²ÑÐµÑ… Ð¿Ð¾Ð»ÐµÐ¹ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°.
        //
        parseX509Certificate: {
            type: 'getCertificateInfo',
            resultHandler: parseCertificateInfo,
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð° ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð°.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param id (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€.
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ Ð¾Ñ‚ Ð¼Ð»Ð°Ð´ÑˆÐµÐ³Ð¾ Ðº ÑÑ‚Ð°Ñ€ÑˆÐµÐ¼Ñƒ (little-endian).
        //
        readPublicKey: {
            type: 'readPublicKey',
        },

        // ÐŸÑ€Ð¾Ñ‡Ð¸Ñ‚Ð°Ñ‚ÑŒ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚ ÑÐµÑ€Ð²ÐµÑ€Ð° Ð¸Ð· ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð°.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        //
        readServerObject: {
            type: 'readServerObject',
        },

        // Ð Ð°ÑÑˆÐ¸Ñ€ÐµÐ½Ð½Ð°Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð²Ð°Ð»Ð¸Ð´Ð½Ð¾ÑÑ‚Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°.
        // @param cert (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚, Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð»ÑÑŽÑ‰Ð¸Ð¹ Ð¸Ð· ÑÐµÐ±Ñ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ DER.
        // @param trustedCertificates (array) [Optional] - Ð´Ð²ÑƒÑ…Ð¼ÐµÑ€Ð½Ñ‹Ð¹ Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÑÐ¼Ð¸ Ð´Ð¾Ð²ÐµÑ€ÐµÐ½Ð½Ñ‹Ñ… ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ð² Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ X509 Ð¸Ð»Ð¸ Ð¼Ð°ÑÑÐ¸Ð² Ð¼Ð°ÑÑÐ¸Ð² Ð¸Ð· Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€Ð¾Ð² Ð´Ð¾Ð²ÐµÑ€ÐµÐ½Ð½Ñ‹Ñ… ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ð².
        // @param certificateChain (array) [Required] - Ð´Ð²ÑƒÑ…Ð¼ÐµÑ€Ð½Ñ‹Ð¹ Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÑÐ¼Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ð² Ð¸Ð· Ñ†ÐµÐ¿Ð¾Ñ‡ÐºÐ¸.
        // @param revokedCertificates (array) [Required] - Ð´Ð²ÑƒÑ…Ð¼ÐµÑ€Ð½Ñ‹Ð¹ Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚, ÑÐ¾Ð´ÐµÑ€Ð¶Ð°Ñ‰Ð¸Ð¹ Ð½Ð°Ð±Ð¾Ñ€ CRL Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ X509.
        //
        verifyCertificateChain: {
            type: 'verifyCertificateChain',
        },

        // ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð²Ð°Ð»Ð¸Ð´Ð½Ð¾ÑÑ‚Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð¿Ð¾ Ñ†ÐµÐ¿Ð¾Ñ‡ÐºÐµ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param trustedCertificates (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð¸Ð· Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€Ð¾Ð² Ð´Ð¾Ð²ÐµÑ€ÐµÐ½Ð½Ñ‹Ñ… ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ð².
        // @param certificateChain (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð¸Ð· Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€Ð¾Ð² Ñ†ÐµÐ¿Ð¾Ñ‡ÐºÐ¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ð².
        // @param revokedCertificates (array) [Optional] - Ð´Ð²ÑƒÑ…Ð¼ÐµÑ€Ð½Ñ‹Ð¹ Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚, ÑÐ¾Ð´ÐµÑ€Ð¶Ð°Ñ‰Ð¸Ð¹ Ð½Ð°Ð±Ð¾Ñ€ CRL Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ X509.
        // @result (bool) true, ÐµÑÐ»Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ñ€Ð¾Ð¹Ð´ÐµÐ½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾.
        //
        verifyCertificateChainOnToken: {
            type: 'verifyCertificateChainOnToken',
        },

        // Ð—Ð°Ð¿Ð¸ÑÐ°Ñ‚ÑŒ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚ ÑÐµÑ€Ð²ÐµÑ€Ð° Ð² ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param cert (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PEM Ð¸Ð»Ð¸ DER.
        //
        writeServerCertificate: {
            type: 'writeServerCertificate',
        },

        // Ð—Ð°Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡ ÑÐµÑ€Ð²ÐµÑ€Ð° Ð² ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param publicKey (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ ÑÐ¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ÐµÐ¼ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð° ÑÐµÑ€Ð²ÐµÑ€Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ Ð¾Ñ‚ Ð¼Ð»Ð°Ð´ÑˆÐµÐ³Ð¾ Ðº ÑÑ‚Ð°Ñ€ÑˆÐµÐ¼Ñƒ (little-endian).
        //
        writeServerPublicKey: {
            type: 'writeServerPublicKey',
        },

        /// ÐÑƒÑ‚ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ Ð¸ Ð·Ð°Ñ‰Ð¸Ñ‚Ð° ÐºÐ°Ð½Ð°Ð»Ð°

        // ÐŸÐµÑ€ÐµÐ²ÐµÑÑ‚Ð¸ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ð½Ð¾Ð³Ð¾ ÐºÐ°Ð½Ð°Ð»Ð° Ð² Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ.
        // @param data (array) [Required] - Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ð½Ð¾Ð³Ð¾ ÐºÐ°Ð½Ð°Ð»Ð° (Ð´Ð°Ð½Ð½Ñ‹Ðµ, Ð·Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ‹Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ð½Ð½Ñ‹Ð¼ Ð² Ð¿Ñ€Ð¾Ñ†ÐµÑÑÐµ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ð½Ð¾Ð³Ð¾ ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ñ ÑÐ¸Ð¼Ð¼ÐµÑ‚Ñ€Ð¸Ñ‡Ð½Ñ‹Ð¼ ÐºÐ»ÑŽÑ‡Ð¾Ð¼).
        // @result (array) Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        //
        decode: {
            type: 'decode',
        },

        // ÐŸÐµÑ€ÐµÐ²ÐµÑÑ‚Ð¸ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ð½Ð¾Ð³Ð¾ ÐºÐ°Ð½Ð°Ð»Ð°.
        // @param data (array) [Required] - Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        // @result (array) Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ Ð¿ÐµÑ€ÐµÐ´Ð°Ñ‡Ð¸ Ð½Ð° ÑÐµÑ€Ð²ÐµÑ€ (Ð´Ð°Ð½Ð½Ñ‹Ðµ, Ð·Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ‹Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ð½Ð½Ñ‹Ð¼ Ð² Ð¿Ñ€Ð¾Ñ†ÐµÑÑÐµ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ð½Ð¾Ð³Ð¾ ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ñ ÑÐ¸Ð¼Ð¼ÐµÑ‚Ñ€Ð¸Ñ‡Ð½Ñ‹Ð¼ ÐºÐ»ÑŽÑ‡Ð¾Ð¼).
        //
        encode: {
            type: 'encode',
        },

        // ÐÐ°Ñ‡Ð°Ñ‚ÑŒ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÑƒ Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ð½Ð¾Ð³Ð¾ ÐºÐ°Ð½Ð°Ð»Ð° Ð² ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ð¸ Ñ RFC 4346.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @result (array) Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ ÑÐµÑ€Ð²ÐµÑ€Ð° Ð² ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ð¸ Ñ Ð°Ð»Ð³Ð¾Ñ€Ð¸Ñ‚Ð¼Ð¾Ð¼ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ñ TLS.
        //
        establishSChannelBegin: {
            type: 'establishSChannelBegin',
        },

        // ÐŸÑ€Ð¾Ð´Ð¾Ð»Ð¶Ð¸Ñ‚ÑŒ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÑƒ Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ð½Ð¾Ð³Ð¾ ÐºÐ°Ð½Ð°Ð»Ð° ÐºÐ°Ð½Ð°Ð»Ð° Ð² ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ð¸ Ñ RFC 4346.
        // @param connectionID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ. Ð¤Ð¾Ñ€Ð¼Ð¸Ñ€ÑƒÐµÑ‚ÑÑ ÑÐµÑ€Ð²ÐµÑ€Ð¾Ð¼.
        // @param serverData (array) [Required] - Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð¾Ñ‚ ÑÐµÑ€Ð²ÐµÑ€Ð°, Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð½Ñ‹Ðµ Ð² Ð¾Ñ‚Ð²ÐµÑ‚ Ð½Ð° Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÑƒ ÐµÐ¼Ñƒ Ð²Ñ‹Ñ…Ð¾Ð´Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ… Ð¼ÐµÑ‚Ð¾Ð´Ð° establishSChannelBegin().
        // @result (array) Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ ÑÐµÑ€Ð²ÐµÑ€Ð° Ð² ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ð¸ Ñ Ð°Ð»Ð³Ð¾Ñ€Ð¸Ñ‚Ð¼Ð¾Ð¼ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ñ TLS.
        //
        establishSChannelContinue: {
            type: 'establishSChannelContinue',
        },

        // ÐÐ°Ñ‡Ð°Ñ‚ÑŒ Ð¾Ð´Ð½Ð¾ÑÑ‚Ð¾Ñ€Ð¾Ð½Ð½ÑŽÑŽ Ð°ÑƒÑ‚ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸ÑŽ.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @result (array) Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ ÑÐµÑ€Ð²ÐµÑ€Ð° Ð² ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ð¸ Ñ Ð°Ð»Ð³Ð¾Ñ€Ð¸Ñ‚Ð¼Ð¾Ð¼ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ñ TLS.
        //
        unilateralAuthenticationBegin: {
            type: 'unilateralAuthenticationBegin',
        },

        // ÐŸÑ€Ð¾Ð´Ð¾Ð»Ð¶Ð¸Ñ‚ÑŒ Ð¾Ð´Ð½Ð¾ÑÑ‚Ð¾Ñ€Ð¾Ð½Ð½ÑŽÑŽ Ð°ÑƒÑ‚ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸ÑŽ.
        // @param connectionID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ. Ð¤Ð¾Ñ€Ð¼Ð¸Ñ€ÑƒÐµÑ‚ÑÑ ÑÐµÑ€Ð²ÐµÑ€Ð¾Ð¼.
        // @param serverData (array) [Required] - Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð¾Ñ‚ ÑÐµÑ€Ð²ÐµÑ€Ð°, Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð½Ñ‹Ðµ Ð² Ð¾Ñ‚Ð²ÐµÑ‚ Ð½Ð° Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÑƒ ÐµÐ¼Ñƒ Ð²Ñ‹Ñ…Ð¾Ð´Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ… Ð¼ÐµÑ‚Ð¾Ð´Ð° unilateralAuthenticationBegin().
        // @result (array) Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ ÑÐµÑ€Ð²ÐµÑ€Ð° Ð² ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ð¸ Ñ Ð°Ð»Ð³Ð¾Ñ€Ð¸Ñ‚Ð¼Ð¾Ð¼ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ñ TLS.
        //
        unilateralAuthenticationContinue: {
            type: 'unilateralAuthenticationContinue',
        },

        /// Ð¥Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ñ…

        // Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ð¾Ð±ÑŠÐµÐºÑ‚ Ð´Ð²Ð¾Ð¸Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ….
        // @param objectID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ð¾Ð±ÑŠÐµÐºÑ‚Ð° Ð´Ð²Ð¾Ð¸Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ….
        //
        deleteBinaryObject: {
            type: 'deleteBinaryObject',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÐ¿Ð¸ÑÐ¾Ðº Ð¾Ð±ÑŠÐµÐºÑ‚Ð¾Ð² Ð´Ð²Ð¾Ð¸Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ….
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¾Ð², ÑÐ¾ÑÑ‚Ð¾ÑÑ‰Ð¸Ñ… Ð¸Ð· Ð´Ð²ÑƒÑ… Ð¿Ð¾Ð»ÐµÐ¹: Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ð¾Ð±ÑŠÐµÐºÑ‚Ð° Ð´Ð²Ð¾Ð¸Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ…, Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ Ð¾Ð±ÑŠÐµÐºÑ‚Ð° Ð´Ð²Ð¾Ð¸Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ….
        //
        getBinaryObjectList: {
            type: 'getBinaryObjectList',
        },

        // Ð˜Ð·Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ Ð¾Ð±ÑŠÐµÐºÑ‚ Ð´Ð²Ð¾Ð¸Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ….
        // @param objectID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ð¾Ð±ÑŠÐµÐºÑ‚Ð° Ð´Ð²Ð¾Ð¸Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ….
        // @param label (string) [Optional] - Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ñ….
        // @param data (array) [Optional] - Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        //
        modifyBinaryObject: {
            type: 'modifyBinaryObject',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÐ¿Ð¸ÑÐ¾Ðº Ð¾Ð±ÑŠÐµÐºÑ‚Ð¾Ð² Ð´Ð²Ð¾Ð¸Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ….
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param objectID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ð¾Ð±ÑŠÐµÐºÑ‚Ð° Ð´Ð²Ð¾Ð¸Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ….
        // @result (array) Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        //
        readBinaryObject: {
            type: 'readBinaryObject',
        },

        // Ð—Ð°Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð½Ð° ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡ Ð´Ð²Ð¾Ð¸Ñ‡Ð½Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ð¾Ð±Ñ‰ÐµÐ´Ð¾ÑÑ‚ÑƒÐ¿Ð½ÑƒÑŽ Ð¾Ð±Ð»Ð°ÑÑ‚ÑŒ Ð¿Ð°Ð¼ÑÑ‚Ð¸.
        // @param data (array) [Required] - Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        // @param label (string) [Required] - Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ñ….
        // @param isPrivate (bool) [Required] -
        // @result (int) Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ¾Ð·Ð´Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð¾Ð±ÑŠÐµÐºÑ‚Ð°.
        //
        storeBinaryData: {
            type: 'storeBinaryData',
        },

        /// ÐŸÐ¾Ð´Ð¿Ð¸ÑÑŒ Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸

        // Ð Ð°ÑÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param senderCertificate (array) [Optional] - ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÐµÐ»Ñ, Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ð½Ñ‹Ð¹ Ð»Ð¸Ð±Ð¾ Ð² DER, Ð»Ð¸Ð±Ð¾ Ð² PEM Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ð°Ñ….
        // @param keyWrapAlgorithm (string) [Optional] - keyWrapAlgorithm.
        // @param keyMeshing (bool) [Optional] - ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ ÑÐ¾Ð´ÐµÑ€Ð¶Ð¸Ð¼Ð¾Ð³Ð¾ Ð¿Ð¾ Ð“ÐžÐ¡Ð¢ 28147 Ñ ÑƒÑÐ»Ð¾Ð¶Ð½ÐµÐ½Ð¸ÐµÐ¼ ÐºÐ»ÑŽÑ‡Ð°.
        // @param data (array) [Required] - Ð·Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ CMS.
        // @param chainOfTrust (object) [Optional] -
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ñ€Ð°ÑÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ð¼Ð¸ Ð´Ð°Ð½Ð½Ñ‹Ð¼Ð¸
        //
        decryptData: {
            type: 'decryptData',
        },

        // ÐŸÐ¾ÑÑ‡Ð¸Ñ‚Ð°Ñ‚ÑŒ Ð¿Ñ€Ð¾Ð³Ñ€Ð°Ð¼Ð¼Ð½Ñ‹Ð¹ Ñ…ÑÑˆ Ð¾Ñ‚ Ð´Ð°Ð½Ð½Ñ‹Ñ…, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÑ Ð°Ð»Ð³Ð¾Ñ€Ð¸Ñ‚Ð¼ GOST R 34.11.
        // @param data (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð´Ð°Ð½Ð½Ñ‹Ð¼Ð¸ Ð´Ð»Ñ Ñ…ÑÑˆÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ.
        // @param useHardwareHash (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð°Ð¿Ð¿Ð°Ñ€Ð°Ñ‚Ð½Ð¾Ð³Ð¾ Ñ…ÐµÑˆÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ.
        // @param tokenID (int) [Optional] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param algorithm (string) [Optional] - Ð°Ð»Ð³Ð¾Ñ€Ð¸Ñ‚Ð¼ Ñ…ÑÑˆÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ.
        // @result (array) Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ñ‹ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ Ñ…ÑÑˆ-Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸.
        //
        digest: {
            type: 'digest',
        },

        // Ð—Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ.
        // @param contID (int) [Optional] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param receiverCertificates (array) [Required] - ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ñ‹ Ð¿Ð¾Ð»ÑƒÑ‡Ð°Ñ‚ÐµÐ»ÐµÐ¹, Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ð½Ñ‹Ñ… Ð»Ð¸Ð±Ð¾ Ð² DER, Ð»Ð¸Ð±Ð¾ Ð² PEM Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ð°Ñ….
        // @param keyWrapAlgorithm (string) [Optional] - keyWrapAlgorithm.
        // @param keyMeshing (bool) [Optional] - ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ ÑÐ¾Ð´ÐµÑ€Ð¶Ð¸Ð¼Ð¾Ð³Ð¾ Ð¿Ð¾ Ð“ÐžÐ¡Ð¢ 28147 Ñ ÑƒÑÐ»Ð¾Ð¶Ð½ÐµÐ½Ð¸ÐµÐ¼ ÐºÐ»ÑŽÑ‡Ð°.
        // @param type (string) [Optional] - Ñ‚Ð¸Ð¿ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ Ð¾ Ð¿Ð¾Ð»ÑƒÑ‡Ð°Ñ‚ÐµÐ»Ðµ.
        // @param paramSet (string) [Optional] - Ð½Ð°Ð±Ð¾Ñ€Ð¾Ð¼ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð¾Ð² ÐšÑ€Ð¸Ð¿Ñ‚Ð¾ÐŸÑ€Ð¾.
        // @param subjectKeyId (bool) [Required] - Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÑŒ Ð² Ð¾Ð±ÑŠÐµÐºÑ‚Ð°Ñ… Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ Ð¿Ð¾Ð»ÑƒÑ‡Ð°Ñ‚ÐµÐ»ÐµÐ¹ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€Ð° ÐºÐ»ÑŽÑ‡Ð° ÑÑƒÐ±ÑŠÐµÐºÑ‚Ð°.
        // @param data (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð´Ð°Ð½Ð½Ñ‹Ð¼Ð¸ Ð´Ð»Ñ ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ.
        // @param chainOfTrust (object) [Optional] -
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð·Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ð¼Ð¸ Ð´Ð°Ð½Ð½Ñ‹Ð¼Ð¸ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ CMS.
        //
        encryptData: {
            type: 'encryptData',
        },

        // ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ. Ð’Ñ‹Ð´Ð°ÐµÑ‚ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#7, Ð·Ð°ÐºÐ¾Ð´Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½ÑƒÑŽ Ð² Base64.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param attachedSignature (bool) [Optional] - Ð²ÐºÐ»ÑŽÑ‡Ð°Ñ‚ÑŒ Ð»Ð¸ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ PKCS#7 (true - Ð²ÐºÐ»ÑŽÑ‡Ð°Ñ‚ÑŒ).
        // @param useHardwareHash (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð°Ð¿Ð¿Ð°Ñ€Ð°Ñ‚Ð½Ð¾Ð³Ð¾ Ñ…ÐµÑˆÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ.
        // @param data (string) [Optional] - Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        // @param fileName (string) [Optional] - Ð¸Ð¼Ñ Ñ„Ð°Ð¹Ð»Ð°, ÑÐ¾Ð´ÐµÑ€Ð¶Ð¸Ð¼Ð¾Ðµ ÐºÐ¾Ñ‚Ð¾Ñ€Ð¾Ð³Ð¾ Ñ‚Ñ€ÐµÐ±ÑƒÐµÑ‚ÑÑ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒ.
        // @param userHostData (array) [Optional] - ÑÐ¿Ð¸ÑÐ¾Ðº Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ð¾Ð² Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸ Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼Ñ‹Ñ… Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ
        // @param customSignedAttributes (array) [Optional] - ÑÐ¿Ð¸ÑÐ¾Ðº Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑÐºÐ¸Ñ… Ð¿Ð¾Ð´Ð¿Ð¸ÑÑ‹Ð²Ð°ÐµÐ¼Ñ‹Ñ… Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ð¾Ð²
        // @param addSigningTime (bool) [Optional] - Ð²ÐºÐ»ÑŽÑ‡Ð°Ñ‚ÑŒ Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ð²Ñ€ÐµÐ¼Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ð½Ð¸Ñ.
        // @param scoring (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ñ Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ ÑÐºÐ¾Ñ€Ð¸Ð½Ð³Ð° Group-IB.
        // @param useUI (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð³Ñ€Ð°Ñ„Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð¸Ð½Ñ‚ÐµÑ€Ñ„ÐµÐ¹ÑÐ° Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ JC-WebClient.
        // @param signaturePin (string) [Optional] - PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸.
        // @param antifraud (object) [Optional] -
        // @result (string) Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#7, Ð·Ð°ÐºÐ¾Ð´Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð°Ñ Ð² Base64.
        //
        signBase64EncodedData: {
            type: 'signBase64EncodedData',
            argsHandler: [setSignDefaults, setLicenseDefaults],
        },

        // ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ. Ð’Ñ‹Ð´Ð°ÐµÑ‚ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#7.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param attachedSignature (bool) [Optional] - Ð²ÐºÐ»ÑŽÑ‡Ð°Ñ‚ÑŒ Ð»Ð¸ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ PKCS#7 (true - Ð²ÐºÐ»ÑŽÑ‡Ð°Ñ‚ÑŒ).
        // @param useHardwareHash (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð°Ð¿Ð¿Ð°Ñ€Ð°Ñ‚Ð½Ð¾Ð³Ð¾ Ñ…ÐµÑˆÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ.
        // @param data (array) [Optional] - Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        // @param fileName (string) [Optional] - Ð¸Ð¼Ñ Ñ„Ð°Ð¹Ð»Ð°, ÑÐ¾Ð´ÐµÑ€Ð¶Ð¸Ð¼Ð¾Ðµ ÐºÐ¾Ñ‚Ð¾Ñ€Ð¾Ð³Ð¾ Ñ‚Ñ€ÐµÐ±ÑƒÐµÑ‚ÑÑ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒ.
        // @param userHostData (array) [Optional] - ÑÐ¿Ð¸ÑÐ¾Ðº Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ð¾Ð² Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸ Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼Ñ‹Ñ… Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ
        // @param customSignedAttributes (array) [Optional] - ÑÐ¿Ð¸ÑÐ¾Ðº Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑÐºÐ¸Ñ… Ð¿Ð¾Ð´Ð¿Ð¸ÑÑ‹Ð²Ð°ÐµÐ¼Ñ‹Ñ… Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ð¾Ð²
        // @param addSigningTime (bool) [Optional] - Ð²ÐºÐ»ÑŽÑ‡Ð°Ñ‚ÑŒ Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ð²Ñ€ÐµÐ¼Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ð½Ð¸Ñ.
        // @param scoring (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ñ Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ ÑÐºÐ¾Ñ€Ð¸Ð½Ð³Ð° Group-IB.
        // @param useUI (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð³Ñ€Ð°Ñ„Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð¸Ð½Ñ‚ÐµÑ€Ñ„ÐµÐ¹ÑÐ° Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ JC-WebClient.
        // @param signaturePin (string) [Optional] - PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸.
        // @param antifraud (object) [Optional] -
        // @param signature (array) [Optional] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒÑŽ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#7.
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒÑŽ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#7.
        //
        signData: {
            type: 'signData',
            argsHandler: [setSignDefaults, setLicenseDefaults],
        },

        // ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ. Ð’Ñ‹Ð´Ð°ÐµÑ‚ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param data (array) [Required] - Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        // @param useHardwareHash (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð°Ð¿Ð¿Ð°Ñ€Ð°Ñ‚Ð½Ð¾Ð³Ð¾ Ñ…ÐµÑˆÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ.
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒÑŽ.
        //
        signDataInByte: {
            type: 'signDataInByte',
            argsHandler: [setDefaultsAft],
        },

        // ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð±ÐµÐ· Ñ…ÑÑˆÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ (Ñ‚.Ðµ. Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ñ…ÑÑˆ).
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param hash (array) [Required] - Ñ…ÑÑˆ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚. Ð”Ð»Ð¸Ð½Ð° Ð´Ð¾Ð»Ð¶Ð½Ð° Ð±Ñ‹Ñ‚ÑŒ Ñ€Ð°Ð²Ð½Ð° 32 Ð±Ð°Ð¹Ñ‚Ð°Ð¼.
        // @param base64Encoded (bool) [Optional] - Ð²Ð»Ð¸ÑÐµÑ‚ Ð½Ð° ÐºÐ¾Ð´Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ð° Ð² base64.
        // @param userHostData (array) [Optional] - ÑÐ¿Ð¸ÑÐ¾Ðº Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ð¾Ð² Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸ Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼Ñ‹Ñ… Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ
        // @param customSignedAttributes (array) [Optional] - ÑÐ¿Ð¸ÑÐ¾Ðº Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑÐºÐ¸Ñ… Ð¿Ð¾Ð´Ð¿Ð¸ÑÑ‹Ð²Ð°ÐµÐ¼Ñ‹Ñ… Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ð¾Ð²
        // @param addSigningTime (bool) [Optional] - Ð²ÐºÐ»ÑŽÑ‡Ð°Ñ‚ÑŒ Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ð²Ñ€ÐµÐ¼Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ð½Ð¸Ñ.
        // @param scoring (bool) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ñ Ð² Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ ÑÐºÐ¾Ñ€Ð¸Ð½Ð³Ð° Group-IB.
        // @param signature (array) [Optional] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒÑŽ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#7.
        // @result (None) ÑÑ‚Ñ€Ð¾ÐºÐ° Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒÑŽ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#7. Ð¡Ñ‚Ñ€Ð¾ÐºÐ° Ð·Ð°ÐºÐ¾Ð´Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð° Ð² Base64.
        //
        signHash: {
            type: 'signHash',
            argsHandler: [setSignDefaults],
        },

        // ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð±ÐµÐ· Ñ…ÐµÑˆÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ (Ñ‚.Ðµ. Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ñ…ÐµÑˆ).
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        // @param hash (array) [Required] - Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð´Ð»Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚. Ð”Ð»Ð¸Ð½Ð° Ð´Ð¾Ð»Ð¶Ð½Ð° Ð±Ñ‹Ñ‚ÑŒ Ñ€Ð°Ð²Ð½Ð° 20 Ñ ÐºÐ¾Ð¿ÐµÐ¹ÐºÐ°Ð¼Ð¸ Ð±Ð°Ð¹Ñ‚Ð°Ð¼
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒÑŽ.
        //
        signHashInByte: {
            type: 'signHashInByte',
            argsHandler: [setDefaultsAft],
        },

        // ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ PKCS#7.
        // @param signature (string) [Required] - Ð·Ð°ÐºÐ¾Ð´Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð°Ñ Ð² Base64 Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#7.
        // @param data (string) [Optional] - Ð·Ð°ÐºÐ¾Ð´Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð°Ñ Ð² Base64 Ð´Ð°Ð½Ð½Ñ‹Ðµ, ÐµÑÐ»Ð¸ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ PKCS#7 Ð¾Ñ‚ÑÐ¾ÐµÐ´Ð¸Ð½Ñ‘Ð½Ð½Ð°Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ (detached signature). Ð’ Ð¿Ñ€Ð¾Ñ‚Ð¸Ð²Ð½Ð¾Ð¼ ÑÐ»ÑƒÑ‡Ð°Ðµ â€“ Ð¾Ñ‚ÑÑƒÑ‚ÑÑ‚Ð²Ð¸Ðµ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ð°.
        // @param fileName (string) [Optional] - Ð¸Ð¼Ñ Ñ„Ð°Ð¹Ð»Ð°, ÐµÑÐ»Ð¸ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ PKCS#7 Ð¾Ñ‚ÑÐ¾ÐµÐ´Ð¸Ð½Ñ‘Ð½Ð½Ð°Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ (detached signature). Ð’ Ð¿Ñ€Ð¾Ñ‚Ð¸Ð²Ð½Ð¾Ð¼ ÑÐ»ÑƒÑ‡Ð°Ðµ - Ð¾Ñ‚ÑÑƒÑ‚ÑÑ‚Ð²Ð¸Ðµ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ð°.
        // @param options (object) [Optional] - Ð”Ð¾Ð¿. Ð¾Ð¿Ñ†Ð¸Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸.
        // @result (bool) true, ÐµÑÐ»Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ñ€Ð¾Ð¹Ð´ÐµÐ½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾.
        //
        verifyBase64EncodedData: {
            type: 'verifyBase64EncodedData',
        },

        // ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ PKCS#7.
        // @param signature (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒÑŽ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ PKCS#7.
        // @param data (array) [Optional] - Ð´Ð°Ð½Ð½Ñ‹Ðµ, ÐµÑÐ»Ð¸ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ PKCS#7 Ð¾Ñ‚ÑÐ¾ÐµÐ´Ð¸Ð½Ñ‘Ð½Ð½Ð°Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ (detached signature). Ð’ Ð¿Ñ€Ð¾Ñ‚Ð¸Ð²Ð½Ð¾Ð¼ ÑÐ»ÑƒÑ‡Ð°Ðµ â€“ Ð¾Ñ‚ÑÑƒÑ‚ÑÑ‚Ð²Ð¸Ðµ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ð°.
        // @param fileName (string) [Optional] - Ð¸Ð¼Ñ Ñ„Ð°Ð¹Ð»Ð°, ÐµÑÐ»Ð¸ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ PKCS#7 Ð¾Ñ‚ÑÐ¾ÐµÐ´Ð¸Ð½Ñ‘Ð½Ð½Ð°Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ (detached signature). Ð’ Ð¿Ñ€Ð¾Ñ‚Ð¸Ð²Ð½Ð¾Ð¼ ÑÐ»ÑƒÑ‡Ð°Ðµ - Ð¾Ñ‚ÑÑƒÑ‚ÑÑ‚Ð²Ð¸Ðµ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ð°.
        // @param options (object) [Optional] - Ð”Ð¾Ð¿. Ð¾Ð¿Ñ†Ð¸Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸.
        // @result (bool) true, ÐµÑÐ»Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ñ€Ð¾Ð¹Ð´ÐµÐ½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾.
        //
        verifyData: {
            type: 'verifyData',
        },

        // ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        // @param signature (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒÑŽ.
        // @param data (array) [Required] - Ð´Ð°Ð½Ð½Ñ‹Ðµ.
        // @param publicKey (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¼ ÐºÐ»ÑŽÑ‡ÐµÐ¼.
        // @result (bool) true, ÐµÑÐ»Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ñ€Ð¾Ð¹Ð´ÐµÐ½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾.
        //
        verifyDataInByte: {
            type: 'verifyDataInByte',
        },

        // ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒ Ñ…ÐµÑˆÐ° Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        // @param signature (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑŒÑŽ.
        // @param hash (array) [Required] - Ñ…ÐµÑˆ Ð´Ð°Ð½Ð½Ñ‹Ñ….
        // @param publicKey (array) [Required] - Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚ Ñ Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¼ ÐºÐ»ÑŽÑ‡ÐµÐ¼.
        // @result (bool) true, ÐµÑÐ»Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ñ€Ð¾Ð¹Ð´ÐµÐ½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾.
        //
        verifyHashInByte: {
            type: 'verifyHashInByte',
        },

        /// Ð Ð°Ð·Ð±Ð¾Ñ€ PKCS#7

        // Ð˜ÑÐ¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° Ð½Ð° ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ðµ jcpkcs11 2.1.
        // @param contID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°).
        //
        makeContainerPkcs21Ready: {
            type: 'makeContainerPkcs21Ready',
        },

        // Ð˜Ð·Ð²Ð»ÐµÑ‡ÐµÐ½Ð¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ñ… Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ð½Ñ‚Ð° Ð¸Ð· PKCS#7 ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð°.
        // @param data (array) [Optional] - PKCS#7 ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        // @param fileName (string) [Optional] - Ð¸Ð¼Ñ Ñ„Ð°Ð¹Ð»Ð°, Ð² ÐºÐ¾Ñ‚Ð¾Ñ€Ð¾Ð¼ ÑÐ¾Ð´ÐµÑ€Ð¶Ð¸Ñ‚ÑÑ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€.
        //
        pkcs7Parse: {
            type: 'pkcs7Parse',
        },

        // Ð˜Ð·Ð²Ð»ÐµÑ‡ÐµÐ½Ð¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ñ… Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ð½Ñ‚Ð° Ð¸Ð· PKCS#7 ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ Base64.
        // @param data (string) [Optional] - PKCS#7 ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€, Ð·Ð°ÐºÐ¾Ð´Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ð¹ Ð² Base64.
        // @param fileName (string) [Optional] - Ð¸Ð¼Ñ Ñ„Ð°Ð¹Ð»Ð°, Ð² ÐºÐ¾Ñ‚Ð¾Ñ€Ð¾Ð¼ ÑÐ¾Ð´ÐµÑ€Ð¶Ð¸Ñ‚ÑÑ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€.
        //
        pkcs7ParseBase64Encoded: {
            type: 'pkcs7ParseBase64Encoded',
        },

        /// Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð¾Ð¼

        // Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð±ÐµÐ· Ð²Ð²Ð¾Ð´Ð° PIN-ÐºÐ¾Ð´Ð° Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param langID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ·Ñ‹ÐºÐ°, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼Ð¾Ð³Ð¾ Ð´Ð»Ñ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ð¹ Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ð½Ñ„Ñ€Ð¾Ð´ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param timeout (int) [Required] - Ñ‚Ð°Ð¹Ð¼-Ð°ÑƒÑ‚ Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° Ð¾Ñ‚ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð´Ð¾ Ð¾Ñ‚Ð¼ÐµÐ½Ñ‹ Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¸, Ð² ÑÐµÐºÑƒÐ½Ð´Ð°Ñ….
        // @param messageIDx (int) [Required] - Ð¸Ð½Ð´ÐµÐºÑ  ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ, Ð²Ñ‹Ð²Ð¾Ð´Ð¸Ð¼Ð¾Ð³Ð¾ Ð½Ð° ÑÐºÑ€Ð°Ð½ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð° Ð´Ð»Ñ Ð¿Ñ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° PIN-ÐºÐ¾Ð´Ð°.
        //
        aftBindToken: {
            type: 'aftBindToken',
            argsHandler: [setDefaultsAftParams],
        },

        // Ð—Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ Ñƒ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð²Ð²Ð¾Ð´ PIN-ÐºÐ¾Ð´Ð° Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð° Ð½Ð° ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ðµ Ð¸ ÑÐ¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ ÑÑ‚Ð¾Ñ‚ PIN-ÐºÐ¾Ð´ Ð²Ð½ÑƒÑ‚Ñ€Ð¸ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param langID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ·Ñ‹ÐºÐ°, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼Ð¾Ð³Ð¾ Ð´Ð»Ñ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ð¹ Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ð½Ñ„Ñ€Ð¾Ð´ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param timeout (int) [Required] - Ñ‚Ð°Ð¹Ð¼-Ð°ÑƒÑ‚ Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° Ð¾Ñ‚ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð´Ð¾ Ð¾Ñ‚Ð¼ÐµÐ½Ñ‹ Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¸, Ð² ÑÐµÐºÑƒÐ½Ð´Ð°Ñ….
        // @param confirmRequired (bool) [Required] - Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ñ‚ÑŒ Ð»Ð¸ Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾Ð³Ð¾ Ð²Ð²Ð¾Ð´Ð° PIN-ÐºÐ¾Ð´Ð° Ð´Ð»Ñ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¸Ñ.
        // @param message1IDx (int) [Required] - Ð¸Ð½Ð´ÐµÐºÑ Ð¿ÐµÑ€Ð²Ð¾Ð³Ð¾ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼Ð¾Ð³Ð¾ Ð´Ð»Ñ Ð¿Ñ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° ÐŸÐ˜Ð ÐºÐ¾Ð´Ð°, Ð¾Ð±Ñ‹Ñ‡Ð½Ð¾ 0x20.
        // @param message2IDx (int) [Required] - Ð¸Ð½Ð´ÐµÐºÑ Ð²Ñ‚Ð¾Ñ€Ð¾Ð³Ð¾ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼Ð¾Ð³Ð¾ Ð´Ð»Ñ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° ÐŸÐ˜Ð ÐºÐ¾Ð´Ð°, Ð¾Ð±Ñ‹Ñ‡Ð½Ð¾ 0x22.
        //
        aftEnterAdminPIN: {
            type: 'aftEnterAdminPIN',
            argsHandler: [setDefaultsAftParams],
        },

        // ÐžÐ±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¾ÑˆÐ¸Ð²ÐºÐ¸ Ð°Ð½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð° Ð´Ð»Ñ ÐºÐ¾Ñ‚Ð¾Ñ€Ð¾Ð³Ð¾ Ð¿ÐµÑ€Ð²Ð¾Ð½Ð°Ñ‡Ð°Ð»ÑŒÐ½Ð¾Ðµ Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¾ÑˆÐ¸Ð²ÐºÐ¸ Ð½Ðµ Ð±Ñ‹Ð»Ð¾ Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¾ Ð¿Ð¾Ð»Ð½Ð¾ÑÑ‚ÑŒÑŽ Ð¸ Ð°Ð½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð» Ð¾ÑÑ‚Ð°Ð»ÑÑ Ð½ÐµÑ€Ð°Ð±Ð¾Ñ‚Ð¾ÑÐ¿Ð¾ÑÐ¾Ð±Ð½Ñ‹Ð¼.
        // @param readerName (string) [Required] - Ð˜Ð¼Ñ Ð°Ð½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°. ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÑ‚ÑÑ Ñ Ð¿Ð¾Ð¼Ð¾Ñ‰ÑŒÑŽ Ð¼ÐµÑ‚Ð¾Ð´Ð° aftGetBrokenReaders().
        // @param data (array) [Required] - Ð—Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ð¹ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€ Ñ Ñ„Ð°Ð¹Ð»Ð°Ð¼Ð¸ Ð¿Ñ€Ð¾ÑˆÐ¸Ð²ÐºÐ¸ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        //
        aftFixBrokenReader: {
            type: 'aftFixBrokenReader',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ ÑÐ¿Ð¸ÑÐºÐ° Ð°Ð½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð¾Ð² Ñ "Ð½ÐµÐ´Ð¾Ð¿Ñ€Ð¾ÑˆÐ¸Ñ‚Ñ‹Ð¼" firmware.
        // @result (array) Ð¼Ð°ÑÑÐ¸Ð² Ð¸Ð¼ÐµÐ½ Ð°Ð½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð¾Ð², Ð´Ð»Ñ ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ñ… Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ñ Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ Ð¿Ñ€Ð¾ÑˆÐ¸Ð²ÐºÐ¸ Ð¿Ñ€Ð¾ÑˆÐ»Ð° Ñ‡Ð°ÑÑ‚Ð¸Ñ‡Ð½Ð¾.
        //
        aftGetBrokenReaders: {
            type: 'aftGetBrokenReaders',
        },

        // ÐœÐµÑ‚Ð¾Ð´ Ð·Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÑ‚ Ð²Ð²Ð¾Ð´ PIN-ÐºÐ¾Ð´Ð° (Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ/Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°/Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸) Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð° Ð¸ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‰Ð°ÐµÑ‚ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ PIN-ÐºÐ¾Ð´Ð°, Ð²Ð²ÐµÐ´Ñ‘Ð½Ð½Ð¾Ðµ Ð½Ð° ÐºÐ»Ð°Ð²Ð¸Ð°Ñ‚ÑƒÑ€Ðµ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param langID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ·Ñ‹ÐºÐ°, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼Ð¾Ð³Ð¾ Ð´Ð»Ñ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ð¹ Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ð½Ñ„Ñ€Ð¾Ð´ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param timeout (int) [Required] - Ñ‚Ð°Ð¹Ð¼-Ð°ÑƒÑ‚ Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° Ð¾Ñ‚ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð´Ð¾ Ð¾Ñ‚Ð¼ÐµÐ½Ñ‹ Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¸, Ð² ÑÐµÐºÑƒÐ½Ð´Ð°Ñ….
        // @param message1IDx (int) [Required] - Ð¸Ð½Ð´ÐµÐºÑ Ð¿ÐµÑ€Ð²Ð¾Ð³Ð¾ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ, Ð²Ñ‹Ð²Ð¾Ð´Ð¸Ð¼Ð¾Ð³Ð¾ Ð½Ð° ÑÐºÑ€Ð°Ð½ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð° Ð´Ð»Ñ Ð¿Ñ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÐµÐ¼ PIN-ÐºÐ¾Ð´Ð°.
        // @param message2IDx (int) [Required] - Ð¸Ð½Ð´ÐµÐºÑ Ð²Ñ‚Ð¾Ñ€Ð¾Ð³Ð¾ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ, Ð²Ñ‹Ð²Ð¾Ð´Ð¸Ð¼Ð¾Ð³Ð¾ Ð½Ð° ÑÐºÑ€Ð°Ð½ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð° Ð´Ð»Ñ Ð¿Ñ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÐµÐ¼ PIN-ÐºÐ¾Ð´Ð°.
        // @result (string) PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ.
        //
        aftGetNewPIN: {
            type: 'aftGetNewPIN',
            argsHandler: [setDefaultsAftParams],
        },

        // ÐœÐµÑ‚Ð¾Ð´ Ð·Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÑ‚ Ð²Ð²Ð¾Ð´ PIN-ÐºÐ¾Ð´Ð° (Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ/Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°/Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸) Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð° Ð¸ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‰Ð°ÐµÑ‚ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ PIN-ÐºÐ¾Ð´Ð°, Ð²Ð²ÐµÐ´Ñ‘Ð½Ð½Ð¾Ðµ Ð½Ð° ÐºÐ»Ð°Ð²Ð¸Ð°Ñ‚ÑƒÑ€Ðµ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param langID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ·Ñ‹ÐºÐ°, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼Ð¾Ð³Ð¾ Ð´Ð»Ñ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ð¹ Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ð½Ñ„Ñ€Ð¾Ð´ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param timeout (int) [Required] - Ñ‚Ð°Ð¹Ð¼-Ð°ÑƒÑ‚ Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° Ð¾Ñ‚ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð´Ð¾ Ð¾Ñ‚Ð¼ÐµÐ½Ñ‹ Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¸, Ð² ÑÐµÐºÑƒÐ½Ð´Ð°Ñ….
        // @param message1IDx (int) [Required] - Ð¸Ð½Ð´ÐµÐºÑ Ð¿ÐµÑ€Ð²Ð¾Ð³Ð¾ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ, Ð²Ñ‹Ð²Ð¾Ð´Ð¸Ð¼Ð¾Ð³Ð¾ Ð½Ð° ÑÐºÑ€Ð°Ð½ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð° Ð´Ð»Ñ Ð¿Ñ€Ð¸Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÐµÐ¼ PIN-ÐºÐ¾Ð´Ð°.
        // @result (string) PIN-ÐºÐ¾Ð´.
        //
        aftGetPIN: {
            type: 'aftGetPIN',
            argsHandler: [setDefaultsAftParams],
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð° ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param deviceID (int) [Required] - ÑÐ»Ð¾Ñ‚ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°, Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÑŽÑ‰ÐµÐ³Ð¾ Ð±ÐµÐ· ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¸Ð»Ð¸ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ð¾Ð¹ Ðº ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ñƒ.
        // @result (array) Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        //
        aftGetPublicKey: {
            type: 'aftGetPublicKey',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param deviceID (int) [Required] - ÑÐ»Ð¾Ñ‚ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°, Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÑŽÑ‰ÐµÐ³Ð¾ Ð±ÐµÐ· ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¸Ð»Ð¸ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ð¾Ð¹ Ðº ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ñƒ.
        // @result (array) ÑÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð° Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        //
        aftGetReaderSerialNumber: {
            type: 'aftGetReaderSerialNumber',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð²ÐµÑ€ÑÐ¸ÑŽ Ð¿Ñ€Ð¾ÑˆÐ¸Ð²ÐºÐ¸ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param deviceID (int) [Required] - ÑÐ»Ð¾Ñ‚ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°, Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÑŽÑ‰ÐµÐ³Ð¾ Ð±ÐµÐ· ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¸Ð»Ð¸ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ð¾Ð¹ Ðº ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ñƒ.
        //
        aftGetReaderVersion: {
            type: 'aftGetReaderVersion',
        },

        // Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñƒ Ð±ÐµÐ· Ð²Ð²Ð¾Ð´Ð° PIN-ÐºÐ¾Ð´Ð° Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð° Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÐµÐ¼.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param langID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ·Ñ‹ÐºÐ°, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼Ð¾Ð³Ð¾ Ð´Ð»Ñ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ð¹ Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ð½Ñ„Ñ€Ð¾Ð´ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param timeout (int) [Required] - Ñ‚Ð°Ð¹Ð¼-Ð°ÑƒÑ‚ Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° Ð¾Ñ‚ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð´Ð¾ Ð¾Ñ‚Ð¼ÐµÐ½Ñ‹ Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¸, Ð² ÑÐµÐºÑƒÐ½Ð´Ð°Ñ….
        //
        aftInitCard: {
            type: 'aftInitCard',
            argsHandler: [setDefaultsAftParams],
        },

        // Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ PIN-ÐºÐ¾Ð´ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð±ÐµÐ· Ð²Ð²Ð¾Ð´Ð° PIN-ÐºÐ¾Ð´Ð° Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param langID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ·Ñ‹ÐºÐ°, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼Ð¾Ð³Ð¾ Ð´Ð»Ñ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ð¹ Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ð½Ñ„Ñ€Ð¾Ð´ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param timeout (int) [Required] - Ñ‚Ð°Ð¹Ð¼-Ð°ÑƒÑ‚ Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° Ð¾Ñ‚ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð´Ð¾ Ð¾Ñ‚Ð¼ÐµÐ½Ñ‹ Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¸, Ð² ÑÐµÐºÑƒÐ½Ð´Ð°Ñ….
        // @param confirmRequired (bool) [Required] - Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ñ‚ÑŒ Ð»Ð¸ Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾Ð³Ð¾ Ð²Ð²Ð¾Ð´Ð° PIN-ÐºÐ¾Ð´Ð° Ð´Ð»Ñ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¸Ñ.
        //
        aftInitUserPIN: {
            type: 'aftInitUserPIN',
            argsHandler: [setDefaultsAftParams],
        },

        // Ð¡Ð³ÐµÐ½ÐµÑ€Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð½Ð¾Ð²ÑƒÑŽ ÐºÐ»ÑŽÑ‡ÐµÐ²ÑƒÑŽ Ð¿Ð°Ñ€Ñƒ Ð½Ð° ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ðµ.
        // @param deviceID (int) [Required] - ÑÐ»Ð¾Ñ‚ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°, Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÑŽÑ‰ÐµÐ³Ð¾ Ð±ÐµÐ· ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¸Ð»Ð¸ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ð¾Ð¹ Ðº ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ñƒ.
        //
        aftPerformPersonalization: {
            type: 'aftPerformPersonalization',
        },

        // Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ PIN-ÐºÐ¾Ð´Ð° Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð° (ÐºÐ»ÑŽÑ‡Ð° Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°) Ð½Ð° Ð²Ð½ÑƒÑ‚Ñ€Ð¸ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð° Ð¿Ñ€Ð¸ ÐµÐ³Ð¾ Ð¿ÐµÑ€ÐµÐ´Ð°Ñ‡Ðµ Ð¸Ð· Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param langID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ·Ñ‹ÐºÐ°, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼Ð¾Ð³Ð¾ Ð´Ð»Ñ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ð¹ Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ð½Ñ„Ñ€Ð¾Ð´ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param timeout (int) [Required] - Ñ‚Ð°Ð¹Ð¼-Ð°ÑƒÑ‚ Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ñ Ð²Ð²Ð¾Ð´Ð° Ð¾Ñ‚ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ Ð´Ð¾ Ð¾Ñ‚Ð¼ÐµÐ½Ñ‹ Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¸, Ð² ÑÐµÐºÑƒÐ½Ð´Ð°Ñ….
        // @param adminPin (string) [Required] - PIN-ÐºÐ¾Ð´ Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€Ð°, ÑÐ¾Ñ…Ñ€Ð°Ð½ÑÐµÐ¼Ñ‹Ð¹ Ð½Ð° Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ðµ.
        //
        aftSaveAdminPIN: {
            type: 'aftSaveAdminPIN',
            argsHandler: [setDefaultsAftParams],
        },

        // ÐžÑ‚Ð¾Ð±Ñ€Ð°Ð·Ð¸Ñ‚ÑŒ Ñ‚ÐµÐºÑÑ‚ Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð° Ð¸ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¸Ðµ Ñƒ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ.
        // @param deviceID (int) [Required] - ÑÐ»Ð¾Ñ‚ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°, Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÑŽÑ‰ÐµÐ³Ð¾ Ð±ÐµÐ· ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¸Ð»Ð¸ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ð¾Ð¹ Ðº ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ñƒ.
        // @param message (string) [Required] - Ñ‚ÐµÐºÑÑ‚ Ð´Ð»Ñ Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶ÐµÐ½Ð¸Ñ Ð½Ð° ÑÐºÑ€Ð°Ð½Ðµ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param timeout (int) [Required] - Ñ‚Ð°Ð¹Ð¼-Ð°ÑƒÑ‚ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¸Ñ Ð² 5-ÑÐµÐºÑƒÐ½Ð´Ð½Ñ‹Ñ… Ð´Ð¾Ð»ÑÑ….
        // @param extensions (object) [Required] -
        //
        aftSwyxDisplay: {
            type: 'aftSwyxDisplay',
            argsHandler: [setDefaultsAftExtensions],
        },

        // ÐÐ°Ñ‡Ð°Ñ‚ÑŒ Ñ€Ð°Ð±Ð¾Ñ‚Ñƒ Ð² SWYX-Ñ€ÐµÐ¶Ð¸Ð¼Ðµ Ñ Ð·Ð°Ð¿Ð¸ÑÑŒÑŽ Ð² Ð¶ÑƒÑ€Ð½Ð°Ð» Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¹ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ñ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð° reference.
        // @param deviceID (int) [Required] - ÑÐ»Ð¾Ñ‚ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°, Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÑŽÑ‰ÐµÐ³Ð¾ Ð±ÐµÐ· ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¸Ð»Ð¸ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ð¾Ð¹ Ðº ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ñƒ.
        // @param reference (array) [Optional] - Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€ Ð´Ð»Ñ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ñ Ð² Ð¶ÑƒÑ€Ð½Ð°Ð» Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¹.
        // @param requestSignaturePin (object) [Optional] - Ð·Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ PIN-ÐºÐ¾Ð´ Ð¸ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÑŒ ÐµÐ³Ð¾ Ð¿Ñ€Ð¸ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸.
        //
        aftSwyxStart: {
            type: 'aftSwyxStart',
            argsHandler: [setDefaultsAftRequestSignaturePin],
        },

        // Ð—Ð°ÐºÐ¾Ð½Ñ‡Ð¸Ñ‚ÑŒ Ñ€Ð°Ð±Ð¾Ñ‚Ñƒ Ð² SWYX-Ñ€ÐµÐ¶Ð¸Ð¼Ðµ.
        // @param deviceID (int) [Required] - ÑÐ»Ð¾Ñ‚ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°, Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÑŽÑ‰ÐµÐ³Ð¾ Ð±ÐµÐ· ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¸Ð»Ð¸ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ¼Ð°Ñ€Ñ‚-ÐºÐ°Ñ€Ñ‚Ñ‹, Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ð¾Ð¹ Ðº ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ñƒ.
        //
        aftSwyxStop: {
            type: 'aftSwyxStop',
        },

        // ÐžÐ±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¾ÑˆÐ¸Ð²ÐºÐ¸ Ð°Ð½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð°.
        // @param tokenID (int) [Required] - Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð³Ð¾ ÐºÐ»ÑŽÑ‡Ð°.
        // @param data (array) [Required] - Ð—Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ð¹ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€ Ñ Ñ„Ð°Ð¹Ð»Ð°Ð¼Ð¸ Ð¿Ñ€Ð¾ÑˆÐ¸Ð²ÐºÐ¸ Ð² Ð²Ð¸Ð´Ðµ Ð¼Ð°ÑÑÐ¸Ð²Ð° Ð±Ð°Ð¹Ñ‚.
        //
        aftUpdateFirmware: {
            type: 'aftUpdateFirmware',
        },

        /// Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÑÐ¸ÑÑ‚ÐµÐ¼Ð¾Ð¹ Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ ÐÐ»Ð°Ð´Ð´Ð¸Ð½ Ð .Ð”.

        // ÐÐºÑ‚Ð¸Ð²Ð°Ñ†Ð¸Ñ Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ð¸.
        // @param licenseSerialNumber (string) [Optional] - Ð¡ÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ð¸
        // @param licenseRequest (string) [Optional] - Ð—Ð°Ð¿Ñ€Ð¾Ñ Ð½Ð° Ð°ÐºÑ‚Ð¸Ð²Ð°Ñ†Ð¸ÑŽ Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ð¸
        // @param tokenSerialNumber (string) [Optional] - Ð¡ÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ñ‚Ð¾ÐºÐµÐ½Ð°
        //
        activateLicense: {
            type: 'activateLicense',
        },

        // ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾ÑÑ‚Ð¸ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð»ÑŒÐ½Ð¾ÑÑ‚Ð¸
        // @param features (array) [Required] - Ð¡Ð¿Ð¸ÑÐ¾Ðº Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð»ÑŒÐ½Ð¾ÑÑ‚ÐµÐ¹ Ð´Ð»Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸
        // @param tokenSerialNumber (string) [Optional] - Ð¡ÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ñ‚Ð¾ÐºÐµÐ½Ð°
        // @result (array) ÑÐ¿Ð¸ÑÐ¾Ðº Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ñ‹Ñ… Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð»ÑŒÐ½Ð¾ÑÑ‚ÐµÐ¹
        //
        checkLicenseFeatures: {
            type: 'checkLicenseFeatures',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ ÑÐ¿Ð¸ÑÐºÐ° Ð²ÑÐµÑ… Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ñ‹Ñ… Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ð¹
        // @param tokenSerialNumber (string) [Optional] - Ð¡ÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ñ‚Ð¾ÐºÐµÐ½Ð°
        // @result (array) ÑÐ¿Ð¸ÑÐ¾Ðº Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ñ‹Ñ… Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ð¹
        //
        getLicenses: {
            type: 'getLicenses',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑÐµÑ€Ð¸Ð¹Ð¸Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ñ‚Ð¾ÐºÐµÐ½Ð° Ð´Ð»Ñ Ð°ÐºÑ‚Ð¸Ð²Ð°Ñ†Ð¸Ð¸ Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ð¸
        // @result (string) ÑÐµÑ€Ð¸Ð¹Ð¸Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ñ‚Ð¾ÐºÐµÐ½
        //
        getTokenSerialNumberForLicense: {
            type: 'getTokenSerialNumberForLicense',
        },

        /// GIB

        // ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ ÑÐºÐ¾Ñ€Ð¸Ð½Ð³Ð°.
        // @result (string) ÑÐºÐ¾Ñ€Ð¸Ð½Ð³.
        //
        getGibScoring: {
            type: 'getGibScoring',
        },

        // ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ Ð¾ ÑÐ¸ÑÑ‚ÐµÐ¼Ðµ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ.
        // @param userHostData (array) [Required] - ÑÐ¿Ð¸ÑÐ¾Ðº Ð·Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼Ð¾Ð¹ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸.
        // @param encryptionSignedPublicKey (string) [Optional] - Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ°Ð½Ð½Ñ‹Ð¹ Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡ RSA Ð´Ð»Ñ Ð·Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ð° Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ JWS.
        // @result (string) Ð·Ð°Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼Ð°Ñ Ð·Ð°ÑˆÐ¸Ñ„Ñ€Ð¾Ð²Ð°Ð½Ð½Ð°Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ.
        //
        getGibUserHostData: {
            type: 'getGibUserHostData',
            argsHandler: [setUserHostDataDefaults],
        },

    };

    _JCWebClient_Static.Vars = _Vars;
    _JCWebClient_Static.Cmds = _Cmds;

    /// [Aliases BEGIN]

    // Ð¡Ð»ÑƒÐ¶ÐµÐ±Ð½Ñ‹Ðµ
    _JCWebClient_Static.clearToken = clearToken;
    _JCWebClient_Static.getAllSlots = getAllSlots;
    _JCWebClient_Static.getIpConfig = getIpConfig;
    _JCWebClient_Static.getJCWebClientVersion = getJCWebClientVersion;
    _JCWebClient_Static.getLoggedInState = getLoggedInState;
    _JCWebClient_Static.getProcesses = getProcesses;
    _JCWebClient_Static.getSlotInfo = getSlotInfo;
    _JCWebClient_Static.getSystemDateTime = getSystemDateTime;
    _JCWebClient_Static.getSystemInfo = getSystemInfo;
    _JCWebClient_Static.getTokenInfo = getTokenInfo;
    _JCWebClient_Static.getUserHostData = getUserHostData;
    _JCWebClient_Static.initToken = initToken;

    // ÐžÐ±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð¾ÑˆÐ¸Ð±Ð¾Ðº
    _JCWebClient_Static.getErrorDescription = getErrorDescription;
    _JCWebClient_Static.getLastError = getLastError;

    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ PIN-ÐºÐ¾Ð´Ð°Ð¼Ð¸
    _JCWebClient_Static.aftChangeUserPINAndBind = aftChangeUserPINAndBind;
    _JCWebClient_Static.bindToken = bindToken;
    _JCWebClient_Static.changePIN = changePIN;
    _JCWebClient_Static.changeSignaturePIN = changeSignaturePIN;
    _JCWebClient_Static.createUnblockChallenge = createUnblockChallenge;
    _JCWebClient_Static.initUserPIN = initUserPIN;
    _JCWebClient_Static.setSignaturePIN = setSignaturePIN;
    _JCWebClient_Static.unbindToken = unbindToken;
    _JCWebClient_Static.unblockUserPIN = unblockUserPIN;

    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ Ð°Ð²Ñ‚Ð¾Ð½Ð¾Ð¼Ð½Ñ‹Ð¼Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°Ð¼Ð¸
    _JCWebClient_Static.deleteStandaloneCertificate = deleteStandaloneCertificate;
    _JCWebClient_Static.getStandaloneCertificateList = getStandaloneCertificateList;
    _JCWebClient_Static.writeStandaloneCertificate = writeStandaloneCertificate;

    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÐºÐ»ÑŽÑ‡ÐµÐ²Ñ‹Ð¼Ð¸ Ð¿Ð°Ñ€Ð°Ð¼Ð¸
    _JCWebClient_Static.createKeyPair = createKeyPair;
    _JCWebClient_Static.deleteKeyPair = deleteKeyPair;
    _JCWebClient_Static.getKeyPairList = getKeyPairList;

    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð°Ð¼Ð¸
    _JCWebClient_Static.deleteContainer = deleteContainer;
    _JCWebClient_Static.deleteUserCertificate = deleteUserCertificate;
    _JCWebClient_Static.generateUserSelfSignedCertificate = generateUserSelfSignedCertificate;
    _JCWebClient_Static.getContainerList = getContainerList;
    _JCWebClient_Static.getTrustedPublicKeyList = getTrustedPublicKeyList;
    _JCWebClient_Static.writeUserCertificate = writeUserCertificate;

    // Ð”Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ
    _JCWebClient_Static.changeDescription = changeDescription;
    _JCWebClient_Static.deletePKIObject = deletePKIObject;
    _JCWebClient_Static.dssAuthenticate = dssAuthenticate;
    _JCWebClient_Static.readCkaID = readCkaID;
    _JCWebClient_Static.resolveTLSServerName = resolveTLSServerName;
    _JCWebClient_Static.startAjaxTlsProxy = startAjaxTlsProxy;
    _JCWebClient_Static.writeCkaID = writeCkaID;

    // Ð˜Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ñ Ñ PKI
    _JCWebClient_Static.createCertificateRenewal = createCertificateRenewal;
    _JCWebClient_Static.genCSR = genCSR;
    _JCWebClient_Static.getCertificateBody = getCertificateBody;
    _JCWebClient_Static.getCertificateInfo = getCertificateInfo;
    _JCWebClient_Static.parseX509Certificate = parseX509Certificate;
    _JCWebClient_Static.readPublicKey = readPublicKey;
    _JCWebClient_Static.readServerObject = readServerObject;
    _JCWebClient_Static.verifyCertificateChain = verifyCertificateChain;
    _JCWebClient_Static.verifyCertificateChainOnToken = verifyCertificateChainOnToken;
    _JCWebClient_Static.writeServerCertificate = writeServerCertificate;
    _JCWebClient_Static.writeServerPublicKey = writeServerPublicKey;

    // ÐÑƒÑ‚ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ Ð¸ Ð·Ð°Ñ‰Ð¸Ñ‚Ð° ÐºÐ°Ð½Ð°Ð»Ð°
    _JCWebClient_Static.decode = decode;
    _JCWebClient_Static.encode = encode;
    _JCWebClient_Static.establishSChannelBegin = establishSChannelBegin;
    _JCWebClient_Static.establishSChannelContinue = establishSChannelContinue;
    _JCWebClient_Static.unilateralAuthenticationBegin = unilateralAuthenticationBegin;
    _JCWebClient_Static.unilateralAuthenticationContinue = unilateralAuthenticationContinue;

    // Ð¥Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ñ…
    _JCWebClient_Static.deleteBinaryObject = deleteBinaryObject;
    _JCWebClient_Static.getBinaryObjectList = getBinaryObjectList;
    _JCWebClient_Static.modifyBinaryObject = modifyBinaryObject;
    _JCWebClient_Static.readBinaryObject = readBinaryObject;
    _JCWebClient_Static.storeBinaryData = storeBinaryData;

    // ÐŸÐ¾Ð´Ð¿Ð¸ÑÑŒ Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸
    _JCWebClient_Static.decryptData = decryptData;
    _JCWebClient_Static.digest = digest;
    _JCWebClient_Static.encryptData = encryptData;
    _JCWebClient_Static.signBase64EncodedData = signBase64EncodedData;
    _JCWebClient_Static.signData = signData;
    _JCWebClient_Static.signDataInByte = signDataInByte;
    _JCWebClient_Static.signHash = signHash;
    _JCWebClient_Static.signHashInByte = signHashInByte;
    _JCWebClient_Static.verifyBase64EncodedData = verifyBase64EncodedData;
    _JCWebClient_Static.verifyData = verifyData;
    _JCWebClient_Static.verifyDataInByte = verifyDataInByte;
    _JCWebClient_Static.verifyHashInByte = verifyHashInByte;

    // Ð Ð°Ð·Ð±Ð¾Ñ€ PKCS#7
    _JCWebClient_Static.makeContainerPkcs21Ready = makeContainerPkcs21Ready;
    _JCWebClient_Static.pkcs7Parse = pkcs7Parse;
    _JCWebClient_Static.pkcs7ParseBase64Encoded = pkcs7ParseBase64Encoded;

    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð¾Ð¼
    _JCWebClient_Static.aftBindToken = aftBindToken;
    _JCWebClient_Static.aftEnterAdminPIN = aftEnterAdminPIN;
    _JCWebClient_Static.aftFixBrokenReader = aftFixBrokenReader;
    _JCWebClient_Static.aftGetBrokenReaders = aftGetBrokenReaders;
    _JCWebClient_Static.aftGetNewPIN = aftGetNewPIN;
    _JCWebClient_Static.aftGetPIN = aftGetPIN;
    _JCWebClient_Static.aftGetPublicKey = aftGetPublicKey;
    _JCWebClient_Static.aftGetReaderSerialNumber = aftGetReaderSerialNumber;
    _JCWebClient_Static.aftGetReaderVersion = aftGetReaderVersion;
    _JCWebClient_Static.aftInitCard = aftInitCard;
    _JCWebClient_Static.aftInitUserPIN = aftInitUserPIN;
    _JCWebClient_Static.aftPerformPersonalization = aftPerformPersonalization;
    _JCWebClient_Static.aftSaveAdminPIN = aftSaveAdminPIN;
    _JCWebClient_Static.aftSwyxDisplay = aftSwyxDisplay;
    _JCWebClient_Static.aftSwyxStart = aftSwyxStart;
    _JCWebClient_Static.aftSwyxStop = aftSwyxStop;
    _JCWebClient_Static.aftUpdateFirmware = aftUpdateFirmware;

    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÑÐ¸ÑÑ‚ÐµÐ¼Ð¾Ð¹ Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ ÐÐ»Ð°Ð´Ð´Ð¸Ð½ Ð .Ð”.
    _JCWebClient_Static.activateLicense = activateLicense;
    _JCWebClient_Static.checkLicenseFeatures = checkLicenseFeatures;
    _JCWebClient_Static.getLicenses = getLicenses;
    _JCWebClient_Static.getTokenSerialNumberForLicense = getTokenSerialNumberForLicense;

    // GIB
    _JCWebClient_Static.getGibScoring = getGibScoring;
    _JCWebClient_Static.getGibUserHostData = getGibUserHostData;

    /// [Aliases END]

    function defaults(params) {
        if (params === undefined) {
            return _JCWebClient_Static_defaults;
        }

        setValue(params.async, 'async', 'boolean');
        setValue(params.errorToString, 'errorToString', 'boolean');

        var antifraud = params.antifraud;
        if(typeof(antifraud) === 'object') {
            setValue(antifraud.langID, 'antifraud.langID', 'number');
            setValue(antifraud.timeout, 'antifraud.timeout', 'number');
        }

        function setValue(value, paramName, expectedType) {
            if (typeof(value) === expectedType) {
                var dist = _JCWebClient_Static_defaults;

                paramName.split('.').forEach(function(item, index, array) {
                    if(index === array.length - 1) {
                        dist[item] = value;
                        return;
                    }

                    dist = dist[item];
                });
            }
        }
    }

//@endcond

    /*!
    * \fn loadSessionID()
    * \memberof JCWebClient
    * \brief ÐÐ°Ñ‡Ð°Ñ‚ÑŒ Ñ€Ð°Ð±Ð¾Ñ‚Ñƒ Ñ ÐºÐ¾Ð½Ñ‚ÐµÐºÑÑ‚Ð¾Ð¼ JCWebClient().
    *
    * Ð­Ñ‚Ð¾Ñ‚ Ð¼ÐµÑ‚Ð¾Ð´ Ð½ÑƒÐ¶Ð½Ð¾ Ð¾Ð±ÑÐ·Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾ Ð²Ñ‹Ð·Ñ‹Ð²Ð°Ñ‚ÑŒ Ð² Ð½Ð°Ñ‡Ð°Ð»Ðµ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ ÑÐºÑ€Ð¿Ð¸Ñ‚Ð° Ð² Ñ€Ð°Ð¼ÐºÐ°Ñ… Ð²ÐµÐ± ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹.
    * ÐŸÐµÑ€Ð²Ð¾Ð½Ð°Ñ‡Ð°Ð»ÑŒÐ½Ð¾ ÐºÐ¾Ð½Ñ‚ÐµÐºÑÑ‚ JCWebClient() ÑÐ¾Ð·Ð´Ð°ÐµÑ‚ÑÑ Ð¿ÑƒÑÑ‚Ñ‹Ð¼. Ð’ Ñ…Ð¾Ð´Ðµ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ Ñ JCWebClient() Ð² Ñ€Ð°Ð¼ÐºÐ°Ñ… ÐºÐ¾Ð½Ñ‚ÐµÐºÑÑ‚Ð° Ð¿Ñ€Ð¾Ð¸ÑÑ…Ð¾Ð´Ð¸Ñ‚ Ð»Ð¾Ð³Ð¾Ð½ Ð½Ð° ÑƒÑ€Ð¾Ð²Ð½Ðµ ÑÐ¼Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚Ñ‹,
    * ÑÐ¾Ð·Ð´Ð°ÑŽÑ‚ÑÑ PKCS#11 Ð¾Ð±ÑŠÐµÐºÑ‚Ñ‹, ÑƒÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÑ‚ÑÑ TLS ÑÐµÑÑÐ¸Ñ Ñ ÑƒÐ´Ð°Ð»ÐµÐ½Ð½Ñ‹Ð¼ ÑÐµÑ€Ð²ÐµÑ€Ð¾Ð¼ Ð¸ Ñ‚.Ð´. Ð’ Ð´Ð°Ð»ÑŒÐ½ÐµÐ¹ÑˆÐµÐ¼ Ð¼Ð¾Ð¶ÐµÑ‚ Ð¿Ñ€Ð¾Ð¸Ð·Ð¾Ð¹Ñ‚Ð¸ Ð¿ÐµÑ€ÐµÑ…Ð¾Ð´ Ð½Ð° Ð´Ñ€ÑƒÐ³ÑƒÑŽ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ
    * Ñ Ð¿Ð¾Ð¼Ð¾Ñ‰ÑŒÑŽ Ð¼ÐµÑ‚Ð¾Ð´Ð° JCWebClient().navigateTo(..., true), Ð¸ ÐºÐ¾Ð½Ñ‚ÐµÐºÑÑ‚ JCWebClient() Ð¿ÐµÑ€ÐµÐ¹Ð´ÐµÑ‚ Ð² Ð¾Ð±Ð»Ð°ÑÑ‚ÑŒ Ð²Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚Ð¸ ÑÐºÑ€Ð¸Ð¿Ñ‚Ð¾Ð² Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÑÐµÐ¼Ñ‹Ñ… Ð½Ð° Ð½Ð¾Ð²Ð¾Ð¹ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ.
    * Ð•ÑÐ»Ð¸ Ð¾ÑÑƒÑ‰ÐµÑÑ‚Ð²Ð»ÑÑ‚ÑŒ Ð½Ð°Ð²Ð¸Ð³Ð°Ñ†Ð¸ÑŽ Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð¼ JCWebClient().navigateTo(..., false) Ñ‚Ð¾ ÐºÐ¾Ð½Ñ‚ÐµÐºÑÑ‚ JCWebClient() Ð½Ð° Ð² Ð¾Ð±Ð»Ð°ÑÑ‚Ð¸ Ð²Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚Ð¸ ÑÐºÑ€Ð¸Ð¿Ñ‚Ð¾Ð² Ð½Ð¾Ð²Ð¾Ð¹
    * ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹ Ð±ÑƒÐ´ÐµÑ‚ Ð¸Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ð½ Ð·Ð°Ð½Ð¾Ð²Ð¾
    */
    function loadSessionID() {
        var ret = "";
        var curEventsID = 0;

        if(sessionStorage) {
            ret = sessionStorage.getItem("jc-session-id");

            try {
                curEventsID = parseInt(sessionStorage.getItem("jc-currrent-event-id")) || 0;
            }
            catch(e) {
                curEventsID = 0;
            }

            if (ret == null || sessionStorage.getItem("jc-session-id-in-use")) {
                ret = String(Math.floor(Math.random()*4000000000));
                curEventsID = 0;
            }

            sessionStorage.setItem("jc-session-id", ret);
            sessionStorage.setItem("jc-session-id-in-use", true);

            sessionStorage.setItem("jc-currrent-event-id", curEventsID);
        }

        _session_id = ret;
        _currentEventsID = curEventsID;
    }

    // Ð·Ð°Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ session-id (handler Ð´Ð»Ñ bindToken)
    function updateSessionId(id) {
        if(typeof(id) === 'string') {

            if(sessionStorage) {
                sessionStorage.setItem("jc-session-id", id);
            }
            _session_id = id;
        }

        return;
    }

    return _JCWebClient_Static;

    function isInitialized() {
        return _isInitialized;
    }

    function sessionID() {
        return _session_id;
    }

    function initialize(params) {
        if (typeof (JCWebClient) !== 'undefined' && typeof (JCWebClient().isInitialized) === 'function' && JCWebClient().isInitialized()) {
            throw new Error('JCWebClient API v1 has been already initialized');
        }

        if(params && typeof(params) === 'object') {
            var licensing = params.licensing;
            if(licensing && typeof(licensing) === 'object') {

                if(typeof(licensing.activationRequestUrl) === 'string' || licensing.activationRequestUrl === null) {
                    _JCWebClient_Static_opts.licensing.activationRequestUrl = licensing.activationRequestUrl;
                }

                if(typeof(licensing.license_data) === 'string' || licensing.license_data === null) {
                    _JCWebClient_Static_opts.licensing.licenseSub = licensing.license_data;
                }
            }

            if(typeof(params.gibJsUrl) === 'string' || params.gibJsUrl === null) {
                _JCWebClient_Static_opts.gibJsUrl = params.gibJsUrl;
            }
        }

        if(isInitialized()) {
            return;
        }

        _isInitialized = true;

        // Ð—Ð°Ð³Ñ€ÑƒÐ¶Ð°ÐµÐ¼ ID Web-ÑÐµÑÑÐ¸Ð¸ Ð¸Ð· sesionStore
        loadSessionID();
        // Ð’ ÑÐ¸Ð»Ñƒ Ð¾ÑÐ¾Ð±ÐµÐ½Ð½Ð¾ÑÑ‚ÐµÐ¹ FireFox, Ð¿ÐµÑ€Ð²Ñ‹Ð¹ ajax Ð·Ð°Ð¿Ñ€Ð¾Ñ Ðº Ð»Ð¾ÐºÐ°Ð»ÑŒÐ½Ð¾Ð¼Ñƒ Ð²ÐµÐ± ÑÐµÑ€Ð²ÐµÑ€Ñƒ Ð´Ð¾Ð»Ð¶ÐµÐ½ Ð±Ñ‹Ñ‚ÑŒ ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ñ‹Ð¹
        // ÐµÑÐ»Ð¸ Ð¿Ð¾ÑÐ»Ð°Ñ‚ÑŒ Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ñ‹Ð¹, ÐºÐ°ÐºÐ¸Ð¼ ÑÐ²Ð»ÑÐµÑ‚ÑÑ JCWebClient().RetrieveEvents(), Ñ‚Ð¾ Ð¿Ð¾ÑÐ»Ðµ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ TLS
        // ÑÐ¾ÐµÐ´Ð¸Ð½ÐµÐ½Ð¸Ñ, FireFox Ð²Ñ…Ð¾Ð´Ð¸Ñ‚ Ð² ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ðµ Ð¾Ð¶Ð¸Ð´Ð°Ð½Ð¸Ñ
        // Ñ‚Ð°ÐºÐ¸Ð¼ Ð¾Ð±Ñ€Ð°Ð·Ð¾Ð¼, Ð·Ð°Ð¿Ñ€Ð¾Ñ Ping() Ð½ÑƒÐ¶ÐµÐ½ Ð´Ð»Ñ Ñ‚Ð¾Ð³Ð¾ Ñ‡Ñ‚Ð¾Ð±Ñ‹ "Ð²Ð·Ð±Ð¾Ð´Ñ€Ð¸Ñ‚ÑŒ" FF Ð¸ Ð¿ÐµÑ€ÐµÐ¹Ñ‚Ð¸ Ðº Ð¾Ñ‚ÑÑ‹Ð»ÐºÐµ Ð¿Ð¾ÑÐ»ÐµÐ´ÑƒÑŽÑ‰Ð¸Ñ…
        // ajax Ð·Ð°Ð¿Ñ€Ð¾ÑÐ¾Ð² Ñ‚Ð°ÐºÐ¸Ñ… ÐºÐ°Ðº getPluginVersion() Ð¸ Ñ‚.Ð´.
        Ping();
        // Ð•ÑÐ»Ð¸ Ð·Ð°Ð´ÐµÐ¹ÑÑ‚Ð²Ð¾Ð°Ð½ JCWebClient 3.0, Ð·Ð°Ð¿ÑƒÑÐºÐ°ÐµÐ¼ Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½ÑƒÑŽ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÑƒ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ð¹ Ð¾ eToken ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ…
        RetrieveEvents();

        attachWindowUnloadEvent();

        loadSecureBankSdk();
    }

    function getLicenseRequest(activationInfo, successCallback, errorCallback, async) {
        var xhr = new XMLHttpRequest;

        var url = _JCWebClient_Static_opts.licensing.activationRequestUrl;
        var sdata = JSON.stringify(activationInfo);

        function callErrorCallabck(xhr) {
            if(xhr) {
                if(typeof(xhr.responseText) === 'string') {
                    try {
                        var errObj = eval("(" + xhr.responseText + ")");
                    }
                    catch(e) {}

                    if(typeof(errObj) === 'object' && errObj.Message) {
                        return errorCallback(new Error("getLicenseRequest. " + errObj.Message));
                    }
                }

                if(xhr.status)
                    return errorCallback(new Error("getLicenseRequest. Status code: " + xhr.status.toString()));
            }
            return errorCallback(new Error("getLicenseRequest. error"));
        }

        function XhrReadyStateHandler() {
            if (this.readyState == 4) {
                if (typeof(this.status) != "unknown" && this.status == 200) {
                    parseLicenseRequest(xhr.responseText);
                }
                else {
                    callErrorCallabck(xhr);
                }
            }
        }

        if(async) {
            xhr.onreadystatechange = XhrReadyStateHandler;
        }

        xhr.open('POST', url, async);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

        try{
            xhr.send(sdata);
        }
        catch(err) {
            return errorCallback(err);
        }

        if(!async) {
            if (typeof(xhr.status) == "unknown" || xhr.status != 200) {
                return callErrorCallabck(xhr);
            }
            else {
                return parseLicenseRequest(xhr.responseText);
            }
        }

        function parseLicenseRequest(responseText) {
            try {
                var request = JSON.parse(responseText);
            }
            catch(error) {
                return errorCallback(error);
            }

            if(typeof(request.d) !== 'object') {
                return callErrorCallabck();
            }
            if(request.d.error) {
                return errorCallback(new Error(request.d.error));
            }
            if(typeof(request.d.param) !== 'string') {
                return callErrorCallabck();
            }

            return successCallback(request.d.param);
        }
    }

    /*!
	* \fn exec()
	* \memberof JCWebClient
	* \brief Ð’Ñ‹Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÑŒ Ð¿ÐµÑ€ÐµÐ´Ð°Ð½Ð½ÑƒÑŽ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñƒ.
	*
	* Ð’ ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ðµ Ð²Ñ…Ð¾Ð´Ð½Ð¾Ð³Ð¾ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð° Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð° ÑÐ¾ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰Ð¸Ð¼Ð¸ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð°Ð¼Ð¸:
	* - async (boolean) [Optional] - Ð¿Ñ€Ð¸Ð·Ð½Ð°Ðº ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ð¾ÑÑ‚Ð¸(false) / Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ð¾ÑÑ‚Ð¸ (true) Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ñ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñ‹. Ð•ÑÐ»Ð¸ Ð½Ðµ Ð·Ð°Ð´Ð°Ð½, Ñ‚Ð¾ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ JCWebClient2.defaults().async.
	* - cmd   (object)  [Required] - Ñ‚Ð¸Ð¿ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñ‹. Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ñ‹Ðµ Ñ‚Ð¸Ð¿Ñ‹ ÐºÐ¾Ð¼Ð°Ð½Ð´ Ñ…Ñ€Ð°Ð½ÑÑ‚ÑÑ Ð² JCWebClient2.Cmds.
	* - args  ({})      [Optional] - Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ñ‹ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñ‹. Ð•ÑÐ»Ð¸ Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ð¾Ð² Ð½ÐµÑ‚, Ñ‚Ð¾ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€ Ð¼Ð¾Ð¶Ð½Ð¾ Ð½Ðµ ÑƒÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°Ñ‚ÑŒ. ÐÑ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚Ñ‹ ÑƒÐºÐ°Ð·Ð°Ð½Ñ‹ Ð² Ð¾Ð¿Ð¸ÑÐ°Ð½Ð¸Ð¸ Ð´Ð»Ñ ÐºÐ°Ð¶Ð´Ð¾Ð¹ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñ‹ Ð² JCWebClient2.Cmds.
    *
	* - onSuccess (function(result)) [Optional] - ÑÑ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°ÐµÑ‚, ÐµÑÐ»Ð¸ ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾. Ð ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚ Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ñ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñ‹ Ð¿ÐµÑ€ÐµÐ´Ð°ÐµÑ‚ÑÑ Ð² Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚ result (undefined â€“ ÐµÑÐ»Ð¸ ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð½Ð¸Ñ‡ÐµÐ³Ð¾ Ð½Ðµ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‰Ð°ÐµÑ‚).
    *                                       ÐŸÐ°Ñ€Ð°Ð¼ÐµÑ‚Ñ€ Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼ Ðº ÑƒÑÑ‚Ð°Ð½Ð°Ð²ÐºÐµ Ð¿Ñ€Ð¸ async Ñ€Ð°Ð²Ð½Ð¾Ð¼ true Ð¸ Ð¾Ñ‚ÑÑƒÑ‚ÑÑ‚Ð²Ð¸Ð¸ onResult.
    *                                       Ð•ÑÐ»Ð¸ Ð¿Ñ€Ð¸ async Ñ€Ð°Ð²Ð½Ð¾Ð¼ false Ð¸ Ð¾Ñ‚ÑÑƒÑ‚ÑÑ‚Ð²Ð¸Ð¸ onResult Ð½Ðµ ÑƒÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°Ñ‚ÑŒ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€, Ñ‚Ð¾ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚ Ð±ÑƒÐ´ÐµÑ‚ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‰ÐµÐ½ Ð½Ð°Ð¿Ñ€ÑÐ¼ÑƒÑŽ.
    *
	* - onError  (function(error))  [Optional] - ÑÑ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°ÐµÑ‚, ÐµÑÐ»Ð¸ Ð¿Ñ€Ð¸ Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ð¸ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñ‹ Ð¿Ñ€Ð¾Ð¸Ð·Ð¾ÑˆÐ»Ð¸ Ð¾ÑˆÐ¸Ð±ÐºÐ¸. Ð¡Ð¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ Ð¾Ð± Ð¾ÑˆÐ¸Ð±ÐºÐµ Ð¿ÐµÑ€ÐµÐ´Ð°ÐµÑ‚ÑÑ Ð² Ð°Ñ€Ð³ÑƒÐ¼ÐµÐ½Ñ‚ error.
    *                                       ÐŸÐ°Ñ€Ð°Ð¼ÐµÑ‚Ñ€ Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼ Ðº ÑƒÑÑ‚Ð°Ð½Ð°Ð²ÐºÐµ Ð¿Ñ€Ð¸ async Ñ€Ð°Ð²Ð½Ð¾Ð¼ true Ð¸ Ð¾Ñ‚ÑÑƒÑ‚ÑÑ‚Ð²Ð¸Ð¸ onResult.
    *                                       Ð•ÑÐ»Ð¸ Ð¿Ñ€Ð¸ async Ñ€Ð°Ð²Ð½Ð¾Ð¼ false Ð¸ Ð¾Ñ‚ÑÑƒÑ‚ÑÑ‚Ð²Ð¸Ð¸ onResult Ð½Ðµ ÑƒÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°Ñ‚ÑŒ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€, Ñ‚Ð¾ Ð¾ÑˆÐ¸Ð±ÐºÐ° Ð²ÐµÑ€Ð½ÐµÑ‚ÑÑ Ñ‡ÐµÑ€ÐµÐ· ÑÐ³ÐµÐ½ÐµÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¾Ðµ Ð¸ÑÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ.
    *
	* - onResult  (function(result, error))  [Optional] - ÑÑ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°ÐµÑ‚ Ð¿Ñ€Ð¸ Ð»ÑŽÐ±Ð¾Ð¼ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ðµ Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ñ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñ‹.
    *                                       Ð’ result Ð¿ÐµÑ€ÐµÐ´Ð°ÐµÑ‚ÑÑ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚ Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ñ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñ‹ (undefined â€“ ÐµÑÐ»Ð¸ ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð½Ð¸Ñ‡ÐµÐ³Ð¾ Ð½Ðµ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‰Ð°ÐµÑ‚).
    *                                       Ð’ error Ð¿ÐµÑ€ÐµÐ´Ð°ÐµÑ‚ÑÑ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ Ð¾Ð± Ð¾ÑˆÐ¸Ð±ÐºÐµ (undefined â€“ ÐµÑÐ»Ð¸ ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾).
    *                                       onResult Ð¿Ñ€Ð¸Ð¾Ñ€Ð¸Ñ‚ÐµÑ‚Ð½ÐµÐµ onSuccess Ð¸ onError.
    *                                       Ð•ÑÐ»Ð¸ Ð¿Ñ€Ð¸ async Ñ€Ð°Ð²Ð½Ð¾Ð¼ false Ð¸ Ð¾Ñ‚ÑÑƒÑ‚ÑÑ‚Ð²Ð¸Ð¸ onSuccess, onError Ð½Ðµ ÑƒÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°Ñ‚ÑŒ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€, Ñ‚Ð¾ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚ Ð±ÑƒÐ´ÐµÑ‚ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‰ÐµÐ½ Ð½Ð°Ð¿Ñ€ÑÐ¼ÑƒÑŽ, Ð° Ð¾ÑˆÐ¸Ð±ÐºÐ° Ñ‡ÐµÑ€ÐµÐ· ÑÐ³ÐµÐ½ÐµÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¾Ðµ Ð¸ÑÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ.
    */
    function exec(command) {
        return execInternal(command.cmd, command);
    };

    function getExecExtendedParams(cmd, params, extArgs) {
        if(cmd.type == _Cmds.resolveTLSServerName.type) {
            if(typeof(params.args) !== 'object') {
                throw new Error('[JCWebClient] Invalid args parameter');
            }
            if(typeof(params.args.url) !== 'string') {
                throw new Error('[JCWebClient] Empty url parameter');
            }

            var url = params.args.url;

            var ind = url.indexOf('://');
            url = ind == -1 ? url : url.substr(ind + 3);

            ind = url.indexOf('/');
            url = ind == -1 ? url : url.substr(0, ind);

            return {
                requestUrl: 'https://' + url + ':24740/JC-Ping?',
                noKeepTry: true,

                returnSuccessHandler: function (returnSuccess, returnError, res) {
                    return returnSuccess(true);
                },
                returnErrorHandler: function (returnSuccess, returnError, err) {
                    return returnSuccess(false);
                }
            };
        }

        var ret = {};

        if(cmd.type == _Cmds.bindToken.type || cmd.type == _Cmds.aftChangeUserPINAndBind.type) {

            // Ð’ Ð½Ð°Ñ‡Ð°Ð»Ðµ Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¸ bindToken Ð²Ñ‹ÐºÐ»ÑŽÑ‡Ð°ÐµÐ¼ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÑƒ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ð¹ (Ð¸Ð·-Ð·Ð° ÑÐ¼ÐµÐ½Ñ‹ session_id)
            _disableRetriveEvents = true;

            var prevErrorHandlerBind = ret.returnErrorHandler;
            var prevSuccessHandlerBind = ret.returnSuccessHandler;

            ret.returnErrorHandler = function (returnSuccess, returnError, err) {
                // Ð’ÐºÐ»ÑŽÑ‡Ð°ÐµÐ¼ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÑƒ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ð¹
                _disableRetriveEvents = false;

                return prevErrorHandlerBind ? prevErrorHandlerBind(returnSuccess, returnError, err) : returnError(err);
            };

            ret.returnSuccessHandler = function (returnSuccess, returnError, res) {
                // Ð’ÐºÐ»ÑŽÑ‡Ð°ÐµÐ¼ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÑƒ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ð¹
                _disableRetriveEvents = false;

                return prevSuccessHandlerBind ? prevSuccessHandlerBind(returnSuccess, returnError, res) : returnSuccess(res);
            }
        }

        if(cmd.type == _Cmds.getGibScoring.type) {

            if(!_secureBankProcessResult) {
                ret.translateResult = true;
                ret.result = undefined;
            }
            else {
                params.args.scoring = _secureBankProcessResult;
            }
        }

        if(typeof(_JCWebClient_Static_opts.licensing.activationRequestUrl) === 'string' && !params.extParam_skipCheckNoLicenseFeature) {

            var prevErrorHandler = ret.returnErrorHandler;

            ret.returnErrorHandler = function (returnSuccess, returnError, err) {

                function callPrevErrorHandler(error) {
                    if(error != undefined && typeof(_JCWebClient_Static.licenseCallback.error) === 'function') {
                        _JCWebClient_Static.licenseCallback.error(error);
                    }

                    return prevErrorHandler ? prevErrorHandler(returnSuccess, returnError, err) : returnError(err);
                }

                if(err.description != "CKR_LICENSE_NOFEATURE") {
                    return callPrevErrorHandler();
                }
                if(params.extParam_skipCheckNoLicenseFeature) {
                    return callPrevErrorHandler();
                }
                params.extParam_skipCheckNoLicenseFeature = true;

                // Ð¶Ð´Ñ‘Ð¼, Ð¿Ð¾ÐºÐ° Ð·Ð°ÐºÐ¾Ð½Ñ‡Ð¸Ñ‚ÑÑ Ð¿Ð°Ñ€Ð°Ð»Ð»ÐµÐ»ÑŒÐ½Ð°Ñ Ð°ÐºÑ‚Ð¸Ð²Ð°Ñ†Ð¸Ñ
                if(_licenseAutoActivationInProgress && extArgs.async) {

                    function waitLicenseAutoActivationProgress() {
                        if(_licenseAutoActivationInProgress) {
                            // Ð¿Ð°Ñ€Ð°Ð»Ð»ÐµÐ»ÑŒÐ½Ð°Ñ Ð°ÐºÑ‚Ð¸Ð²Ð°Ñ†Ð¸Ñ Ð²ÑÑ‘ ÐµÑ‰Ñ‘ Ð¸Ð´Ñ‘Ñ‚
                            setTimeout(waitLicenseAutoActivationProgress, 50);
                            return;
                        }

                        if(_licenseAutoActivationResult) {
                            // Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ñ Ð±Ñ‹Ð»Ð° Ð°ÐºÑ‚Ð¸Ð²Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð° ÑƒÑÐ¿ÐµÑˆÐ½Ð¾ Ð¿Ñ€Ð¸ Ð¿Ð°Ñ€Ð°Ð»Ð»ÐµÐ»ÑŒÐ½Ð¾Ð¹ Ð°ÐºÑ‚Ð¸Ð²Ð°Ñ†Ð¸Ð¸. ÐŸÐµÑ€ÐµÐ²Ñ‹Ð¿Ð¾Ð»Ð½ÑÐµÐ¼ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñƒ
                            return execInternal(cmd, params);
                        }

                        // Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ñ Ð½Ðµ Ð±Ñ‹Ð»Ð° Ð°ÐºÑ‚Ð¸Ð²Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð° Ð¿Ñ€Ð¸ Ð¿Ð°Ñ€Ð°Ð»Ð»ÐµÐ»ÑŒÐ½Ð¾Ð¹ Ð°ÐºÑ‚Ð¸Ð²Ð°Ñ†Ð¸Ð¸. ÐÐºÑ‚Ð¸Ð²Ð¸Ñ€ÑƒÐ¼ ÐµÑ‰Ñ‘ Ñ€Ð°Ð·
                        return performLicenseActivation(err);
                    }

                    setTimeout(waitLicenseAutoActivationProgress, 50);
                    return;
                }

                return performLicenseActivation(err);

                function performLicenseActivation(err) {

                    if(extArgs.async) {
                        _licenseAutoActivationInProgress = true;
                    }

                    function finishWithError(error) {
                        if(extArgs.async) {
                            _licenseAutoActivationResult = false;
                            _licenseAutoActivationInProgress = false;
                        }

                        return callPrevErrorHandler(error);
                    }

                    if(!err.extendedData || !err.extendedData.tokenSN) {
                        return finishWithError();
                    }

                    var activationInfo = {
                        tokenSN:   err.extendedData.tokenSN,
                        featureID: err.extendedData.featureID || "",
                        domain:    window.location.host
                    };

                    var ind = activationInfo.domain.indexOf(":");
                    if(ind != -1)
                        activationInfo.domain = activationInfo.domain.substr(0, ind);

                    return sendLicenseRequest(activationInfo);

                    function sendLicenseRequest(activationInfo) {
                        try {
                            return getLicenseRequest(activationInfo,
                                function (result) {
                                    return sendActivationRequest(activationInfo.tokenSN, result);
                                },
                                function (error) {
                                    return finishWithError(error);
                                },
                                extArgs.async
                            );
                        }
                        catch(error) {
                            return finishWithError(error);
                        }
                    }

                    function sendActivationRequest(tokenSerialNumber, request) {
                        return execInternal(_Cmds.activateLicense, {
                            extParam_skipCheckNoLicenseFeature: true,
                            args: {
                                tokenSerialNumber: tokenSerialNumber,
                                licenseRequest: request
                            },
                            onResult: function (alresult, alerror) {
                                if (alerror) {
                                    return finishWithError(alerror);
                                }

                                if(typeof(_JCWebClient_Static.licenseCallback.activated) === 'function') {
                                    _JCWebClient_Static.licenseCallback.activated();
                                }

                                if(extArgs.async) {
                                    _licenseAutoActivationResult = true;
                                    _licenseAutoActivationInProgress = false;
                                }

                                return execInternal(cmd, params);
                            }
                        });
                    }
                }

            };
        }

        return ret;
    }

    function setDefaultsAft(obj) {
        setDefaultsParams(
            obj.antifraud,
            _JCWebClient_Static_defaults.antifraud,
            { 'langID': 'langID', 'timeout': 'timeout' }
        );
    }

    function setDefaultsAftParams(obj) {
        setDefaultsParams(
            obj,
            _JCWebClient_Static_defaults.antifraud,
            { 'langID': 'langID', 'timeout': 'timeout' }
        );
    }

    function setDefaultsAftExtensions(obj) {
        setDefaultsParams(
            obj.extensions,
            _JCWebClient_Static_defaults.antifraud,
            { 'langID': 'langID' }
        );
    }

    function setDefaultsAftRequestSignaturePin(obj) {
        setDefaultsParams(
            obj.requestSignaturePin,
            _JCWebClient_Static_defaults.antifraud,
            { 'langID': 'langID', 'timeout': 'timeout' }
        );
    }

    function setSignDefaults(obj) {
        obj.userAgent = navigator.userAgent;

        if(obj.scoring) {
            if(_secureBankProcessResult !== undefined) {
                obj.scoring = _secureBankProcessResult;
            }
            else {
                obj.scoring = undefined;
            }
        }
        else {
            obj.scoring = undefined;
        }

        setDefaultsAft(obj);
    }

    function setUserHostDataDefaults(obj) {
        obj.userAgent = navigator.userAgent;
    }

    function setLicenseDefaults(obj) {
        if(typeof(_JCWebClient_Static_opts.licensing.licenseSub) === 'string') {
            obj.licenseSub = _JCWebClient_Static_opts.licensing.licenseSub;
        }
        else if(typeof(window.jcwc_license_data) === 'string') {
            obj.licenseSub = window.jcwc_license_data;
        }
    }

    function setDefaultsParams(obj, defObj, params) {
        if(typeof(obj) !== 'object' || typeof(defObj) !== 'object')
            return;

        for(var propName in params) {
            var defPropName = params[propName];

            if(!obj.hasOwnProperty(propName) && defObj.hasOwnProperty(defPropName)) {
                obj[propName] = defObj[defPropName];
            }
        }
    }

    function processUserHostData(data) {
        if(typeof(data) !== 'object') {
            return data;
        }

        for(var k in data) {
            var info = data[k];
            if(typeof(info) === 'object' && info.errorCode) {
                data[k] = new JCWebClientError(info.errorCode, info.errorDescription, info.errorMessage);
            }
        }

        return data;
    }

    function execInternal(cmd, params) {
        if (!(typeof(cmd) === 'object' && typeof(cmd.type) === 'string' && cmd.type.length > 0)) {
            throw new Error("[JCWebClient] Invalid cmd parameter");
        }

        var paramsTmp = (params === null || typeof(params) !== 'object') ? {} : params;
        paramsTmp.args = typeof(paramsTmp.args) === 'object' ? paramsTmp.args : {};

        var errorToString = _JCWebClient_Static_defaults.errorToString;
        var isAsync = typeof(paramsTmp.async) === 'boolean' ? paramsTmp.async : _JCWebClient_Static_defaults.async;
        var onSuccess = typeof(paramsTmp.onSuccess) === 'function' ? paramsTmp.onSuccess : undefined;
        var onError = typeof(paramsTmp.onError) === 'function' ? paramsTmp.onError : undefined;
        var onResult = typeof(paramsTmp.onResult) === 'function' ? paramsTmp.onResult : undefined;
        var resultHandler = typeof(cmd.resultHandler) === 'function' ? cmd.resultHandler : undefined;

        if (isAsync && onResult === undefined) {
            if (onSuccess === undefined) {
                throw new Error("[JCWebClient] Invalid onSuccess parameter");
            }

            if (onError === undefined) {
                throw new Error("[JCWebClient] Invalid onError parameter");
            }
        }

        var extendedParams = {};
        try {
            var extArgs = {
                async: isAsync
            };
            extendedParams = getExecExtendedParams(cmd, paramsTmp, extArgs);
        }
        catch(err) {
            return returnError(err);
        }

        if(extendedParams.translateResult) {
            return returnSuccess(extendedParams.result);
        }

        var requestJcExtAsynchFunction = extendedParams.requestAsynch || requestJcExtFunction2Async;
        var requestJcExtSynchFunction  = extendedParams.requestSynch  || requestJcExtFunction2;

        var requestObj = {
            jcapi: cmd.type,
            jcapi_ver: _currentApiVersion
        };

        mergeObjects(paramsTmp.args, requestObj);

        if(Array.isArray(cmd.argsHandler)) {
            for(var i = 0; i < cmd.argsHandler.length; i++) {
                if(typeof(cmd.argsHandler[i]) === 'function') {
                    cmd.argsHandler[i](requestObj);
                }
            }
        }

        if (isAsync) {
            try {
                requestJcExtAsynchFunction(
                    requestObj,
                    function (res) {
                        if (res instanceof Error) {
                            return returnError(res);
                        }
                        else {
                            try {
                                res = processResult(res);
                            }
                            catch(err) {
                                return returnError(err);
                            }

                            return returnSuccess(res);
                        }
                    },
                    extendedParams
                );
            }
            catch(err) {
                return returnError(err);
            }
            return;
        }

        try {
            var res = processResult(requestJcExtSynchFunction(requestObj, extendedParams));
            return returnSuccess(res);
        }
        catch(err) {
            return returnError(err);
        }

        function returnSuccess(res) {
            return typeof(extendedParams.returnSuccessHandler) === 'function' ?
                extendedParams.returnSuccessHandler( returnSuccessImpl, returnErrorImpl, res ) :
                returnSuccessImpl(res);
        }

        function returnError(err) {
            return typeof(extendedParams.returnErrorHandler) === 'function' ?
                extendedParams.returnErrorHandler( returnSuccessImpl, returnErrorImpl, err ) :
                returnErrorImpl(err);
        }

        function returnSuccessImpl(res) {
            if (onResult) {
                onResult(res, undefined);
                free();
                return;
            }

            if (onSuccess) {
                onSuccess(res);
                free();
                return;
            }

            free();

            if(isAsync) {
                return;
            }

            return res;
        }

        function returnErrorImpl(err) {
            var tmpError = errorToString ? err.message : err;

            if (onResult) {
                onResult(undefined, tmpError);
                free();
                return;
            }

            if (onError) {
                onError(tmpError);
                free();
                return;
            }

            free();

            if(isAsync) {
                return;
            }

            throw err;
        }

        function processResult(res) {
            return resultHandler ? resultHandler(res) : res;
        }

        function mergeObjects(src, dist) {
            if (src === null || typeof(src) !== 'object') return;

            for (var attrname in src) {
                dist[attrname] = src[attrname];
            }
        }

        function free() {
            extendedParams = undefined;
            paramsTmp = undefined;
            onSuccess = undefined;
            onError = undefined;
            onResult = undefined;
            resultHandler = undefined;
        }
    };

    function attachWindowUnloadEvent() {

        var pageUnloaded = false;

        function onPageUnload() {
            if(pageUnloaded) {
                return;
            }
            pageUnloaded = true;

            if(sessionStorage) {
                sessionStorage.removeItem("jc-session-id-in-use");
            }

            if (_JCWebClient_Static.saveSession && sessionStorage) {
                sessionStorage.setItem("jc-session-id", _session_id);
            } else {
                // ÐŸÐ¾Ð²ÐµÐ´ÐµÐ½Ð¸Ðµ Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ
                _JCWebClient_Static.closeWebSession();
            }
        }

        window.onbeforeunload = onPageUnload;
        window.onunload = onPageUnload;
    }

    function loadSecureBankSdk() {

        if(typeof(gibAddAladdinCallback) === "function") {
            // ÑÐºÑ€Ð¸Ð¿Ñ‚ ÑƒÐ¶Ðµ Ð·Ð°Ð³Ñ€ÑƒÐ¶ÐµÐ½

            loadScriptOk();
            return;
        }

        if(!_JCWebClient_Static_opts.gibJsUrl) {
            return;
        }

        var url = _JCWebClient_Static_opts.gibJsUrl;

        function loadScript(url, callback, failcallback) {

            var script = document.createElement("script")
            script.type = "text/javascript";
            if (script.readyState) {  //IE
                script.onreadystatechange = function () {
                    if ((script.readyState == "loaded" || script.readyState == "complete")
                        && typeof(gibAddAladdinCallback) === "function") {
                        callback();
                    }
                    else if (script.readyState != "loading") {
                        script.onreadystatechange = null;
                        removeScript();
                    }
                }
            } else {  //Others
                script.onload = function () {
                    if(typeof(gibAddAladdinCallback) === "function") {
                        callback();
                    }
                    else {
                        removeScript();
                        failcallback();
                    }
                };
                script.onerror = function () {
                    removeScript();
                    failcallback();
                }
            }
            script.src = url;
            document.body.appendChild(script);

            function removeScript() {
                document.body.removeChild(script);
                script = null;
            }
        }

        loadScript(url, loadScriptOk, loadScriptFail);

        function loadScriptOk() {
            gibAddAladdinCallback(onSecureBankProcessResult);
        }

        function loadScriptFail() {
        }
    }

    function onSecureBankProcessResult(result) {
        if(typeof(result) === 'string') {

            // check is JWE
            var parts = result.split('.');
            if(parts.length == 5) {
                _secureBankProcessResult = result;

                for(var i = 0; i != _secureBankProcessResultCallbacks.length; i++) {
                    _secureBankProcessResultCallbacks[i]();
                }
            }
        }
        else {
            _secureBankProcessResult = undefined;
        }
    }

    function constructTypedResponse(toBeTypedResponse) {
        var prefBlob = "blob:";

        var objectType = Object.prototype.toString.call(toBeTypedResponse);
        if(objectType == '[object Object]') {
            for (prop in toBeTypedResponse) {
                toBeTypedResponse[prop] = constructTypedResponse(toBeTypedResponse[prop]);
            }
        } else if (objectType == '[object Array]') {
            var arrRes = [];

            for (var idx = 0; idx < toBeTypedResponse.length; idx++) {

                var isBlob = false;
                var subType = Object.prototype.toString.call(toBeTypedResponse[idx]);
                if (subType == '[object String]') {
                    if (toBeTypedResponse[idx].indexOf(prefBlob) == 0) {
                        isBlob = true;
                    }
                }

                if (isBlob) {
                    toBeTypedResponse[idx] = constructTypedResponse(toBeTypedResponse[idx]);
                    for (var i = 0; i < toBeTypedResponse[idx].length; i++) {
                        arrRes.push(toBeTypedResponse[idx][i]);
                    }
                }
                else {
                    arrRes.push(constructTypedResponse(toBeTypedResponse[idx]));
                }
            }

            toBeTypedResponse = arrRes;
        } else if (objectType == '[object String]') {
            var prefStr = "str:";
            var prefBool = "bool:";
            var prefInt = "int:";
            var prefCkb = "ckb:";
            var prefCkul = "ckul:";
            if (toBeTypedResponse.indexOf(prefStr) == 0) {
                var unprefixedValue = toBeTypedResponse.substring(prefStr.length);
                toBeTypedResponse = unprefixedValue;
            } else if (toBeTypedResponse.indexOf(prefBool) == 0) {
                var strValue = toBeTypedResponse.substring(prefBool.length);
                if (strValue == "true") {
                    toBeTypedResponse = true;
                } else {
                    toBeTypedResponse = false;
                }
            } else if (toBeTypedResponse.indexOf(prefInt) == 0) {
                var strValue = toBeTypedResponse.substring(prefInt.length);
                toBeTypedResponse = parseInt(strValue);
            } else if (toBeTypedResponse.indexOf(prefCkb) == 0) {
                var strValue = toBeTypedResponse.substring(prefCkb.length);
                toBeTypedResponse = parseInt(strValue) % 256;
            } else if (toBeTypedResponse.indexOf(prefCkul) == 0) {
                var strValue = toBeTypedResponse.substring(prefCkul.length);
                toBeTypedResponse = parseInt(strValue);
            } else if (toBeTypedResponse.indexOf(prefBlob) == 0) {
                var strValue = toBeTypedResponse.substring(prefBlob.length);
                var arrNewNode = new Array;
                for (i = 0; toBeTypedResponse.length - prefBlob.length > i; i += 2) {
                    arrNewNode[i / 2] = parseInt("0x" + toBeTypedResponse.substring(prefBlob.length + i, prefBlob.length + i + 2)) % 256;
                }
                toBeTypedResponse = arrNewNode;
            }
        }
        return toBeTypedResponse;
    }

    function getTypedResponse(requestObj, response) {
        var responseStatus = response.Status;
        var statusCode = parseInt(responseStatus.Code);

        if (0 != statusCode) {
            debugLog(responseStatus.Message);
            debugLog("[JCWebClient] " + requestObj.jcapi + " failed: with status " + responseStatus.Code);

            throw new JCWebClientError(statusCode, responseStatus.Description, responseStatus.Message, responseStatus.ExtendedData);
        } else {
            debugLog("[JCWebClient] " + requestObj.jcapi + " succeeded.");
        }

        var typedResponse = constructTypedResponse(response.ResultingData);
        return  typedResponse === null ? undefined : typedResponse;
    }

    function getRequestError(requestObj, xhr) {
        var message;
        if (typeof(xhr.status) != "unknown")
            message = "POST for " + requestObj.jcapi + " failed: with status " + xhr.status;
        else
            message = "POST for " + requestObj.jcapi + " failed: with unknown status";
        debugLog(message);

        return new JCWebClientRequestError(message);
    }

    function requestJcExtFunction2(RequestObj, extendedParams) {
        var SCLayerResponse = undefined;

        RequestObj.session_id = _session_id;
        RequestObj.ticket_id = String(Math.floor(Math.random() * 4000000000));

        var jsonRequest = JSON.stringify(RequestObj);

        var extendedParamsTmp = extendedParams || {};

        var xhr = new XMLHttpRequest;

        var url = extendedParamsTmp.requestUrl || _JCWebClient_Static.requestUrl;

        var needKeepTry = extendedParamsTmp.noKeepTry ? false : true;

        if(needKeepTry) {
            for (var bKeepTrying = true; bKeepTrying;) {
                try {
                    xhr.open('POST', url, false);
                    xhr.send(jsonRequest);
                    if (xhr.status == 200) {
                        bKeepTrying = false;
                    }
                }
                catch (exc) {
                    xhr.abort();
                }
            }
        }
        else {
            xhr.open('POST', url, false);
            xhr.send(jsonRequest);
            if (typeof(xhr.status) == "unknown" || xhr.status != 200) {
                throw getRequestError(RequestObj, xhr);
            }
        }

        if ('[GET]' == xhr.responseText.substring(0, 5)) {
            var json_parse = JSONParser();
            json_parse.init();

            var parsed = 0;
            do {
                json_parse.parse(xhr.responseText.substring(5));
                parsed += xhr.responseText.length - 5; // subtructing [GET] length

                for (var bKeepTryingAgain = true; bKeepTryingAgain;) {
                    try {
                        xhr.open('GET', url + "session_id=" + _session_id + "&get_position=" + parsed, false);
                        xhr.send();
                        if (xhr.status == 200) {
                            bKeepTryingAgain = false;
                        }
                    }
                    catch (exc) {
                        xhr.abort();
                    }
                }
            } while ('[GET]' == xhr.responseText.substring(0, 5));

            json_parse.parse(xhr.responseText);

            var responseEdning = xhr.responseText.substring(xhr.responseText.length - 32, xhr.responseText.length);

            if (json_parse.wellformed()) {
                SCLayerResponse = json_parse.result();
            }
            else {
                throw new SyntaxError('JSON');
            }
        }
        else {
            SCLayerResponse = JSON.parse(xhr.responseText);
        }

        SCLayerResponse.ResultingData =  getTypedResponse(RequestObj, SCLayerResponse);

        return SCLayerResponse.ResultingData;
    }

    function requestJcExtFunction2Async(RequestObj, callback, extendedParams) {
        try {
            var SCLayerResponse = undefined;
            var json_parse = JSONParser();
            var parsed = 0;

            RequestObj.session_id = _session_id;
            RequestObj.ticket_id = String(Math.floor(Math.random() * 4000000000));

            var jsonRequest = JSON.stringify(RequestObj);

            var extendedParamsTmp = extendedParams || {};

            var xhr = new XMLHttpRequest;

            var url = extendedParamsTmp.requestUrl || _JCWebClient_Static.requestUrl;
            var multiGetRequest = false;

            function XhrReadyStateHandler() {
                if (this.readyState == 4) {
                    if (typeof(this.status) != "unknown" && this.status == 200) {
                        try {
                            var prefix = xhr.responseText.substring(0, 5); // [GET]

                            if ('[GET]' == prefix) {
                                if (!multiGetRequest) {
                                    json_parse.init();
                                    multiGetRequest = true;
                                }

                                json_parse.parse(xhr.responseText.substring(5));
                                parsed += xhr.responseText.length - 5; // subtructing [GET] length

                                xhr.open('GET', url + "session_id=" + _session_id + "&get_position=" + parsed, true);
                                xhr.send();
                            }
                            else {
                                if (multiGetRequest) {
                                    json_parse.parse(xhr.responseText);

                                    if (json_parse.wellformed()) {
                                        SCLayerResponse = json_parse.result();
                                    }
                                    else {
                                        throw new SyntaxError('JSON');
                                    }
                                }
                                else {
                                    SCLayerResponse = JSON.parse(xhr.responseText);
                                }

                                SCLayerResponse.ResultingData =  getTypedResponse(RequestObj, SCLayerResponse);

                                callback(SCLayerResponse.ResultingData);
                            }
                        }
                        catch (err) {
                            var error;
                            if (err instanceof Error) {
                                error = err;
                            }
                            else {
                                error = new Error('Unspecified error');
                            }
                            callback(error);
                        }
                    }
                    else {
                        var error = getRequestError(RequestObj, xhr);
                        callback(error);
                    }
                }
            }

            xhr.onreadystatechange = XhrReadyStateHandler;
            xhr.open('POST', url, true);
            xhr.send(jsonRequest);
        }
        catch (err) {
            var error;
            if (err instanceof Error) {
                error = err;
            }
            else {
                error = new Error('Unspecified error');
            }
            callback(error);
        }
    }

    function debugLog(str) {
        if(typeof(console) != "undefined")
            console.log(str);
    }

    // Ð¡Ð»ÑƒÐ¶ÐµÐ±Ð½Ñ‹Ðµ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸
    function Ping() {
        var RequestObj = new Object();
        RequestObj.jcapi = "ping";
        RequestObj.ticket_id = "0";

        return requestJcExtFunction2(RequestObj);
    }

    /*!
    * \fn RetrieveEvents()
    * \memberof JCWebClient
    * \brief Ð—Ð°Ð¿ÑƒÑÑ‚Ð¸Ñ‚ÑŒ Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ñ‹Ð¹ Ð¼ÐµÑ…Ð°Ð½Ð¸Ð·Ð¼ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ñ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ð¹ Ð¾ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ð¸ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚ Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ñ Ð»Ð¾Ð³Ð¸Ð½ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ.
    *
    * ÐÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ñ‹Ð¹ Ð¼ÐµÑ…Ð°Ð½Ð¸Ð·Ð¼ Ð¾Ð¿Ñ€Ð¾ÑÐ° ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ð¹ Ñ€ÐµÐ°Ð»Ð¸Ð·Ð¾Ð²Ð°Ð½ Ñ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸ÐµÐ¼ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸ setTimeout(...) JavaScript.
    * ÐŸÐ¾ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð½Ñ‹Ð¼ Ð¾Ñ‚ Ð»Ð¾ÐºÐ°Ð»ÑŒÐ½Ð¾Ð³Ð¾ Ð²ÐµÐ± ÑÐµÑ€Ð²ÐµÑ€Ð° ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÐ¼ Ð²Ñ‹Ð·Ñ‹Ð²Ð°ÑŽÑ‚ÑÑ Ð²ÑÐµ Ð¿Ð¾Ð´Ð¿Ð¸ÑÑ‡Ð¸ÐºÐ¸ Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð²ÑˆÐ¸Ðµ ÑÐ²Ð¾Ð¸ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ
    * Ñ Ð¿Ð¾Ð¼Ð¾Ñ‰ÑŒÑŽ Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð² addEventListener(...). ÐŸÐ¾Ð´Ð¿Ð¸ÑÑ‡Ð¸Ðº ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ñ Ð¼Ð¾Ð¶ÐµÑ‚ ÑƒÐ´Ð°Ð»Ð¸Ñ‚ÑŒ ÑÐ²Ð¾ÑŽ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ðµ Ñ Ð¿Ð¾Ð¼Ð¾Ñ‰ÑŒÑŽ Ð¼ÐµÑ‚Ð¾Ð´Ð° removeEventListener(...)
    */
    function RetrieveEvents() {

        if(_eventRetriveCheckTimeoutId != null) {
            clearTimeout(_eventRetriveCheckTimeoutId);
            _eventRetriveCheckTimeoutId = null;
        }

        var RequestObj = new Object();
        RequestObj.jcapi = "RetrieveEvents";
        RequestObj.jcapi_ver = _currentApiVersion;
        RequestObj.events_id = _currentEventsID;
        RequestObj.session_id = _session_id;
        RequestObj.ticket_id = "0"; // Ð½Ð° Ñ‚Ð¸ÐºÐµÑ‚Ðµ 0 Ð¾Ð¿Ñ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ…

        var jsonRequest = JSON.stringify(RequestObj);

        var xhr = new XMLHttpRequest;
        var url = _JCWebClient_Static.requestUrl;

        xhr.open('POST', url, true);

        xhr.onreadystatechange = RetrieveEventsStateHandler;
        if(typeof(xhr.timeout) != 'undefined') {
            xhr.timeout = 10000;
        }

        xhr.send(jsonRequest);

        _eventRetriveCheckTimeoutId = setTimeout(RetrieveEventsCheckTimeoutHandler, 6000);

        function RetrieveEventsCheckTimeoutHandler() {
            xhr.abort();
        }

        function waitCanProcessEvents(callback) {
            if(!_disableRetriveEvents) {
                callback();
                return;
            }

            var waitTimerID = setInterval(function () {

                if(!_disableRetriveEvents) {
                    clearInterval(waitTimerID);
                    callback();
                }
            }, 10);
        }

        function RetrieveEventsStateHandler() {
            if (this.readyState == 4) { // DONE
                if (_eventRetriveCheckTimeoutId != null) {
                    clearTimeout(_eventRetriveCheckTimeoutId);
                    _eventRetriveCheckTimeoutId = null;
                }

                if (typeof (this.status) != "unknown" && this.status == 200) {

                    waitCanProcessEvents(function() {

                        try {

                            var NotificationResponse = JSON.parse(xhr.responseText);

                            var statusCode = parseInt(NotificationResponse.Status.Code);

                            if (0 == statusCode) {

                                try {

                                    var curEventsID = parseInt(NotificationResponse.ResultingData.eventsID);
                                    if(curEventsID != _currentEventsID) {
                                        _currentEventsID = curEventsID;

                                        if(sessionStorage) {
                                            sessionStorage.setItem("jc-currrent-event-id", _currentEventsID);
                                        }
                                    }

                                    for (var i = 0; i < NotificationResponse.ResultingData.events.length; i++) {
                                        var Event = NotificationResponse.ResultingData.events[i];
                                        var EventMethod = Event[0];
                                        var EventInfo = parseInt(Event[1]);

                                        debugLog("[JCWebClient::RetrieveEventsStateHandler] " + EventMethod + " : " + EventInfo);


                                        var j;
                                        if (EventMethod == "SlotAdded") {
                                            for (j = 0; j < _slotAddedSubscriptions.length; j++) {
                                                (_slotAddedSubscriptions[j])(EventInfo);
                                            }
                                        }
                                        else if (EventMethod == "SlotRemoved") {
                                            for (j = 0; j < _slotRemovedSubscriptions.length; j++) {
                                                (_slotRemovedSubscriptions[j])(EventInfo);
                                            }
                                        }
                                        else if (EventMethod == "LoginStateChanged") {
                                            for (j = 0; j < _loginStateChangedSubscriptions.length; j++) {
                                                (_loginStateChangedSubscriptions[j])(EventInfo);
                                            }
                                        }
                                    }
                                }
                                catch (errMessage) {
                                    debugLog("[JCWebClient::RetrieveEventsStateHandler] exception caught:");
                                    debugLog("[JCWebClient::RetrieveEventsStateHandler] " + errMessage);
                                }
                            } else {
                                debugLog(NotificationResponse.Status.Message);
                                debugLog("[JCWebClient::RetrieveEventsStateHandler] " + RequestObj.jcapi + " failed: with status " + NotificationResponse.Status.Code);
                            }
                        }
                        catch(arg) {
                        }

                        RetrieveEventsTimeoutHandler();
                    });

                    return;
                }

                RetrieveEventsTimeoutHandler();

            }
        }
    }

    function RetrieveEventsTimeoutHandler() {
        setTimeout(RetrieveEvents, 1000);
    }

    /*!
	* \fn addEventListener(name, func, bubbling)
	* \memberof JCWebClient
    * \brief ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒÑÑ Ð½Ð° ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ðµ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ… Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚ Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸ Ð»Ð¾Ð³Ð¸Ð½ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ.
	* \param name Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ ÑÑ‚Ñ€Ð¾ÐºÐ¾Ð¹ "slotAdded", "slotRemoved", "loginStateChanged"
	* \param func Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ ÐºÐ¾Ñ‚Ð¾Ñ€Ð°Ñ Ð±ÑƒÐ´ÐµÑ‚ Ð²Ñ‹Ð·Ð²Ð°Ð½Ð° Ð°ÑÐ¸Ð½Ñ…Ñ€Ð¾Ð½Ð½Ð¾ Ð¿Ð¾ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸ÑŽ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²ÑƒÑŽÑ‰ÐµÐ³Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ñ
	* \param bubbling Ð´Ð»Ñ ÑÐ¾Ð²Ð¼ÐµÑÑ‚Ð¸Ð¼Ð¾ÑÑ‚Ð¸, Ð½Ðµ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ
    */
    function addEventListener(name, func, bubbling) {
        var strSlotAdded = "slotAdded";
        var strTokenAdded = "tokenAdded";
        var strSmartCardAdded = "smartcardadded";

        var strSlotRemoved = "slotRemoved";
        var strTokenRemoved = "tokenRemoved";
        var strSmartCardRemoved = "smartcardremoved";

        var strLoginStateChanged = "loginStateChanged";

        var tmpName = name.toUpperCase();

        if (tmpName == strSlotAdded.toUpperCase() || tmpName == strTokenAdded.toUpperCase() || tmpName == strSmartCardAdded.toUpperCase()) {
            _slotAddedSubscriptions.push(func);
        }
        else if (tmpName == strSlotRemoved.toUpperCase() || tmpName == strTokenRemoved.toUpperCase() || tmpName == strSmartCardRemoved.toUpperCase()) {
            _slotRemovedSubscriptions.push(func);
        }
        else if (tmpName == strLoginStateChanged.toUpperCase()) {
            _loginStateChangedSubscriptions.push(func);
        }
    }
    /*!
	* \fn attachEvent(onName, func)
	* \memberof JCWebClient
    * \brief ÐŸÐ¾Ð´Ð¿Ð¸ÑÐ°Ñ‚ÑŒÑÑ Ð½Ð° ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ðµ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ… Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚ Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸ Ð»Ð¾Ð³Ð¸Ð½ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ.
	* \param onName: Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ ÑÑ‚Ñ€Ð¾ÐºÐ¾Ð¹ "onSlotAdded", "onSlotRemoved", "onLoginStateChanged"
	* \param func Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ ÐºÐ¾Ñ‚Ð¾Ñ€Ð°Ñ Ð±Ñ‹Ð»Ð° Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð° Ñ€Ð°Ð½ÐµÐµ Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð¼ \ref addEventListener
    */
    function attachEvent(onName, func) {
        addEventListener(onName.substring(2), func, false); // onSlotAdded-> slotAdded,...
    }
    /*!
	* \fn removeEventListener(name, func)
	* \memberof JCWebClient
    * \brief Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐºÑƒ Ð½Ð° ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ðµ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ… Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚ Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸ Ð»Ð¾Ð³Ð¸Ð½ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ.
	* \param name: Ð¼Ð¾Ð¶ÐµÑ‚ Ð±Ñ‹Ñ‚ÑŒ ÑÑ‚Ñ€Ð¾ÐºÐ¾Ð¹ "slotAdded", "slotRemoved", "loginStateChanged"
	* \param func Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ ÐºÐ¾Ñ‚Ð¾Ñ€Ð°Ñ Ð±Ñ‹Ð»Ð° Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð° Ñ€Ð°Ð½ÐµÐµ Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð¼ \ref addEventListener
    */
    function removeEventListener(name, func) {
        var strSlotAdded = "slotAdded";
        var strTokenAdded = "tokenAdded";
        var strSmartCardAdded = "smartcardadded";

        var strSlotRemoved = "slotRemoved";
        var strTokenRemoved = "tokenRemoved";
        var strSmartCardRemoved = "smartcardremoved";

        var strLoginStateChanged = "loginStateChanged";
        var funcArray;

        var tmpName = name.toUpperCase();

        if (tmpName == strSlotAdded.toUpperCase() || tmpName == strTokenAdded.toUpperCase() || tmpName == strSmartCardAdded.toUpperCase()) {
            funcArray = _slotAddedSubscriptions;
        }
        else if (tmpName == strSlotRemoved.toUpperCase() || tmpName == strTokenRemoved.toUpperCase() || tmpName == strSmartCardRemoved.toUpperCase()) {
            funcArray = _slotRemovedSubscriptions;
        }
        else if (tmpName == strLoginStateChanged.toUpperCase()) {
            funcArray = _loginStateChangedSubscriptions;
        }

        try {
            if(!Array.isArray(funcArray)) {
                throw "Unknown event: " + name;
            }

            for (var i = 0; i < funcArray.length; ++i) {
                if (func == funcArray[i]) {
                    funcArray.splice(i, 1);
                    break;
                }
            }
        }
        catch (errMessage) {
            debugLog("[JCWebClient::removeEventListener] exception caught:");
            debugLog("[JCWebClient::removeEventListener] " + errMessage);
        }
    }
    /*!
	* \fn detachEvent(onName, func)
	* \memberof JCWebClient
    * \brief Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð´Ð¿Ð¸ÑÐºÑƒ Ð½Ð° ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ðµ Ð¾ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÑÑ… Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ ÑÐ¼Ð°Ñ€Ñ‚ ÐºÐ°Ñ€Ñ‚ Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸ Ð»Ð¾Ð³Ð¸Ð½ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ.
	* Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹ Ð°Ð½Ð°Ð»Ð¾Ð³Ð¸Ñ‡Ð½Ñ‹ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð°Ð¼ Ð¼ÐµÑ‚Ð¾Ð´Ð° \ref attachEvent
	* \param func Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ ÐºÐ¾Ñ‚Ð¾Ñ€Ð°Ñ Ð±Ñ‹Ð»Ð° Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð° Ñ€Ð°Ð½ÐµÐµ Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð¼ \ref addEventListener
    */
    function detachEvent(onName, func) {
        removeEventListener(onName.substring(2), func); // onSlotAdded-> slotAdded,...
    }

    function getProtocol() {
        var urlParts = window.location.href.split('//');
        if (urlParts[0] == 'file:')
            return 'https:';

        return urlParts[0];
    }

    function utf8Decode(arr) {
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            str += String.fromCharCode(arr[i]);
        }
        return decodeURIComponent(escape(str));
    }

    function parseCertificateInfo(arr) {
        return parseCertInfoString(utf8Decode(arr));
    }

    function parseTrustedCertificateInfo(obj) {
        obj.certInfo = parseCertInfoString(utf8Decode(obj.certInfo));
        return obj;
    }

    // ÐŸÐ°Ñ€ÑÐ¸Ð½Ð³ ÑÑ‚Ñ€Ð¾ÐºÐ¸ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² JS-Ð¾Ð±ÑŠÐºÑ‚
    function parseCertInfoString(info) {

        // Ð¿Ð°Ñ€ÑÐ¸Ð½Ð³ ÑÑ‚Ñ€Ð¾ÐºÐ¸ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð¸ ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ð¸Ñ
        function structurizeCertInfo(info) {
            var lines = info.split('\n');

            var root = { childs: [] };
            var que = [root];

            var level = -1;
            var extensionsLevel = -1;

            for (var i = 0; i < lines.length; i++) {
                var ln = lines[i];

                var spaceCount = 0;
                for (var ic = 0; ic < ln.length; ic++) {
                    if (ln[ic] != ' ') {
                        break;
                    }
                    spaceCount++;
                }

                // Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿ÐµÑ€ÐµÐ½Ð¾ÑÐ° ÑÑ‚Ñ€Ð¾ÐºÐ¸ Ð² Ð´Ð°Ð½Ð½Ñ‹Ñ… X509v3 extensions
                if (spaceCount < 4 && extensionsLevel != -1 && level > extensionsLevel && ln.trim()) {
                    que[0].name += ('\n' + ln);
                    continue;
                }

                ln = ln.trim();
                if (!ln) {
                    continue;
                }

                if (spaceCount % 4) {
                    spaceCount += (4 - (spaceCount % 4));
                }
                var lnLevel = spaceCount / 4;

                var obj = { name: ln, childs: [] };

                // Ñ€Ð°Ð·Ð´ÐµÐ»ÑÐµÐ¼ Ð¸Ð¼Ñ Ð¸ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ
                if (obj.name) {
                    var pos = obj.name.indexOf(': ');
                    if (pos != -1) {
                        obj.value = obj.name.substr(pos + 2).trim();
                        obj.name = obj.name.substr(0, pos).trim();
                    }
                    else if (obj.name[obj.name.length - 1] == ':') {
                        obj.name = obj.name.substr(0, obj.name.length - 1).trim();
                    }
                }

                if (obj.name == "X509v3 extensions") {
                    extensionsLevel = lnLevel;
                }
                else if (extensionsLevel != -1 && lnLevel <= extensionsLevel) {
                    extensionsLevel = -1;
                }

                if (lnLevel == level) {
                    que[1].childs.push(obj);
                    que[0] = obj;
                }
                else if (lnLevel > level) {
                    while (lnLevel > level) {
                        level++;

                        var o = (level == lnLevel ? obj : { childs: [] });
                        que[0].childs.push(o);
                        que.unshift(o);
                    }
                }
                else if (lnLevel < level) {
                    que.splice(0, level - lnLevel);
                    level = lnLevel;

                    que[1].childs.push(obj);
                    que[0] = obj;
                }
            }

            // ÑƒÐ´Ð°Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¾Ð¼ÐµÐ¶ÑƒÑ‚Ð¾Ñ‡Ð½Ñ‹Ñ… Ð¿ÑƒÑÑ‚Ñ‹Ñ… ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¾Ð²
            function removeEmptyItems(obj) {

                // remove empty sub-objects
                while (obj.childs.length == 1 && !obj.childs[0].name) {
                    obj.childs = obj.childs[0].childs;
                }

                // correct child-objects
                for (var i = 0; i < obj.childs.length; i++) {
                    removeEmptyItems(obj.childs[i]);
                }

            }

            removeEmptyItems(root.childs[0]);
            return root.childs[0];
        }

        // Ð¿Ñ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ð¸Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð° Ð² Ð¾Ð±ÑŠÐµÐºÑ‚
        function objectizeInfo(obj, ooo) {

            // Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¸ Ð¿Ñ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€Ð¾ÐºÐ¸ Ð² Ð¼Ð°ÑÑÐ¸Ð² Ð±Ð°Ð¹Ñ‚
            function isBinaryArray(obj) {

                var arr = [];
                for (var i = 0; i < obj.childs.length; i++) {
                    var child = obj.childs[i];
                    if (child.value || child.childs.length > 0) {
                        return null;
                    }

                    for (var c = 0; c < child.name.length; c += 3) {
                        var h = parseInt(child.name.substr(c, 2), 16);

                        if (isNaN(h) || (c < child.name.length - 2 && child.name.substr(c + 2, 1) != ':')) {
                            return null;
                        }
                        arr.push(h);
                    }
                }

                if (arr.length == 0) {
                    return null;
                }

                obj.childs.splice(0, obj.childs.length);
                return arr;
            }

            // Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¸ Ð¿Ñ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð´Ð¾Ñ‡ÐµÑ€Ð½Ð¸Ñ… ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¾Ð² Ð² Ð¼Ð°ÑÑÐ¸Ð² ÑÑ‚Ñ€Ð¾Ðº
            function isStringArray(obj) {

                var arr = [];
                for (var i = 0; i < obj.childs.length; i++) {
                    var child = obj.childs[i];
                    if (child.value || child.childs.length > 0) {
                        return null;
                    }

                    arr.push(child.name);
                }

                if (arr.length == 0) {
                    return null;
                }

                obj.childs.splice(0, obj.childs.length);
                return arr;
            }

            // Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ°, ÑÐ²Ð»ÑÐµÑ‚ÑÑ Ð»Ð¸ Ð¾Ð±ÑŠÐµÐºÑ‚ Ð¿Ñ€Ð¾ÑÑ‚Ñ‹Ð¼ Ñ‚Ð¸Ð¿Ð¾Ð¼ [Ð¸Ð¼Ñ:Ð·Ð°Ñ‡ÐµÐ½Ð¸Ðµ] Ð¸ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ñ
            function isNamedValue(obj) {

                if (obj.childs.length) {
                    if (obj.childs.length == 1 && !obj.value && !obj.childs[0].childs.length && !obj.childs[0].value) {
                        var val = obj.childs[0].name;
                        obj.childs.splice(0, 1);
                        return val;
                    }
                    return null;
                }
                if (!obj.value) {
                    return null;
                }

                return obj.value;
            }

            // Ð¿Ñ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€Ð¾ÐºÐ¸ Ð¸Ð»Ð¸ Ð¼Ð°ÑÑÐ¸Ð²Ð° ÑÑ‚Ñ€Ð¾Ðº Ð² Ð¿Ð¾Ð´Ñ…Ð¾Ð´ÑÑ‰Ð¸Ð¹ Ñ‚Ð¸Ð¿ Ð´Ð°Ð½Ð½Ñ‹Ñ… (Ñ‡Ð¸ÑÐ»Ð¾/Ð´Ð°Ñ‚Ð°)
            function convertStringValue(val) {

                function convertSingleValue(val) {
                    if (/^\d+ \(0[xX][0-9a-fA-F]+\)$/.test(val)) {
                        return parseInt(val.substr(0, val.indexOf(' ')));
                    }
                    if (/^\d+$/.test(val)) {
                        return parseInt(val);
                    }

                    if (/[A-z]{3,}\s+\d{1,2}\s+\d{1,2}:\d{1,2}:\d{1,2}\s+\d{2,4}/.test(val)) { // !For Chrome
                        var dateVal = Date.parse(val);
                        if (!isNaN(dateVal)) {
                            var date = new Date();
                            date.setTime(dateVal);
                            return date;
                        }
                    }

                    return val;
                }

                if (Array.isArray(val)) {
                    var arr = [];
                    for (var i = 0; i < val.length; i++) {
                        arr.push(convertSingleValue(val[i]));
                    }
                    return arr;
                }
                else {
                    return convertSingleValue(val);
                }
            }

            // Ð”Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð° Ð² ooo. Ð•ÑÐ»Ð¸ ÐµÑÑ‚ÑŒ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ñ‹ Ñ Ð¾Ð´Ð¸Ð½Ð°ÐºÐ¾Ð²Ñ‹Ð¼Ð¸ Ð¸Ð¼ÐµÐ½Ð°Ð¼Ð¸ - ooo Ð¿Ñ€ÐµÐ²Ñ€Ð°Ñ‰Ð°ÐµÑ‚ÑÑ Ð² Ð¼Ð°ÑÑÐ¸Ð²
            function addElementToOoo(looo, lname, lval) {
                if(Array.isArray(looo)) {
                    looo.push({ name: lname, value: lval });
                }
                else {
                    if(looo[lname]) {
                        var arr = [];
                        for(var el in looo) {
                            arr.push({ name: el, value: looo[el] });
                        }

                        looo = arr;
                        looo.push({ name: lname, value: lval });
                    }
                    else {
                        looo[lname] = lval;
                    }
                }
                return looo;
            }

            if (obj.name == "Subject Public Key Info" && obj.childs.length == 1 && obj.childs[0].name == "Public Key Algorithm") {
                for (var i = 0; i < obj.childs[0].childs.length; i++) {
                    obj.childs.push(obj.childs[0].childs[i]);
                }
                obj.childs[0].childs.splice(0, obj.childs[0].childs.length);
            }

            var val = isBinaryArray(obj);
            if (val) {
                if (obj.value && obj.name == "Signature Algorithm") {
                    ooo = addElementToOoo(ooo, "Signature", val);
                    ooo = addElementToOoo(ooo, "Signature Algorithm", convertStringValue(obj.value));
                }
                else if (obj.value) {
                    ooo = addElementToOoo(ooo, obj.name, { value: convertStringValue(obj.value), data: val });
                }
                else {
                    ooo = addElementToOoo(ooo, obj.name, val);
                }
            }

            if (!val) {
                val = isNamedValue(obj);
                if (val) {
                    ooo = addElementToOoo(ooo, obj.name, convertStringValue(val));
                }
            }

            if (!val) {
                val = isStringArray(obj);
                if (val) {
                    if (obj.value) {
                        ooo = addElementToOoo(ooo, obj.name, { value: convertStringValue(obj.value), data: convertStringValue(val) });
                    }
                    else {
                        ooo = addElementToOoo(ooo, obj.name, convertStringValue(val));
                    }
                }
            }

            if (!val) {
                var osub = {};

                if (obj.value) {
                    osub.value = convertStringValue(obj.value);
                }

                for (var i = 0; i < obj.childs.length; i++) {
                    osub = objectizeInfo(obj.childs[i], osub);
                }
                ooo = addElementToOoo(ooo, obj.name, osub);
            }

            return ooo;
        }

        // ÐŸÑ€ÐµÐ¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€Ð¾Ðº Ð²Ð¸Ð´Ð° 'CN=Ð˜Ð²Ð°Ð½ Ð˜Ð²Ð°Ð½Ð¾Ð²Ð¸Ñ‡ Ð˜Ð²Ð°Ð½Ð¾Ð²' Ð² Ð¾Ð±ÑŠÐµÐºÑ‚Ñ‹ Ð²Ð¸Ð´Ð°: {'rdn': 'CN', 'value': 'Ð˜Ð²Ð°Ð½ Ð˜Ð²Ð°Ð½Ð¾Ð²Ð¸Ñ‡ Ð˜Ð²Ð°Ð½Ð¾Ð²'}
        function findRdns(ooo) {

            function makeRdn(s) {
                var ind = s.indexOf('=');
                if(ind == -1) {
                    return;
                }

                var name = s.substr(0, ind).trim();
                var val = s.substr(ind + 1).trim();

                if(name.length == 0 || val.length == 0) {
                    return;
                }

                return { "rdn" : name, "value" : val };
            }

            if (Array.isArray(ooo)) {
                for (var i = 0; i < ooo.length; i++) {
                    var o = findRdns(ooo[i]);
                    if(o) {
                        ooo[i] = o;
                    }
                }
            }
            else if(typeof(ooo) == 'object') {
                for (key in ooo) {
                    if(ooo.hasOwnProperty(key)) {
                        var o = findRdns(ooo[key]);
                        if(o) {
                            if(!Array.isArray(o)) {
                                ooo[key] = [o];
                            }
                            else {
                                ooo[key] = o;
                            }
                        }
                    }
                }
            }
            else if(typeof(ooo) == 'string') {
                var parts = ooo.split(",");
                var rdn_parts = [];

                for (var ip = 1; ip < parts.length; ) {
                    if(parts[ip].indexOf('=') == -1) {
                        parts[ip - 1] += ("," + parts[ip]);
                        parts.splice(ip, 1);
                    }
                    else {
                        ip++;
                    }
                }

                for (var ip = 0; ip < parts.length; ip++) {
                    var rdn = makeRdn(parts[ip]);
                    if(!rdn) {
                        return;
                    }

                    rdn_parts.push(rdn);
                }

                if(rdn_parts.length == 1) {
                    return rdn_parts[0];
                }
                else if(rdn_parts.length > 1) {
                    return rdn_parts;
                }
            }
        }

        var root = structurizeCertInfo(info);

        var ooo = {};
        for (var i = 0; i < root.childs.length; i++) {
            ooo = objectizeInfo(root.childs[i], ooo);
        }

        findRdns(ooo);
        return ooo;
    }

    function closeWebSession() {
        var RequestObj = new Object();
        RequestObj.jcapi = "closeWebSession";
        RequestObj.jcapi_ver = _currentApiVersion;

        if(navigator && navigator.sendBeacon) {

            RequestObj.session_id = _session_id;
            RequestObj.ticket_id = String(Math.floor(Math.random() * 4000000000));

            var jsonRequest = JSON.stringify(RequestObj);
            navigator.sendBeacon(_JCWebClient_Static.requestUrl, jsonRequest);
        }
        else {
            return requestJcExtFunction2(RequestObj, { noKeepTry: true });
        }
    }

    function derToPem(data) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < data.length) {

            chr1 = data[i++];
            chr2 = data[i++];
            chr3 = data[i++];

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

        }

        return output;
    }

    function addGibScoringCallback(callback) {
        _secureBankProcessResultCallbacks.push(callback);
    }

    /// [Aliases BEGIN]

    // Ð¡Ð»ÑƒÐ¶ÐµÐ±Ð½Ñ‹Ðµ
    function clearToken(cmdParams) {
        return execInternal(_Cmds.clearToken, cmdParams);
    };

    function getAllSlots(cmdParams) {
        return execInternal(_Cmds.getAllSlots, cmdParams);
    };

    function getIpConfig(cmdParams) {
        return execInternal(_Cmds.getIpConfig, cmdParams);
    };

    function getJCWebClientVersion(cmdParams) {
        return execInternal(_Cmds.getJCWebClientVersion, cmdParams);
    };

    function getLoggedInState(cmdParams) {
        return execInternal(_Cmds.getLoggedInState, cmdParams);
    };

    function getProcesses(cmdParams) {
        return execInternal(_Cmds.getProcesses, cmdParams);
    };

    function getSlotInfo(cmdParams) {
        return execInternal(_Cmds.getSlotInfo, cmdParams);
    };

    function getSystemDateTime(cmdParams) {
        return execInternal(_Cmds.getSystemDateTime, cmdParams);
    };

    function getSystemInfo(cmdParams) {
        return execInternal(_Cmds.getSystemInfo, cmdParams);
    };

    function getTokenInfo(cmdParams) {
        return execInternal(_Cmds.getTokenInfo, cmdParams);
    };

    function getUserHostData(cmdParams) {
        return execInternal(_Cmds.getUserHostData, cmdParams);
    };

    function initToken(cmdParams) {
        return execInternal(_Cmds.initToken, cmdParams);
    };


    // ÐžÐ±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð¾ÑˆÐ¸Ð±Ð¾Ðº
    function getErrorDescription(cmdParams) {
        return execInternal(_Cmds.getErrorDescription, cmdParams);
    };

    function getLastError(cmdParams) {
        return execInternal(_Cmds.getLastError, cmdParams);
    };


    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ PIN-ÐºÐ¾Ð´Ð°Ð¼Ð¸
    function aftChangeUserPINAndBind(cmdParams) {
        return execInternal(_Cmds.aftChangeUserPINAndBind, cmdParams);
    };

    function bindToken(cmdParams) {
        return execInternal(_Cmds.bindToken, cmdParams);
    };

    function changePIN(cmdParams) {
        return execInternal(_Cmds.changePIN, cmdParams);
    };

    function changeSignaturePIN(cmdParams) {
        return execInternal(_Cmds.changeSignaturePIN, cmdParams);
    };

    function createUnblockChallenge(cmdParams) {
        return execInternal(_Cmds.createUnblockChallenge, cmdParams);
    };

    function initUserPIN(cmdParams) {
        return execInternal(_Cmds.initUserPIN, cmdParams);
    };

    function setSignaturePIN(cmdParams) {
        return execInternal(_Cmds.setSignaturePIN, cmdParams);
    };

    function unbindToken(cmdParams) {
        return execInternal(_Cmds.unbindToken, cmdParams);
    };

    function unblockUserPIN(cmdParams) {
        return execInternal(_Cmds.unblockUserPIN, cmdParams);
    };


    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ Ð°Ð²Ñ‚Ð¾Ð½Ð¾Ð¼Ð½Ñ‹Ð¼Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð°Ð¼Ð¸
    function deleteStandaloneCertificate(cmdParams) {
        return execInternal(_Cmds.deleteStandaloneCertificate, cmdParams);
    };

    function getStandaloneCertificateList(cmdParams) {
        return execInternal(_Cmds.getStandaloneCertificateList, cmdParams);
    };

    function writeStandaloneCertificate(cmdParams) {
        return execInternal(_Cmds.writeStandaloneCertificate, cmdParams);
    };


    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÐºÐ»ÑŽÑ‡ÐµÐ²Ñ‹Ð¼Ð¸ Ð¿Ð°Ñ€Ð°Ð¼Ð¸
    function createKeyPair(cmdParams) {
        return execInternal(_Cmds.createKeyPair, cmdParams);
    };

    function deleteKeyPair(cmdParams) {
        return execInternal(_Cmds.deleteKeyPair, cmdParams);
    };

    function getKeyPairList(cmdParams) {
        return execInternal(_Cmds.getKeyPairList, cmdParams);
    };


    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð°Ð¼Ð¸
    function deleteContainer(cmdParams) {
        return execInternal(_Cmds.deleteContainer, cmdParams);
    };

    function deleteUserCertificate(cmdParams) {
        return execInternal(_Cmds.deleteUserCertificate, cmdParams);
    };

    function generateUserSelfSignedCertificate(cmdParams) {
        return execInternal(_Cmds.generateUserSelfSignedCertificate, cmdParams);
    };

    function getContainerList(cmdParams) {
        return execInternal(_Cmds.getContainerList, cmdParams);
    };

    function getTrustedPublicKeyList(cmdParams) {
        return execInternal(_Cmds.getTrustedPublicKeyList, cmdParams);
    };

    function writeUserCertificate(cmdParams) {
        return execInternal(_Cmds.writeUserCertificate, cmdParams);
    };


    // Ð”Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ
    function changeDescription(cmdParams) {
        return execInternal(_Cmds.changeDescription, cmdParams);
    };

    function deletePKIObject(cmdParams) {
        return execInternal(_Cmds.deletePKIObject, cmdParams);
    };

    function dssAuthenticate(cmdParams) {
        return execInternal(_Cmds.dssAuthenticate, cmdParams);
    };

    function readCkaID(cmdParams) {
        return execInternal(_Cmds.readCkaID, cmdParams);
    };

    function resolveTLSServerName(cmdParams) {
        return execInternal(_Cmds.resolveTLSServerName, cmdParams);
    };

    function startAjaxTlsProxy(cmdParams) {
        return execInternal(_Cmds.startAjaxTlsProxy, cmdParams);
    };

    function writeCkaID(cmdParams) {
        return execInternal(_Cmds.writeCkaID, cmdParams);
    };


    // Ð˜Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ñ Ñ PKI
    function createCertificateRenewal(cmdParams) {
        return execInternal(_Cmds.createCertificateRenewal, cmdParams);
    };

    function genCSR(cmdParams) {
        return execInternal(_Cmds.genCSR, cmdParams);
    };

    function getCertificateBody(cmdParams) {
        return execInternal(_Cmds.getCertificateBody, cmdParams);
    };

    function getCertificateInfo(cmdParams) {
        return execInternal(_Cmds.getCertificateInfo, cmdParams);
    };

    function parseX509Certificate(cmdParams) {
        return execInternal(_Cmds.parseX509Certificate, cmdParams);
    };

    function readPublicKey(cmdParams) {
        return execInternal(_Cmds.readPublicKey, cmdParams);
    };

    function readServerObject(cmdParams) {
        return execInternal(_Cmds.readServerObject, cmdParams);
    };

    function verifyCertificateChain(cmdParams) {
        return execInternal(_Cmds.verifyCertificateChain, cmdParams);
    };

    function verifyCertificateChainOnToken(cmdParams) {
        return execInternal(_Cmds.verifyCertificateChainOnToken, cmdParams);
    };

    function writeServerCertificate(cmdParams) {
        return execInternal(_Cmds.writeServerCertificate, cmdParams);
    };

    function writeServerPublicKey(cmdParams) {
        return execInternal(_Cmds.writeServerPublicKey, cmdParams);
    };


    // ÐÑƒÑ‚ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ Ð¸ Ð·Ð°Ñ‰Ð¸Ñ‚Ð° ÐºÐ°Ð½Ð°Ð»Ð°
    function decode(cmdParams) {
        return execInternal(_Cmds.decode, cmdParams);
    };

    function encode(cmdParams) {
        return execInternal(_Cmds.encode, cmdParams);
    };

    function establishSChannelBegin(cmdParams) {
        return execInternal(_Cmds.establishSChannelBegin, cmdParams);
    };

    function establishSChannelContinue(cmdParams) {
        return execInternal(_Cmds.establishSChannelContinue, cmdParams);
    };

    function unilateralAuthenticationBegin(cmdParams) {
        return execInternal(_Cmds.unilateralAuthenticationBegin, cmdParams);
    };

    function unilateralAuthenticationContinue(cmdParams) {
        return execInternal(_Cmds.unilateralAuthenticationContinue, cmdParams);
    };


    // Ð¥Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ð´Ð°Ð½Ð½Ñ‹Ñ…
    function deleteBinaryObject(cmdParams) {
        return execInternal(_Cmds.deleteBinaryObject, cmdParams);
    };

    function getBinaryObjectList(cmdParams) {
        return execInternal(_Cmds.getBinaryObjectList, cmdParams);
    };

    function modifyBinaryObject(cmdParams) {
        return execInternal(_Cmds.modifyBinaryObject, cmdParams);
    };

    function readBinaryObject(cmdParams) {
        return execInternal(_Cmds.readBinaryObject, cmdParams);
    };

    function storeBinaryData(cmdParams) {
        return execInternal(_Cmds.storeBinaryData, cmdParams);
    };


    // ÐŸÐ¾Ð´Ð¿Ð¸ÑÑŒ Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ð¾Ð´Ð¿Ð¸ÑÐ¸
    function decryptData(cmdParams) {
        return execInternal(_Cmds.decryptData, cmdParams);
    };

    function digest(cmdParams) {
        return execInternal(_Cmds.digest, cmdParams);
    };

    function encryptData(cmdParams) {
        return execInternal(_Cmds.encryptData, cmdParams);
    };

    function signBase64EncodedData(cmdParams) {
        return execInternal(_Cmds.signBase64EncodedData, cmdParams);
    };

    function signData(cmdParams) {
        return execInternal(_Cmds.signData, cmdParams);
    };

    function signDataInByte(cmdParams) {
        return execInternal(_Cmds.signDataInByte, cmdParams);
    };

    function signHash(cmdParams) {
        return execInternal(_Cmds.signHash, cmdParams);
    };

    function signHashInByte(cmdParams) {
        return execInternal(_Cmds.signHashInByte, cmdParams);
    };

    function verifyBase64EncodedData(cmdParams) {
        return execInternal(_Cmds.verifyBase64EncodedData, cmdParams);
    };

    function verifyData(cmdParams) {
        return execInternal(_Cmds.verifyData, cmdParams);
    };

    function verifyDataInByte(cmdParams) {
        return execInternal(_Cmds.verifyDataInByte, cmdParams);
    };

    function verifyHashInByte(cmdParams) {
        return execInternal(_Cmds.verifyHashInByte, cmdParams);
    };


    // Ð Ð°Ð·Ð±Ð¾Ñ€ PKCS#7
    function makeContainerPkcs21Ready(cmdParams) {
        return execInternal(_Cmds.makeContainerPkcs21Ready, cmdParams);
    };

    function pkcs7Parse(cmdParams) {
        return execInternal(_Cmds.pkcs7Parse, cmdParams);
    };

    function pkcs7ParseBase64Encoded(cmdParams) {
        return execInternal(_Cmds.pkcs7ParseBase64Encoded, cmdParams);
    };


    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÐÐ½Ñ‚Ð¸Ñ„Ñ€Ð¾Ð´-Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð¾Ð¼
    function aftBindToken(cmdParams) {
        return execInternal(_Cmds.aftBindToken, cmdParams);
    };

    function aftEnterAdminPIN(cmdParams) {
        return execInternal(_Cmds.aftEnterAdminPIN, cmdParams);
    };

    function aftFixBrokenReader(cmdParams) {
        return execInternal(_Cmds.aftFixBrokenReader, cmdParams);
    };

    function aftGetBrokenReaders(cmdParams) {
        return execInternal(_Cmds.aftGetBrokenReaders, cmdParams);
    };

    function aftGetNewPIN(cmdParams) {
        return execInternal(_Cmds.aftGetNewPIN, cmdParams);
    };

    function aftGetPIN(cmdParams) {
        return execInternal(_Cmds.aftGetPIN, cmdParams);
    };

    function aftGetPublicKey(cmdParams) {
        return execInternal(_Cmds.aftGetPublicKey, cmdParams);
    };

    function aftGetReaderSerialNumber(cmdParams) {
        return execInternal(_Cmds.aftGetReaderSerialNumber, cmdParams);
    };

    function aftGetReaderVersion(cmdParams) {
        return execInternal(_Cmds.aftGetReaderVersion, cmdParams);
    };

    function aftInitCard(cmdParams) {
        return execInternal(_Cmds.aftInitCard, cmdParams);
    };

    function aftInitUserPIN(cmdParams) {
        return execInternal(_Cmds.aftInitUserPIN, cmdParams);
    };

    function aftPerformPersonalization(cmdParams) {
        return execInternal(_Cmds.aftPerformPersonalization, cmdParams);
    };

    function aftSaveAdminPIN(cmdParams) {
        return execInternal(_Cmds.aftSaveAdminPIN, cmdParams);
    };

    function aftSwyxDisplay(cmdParams) {
        return execInternal(_Cmds.aftSwyxDisplay, cmdParams);
    };

    function aftSwyxStart(cmdParams) {
        return execInternal(_Cmds.aftSwyxStart, cmdParams);
    };

    function aftSwyxStop(cmdParams) {
        return execInternal(_Cmds.aftSwyxStop, cmdParams);
    };

    function aftUpdateFirmware(cmdParams) {
        return execInternal(_Cmds.aftUpdateFirmware, cmdParams);
    };


    // Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÑÐ¸ÑÑ‚ÐµÐ¼Ð¾Ð¹ Ð»Ð¸Ñ†ÐµÐ½Ð·Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ ÐÐ»Ð°Ð´Ð´Ð¸Ð½ Ð .Ð”.
    function activateLicense(cmdParams) {
        return execInternal(_Cmds.activateLicense, cmdParams);
    };

    function checkLicenseFeatures(cmdParams) {
        return execInternal(_Cmds.checkLicenseFeatures, cmdParams);
    };

    function getLicenses(cmdParams) {
        return execInternal(_Cmds.getLicenses, cmdParams);
    };

    function getTokenSerialNumberForLicense(cmdParams) {
        return execInternal(_Cmds.getTokenSerialNumberForLicense, cmdParams);
    };


    // GIB
    function getGibScoring(cmdParams) {
        return execInternal(_Cmds.getGibScoring, cmdParams);
    };

    function getGibUserHostData(cmdParams) {
        return execInternal(_Cmds.getGibUserHostData, cmdParams);
    };


    /// [Aliases END]

})();

///@}
