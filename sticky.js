//(function () {
	let draggedCard = null;
  let grabStartX;
  let grabStartY;
  let onDragStart;
  let onDrag;
  let onDragStop;
  let onAddCard;
  let onSave;
  let onDeleteCard;
  let createNewCard;
  let loadState;
  let saveSingleCard;
  let deleteSingleCard;
  let getCardObject;
  let colors = ['orange', 'purple', 'yellow', 'brown', 'red'];
  
  
     
//ladowanie z pamieci     
      
  loadState = function(){
  	for (let i = 0; i < localStorage.length; i++){
    	
//dla kazdego zapisanego elementu, tworzy okienko 
 createNewCard(JSON.parse(localStorage.getItem(localStorage.key(i))));
		}
  }
  
  //utworzone juz okienko - pobieramy jego dane i potem przypisujemy zeby miec jsona
  
  getCardObject = function(element){
  
  	
    let title = element.querySelector(".labelText");
    let note = element.querySelector(".cardContent");
    return{
    id: element.id,
    color: element.style.background,
    title: title.value,
    content: note.value,
    transform: element.style.transform
    
    }
  }
  //button
  onAddCard = function(){
  	createNewCard();
  }
  //button
  onSave = function(){
//pobranie elementow z klasa card, wycyzszczenie localstorage, elementy card sa zapisane do localstorage jako json
		let allCards = document.querySelectorAll(".card");
    localStorage.clear();
    for(let i=0; i< allCards.length; i++){
    	
     saveSingleCard(getCardObject(allCards[i]));
    }
    
    
  }
  
//przesuwanie
  
  onDragStart = function (event){
  let objRect;
  if (event.target.className.indexOf("label") === -1){
  	return;
  }
  draggedCard = this;
  
  objRect = draggedCard.getBoundingClientRect();
  
  grabStartX = objRect.left  - event.clientX;
  grabStartY = objRect.top - event.clientY;
  
  }
  
  onDrag = function (event){
  	if(!draggedCard){
    return;
    }
    let destinationX = event.clientX + grabStartX;
    if (destinationX < 10) destinationX = 10;
    
    let destinationY = event.clientY + grabStartY;
    if (destinationY < 10) destinationY = 10;
    
    draggedCard.style.transform = "translateX(" + destinationX + "px) translateY(" + destinationY + "px)"
  }
  
    onDragStop = function (event){
  	if(!draggedCard){
    return;
    }
   
    

    draggedCard = null;
    grabStartX = null;
    grabStartY = null;
  }
  
  saveSingleCard = function(cardElement){
  	localStorage.setItem(cardElement.id, JSON.stringify(cardElement));
  }
  
  //nowe okienka - pobieranie z local przez ID albo tworzenie zupelnie nowej
  
  createNewCard = function(initValues) {
  	
    let cardValues = initValues || {
    //losowy ciag znakow - zeby okienko mialo swoj ID
      id: "card_" +  Math.random().toString(36).substr(2, 9),
      color: colors[0],
      title: "Wpisz tytuł...",
    	content: "Wpisz notatkę...",
			transform: "translateX(0px) translateY(0px)"
    }
    //tworzenie HTML i CSS dla okienek
    
    let newCardElement = document.createElement('div');
    newCardElement.id = cardValues.id;
    newCardElement.style.background = cardValues.color;
    newCardElement.style.transform = cardValues.transform;
    let newLabelElement = document.createElement('div');
    let newTextareaElement = document.createElement('textarea');
    newTextareaElement.value = cardValues.title;
    let newTextareaContentElement = document.createElement('textarea');
    newTextareaContentElement.value = cardValues.content;
    let changeColorButton = document.createElement('button');
    let deleteCardButton = document.createElement('button');
    
    let saveCard;
    let deleteCard;
    let changeCardColor;
    let transform = cardValues.transform;

    
 
  
   changeCardColor = function(){
   
   let currentColor = newCardElement.style.backgroundColor;
   let indexOfcurrentColor = colors.indexOf(currentColor);
   let color = colors[(parseInt(indexOfcurrentColor) + 1)%colors.length];
   
   this.parentElement.parentElement.style.backgroundColor = color;
 
  }
  
    onDeleteCard = function(){
  	document.body.removeChild(newCardElement);
    deleteCard(newCardElement);
    
   
  }

    changeColorButton.addEventListener('click', changeCardColor);
    deleteCardButton.addEventListener('click', onDeleteCard);
    
    //nadawanie klas
    
    newCardElement.classList.add('card');
    newLabelElement.classList.add('label');
    newTextareaElement.classList.add('labelText');
    newTextareaContentElement.classList.add('cardContent');
    changeColorButton.classList.add('changeColorButton');
    deleteCardButton.classList.add('deleteCardButton');
    //porzadkowanie - div do diva itp
 
 newCardElement.appendChild(newLabelElement);
 newLabelElement.appendChild(changeColorButton);
 newLabelElement.appendChild(newTextareaElement);
 
 newCardElement.appendChild(deleteCardButton);

 newCardElement.appendChild(newTextareaContentElement);
 //dodanie eventa do przycisku myszy
 newCardElement.addEventListener('mousedown', onDragStart, false);
 newCardElement.addEventListener('mousemove', onDrag, false);
 newCardElement.addEventListener('mouseup', onDragStop, false);
 
 
 document.body.appendChild(newCardElement);
 
  }
  //ladowanie wsztystkich okienek
  loadState();
  //eventy do buttonow
  document.querySelector(".addButton").addEventListener("click", onAddCard, false)
  document.querySelector(".saveButton").addEventListener("click", onSave, false)
  
//}
//)();
