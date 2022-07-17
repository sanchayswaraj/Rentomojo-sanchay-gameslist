import mockdata from './mockData.json'
// ......................................................
// INITIAL STATE
// ......................................................
export const initialState = {

        collection: null,
        sorted: false,
        sortedBy: { sortParam: '', reverse: false },
        searchActive: false,
        searchTerm: '',

        collectionAsPages: null,
        entries: 0,
        currentPage: null,
        currentPageIndex: null,
        totalPages: null
}
// ......................................................
// REDUCER
// ......................................................
export const reducer = (state, action) => {
    let newState;
    switch (action.type) {

        case 'init':
            let datasource = action.payload
            newState = { ...state, collection: datasource, entries: 15, currentPageIndex: 0 }
            return setUpPages(newState)

        case 'initWithMock':
            newState = { ...state, collection: mockdata.list, entries: 15, currentPageIndex: 0 }
            return setUpPages(newState)

        case 'setCollection':
            if ( state.collection && state.collection.length > 0 ) { state.collection = null }
            return { ...state, collection: action.value }
        
        case 'setCollectionAsPages':
            if ( state.collectionAsPages && state.collectionAsPages.length > 0 ) { state.collectionAsPages = null }
            return  { ...state, collectionAsPages: action.value }
        
        case 'setEntriesPerPage':
            let requestedEntries = action.value
            newState = { ...state, entries: requestedEntries}
            return setUpPages(newState)

        case 'setCurrentPage':
            let requestedIndex = action.value
            let collectionPages = state.collectionAsPages
            return { ...state, currentPageIndex: requestedIndex, currentPage: collectionPages[requestedIndex] }        
        
        case 'sortList':
            let sortParam = action.value.sortParam
            let reverse = action.value.reverse
            newState =  { ...state, sortedBy: { sortParam, reverse } }
            return reduceSort(newState)

        case 'searchList':
            return { ...state, searchTerm: action.value, searchActive: true }
        
        //default: throw new Error (`${action.type} is not a valid action`)
        default: return state
    }
}

// ......................................................
// REDUCER FUNCTIONS
// ......................................................
const setUpPages = (state) => {
    
    const currentList = state.collection
    console.log('currentList=', currentList)
    const currentIndex = state.currentPageIndex??0
    const entries = state.entries

    let outputPages = []
    let from = 0

    let totalPages
    if (currentList.length > entries) {
        totalPages = Math.floor(currentList.length / entries)
    } else { totalPages = 1}

    // setup pages arrays
    for (let i = from; i <= totalPages; i++ ) {
        let to = from + entries
        outputPages.push(currentList.slice(from, to ))
        from += entries
    }

    if ( state.collectionAsPages && state.collectionAsPages.length ) { state.collectionAsPages = [] }
    
    return {
        ...state,
        entries: entries,
        totalPages: totalPages,
        collectionAsPages: [...outputPages],
        currentPageIndex: currentIndex,
        currentPage: outputPages[currentIndex]
    }
}

const reduceSort = (state) => {
    let newState
    const { sortParam, reverse } = state.sortedBy
    const currentList = state.collection
    let sortedList = [ ...currentList] // ---- for 'sort()' will try to mutate 'currentList' and fail ---- !
    
    !reverse ?
        sortedList.sort( (a, b) => a[sortParam].localeCompare(b[sortParam])) // a, b = employee objects of employees array
        : sortedList.sort( (a, b) => b[sortParam].localeCompare(a[sortParam])) 
        // if prop is an object : :a[sortParam].name.localeCompare(b[sortParam].name)
    
        newState =  {
        ...state,
        sorted: true,
        sortedBy: { sortParam, reverse },
        collection: [...sortedList]
    }
    return setUpPages(newState)
}

