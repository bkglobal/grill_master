// We will maintain temperory element array.
let occupiedObj = [];
// This is the array in which we calculate and learn the edges and position of element.
// If element width is 100 and heigt is 50 than next element will place after
// width 100 and heiht 50;
let occupiedCalculatedObj = [];

export function analyseGrillManager(width, height, data) {
    let occupiedRowObjs = [];
    let occupiedCalculatedObjs = [];
    let currRowIndex = -1;
    let isNext = true;
    occupiedObj = [];
    occupiedCalculatedObj = [];
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
        // This will have maximum width element which is less than the total width
        // and height of parent container
        const { maxWidthOBj } = getMaxWidth(remainingWidth, height, data, width);
        if(maxWidthOBj) {            
            occupiedObj.push(maxWidthOBj);
            occupiedCalculatedObj.push(maxWidthOBj);
            data = data.filter(e => !(e.id===maxWidthOBj.id));
            calculateIteration(index, width, width-occupiedObj.reduce((acc, cv) => acc+cv.width,0), height, data);
        }
        return {occupiedRowObj: [...occupiedObj], remaining: data.filter(e => !(occupiedObj.map(e => e.id).includes(e.id))), next: true};
    } else {
        let restObjects = nestedCommulativeIterate(width, height, data)
        let remainingData = data.filter(e => !(e.id===restObjects.id));
        return {occupiedRowObj: [...restObjects], remaining: remainingData, next: false};
    }
}

export function nestedCommulativeIterate(width, height, data) {
    let restObjects = [];
    data.forEach(element => {
        let obj = compareCommutativeWithObj(occupiedCalculatedObj, element, width, height);
        if(obj) {
            restObjects.push(obj);
        }
    });
    return restObjects;
}

function compareCommutativeWithObj(commutativeArr, obj, width, height) {
    let filteredArr = commutativeArr.filter(e => ((obj.width<=e.width) && (height>=(obj.height+e.height+e.top))));
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

export function transformRemainingData(data) {
    let remainingObj = {}
    data.forEach((element) => remainingObj[element.itemIndex]={...element, count: remainingObj[element.itemIndex] ? remainingObj[element.itemIndex].count + 1 : element.count} );
    return Object.values(remainingObj);
}


export function prepareGrillData(data) {
    let grillData = [];
    data.forEach((element, index) => grillData[index]=Array(element.count).fill().map(e => ({...element, count: 1})));
    return grillData.flat(1);
}