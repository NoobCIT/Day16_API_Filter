/*=== API REQUEST ===*/

let url = 'https://api.opendota.com/api/heroes';

var options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
}

getData(url);

function getData(url, options) {
  fetch(url)
    .then(response => response.json())
    .then(data => displayData(data));
}

function displayData(heroes) {
  let anchor = document.querySelector('.heroes');
  for (let hero of heroes) {
    let div = document.createElement('DIV');
    div.classList.add('hero');
    div.classList.add('show');

    let { localized_name, primary_attr, attack_type } = hero;

    div.appendChild(createStat('name', localized_name.toLowerCase()));
    div.appendChild(createStat('attr', primary_attr));
    div.appendChild(createStat('type', attack_type.toLowerCase()));
    anchor.appendChild(div);
  }
}

function createStat(yourClass, stat) {
  let div = document.createElement('DIV');
  let par = document.createElement('P');
  par.innerHTML = stat;
  div.classList.add(yourClass);
  div.appendChild(par);
  return div;
}

/*=== FILTER ===*/

let inputHero = document.querySelector('#heroName');
let inputAttr = document.querySelector('#attribute');
let inputType = document.querySelector('#type');

let form = document.getElementsByTagName('form')[0];
form.addEventListener('input', updateHeroes);

function updateHeroes() {
  let heroes = document.getElementsByClassName('hero');
  Array.from(heroes).map(function(hero) {
    let showName = true;
    let showAttr = true;
    let showType = true;
    let iName = inputHero.value;
    let iAttr = inputAttr.value;
    let iType = inputType.value;
    let heroName = hero.children[0].children[0].innerHTML;
    let heroAttr = hero.children[1].children[0].innerHTML;
    let heroType = hero.children[2].children[0].innerHTML;
    if (iName != '') {
      for (let i = 0; i < iName.length; i++) {
        if (heroName[i] != iName[i]) {
          showName = false;
          break;
        }
      }
    }
    if (iAttr != '') {
      for (let i = 0; i < iAttr.length; i++) {
        if (heroAttr[i] != iAttr[i]) {
          showAttr = false;
          break;
        }
      }
    }
    if (iType != '') {
      for (let i = 0; i < iType.length; i++) {
        if (heroType[i] != iType[i]) {
          showType = false;
          break;
        }
      }
    }
    if (showName && showAttr && showType) {
      hero.classList.remove('hide');
      hero.classList.add('show')
    } else {
      hero.classList.remove('show');
      hero.classList.add('hide');
    }
  })
}
