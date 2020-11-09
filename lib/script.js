// Bernard Slater
// Fall 2020
// Web233 Javascript
// 10-31-2020
// Week 12

var MyItems = {
  name:"",
  price:""
};

var shoppinglist = [];

//v 3.1 addtocart empty array
var addtocart = [];

//v4.0
function savecookie()
{
  delete_cookie('slaterlist');
  var date = new Date();
  //keeps for a year
  date.setTime(date.getTime() + Number(365) * 3600 * 1000);
  document.cookie = 'slaterlist' + "=" + escape(shoppinglistjoin(',')) + "; path=/;expires = " + date.toGMTString();
}
//In .JS file
//v 4.0 read cookie and return
function readCookie(name) 
{
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++)
   {
  var c = ca[i];
  while (c.charAt(0)==' ') c = c.substring(1,c.length);
  if (c.indexOf(nameEQ) == 0) 
  return c.substring(nameEQ.length,c.length);
  }
  return null;
}
//In .JS file
//v 4.0 delete cookie
function delete_cookie(name) 
{
document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
//In .JS file
//v 4.0 save cookie
function savecookie()
{
  delete_cookie('slaterlist'); //replace konkol with YOUR last name
  var date = new Date();
  //keeps for a year
  date.setTime(date.getTime() + Number(365) * 3600 * 1000);
  //replace konkol with YOUR last name
  document.cookie = 'slaterlist' + "=" + escape(shoppinglistjoin(',')) + "; path=/;expires = " + date.toGMTString();
}
//multiple places in .JS. 
// Put call to savecookie(); AFTER displayShoppingCart();
displayShoppingCart();
  //v 4.0 save cookie
savecookie();
//In .JS file
//v 4.0 save cookie
//v 4.0 read cookie on load and display
window.onload = function() {
populateshoppinglistonload();
displayShoppinglists();
};
//In .JS file
//v 4.0 populateshoppinglistonload()
function populateshoppinglistonload()
{
  shoppinglist = [];
  addtocart = [];
  //load cookie into array
  var y = readCookie('slaterlist'); //replace konkol with YOUR last name
  //remove unwanted chars and format
  y = remove_unwanted(y); 
  //spit array by comma %2C
  y = y.split('%2C');
  if (y) 
  {
    shoppinglist = y;
  }
}
//In .JS file
//v. 4.0remove and format cookie
function remove_unwanted(str) {  
    
  if ((str===null) || (str===''))  
       return false;  
 else  
   str = str.toString();  
   str = str.replace(/%20/g, "");
   str = str.replace(/%24/g, "$"); 
   str = str.replace(/%7C/g, " | ");
  return str.replace(/[^\x20-\x7E]/g, '');  
}  

//v3.1
function changeShoppinglist(position) {
  //document.getElementById("MyList").innerHTML = shoppinglist[position];
  var arrays = shoppinglist[position];
  arrays = arrays.split(",");
    var e1 = arrays[0];
   var e2 = arrays[1];
 var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  shoppinglist[position] = eitem + "," + '$' + ecost;
  displayShoppinglists();
  displayShoppingCart();
}

//v3.1
function changeShoppingCart(position) {
  document.getElementById("MyCart").innerHTML = shoppinglist[position];
  var arrays = addtocart[position];
  arrays = arrays.split(",");
    var e1 = arrays[0];
   var e2 = arrays[1];
 var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  addtocart[position] = eitem + "," + '$' + ecost;
  displayShoppinglists();
  displayShoppingCart();
}

//v3.1 
function addbacktoshoppinglist(item,num) {
  //push to deleteShoppingCar
   deleteShoppingCart(num);
  shoppinglist.push(item);
  //display shoppinglist
  displayShoppinglists();
//v3.1 display displayShoppingCart() 
  displayShoppingCart(); 
  clearFocus();
}

//v 3.1 Update function addShoppinglist by adding objects
function addtoshopcart(item, num) {
    deleteShoppinglists(num);
    addtocart.push(item);
  //display shoppinglist
  displayShoppinglists();
//v3.1 display displayShoppingCart() 
  displayShoppingCart(); 
  //Clear
  clearFocus();
}

//v 3.1 Update function addShoppinglist by adding objects
function addShoppinglist(item,cost) {
  //v 3.0 declare variable for groc string
  var groc="";
  //v 3.0 v 3.0 declare variable for loop count
  var count=0;
  //v 3.0 edit value for MyItems.name
  MyItems.name=item;
  //v 3.0 edit value for MyItems.cost
  MyItems.price=cost;
  //v 3.0 for loop through object propterties and 
  for (var x in MyItems){
    if (count===1){
      groc += "$";
    }
    //add to groc string from object array item
    groc += MyItems[x];
    if (count===0){
      groc += " | ";
    }
    //increment count by 1
   count++;
  }
  //push to shoppinglist
  shoppinglist.push(groc);
  //display shoppinglist
  displayShoppinglists();
//v3.1 display displayShoppingCart() 
  displayShoppingCart(); 
  clearFocus();
}

function clearFocus()
{
  document.getElementById("item").value = "";
   document.getElementById("cost").value = "";
  document.getElementById("item").focus();
}


//v 3.1: update function displayShoppinglists() to add to cart 
function displayShoppinglists() {
var TheList = "";
var TheRow = "";
var arrayLength = shoppinglist.length;
for (var i = 0; i < shoppinglist.length; i++) {
  //v 3.1 change button name to btndelete
var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppinglist(' + i + ')" />';
//v 3.1 add edit button using below i index & name it btnpdate
var arrays = shoppinglist[i];
arrays = "'"+arrays+"'";
var btnaddcart =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping Cart" onclick="addtoshopcart('+arrays+','+ i +')" />Add</label>';
TheRow = '<li>' + shoppinglist[i] + btndelete + ' '  + btnaddcart + '</li>';
TheList += TheRow;
}
//v3.1 add Title
if (arrayLength > 0)
{
  document.getElementById("MyList").innerHTML = '<ul>' + TheList + '</ul>';
}else
{
  document.getElementById("MyList").innerHTML = '';
}
}

//v3.1
function displayShoppingCart() {
var TheList = "";
var TheRow = "";
var arrayLength = addtocart.length;
for (var i = 0; i < arrayLength; i++) {
  //v 3.1 change button name to btndelete
var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteShoppingCart(' + i + ')" />';
//v 3.1 add edit button using below i index & name it btnpdate
var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppingCart(' + i + ')" />';
var arrays = addtocart[i];
arrays = "'"+arrays+"'";
//v 3.1 add edit button using below i index & name it btnpdate
//v 3.2 remove edit button
var btnaddlist =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" checked="checked"/>Add</label>';
TheRow =  "<li>" + addtocart[i] + btndelete + ' ' +  ' ' + btnaddlist + '<br></li>';
TheList += TheRow;
}
if (arrayLength > 0)
{
  document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br><ul>' + TheList + '</ul>';
}else{
  document.getElementById("MyCart").innerHTML = '';
}
}

//v3.1
function deleteShoppinglists(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
}
//v3.1
function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
}








