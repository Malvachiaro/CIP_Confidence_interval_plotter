export class ValueChecker {

    static checkNotNull(value: any) {
        if (value === null || value === undefined) {
            return false
        }
        return true
    }

    static checkNotEmpty(value: any) {
        if (value === null || value === undefined || value === "") {
            return false
        }
        return true
    }

    static checkIsNumber(value: any) {
        if (value === null || value === undefined || isNaN(value)) {
            return false
        }
        return true
    }

    static checkIsInteger(value: any) {
        if (value === null || value === undefined || isNaN(value) || !Number.isInteger(value)) {
            return false
        }
        return true
    }

    static checkIsBetween(value: any, min: number, max: number) {
        if (value === null || value === undefined || isNaN(value) || value < min || value > max) {
            return false
        }
        return true
    }

    static checkIsGreaterThan(value: any, min: number) {
        if (value === null || value === undefined || isNaN(value) || value < min) {
            return false
        }
        return true
    }

}