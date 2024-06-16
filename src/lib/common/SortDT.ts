
/**
 * Represents the direction of sorting.
 */
export type SortTD_DirectionType = "ASCENDING" | "DESCENDING";

/**
 * Represents a sort operation.
 */
export class SortTD {
    /**
     * Represents the available sort directions.
     */
    public static SORT_DIRECTIONS = {
        /**
         * Sort in ascending order.
         */
        ASCENDING: "Ascending" as SortTD_DirectionType,
        /**
         * Sort in descending order.
         */
        DESCENDING: "Descending" as SortTD_DirectionType
    };
}