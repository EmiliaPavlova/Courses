export const FILTER_COURSES = 'FILTER_COURSES';
export const RESET_FILTER = 'RESET_FILTER';

export function filterCourses(searchString: string) {
    return {
        type: FILTER_COURSES,
        searchString,
    };
}

export function resetFilter() {
    return {
        type: RESET_FILTER,
    };
}
