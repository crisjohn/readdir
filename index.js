/**
 * @author Christian John Elmedo
 * @2019
 */

/**
 * modules
 */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

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
                        obj[basename(i)] = {};
                        readTargetPath(join(targetPath, i), obj[i]);
                    }
                    // if target path is file
                    else if (isFile(join(targetPath, i))) {
                        obj[basename(i)] = require(join(targetPath, i));
                    } else {
                        console.error('[READDIR] ERROR', 'unknown type of target');
                    }
                } catch (error) {
                    console.error('[READDIR] ERROR', error.message);
                }
            }
        } else if (isFile(targetPath)) {
            obj = require(targetPath);
        } else {
            console.error('[READDIR] ERROR', 'unknown type of target');
        }
        return obj;
    } catch (error) {
        console.error('[READDIR] ERROR', error.message);
    }
}

/**
 * initialize
 * @param {array||string} paths target path to lookup
 */
const init = (paths) => {

    // temp storage
    let temp = {};

    for (let p of Array.isArray(paths) ? paths : [paths]) {
        console.time(`[READDIR] ${basename(p)} done init`)
        temp[basename(p)] = readTargetPath(p, {});
        console.timeEnd(`[READDIR] ${basename(p)} done init`)
    }

    return {
        /**
         * get
         * @example "folder.folder" or "folder.folder.file"
         * @param {string} val value to lookup
         */
        "get": (val) => _.get(temp, val)
    };

};

module.exports.init = init;