// this multi-purpose function will:
// 1) go through each cell in the chosen array
// 2) then execute the chosen function on that specific cell
function forEach (array, callback) {
    for(var i=0; i<array.length; i++) {
        callback(array[i]);
    }
}