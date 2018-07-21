var qualityVariable = "swill";

$.each(localStorage, function(key) {
  if (this !== undefined) {
    var cardData = JSON.parse(this);
    console.log(key);
    $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
  }
});
console.log('hello');

function newCard(id , title , body , quality) {
  return `<div id=${id} class="card-container">
            <h4 class="title-of-card">${title}<h4>
            <button class="delete-button"></button>
            <p class="body-of-card">${body}<p>
            <button class="upvote"></button>
            <button class="downvote"></button>
            <p class="quality">quality:<span class="qualityVariable">${quality}</span>
            </p>
            <hr>
            </div>`;
};

function cardObject() {
  return {
    title: $('.title-input').val(),
    body: $('.body-input').val(),
    quality: qualityVariable,
    id: Date.now()
  };
}

function localStoreCard(card) {
  var cardString = JSON.stringify(card);
  localStorage.setItem(card.id , cardString);
}

$('.save-btn').on('click', function(event) {
  event.preventDefault();
  var cardObj = cardObject();
  var card = newCard(cardObj.id, cardObj.title, cardObj.body, cardObj.quality);
  $( ".bottom-box" ).prepend(card);
  localStoreCard(cardObj);
  $('form')[0].reset();
});

$(".bottom-box").on('click', function(event){
  var currentQuality = $(event.target).siblings('.quality').text();
  var cardHTML = $(event.target).closest('.card-container');
  var cardID = cardHTML[0].id;
  console.log(cardID);
  if (event.target.className === "upvote" || event.target.className === "downvote"){
    upvoteFunction();
  }
  if (event.target.className === "delete-button") { deleteFunction() }
});
