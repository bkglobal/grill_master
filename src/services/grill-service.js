// const {occupiedRowObj, remaining} = getPreparedData(width, width, height, data, occupiedRowObjs[currRowIndex], occupiedCalculatedObjs[currRowIndex]);
// occupiedRowObjs.push(occupiedRowObj);
// data = remaining;



let occupiedObj = [];
let occupiedCalculatedObj = [];

export function analyseGrillManager(width, height, data) {
    let occupiedRowObjs = [];
    let occupiedCalculatedObjs = [];
    let currRowIndex = -1;
    let isNext = true;
    do {

        const {occupiedRowObj, remaining, next} = calculateIteration(currRowIndex, width, width, height, data, occupiedRowObjs[currRowIndex], occupiedCalculatedObjs[currRowIndex]);
        occupiedRowObjs.push([...occupiedRowObj]);

        occupiedRowObj = [];
        data = remaining;
        currRowIndex++;
        isNext = next;
    } while(isNext);
    return occupiedRowObjs.flat(1);
}


export function calculateIteration(index, width, remainingWidth, height, data) {
    if(index+1 === 0) {
        console.log('index : ', index+1);
        const { maxWidthOBj } = getMaxWidth(remainingWidth, height, data, width);
        if(maxWidthOBj) {            
            occupiedObj.push(maxWidthOBj);
            occupiedCalculatedObj.push(maxWidthOBj);
            data = data.filter(e => !(e.id===maxWidthOBj.id));
            calculateIteration(index, width, width-occupiedObj.reduce((acc, cv) => acc+cv.width,0), height, data);
        }
        return {occupiedRowObj: [...occupiedObj], remaining: data.filter(e => !(occupiedObj.map(e => e.id).includes(e.id))), next: true};
    } else {
        console.log('in else');
        console.log('index : ', index+1);

        let restObjects = nestedCommulativeIterate(width, height, data)
        let remainingData = data.filter(e => !(e.id===restObjects.id));
        return {occupiedRowObj: [...restObjects], remaining: remainingData, next: false};
    }
}

export function nestedCommulativeIterate(width, height, data) {
    let restObjects = [];
    data.forEach(element => {
        let obj = compareCommutativeWithObj(occupiedCalculatedObj, element, width, height);
        console.log('object : ', obj)
        if(obj) {
            restObjects.push(obj);
        }
    });
    return restObjects;
}

function compareCommutativeWithObj(commutativeArr, obj, width, height) {
    console.log('height is ', height, obj.height);
    let filteredArr = commutativeArr.filter(e => ((obj.width<=e.width) && (height>(obj.height+e.height+e.top))));
    console.log('filterd array is : ', filteredArr);
    if(!filteredArr[0]) {
        // Logic to Check multiple div width. 
        return false
    } else {
        let maxVal = filteredArr[0];
        
        filteredArr.forEach(e => ((e.width > maxVal.width) || (e.height > maxVal.height)) ? maxVal=e : null);
        let newObj = {...obj, top: Math.abs(maxVal.height+maxVal.top), left: Math.abs(maxVal.left)};
        // Change Array to Slit in Two.. Also add new item .. 
        occupiedCalculatedObj = occupiedCalculatedObj.map(el => (el.id===maxVal.id) ? ({...el, width: el.width-newObj.width, left: Math.abs(el.left-newObj.width) }) : el );
        occupiedCalculatedObj.push(newObj);
        // ################################################## 
        return newObj;
    }
}



export function getMaxWidth (width, height, data, parentWidth) {
    console.log('get max width called');
    let maxWidthOBj = null;
    data.forEach(element => {
        if((element.width<=width) && (element.height <= height)) {
            if(maxWidthOBj) {
                if(maxWidthOBj.width < element.width) {
                    maxWidthOBj = {...element, left: Math.abs(parentWidth-width), top: 0};
                }
            } else {
                maxWidthOBj = {...element, left: Math.abs(parentWidth-width), top: 0};
            }
        }
    });
    return {
        maxWidthOBj,
    }
}


export function prepareGrillData(data) {
    let grillData = [];
    data.forEach((element, index) => grillData[index]=Array(element.count).fill().map(e => ({...element, count: 1})));
    return grillData.flat(1);
}


export function getPreparedData(width, remainingWidth, height,  data, prevData, prevCalculatedData) {
    const { remaining, maxWidthOBj } = getMaximumWidth(remainingWidth, height, data, prevData, prevCalculatedData);
    
    if(!maxWidthOBj) return {occupiedRowObj: [...occupiedObj], remaining};

    occupiedObj.push(maxWidthOBj);
    
    const optimalFilter = remaining.filter(e => e.width <= remainingWidth);
    if(optimalFilter.length > 0) {
        if(optimalFilter.length === 1) {
            occupiedObj.push(optimalFilter[0])
        } else {
            getPreparedData(width, width-occupiedObj.reduce((acc, cv) => acc+cv.width,0), height, remaining);
        }
    } else {
        return {occupiedRowObj: [...occupiedObj], remaining};
    }
}
export function getMaximumWidth (width, height, data, prevData, prevCalculatedData) {
    let maxWidthOBj = null;
    let calculatedObjs = [];
    let remaining = [];
    data.forEach(element => {
        let filteredPrevData = prevCalculatedData.filter(e => element<=e.height);
        let isHeightValid = (!prevData) ? (element.height<=height) : filteredPrevData[0];
        if((element.width<=width) && isHeightValid) {
            if(maxWidthOBj && ( maxWidthOBj.width < element.width)) {
                remaining.push(maxWidthOBj);
                maxWidthOBj = {element, left: Math.abs(width)};
                calculatedObjs.push()
            } else {
                maxWidthOBj = {element, left: Math.abs(width)};
            }
        } else {
            remaining.push(element)
        }
    });
    return {
        maxWidthOBj,
        remaining
    }
}

function getMaxHeight(cummulativeHeight, heightArr, element) {
    let height = null;
    heightArr.forEach(el => (el.height+element.height))
}