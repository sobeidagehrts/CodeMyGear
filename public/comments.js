const url = 'https://us-central1-omg-codemygear.cloudfunctions.net/comments/sobeida';
const content = document.getElementById('content');
const text = document.getElementById('text');
const email = document.getElementById('email');
const submit = document.getElementById('submit');

getComments();

async function getComments() {
  var resp = await fetch(url);
  var comments = await resp.json();
  var html = "";
console.log(comments);

  comments.map((comment) => {
    html += `<div class="commentItem">`;
    html += `<span class="comment">${comment.email} - ${comment.message}</span>`;
    html += `</div>`;
  })
  content.innerHTML = html;
}

submit.addEventListener('click', function() {
  postComments([{
    "message": text.value,
    "email": email.value
  }]);
});

async function postComments(comments) {
  var resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(comments),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  text.value = "";
  email.value = "";
  getComments();
}

// content.addEventListener('click', function() {
//   if (event.target.className === "completeTask") {
//     putComments([{
//       id: event.target.id,
//       completed: true
//     }]);
//   }
// });
//
// async function putComment(comment) {
//   var resp = await fetch(url, {
//     method: "PUT",
//     body: JSON.stringify(comment),
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//     },
//   });
//   getComments();
// }
