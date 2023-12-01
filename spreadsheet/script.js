const spreadsheetContainer = document.getElementById("spreadsheet-container");
const exportBtn = document.querySelector("#export-btn");
const ROWS = 10;
const COLS = 10;
let spreadsheet = [];

// Cell 클래스
class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    columnm,
    rowName,
    columnName,
    active = false
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = columnm;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }
}

initSpreadsheet();
// Spreadsheet 데이터 생성
function initSpreadsheet() {
  for (let i = 0; i < ROWS; i++) {
    // 행 배열에 열 데이터 담기
    let spreadSheetRow = [];

    // 열 데이터 생성
    for (let j = 0; j < COLS; j++) {
      // 기본값 : 비어있음
      let cellData = "";
      let isHeader = false;
      let disabled = false;

      // Row header - 행 이름 지정
      if (j === 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }
      // Column header - 열 이름 지정
      if (i === 0) {
        cellData = String.fromCharCode(64 + j);
        isHeader = true;
        disabled = true;
      }
      // 0행 0열인 경우 -> 값 없음
      if (i === 0 && j === 0) {
        cellData = "";
      }

      // Cell 인스턴스 생성 및 Row array에 push
      const rowName = i;
      const columnName = String.fromCharCode(64 + j);

      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      );
      spreadSheetRow.push(cell);
    }
    // Spreadsheet에 각각의 행 push
    spreadsheet.push(spreadSheetRow);
  }
  // Html elements로 추가
  drawSheet();
}

// Cell element 생성
function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = "cell_" + cell.row + cell.column;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add("header");
  }

  cellEl.onclick = () => handleCellClick(cell);
  cellEl.onchange = (e) => handleCellChange(e.target.value, cell);

  return cellEl;
}

// Spreadsheet 전체 그리기
function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";

    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j];
      rowContainerEl.append(createCellEl(cell));
    }

    spreadsheetContainer.append(rowContainerEl);
  }
}

// Cell click 시 : 선택된 헤더 색상 변경, Cell status 표시
function handleCellClick(cell) {
  clearHeaderActiveStates(); // 기존 Active 상태 초기화

  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);

  columnHeaderEl.classList.add("active");
  rowHeaderEl.classList.add("active");

  document.querySelector("#cell-status").innerHTML =
    cell.columnName + "" + cell.rowName;
}

function getElFromRowCol(row, column) {
  return document.querySelector("#cell_" + row + column);
}

function clearHeaderActiveStates() {
  const headers = document.querySelectorAll(".header");

  headers.forEach((header) => {
    header.classList.remove("active");
  });
}

// Cell 입력값 변경사항 저장
function handleCellChange(data, cell) {
  cell.data = data;
}

// Export Spreadsheet 버튼 클릭 시 : CSV 파일 생성 및 저장
exportBtn.onclick = function (e) {
  let csv = "";
  for (let i = 0; i < spreadsheet.length; i++) {
    if (i === 0) continue;
    csv +=
      spreadsheet[i]
        .filter((item) => !item.isHeader)
        .map((item) => item.data)
        .join(",") + "\n";
  }

  const csvObj = new Blob([csv]);
  const csvUrl = URL.createObjectURL(csvObj);

  console.log(csvObj);

  const a = document.createElement("a");
  a.href = csvUrl;
  a.download = "Spreadsheet File Name.csv";
  a.click();
};