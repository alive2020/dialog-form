// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveMember);

function saveMember(e) {
  let inputTitle = document.getElementById('inputTitle').value;
  let inputID = document.getElementById('inputID').value;
  let inputEmail = document.getElementById('inputEmail').value;
  let inputName = document.getElementById('inputName').value;
  let inputMobile = document.getElementById('inputMobile').value;
  let inputTeam = document.getElementById('inputTeam').value;

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

  //   localStorage.setItem('test', 'Hello World');
  //   localStorage.getItem('test');
  //   localStorage.removeItem('test');
  //   // Local Storage
  //   localStorage;
  fetchMembers();

  e.preventDefault();
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
      '<div class="well">' +
      '<h4>' +
      name +
      '</h4>' +
      'p' +
      title +
      'p' +
      ' <a class="btn btn-success" href="#">Edit</a> ' +
      ' <a onClick="deleteMember(\'' +
      name +
      '\')" class="btn btn-danger" href="#">Delete</a> ' +
      '</div';

    // membersList.innerHTML +=
    //   '<div class="well">' +
    //   '<h3>' +
    //   name +
    //   ' <a onclick="deleteBookmark(\'' +
    //   url +
    //   '\')" class="btn btn-danger" href="#">Delete</a> ' +
    //   '</h3>' +
    //   '</div>';
  }
}
