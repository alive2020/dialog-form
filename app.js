// listen for form submit
const inputTitle = document.getElementById('inputTitle');
const inputID = document.getElementById('inputID');
const inputEmail = document.getElementById('inputEmail');
const inputName = document.getElementById('inputName');
const inputMobile = document.getElementById('inputMobile');
const inputTeam = document.getElementById('inputTeam');
const submitBtn = document.getElementById('submit');

const myForm = document
  .getElementById('myForm')
  .addEventListener('submit', saveMember);
const addNew = document
  .getElementById('addNew')
  .addEventListener('click', openModal);
const closeBtn = document
  .getElementById('close')
  .addEventListener('click', closeModal);

window.addEventListener('click', outsideClick);

const modal = document.getElementById('my-modal');

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function outsideClick(e) {
  if (e.target == modal) {
    document.getElementById('myForm').reset();
    modal.style.display = 'none';
  }
}

function saveMember(e) {
  let inputTitle = document.getElementById('inputTitle').value;
  let inputID = document.getElementById('inputID').value;
  let inputEmail = document.getElementById('inputEmail').value;
  let inputName = document.getElementById('inputName').value;
  let inputMobile = document.getElementById('inputMobile').value;
  let inputTeam = document.getElementById('inputTeam').value;

  if (!inputTitle || !inputEmail || !inputName || !inputEmail || !inputMobile) {
    let error = (document.getElementById('error').innerHTML =
      'Please complete all the fields');
    // error.classList.add('error');
    return false;
  }

  let member = {
    title: inputTitle,
    id: inputID,
    email: inputEmail,
    name: inputName,
    mobile: inputMobile,
    team: inputTeam,
  };
  //   console.log(member);

  if (localStorage.getItem('members') === null) {
    let members = [];
    members.push(member);
    localStorage.setItem('members', JSON.stringify(members));
  } else {
    let members = JSON.parse(localStorage.getItem('members'));
    members.push(member);
    localStorage.setItem('members', JSON.stringify(members));
  }

  document.getElementById('myForm').reset();

  fetchMembers();
  closeModal();
  e.preventDefault();
}

//View Members
function viewMember(name) {
  modal.style.display = 'block';
  submitBtn.innerText = 'Edit';
  let members = JSON.parse(localStorage.getItem('members'));
  members.map((el) => {
    if (el.name == name) {
      inputTitle.value = el.title;
      inputEmail.value = el.email;
      inputName.value = el.name;
      inputMobile.value = el.mobile;
      inputTitle.readOnly = true;
      inputEmail.readOnly = true;
      inputName.readOnly = true;
      inputMobile.readOnly = true;
    }
  });
  if (submitBtn.innerText === 'Edit') {
    myForm.addEventListener('click', editMember);
  }
}

//Edit members
function editMember() {
  console.log('cl');
}

//Delete members
function deleteMember(name) {
  console.log(name);
  let members = JSON.parse(localStorage.getItem('members'));
  members.forEach((el) => {
    if (el.name == name) {
      members.splice(name, 1);
    }
  });
  localStorage.setItem('members', JSON.stringify(members));
  //   localStorage.removeItem()
  fetchMembers();
}

function fetchMembers() {
  let members = JSON.parse(localStorage.getItem('members'));
  console.log(members);
  let membersList = document.getElementById('membersList');
  membersList.innerHTML = '';
  for (let i = 0; i < members.length; i++) {
    let title = members[i].title;
    let id = members[i].id;
    let email = members[i].email;
    let name = members[i].name;
    let mobile = members[i].mobile;
    let team = members[i].team;

    membersList.innerHTML +=
      '<div class="member">' +
      '<div>' +
      '<h4>' +
      name +
      '</h4>' +
      '<span>' +
      title +
      '</span>' +
      '</div>' +
      '<div>' +
      ' <a onClick="viewMember(\'' +
      name +
      '\')" class="btn btn-info" href="#">Details</a> ' +
      //   ' <a onClick="editMember(\'' +
      //   name +
      //   '\')" class="btn btn-success" href="#">Edit</a> ' +
      ' <a onClick="deleteMember(\'' +
      name +
      '\')" class="btn btn-danger" href="#">Delete</a> ' +
      '</div>' +
      '</div>';
  }
}
