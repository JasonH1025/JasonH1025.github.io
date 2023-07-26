var memoListElement = document.getElementById("memo-list");
var memoFormElement = document.getElementById("memo-form");
var memoDateInput = document.getElementById("memo-date");
var memoTimeInput = document.getElementById("memo-time");
var memoContentInput = document.getElementById("memo-content");
var memoColorInput = document.getElementById("memo-color");

var memos = [];

function renderMemo(memo, index) {
  var memoItem = document.createElement("div");
  memoItem.classList.add("memo-item");
  memoItem.style.backgroundColor = memo.color;

  var memoDateTime = document.createElement("div");
  memoDateTime.textContent = memo.date + " " + memo.time;

  var memoContent = document.createElement("div");
  memoContent.classList.add("memo-item-content");
  memoContent.textContent = memo.content;

  var memoButtons = document.createElement("div");
  memoButtons.classList.add("memo-item-buttons");

  var editButton = document.createElement("button");
  editButton.textContent = "修改";
  editButton.addEventListener("click", function () {
    editMemo(index);
  });

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "删除";
  deleteButton.addEventListener("click", function () {
    deleteMemo(index);
  });

  memoButtons.appendChild(editButton);
  memoButtons.appendChild(deleteButton);

  memoItem.appendChild(memoDateTime);
  memoItem.appendChild(memoContent);
  memoItem.appendChild(memoButtons);

  memoListElement.appendChild(memoItem);
}

function addMemo(date, time, content, color) {
  var memo = {
    date: date,
    time: time,
    content: content,
    color: color
  };

  memos.push(memo);
  memos.sort(compareMemos); // 按日期和时间排序
  renderMemos();
}

function compareMemos(a, b) {
  var aTimestamp = new Date(a.date + " " + a.time).getTime();
  var bTimestamp = new Date(b.date + " " + b.time).getTime();
  return aTimestamp - bTimestamp;
}

function renderMemos() {
  memoListElement.innerHTML = ""; // 清空备忘录列表
  memos.forEach(function (memo, index) {
    renderMemo(memo, index);
  });
}

function editMemo(index) {
  var memo = memos[index];
  memoDateInput.value = memo.date;
  memoTimeInput.value = memo.time;
  memoContentInput.value = memo.content;
  memoColorInput.value = memo.color;
  deleteMemo(index);
}

function deleteMemo(index) {
  memos.splice(index, 1);
  renderMemos();
}

function clearForm() {
  memoDateInput.value = "";
  memoTimeInput.value = "";
  memoContentInput.value = "";
  memoColorInput.value = "#ffffff";
}

function handleSubmit(event) {
  event.preventDefault();

  var date = memoDateInput.value;
  var time = memoTimeInput.value;
  var content = memoContentInput.value;
  var color = memoColorInput.value;

  if (date && time && content) {
    addMemo(date, time, content, color);
    clearForm();
  }
}

memoFormElement.addEventListener("submit", handleSubmit);