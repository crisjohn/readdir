/**
 * @author Christian John Elmedo
 * @2019
 */

/**
 * modules
 */
const fs = require('fs');
const path = require('path');

let showPath = false;

/**
 * basename
 * @param {string} val path to check
 */
const basename = (val) => {
    const str = path.basename(val).toString();
    const strInx = str.indexOf('.');
    return str.substr(0, strInx != -1 ? strInx : str.length);
}

/**
 * isDirectory
 * @param {string} p target path
 */
const isDirectory = (p) => fs.lstatSync(p).isDirectory();

/**
 * isFile
 * @param {string} p target path
 */
const isFile = (p) => fs.lstatSync(p).isFile();

/**
 * join
 * @param {string} p1 source
 * @param {string} p2 target
 */
const join = (p1, p2) => path.join(p1, p2);

/**
 * get
 * @param {string} p path target
 * @param {object} obj object target
 */
const get = (p, obj) => {
    let temp = obj;
    p.toString().split('.').forEach(n => temp = temp[n]);
    return temp;
};

/**
 * readTargetPath
 * @param {string} targetPath path to check
 * @param {object} obj to stored the data
 */
const readTargetPath = (targetPath, obj) => {
    try {
        if (isDirectory(targetPath)) {
            for (let i of fs.readdirSync(targetPath)) {
                try {
                    // if target path is directory
                    if (isDirectory(join(targetPath, i))) {
                        if (showPath) {
                            obj[basename(i)] = {};
                            readTargetPath(join(targetPath, i), obj[i]);
                        }
                        else {
                            readTargetPath(join(targetPath, i), obj);
                        }
                    }
                    // if target path is file
                    else if (isFile(join(targetPath, i))) {
                        obj[basename(i)] = require(join(targetPath, i));
                    } else {
                        console.trace('unknown type of target');
                    }
                } catch (error) {
                    console.trace(error)
                }
            }
        } else if (isFile(targetPath)) {
            obj = require(targetPath);
        } else {
            console.trace('unknown type of target')
        }
        return obj;
    } catch (error) {
        console.trace(error)
    }
}

/**
 * initialize
 * @param {array||string} paths target path to lookup
 * @param {boolean} sp show path of each imported file. default false
 */
const init = (paths, sp = false) => {

    // temp storage
    let temp = {};

    // show path
    showPath = sp;

    for (let p of Array.isArray(paths) ? paths : [paths]) {
        if (showPath) temp[basename(p)] = readTargetPath(p, {});
        else temp = Object.assign(temp, readTargetPath(p, {}));
    }

    return {
        "data": temp,
        /**
         * get
         * @param {string} val target name
         * @example get('bar.foo.myFunction')
         * @return {any}
         */
        "get": (val) => get(val, temp)
    };

};

module.exports.init = init;