// https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#method-getElementsByTagName
let headers = document.getElementById('sortable-table').getElementsByTagName('th');
let numColumns = headers.length;

// if last sort was -1, then the sorting ascending (from low to high)
// if last sort was 1, then the sorting descending (from high to low)
// starting with value -1 becuase the function start with inverting the sort order
let sortOrder = new Array(numColumns).fill(-1);
let sortableSection = document.getElementById('sortable-section');
let rows = [].slice.call(sortableSection.getElementsByTagName('tr'));

// the sorting function
const sort = (columnNum) => {
  
  // inverse the sort order
  sortOrder[columnNum] *= -1;

  let dataText1, datatext2;
  rows.sort((row1, row2) => {
    dataText1 = row1.getElementsByTagName('td')[columnNum].innerText;
    datatext2 = row2.getElementsByTagName('td')[columnNum].innerText;

    let compareResult = dataText1.localeCompare(datatext2);
    return compareResult * sortOrder[columnNum];
  });
  sortableSection.innerHTML = '';
  rows.forEach(row => sortableSection.insertAdjacentElement('beforeend',row));
}
// attack event listeners to th tag
for (let i = 0; i < headers.length; i++){
  headers[i].addEventListener('mouseup',() => { sort(i) }, true);
}