export default class Util {
    public static removeIt(it:any, from:any[]) {
        if (from.indexOf(it) == -1) {
            return from;
        } else {
            let index = from.indexOf(it);
            return from.slice(0, index).concat(from.slice(index +1, from.length));
        }
    }
}